import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common/base.service';
import { Categoria } from './entities/categoria.entity';
import { Producto } from '../productos/entities/producto.entity';
import type { CreateCategoriaDto } from './dto/create-categoria.dto';
import type { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService extends BaseService<Categoria> {
    constructor(
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>,
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>,
    ) {
        super(categoriaRepository, 'Categoría');
    }

    /**
     * Sobrescribe findOne para usar id_categoria
     */
    async findOne(id: number): Promise<Categoria> {
        const categoria = await this.categoriaRepository.findOne({
            where: { id_categoria: id },
        });

        if (!categoria) {
            throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
        }

        return categoria;
    }

    /**
     * Sobrescribe el método create para validar nombre único
     */
    async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
        await this.validateUniqueName(createCategoriaDto.nombre);
        return await super.create(createCategoriaDto);
    }

    /**
     * Sobrescribe el método update para validar nombre único
     */
    async update(
        id: number,
        updateCategoriaDto: UpdateCategoriaDto,
    ): Promise<Categoria> {
        if (updateCategoriaDto.nombre) {
            await this.validateUniqueName(updateCategoriaDto.nombre, id);
        }
        return await super.update(id, updateCategoriaDto);
    }

    /**
     * Sobrescribe hardDelete para usar id_categoria y validar productos asociados
     */
    async hardDelete(id: number): Promise<void> {
        const categoria = await this.categoriaRepository.findOne({
            where: { id_categoria: id },
        });

        if (!categoria) {
            throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
        }

        // Verificar si hay productos asociados a esta categoría
        const productosAsociados = await this.productoRepository.count({
            where: { id_categoria: id },
        });

        if (productosAsociados > 0) {
            throw new ConflictException(
                `No se puede eliminar la categoría "${categoria.nombre}" porque tiene ${productosAsociados} producto(s) asociado(s). Primero debes reasignar o eliminar los productos.`,
            );
        }

        await this.categoriaRepository.remove(categoria);
    }

    /**
     * Valida que el nombre de la categoría sea único
     */
    private async validateUniqueName(
        nombre: string,
        excludeId?: number,
    ): Promise<void> {
        const whereClause: any = { nombre };

        if (excludeId) {
            const existing = await this.categoriaRepository.findOne({
                where: { nombre },
            });

            if (existing && existing.id_categoria !== excludeId) {
                throw new ConflictException(
                    `Ya existe una categoría con el nombre "${nombre}"`,
                );
            }
        } else {
            const exists = await this.categoriaRepository.findOne({
                where: { nombre },
            });

            if (exists) {
                throw new ConflictException(
                    `Ya existe una categoría con el nombre "${nombre}"`,
                );
            }
        }
    }
}
