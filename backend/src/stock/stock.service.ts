import {
    Injectable,
    ConflictException,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock, EstadoStock } from './entities/stock.entity';
import { Producto } from '../productos/entities/producto.entity';
import type { CreateStockDto } from './dto/create-stock.dto';
import type { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
    constructor(
        @InjectRepository(Stock)
        private readonly stockRepository: Repository<Stock>,
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>,
    ) { }

    /**
     * Listar todos los stocks con filtros
     */
    async findAll(filtros?: { estado?: EstadoStock }): Promise<Stock[]> {
        const where: any = {};

        if (filtros?.estado) {
            where.estado = filtros.estado;
        }

        const stocks = await this.stockRepository.find({
            where,
            relations: ['producto'],
            order: { created_at: 'DESC' },
        });

        // Actualizar estados automáticamente
        for (const stock of stocks) {
            const estadoAnterior = stock.estado;
            stock.recalcular();
            if (estadoAnterior !== stock.estado) {
                await this.stockRepository.save(stock);
            }
        }

        return stocks;
    }

    /**
     * Obtener stock por UUID
     */
    async findOne(id: string): Promise<Stock> {
        const stock = await this.stockRepository.findOne({
            where: { id_stock: id },
            relations: ['producto'],
        });

        if (!stock) {
            throw new NotFoundException(`Stock con ID ${id} no encontrado`);
        }

        // Actualizar estado
        const estadoAnterior = stock.estado;
        stock.recalcular();
        if (estadoAnterior !== stock.estado) {
            await this.stockRepository.save(stock);
        }

        return stock;
    }

    /**
     * Crear stock con validaciones
     */
    async create(createStockDto: CreateStockDto): Promise<Stock> {
        // Validar que el producto existe
        await this.validateProductoExists(createStockDto.id_producto);

        // Validar que el producto no tenga stock ya
        await this.validateProductoUnico(createStockDto.id_producto);

        // Validar cantidades
        this.validateCantidadReservada(
            createStockDto.cantidad_total,
            createStockDto.cantidad_reservada,
        );

        // Crear stock
        const stock = this.stockRepository.create(createStockDto);

        // Recalcular cantidad_disponible y estado
        stock.recalcular();

        return await this.stockRepository.save(stock);
    }

    /**
     * Actualizar stock
     */
    async update(id: string, updateStockDto: UpdateStockDto): Promise<Stock> {
        const stock = await this.findOne(id);

        // Validar producto si se está actualizando
        if (updateStockDto.id_producto) {
            await this.validateProductoExists(updateStockDto.id_producto);

            // Validar que el nuevo producto no tenga stock
            if (updateStockDto.id_producto !== stock.id_producto) {
                await this.validateProductoUnico(updateStockDto.id_producto, id);
            }
        }

        // Validar cantidades si se están actualizando
        if (
            updateStockDto.cantidad_total !== undefined ||
            updateStockDto.cantidad_reservada !== undefined
        ) {
            const cantTotal =
                updateStockDto.cantidad_total ?? stock.cantidad_total;
            const cantReservada =
                updateStockDto.cantidad_reservada ?? stock.cantidad_reservada;
            this.validateCantidadReservada(cantTotal, cantReservada);
        }

        // Actualizar
        Object.assign(stock, updateStockDto);

        // Recalcular
        stock.recalcular();

        return await this.stockRepository.save(stock);
    }

    /**
     * Soft delete
     */
    async remove(id: string): Promise<void> {
        const stock = await this.findOne(id);
        await this.stockRepository.remove(stock);
    }

    /**
     * Hard delete
     */
    async hardDelete(id: string): Promise<void> {
        const stock = await this.findOne(id);
        await this.stockRepository.remove(stock);
    }

    /**
     * Obtener productos con bajo stock
     */
    async findBajoStock(): Promise<Stock[]> {
        const stocks = await this.stockRepository.find({
            relations: ['producto'],
            order: { cantidad_disponible: 'ASC' },
        });

        // Filtrar y actualizar estados
        const stocksBajos: Stock[] = [];
        for (const stock of stocks) {
            stock.recalcular();
            if (stock.estado === EstadoStock.BAJO_STOCK) {
                stocksBajos.push(stock);
                await this.stockRepository.save(stock);
            }
        }

        return stocksBajos;
    }

    /**
     * Obtener productos sin stock
     */
    async findSinStock(): Promise<Stock[]> {
        const stocks = await this.stockRepository.find({
            relations: ['producto'],
            order: { updated_at: 'DESC' },
        });

        // Filtrar y actualizar estados
        const stocksSin: Stock[] = [];
        for (const stock of stocks) {
            stock.recalcular();
            if (stock.estado === EstadoStock.SIN_STOCK) {
                stocksSin.push(stock);
                await this.stockRepository.save(stock);
            }
        }

        return stocksSin;
    }

    /**
     * Validar que el producto no tenga stock ya
     */
    private async validateProductoUnico(
        idProducto: number,
        excludeId?: string,
    ): Promise<void> {
        const existing = await this.stockRepository.findOne({
            where: { id_producto: idProducto },
        });

        if (existing && existing.id_stock !== excludeId) {
            throw new ConflictException(
                `El producto con ID ${idProducto} ya tiene un stock asignado`,
            );
        }
    }

    /**
     * Validar que cantidad_reservada <= cantidad_total
     */
    private validateCantidadReservada(
        cantidadTotal: number,
        cantidadReservada: number,
    ): void {
        if (cantidadReservada > cantidadTotal) {
            throw new BadRequestException(
                'La cantidad reservada no puede ser mayor a la cantidad total',
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
}
