import {
    Injectable,
    ConflictException,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common/base.service';
import { Producto } from './entities/producto.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { Laboratorio } from '../laboratorios/entities/laboratorio.entity';
import type { CreateProductoDto } from './dto/create-producto.dto';
import type { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService extends BaseService<Producto> {
    constructor(
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>,
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>,
        @InjectRepository(Laboratorio)
        private readonly laboratorioRepository: Repository<Laboratorio>,
    ) {
        super(productoRepository, 'Producto');
    }

    /**
     * Sobrescribe findOne para usar id_producto
     */
    async findOne(id: number): Promise<Producto> {
        const producto = await this.productoRepository.findOne({
            where: { id_producto: id },
            relations: ['categoria', 'laboratorio'],
        });

        if (!producto) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }

        return producto;
    }

    /**
     * Sobrescribe create con validaciones
     */
    async create(createProductoDto: CreateProductoDto): Promise<Producto> {
        // Validar nombre único
        await this.validateUniqueName(createProductoDto.nombre);

        // Validar código interno único
        await this.validateUniqueCodigoInterno(createProductoDto.codigo_interno);

        // Validar que categoría existe
        await this.validateCategoriaExists(createProductoDto.id_categoria);

        // Validar que laboratorio existe
        await this.validateLaboratorioExists(createProductoDto.id_laboratorio);

        // Validar stocks
        this.validateStocks(
            createProductoDto.stock_minimo,
            createProductoDto.stock_maximo,
        );

        return await super.create(createProductoDto);
    }

    /**
     * Sobrescribe update con validaciones
     */
    async update(
        id: number,
        updateProductoDto: UpdateProductoDto,
    ): Promise<Producto> {
        // Validar nombre único si se está actualizando
        if (updateProductoDto.nombre) {
            await this.validateUniqueName(updateProductoDto.nombre, id);
        }

        // Validar código interno único si se está actualizando
        if (updateProductoDto.codigo_interno) {
            await this.validateUniqueCodigoInterno(
                updateProductoDto.codigo_interno,
                id,
            );
        }

        // Validar que categoría existe si se está actualizando
        if (updateProductoDto.id_categoria) {
            await this.validateCategoriaExists(updateProductoDto.id_categoria);
        }

        // Validar que laboratorio existe si se está actualizando
        if (updateProductoDto.id_laboratorio) {
            await this.validateLaboratorioExists(updateProductoDto.id_laboratorio);
        }

        // Validar stocks si se están actualizando
        if (
            updateProductoDto.stock_minimo !== undefined ||
            updateProductoDto.stock_maximo !== undefined
        ) {
            const producto = await this.findOne(id);
            const stockMin =
                updateProductoDto.stock_minimo ?? producto.stock_minimo;
            const stockMax =
                updateProductoDto.stock_maximo ?? producto.stock_maximo;
            this.validateStocks(stockMin, stockMax);
        }

        return await super.update(id, updateProductoDto);
    }

    /**
     * Valida que el nombre sea único
     */
    private async validateUniqueName(
        nombre: string,
        excludeId?: number,
    ): Promise<void> {
        const existing = await this.productoRepository.findOne({
            where: { nombre },
        });

        if (existing && existing.id_producto !== excludeId) {
            throw new ConflictException(
                `Ya existe un producto con el nombre "${nombre}"`,
            );
        }
    }

    /**
     * Valida que el código interno sea único
     */
    private async validateUniqueCodigoInterno(
        codigoInterno: string,
        excludeId?: number,
    ): Promise<void> {
        const existing = await this.productoRepository.findOne({
            where: { codigo_interno: codigoInterno },
        });

        if (existing && existing.id_producto !== excludeId) {
            throw new ConflictException(
                `Ya existe un producto con el código interno "${codigoInterno}"`,
            );
        }
    }

    /**
     * Valida que la categoría existe
     */
    private async validateCategoriaExists(idCategoria: number): Promise<void> {
        const categoria = await this.categoriaRepository.findOne({
            where: { id_categoria: idCategoria },
        });

        if (!categoria) {
            throw new NotFoundException(
                `Categoría con ID ${idCategoria} no encontrada`,
            );
        }
    }

    /**
     * Valida que el laboratorio existe
     */
    private async validateLaboratorioExists(
        idLaboratorio: number,
    ): Promise<void> {
        const laboratorio = await this.laboratorioRepository.findOne({
            where: { id_laboratorio: idLaboratorio },
        });

        if (!laboratorio) {
            throw new NotFoundException(
                `Laboratorio con ID ${idLaboratorio} no encontrado`,
            );
        }
    }

    /**
     * Valida que stock_minimo < stock_maximo
     */
    private validateStocks(stockMinimo: number, stockMaximo: number): void {
        if (stockMinimo >= stockMaximo) {
            throw new BadRequestException(
                'El stock mínimo debe ser menor que el stock máximo',
            );
        }
    }
}
