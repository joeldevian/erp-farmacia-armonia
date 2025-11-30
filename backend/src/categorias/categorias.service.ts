import {
    Injectable,
    NotFoundException,
    ConflictException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import type { CreateCategoriaDto } from './dto/create-categoria.dto';
import type { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>,
    ) { }

    async findAll(filtros?: {
        nombre?: string;
        estado?: boolean;
    }): Promise<Categoria[]> {
        const where: any = {};

        if (filtros?.nombre) {
            where.nombre = Like(`%${filtros.nombre}%`);
        }

        if (filtros?.estado !== undefined) {
            where.estado = filtros.estado;
        }

        return await this.categoriaRepository.find({
            where,
            order: { fecha_creacion: 'DESC' },
        });
    }

    async findOne(id: number): Promise<Categoria> {
        const categoria = await this.categoriaRepository.findOne({
            where: { id_categoria: id },
        });

        if (!categoria) {
            throw new NotFoundException(
                `Categoría con ID ${id} no encontrada`,
            );
        }

        return categoria;
    }

    async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
        try {
            const categoria = this.categoriaRepository.create(createCategoriaDto);
            return await this.categoriaRepository.save(categoria);
        } catch (error) {
            // Error de nombre duplicado (UNIQUE constraint)
            if (error.code === '23505') {
                throw new ConflictException(
                    `Ya existe una categoría con el nombre "${createCategoriaDto.nombre}"`,
                );
            }
            throw error;
        }
    }

    async update(
        id: number,
        updateCategoriaDto: UpdateCategoriaDto,
    ): Promise<Categoria> {
        const categoria = await this.findOne(id);

        try {
            Object.assign(categoria, updateCategoriaDto);
            return await this.categoriaRepository.save(categoria);
        } catch (error) {
            // Error de nombre duplicado (UNIQUE constraint)
            if (error.code === '23505') {
                throw new ConflictException(
                    `Ya existe una categoría con el nombre "${updateCategoriaDto.nombre}"`,
                );
            }
            throw error;
        }
    }

    async remove(id: number): Promise<{ message: string; categoria: Categoria }> {
        const categoria = await this.findOne(id);

        // Validar que no esté en uso por productos
        // TODO: Descomentar cuando se implemente el módulo de productos
        // const productosCount = await this.categoriaRepository
        //   .createQueryBuilder('categoria')
        //   .leftJoin('categoria.productos', 'producto')
        //   .where('categoria.id_categoria = :id', { id })
        //   .getCount();
        //
        // if (productosCount > 0) {
        //   throw new BadRequestException(
        //     `No se puede desactivar la categoría porque tiene ${productosCount} producto(s) asociado(s)`,
        //   );
        // }

        // Soft delete: cambiar estado a false
        categoria.estado = false;
        const categoriaDesactivada = await this.categoriaRepository.save(categoria);

        return {
            message: 'Categoría desactivada exitosamente',
            categoria: categoriaDesactivada,
        };
    }

    // Método para eliminación física (solo para administradores)
    async hardDelete(id: number): Promise<void> {
        const categoria = await this.findOne(id);
        await this.categoriaRepository.remove(categoria);
    }
}
