import {
    Injectable,
    ConflictException,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoAlmacen, EstadoStock } from './entities/producto-almacen.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Almacen } from '../almacenes/entities/almacen.entity';
import type { CreateProductoAlmacenDto } from './dto/create-producto-almacen.dto';
import type { UpdateProductoAlmacenDto } from './dto/update-producto-almacen.dto';

@Injectable()
export class ProductosAlmacenService {
    constructor(
        @InjectRepository(ProductoAlmacen)
        private readonly productoAlmacenRepository: Repository<ProductoAlmacen>,
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>,
        @InjectRepository(Almacen)
        private readonly almacenRepository: Repository<Almacen>,
    ) { }

    /**
     * Listar todas las asignaciones con actualización de estados
     */
    async findAll(): Promise<ProductoAlmacen[]> {
        const asignaciones = await this.productoAlmacenRepository.find({
            relations: ['producto', 'almacen'],
            order: { created_at: 'DESC' },
        });

        // Actualizar estados automáticamente
        for (const asignacion of asignaciones) {
            const estadoAnterior = asignacion.estado;
            asignacion.actualizarEstado();
            if (estadoAnterior !== asignacion.estado) {
                await this.productoAlmacenRepository.save(asignacion);
            }
        }

        return asignaciones;
    }

    /**
     * Obtener asignación por UUID
     */
    async findOne(id: string): Promise<ProductoAlmacen> {
        const asignacion = await this.productoAlmacenRepository.findOne({
            where: { id_producto_almacen: id },
            relations: ['producto', 'almacen'],
        });

        if (!asignacion) {
            throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
        }

        // Actualizar estado
        const estadoAnterior = asignacion.estado;
        asignacion.actualizarEstado();
        if (estadoAnterior !== asignacion.estado) {
            await this.productoAlmacenRepository.save(asignacion);
        }

        return asignacion;
    }

    /**
     * Crear asignación producto-almacén con validaciones
     */
    async create(
        createProductoAlmacenDto: CreateProductoAlmacenDto,
    ): Promise<ProductoAlmacen> {
        // Validar asignación única
        await this.validateAsignacionUnica(
            createProductoAlmacenDto.id_producto,
            createProductoAlmacenDto.id_almacen,
        );

        // Validar stocks
        this.validateStocks(
            createProductoAlmacenDto.stock_minimo,
            createProductoAlmacenDto.stock_maximo,
        );

        // Validar que producto existe
        await this.validateProductoExists(createProductoAlmacenDto.id_producto);

        // Validar que almacén existe
        await this.validateAlmacenExists(createProductoAlmacenDto.id_almacen);

        // Crear asignación
        const asignacion = this.productoAlmacenRepository.create(
            createProductoAlmacenDto,
        );

        // Calcular estado inicial
        asignacion.actualizarEstado();

        return await this.productoAlmacenRepository.save(asignacion);
    }

    /**
     * Actualizar asignación
     */
    async update(
        id: string,
        updateProductoAlmacenDto: UpdateProductoAlmacenDto,
    ): Promise<ProductoAlmacen> {
        const asignacion = await this.findOne(id);

        // Validar asignación única si se está actualizando producto o almacén
        if (
            updateProductoAlmacenDto.id_producto ||
            updateProductoAlmacenDto.id_almacen
        ) {
            const idProducto =
                updateProductoAlmacenDto.id_producto ?? asignacion.id_producto;
            const idAlmacen =
                updateProductoAlmacenDto.id_almacen ?? asignacion.id_almacen;

            if (
                idProducto !== asignacion.id_producto ||
                idAlmacen !== asignacion.id_almacen
            ) {
                await this.validateAsignacionUnica(idProducto, idAlmacen, id);
            }
        }

        // Validar stocks si se están actualizando
        if (
            updateProductoAlmacenDto.stock_minimo !== undefined ||
            updateProductoAlmacenDto.stock_maximo !== undefined
        ) {
            const stockMin =
                updateProductoAlmacenDto.stock_minimo ?? asignacion.stock_minimo;
            const stockMax =
                updateProductoAlmacenDto.stock_maximo ?? asignacion.stock_maximo;
            this.validateStocks(stockMin, stockMax);
        }

        // Validar producto si se está actualizando
        if (updateProductoAlmacenDto.id_producto) {
            await this.validateProductoExists(updateProductoAlmacenDto.id_producto);
        }

        // Validar almacén si se está actualizando
        if (updateProductoAlmacenDto.id_almacen) {
            await this.validateAlmacenExists(updateProductoAlmacenDto.id_almacen);
        }

        // Actualizar
        Object.assign(asignacion, updateProductoAlmacenDto);

        // Recalcular estado
        asignacion.actualizarEstado();

        return await this.productoAlmacenRepository.save(asignacion);
    }

    /**
     * Eliminar asignación
     */
    async remove(id: string): Promise<void> {
        const asignacion = await this.findOne(id);
        await this.productoAlmacenRepository.remove(asignacion);
    }

    /**
     * Obtener productos con bajo stock
     */
    async findBajoStock(idAlmacen?: string): Promise<ProductoAlmacen[]> {
        const queryBuilder = this.productoAlmacenRepository
            .createQueryBuilder('pa')
            .leftJoinAndSelect('pa.producto', 'producto')
            .leftJoinAndSelect('pa.almacen', 'almacen')
            .where('pa.stock < pa.stock_minimo');

        if (idAlmacen) {
            queryBuilder.andWhere('pa.id_almacen = :idAlmacen', { idAlmacen });
        }

        const asignaciones = await queryBuilder
            .orderBy('pa.stock', 'ASC')
            .getMany();

        // Actualizar estados
        for (const asignacion of asignaciones) {
            asignacion.actualizarEstado();
        }

        return asignaciones;
    }

    /**
     * Obtener productos de un almacén específico
     */
    async findPorAlmacen(idAlmacen: string): Promise<ProductoAlmacen[]> {
        const asignaciones = await this.productoAlmacenRepository.find({
            where: { id_almacen: idAlmacen },
            relations: ['producto', 'almacen'],
            order: { created_at: 'DESC' },
        });

        // Actualizar estados
        for (const asignacion of asignaciones) {
            const estadoAnterior = asignacion.estado;
            asignacion.actualizarEstado();
            if (estadoAnterior !== asignacion.estado) {
                await this.productoAlmacenRepository.save(asignacion);
            }
        }

        return asignaciones;
    }

    /**
     * Validar que la asignación (producto + almacén) sea única
     */
    private async validateAsignacionUnica(
        idProducto: number,
        idAlmacen: string,
        excludeId?: string,
    ): Promise<void> {
        const existing = await this.productoAlmacenRepository.findOne({
            where: {
                id_producto: idProducto,
                id_almacen: idAlmacen,
            },
        });

        if (existing && existing.id_producto_almacen !== excludeId) {
            throw new ConflictException(
                'Este producto ya está asignado a este almacén',
            );
        }
    }

    /**
     * Validar que stock_maximo > stock_minimo
     */
    private validateStocks(stockMinimo: number, stockMaximo: number): void {
        if (stockMaximo <= stockMinimo) {
            throw new BadRequestException(
                'El stock máximo debe ser mayor al stock mínimo',
            );
        }
    }

    /**
     * Validar que el producto existe
     */
    private async validateProductoExists(idProducto: number): Promise<void> {
        const producto = await this.productoRepository.findOne({
            where: { id_producto: idProducto },
        });

        if (!producto) {
            throw new NotFoundException(
                `Producto con ID ${idProducto} no encontrado`,
            );
        }
    }

    /**
     * Validar que el almacén existe
     */
    private async validateAlmacenExists(idAlmacen: string): Promise<void> {
        const almacen = await this.almacenRepository.findOne({
            where: { id_almacen: idAlmacen },
        });

        if (!almacen) {
            throw new NotFoundException(
                `Almacén con ID ${idAlmacen} no encontrado`,
            );
        }
    }
}
