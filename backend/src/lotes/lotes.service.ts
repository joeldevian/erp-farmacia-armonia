import {
    Injectable,
    ConflictException,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Lote, EstadoLote } from './entities/lote.entity';
import { Producto } from '../productos/entities/producto.entity';
import type { CreateLoteDto } from './dto/create-lote.dto';
import type { UpdateLoteDto } from './dto/update-lote.dto';

@Injectable()
export class LotesService {
    constructor(
        @InjectRepository(Lote)
        private readonly loteRepository: Repository<Lote>,
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>,
    ) { }

    /**
     * Listar todos los lotes con actualización de estados
     */
    async findAll(filtros?: {
        id_producto?: number;
        estado?: EstadoLote;
    }): Promise<Lote[]> {
        const where: any = {};

        if (filtros?.id_producto) {
            where.id_producto = filtros.id_producto;
        }

        if (filtros?.estado) {
            where.estado = filtros.estado;
        }

        const lotes = await this.loteRepository.find({
            where,
            relations: ['producto'],
            order: { fecha_vencimiento: 'ASC' },
        });

        // Actualizar estados automáticamente
        for (const lote of lotes) {
            const estadoAnterior = lote.estado;
            lote.actualizarEstado();
            if (estadoAnterior !== lote.estado) {
                await this.loteRepository.save(lote);
            }
        }

        return lotes;
    }

    /**
     * Obtener lote por UUID
     */
    async findOne(id: string): Promise<Lote> {
        const lote = await this.loteRepository.findOne({
            where: { id_lote: id },
            relations: ['producto'],
        });

        if (!lote) {
            throw new NotFoundException(`Lote con ID ${id} no encontrado`);
        }

        // Actualizar estado
        const estadoAnterior = lote.estado;
        lote.actualizarEstado();
        if (estadoAnterior !== lote.estado) {
            await this.loteRepository.save(lote);
        }

        return lote;
    }

    /**
     * Crear lote con validaciones
     */
    async create(createLoteDto: CreateLoteDto): Promise<Lote> {
        // Validar código único
        await this.validateCodigoUnico(createLoteDto.codigo_lote);

        // Validar fechas
        this.validateFechas(
            createLoteDto.fecha_fabricacion,
            createLoteDto.fecha_vencimiento,
        );

        // Validar cantidades
        this.validateCantidades(
            createLoteDto.cantidad_inicial,
            createLoteDto.cantidad_actual,
        );

        // Validar que producto existe
        await this.validateProductoExists(createLoteDto.id_producto);

        // Crear lote
        const lote = this.loteRepository.create(createLoteDto);

        // Calcular estado inicial
        lote.actualizarEstado();

        return await this.loteRepository.save(lote);
    }

    /**
     * Actualizar lote
     */
    async update(id: string, updateLoteDto: UpdateLoteDto): Promise<Lote> {
        const lote = await this.findOne(id);

        // Validar código único si se está actualizando
        if (updateLoteDto.codigo_lote && updateLoteDto.codigo_lote !== lote.codigo_lote) {
            await this.validateCodigoUnico(updateLoteDto.codigo_lote);
        }

        // Validar fechas si se están actualizando
        if (updateLoteDto.fecha_fabricacion || updateLoteDto.fecha_vencimiento) {
            const fechaFab =
                updateLoteDto.fecha_fabricacion || lote.fecha_fabricacion.toISOString().split('T')[0];
            const fechaVenc =
                updateLoteDto.fecha_vencimiento || lote.fecha_vencimiento.toISOString().split('T')[0];
            this.validateFechas(fechaFab, fechaVenc);
        }

        // Validar cantidades si se están actualizando
        if (
            updateLoteDto.cantidad_inicial !== undefined ||
            updateLoteDto.cantidad_actual !== undefined
        ) {
            const cantInicial =
                updateLoteDto.cantidad_inicial ?? lote.cantidad_inicial;
            const cantActual = updateLoteDto.cantidad_actual ?? lote.cantidad_actual;
            this.validateCantidades(cantInicial, cantActual);
        }

        // Validar producto si se está actualizando
        if (updateLoteDto.id_producto) {
            await this.validateProductoExists(updateLoteDto.id_producto);
        }

        // Actualizar
        Object.assign(lote, updateLoteDto);

        // Recalcular estado
        lote.actualizarEstado();

        return await this.loteRepository.save(lote);
    }

    /**
     * Soft delete - marca como agotado y cantidad a 0
     */
    async remove(id: string): Promise<{ message: string; entity: Lote }> {
        const lote = await this.findOne(id);

        // Marcar como agotado y establecer cantidad a 0
        lote.estado = EstadoLote.AGOTADO;
        lote.cantidad_actual = 0;

        await this.loteRepository.save(lote);

        return {
            message: 'Lote desactivado exitosamente',
            entity: lote,
        };
    }

    /**
     * Hard delete
     */
    async hardDelete(id: string): Promise<void> {
        const lote = await this.findOne(id);
        await this.loteRepository.remove(lote);
    }

    /**
     * Obtener lotes próximos a vencer
     */
    async findProximosAVencer(dias: number = 30): Promise<Lote[]> {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const fechaLimite = new Date(hoy);
        fechaLimite.setDate(fechaLimite.getDate() + dias);

        const lotes = await this.loteRepository
            .createQueryBuilder('lote')
            .leftJoinAndSelect('lote.producto', 'producto')
            .where('lote.fecha_vencimiento >= :hoy', { hoy })
            .andWhere('lote.fecha_vencimiento <= :fechaLimite', { fechaLimite })
            .andWhere('lote.cantidad_actual > 0')
            .orderBy('lote.fecha_vencimiento', 'ASC')
            .getMany();

        // Actualizar estados
        for (const lote of lotes) {
            lote.actualizarEstado();
        }

        return lotes;
    }

    /**
     * Validar que el código de lote sea único
     */
    private async validateCodigoUnico(
        codigoLote: string,
        excludeId?: string,
    ): Promise<void> {
        const existing = await this.loteRepository.findOne({
            where: { codigo_lote: codigoLote },
        });

        if (existing && existing.id_lote !== excludeId) {
            throw new ConflictException(
                `Ya existe un lote con el código "${codigoLote}"`,
            );
        }
    }

    /**
     * Validar que fecha de vencimiento > fecha de fabricación
     */
    private validateFechas(
        fechaFabricacion: string,
        fechaVencimiento: string,
    ): void {
        const fechaFab = new Date(fechaFabricacion);
        const fechaVenc = new Date(fechaVencimiento);

        if (fechaVenc <= fechaFab) {
            throw new BadRequestException(
                'La fecha de vencimiento debe ser mayor a la fecha de fabricación',
            );
        }
    }

    /**
     * Validar que cantidad_actual <= cantidad_inicial
     */
    private validateCantidades(
        cantidadInicial: number,
        cantidadActual: number,
    ): void {
        if (cantidadActual > cantidadInicial) {
            throw new BadRequestException(
                'La cantidad actual no puede ser mayor a la cantidad inicial',
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
