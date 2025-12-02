import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { CreateOrdenCompraDetalleDto } from './dto/create-orden-compra-detalle.dto';
import type { UpdateOrdenCompraDetalleDto } from './dto/update-orden-compra-detalle.dto';
import { OrdenCompraDetalle } from './entities/orden-compra-detalle.entity';
import { OrdenCompra, EstadoOrdenCompra } from './entities/orden-compra.entity';
import { Producto } from '../productos/entities/producto.entity';
import { OrdenCompraService } from './orden-compra.service';

@Injectable()
export class OrdenCompraDetalleService {
    constructor(
        @InjectRepository(OrdenCompraDetalle)
        private readonly detalleRepository: Repository<OrdenCompraDetalle>,
        @InjectRepository(OrdenCompra)
        private readonly ordenCompraRepository: Repository<OrdenCompra>,
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>,
        private readonly ordenCompraService: OrdenCompraService,
    ) { }

    async create(
        createDetalleDto: CreateOrdenCompraDetalleDto,
    ): Promise<OrdenCompraDetalle> {
        // Validar que la orden existe
        const orden = await this.ordenCompraRepository.findOne({
            where: { id_orden_compra: createDetalleDto.id_orden_compra },
        });

        if (!orden) {
            throw new NotFoundException('Orden de compra no encontrada');
        }

        // No permitir agregar detalles a órdenes aprobadas o recibidas
        if (
            orden.estado === EstadoOrdenCompra.APROBADA ||
            orden.estado === EstadoOrdenCompra.RECIBIDA
        ) {
            throw new BadRequestException(
                'No se pueden agregar detalles a una orden aprobada o recibida',
            );
        }

        // Validar que el producto existe y está activo
        const producto = await this.productoRepository.findOne({
            where: { id_producto: createDetalleDto.id_producto },
        });

        if (!producto) {
            throw new NotFoundException('Producto no encontrado');
        }

        if (!producto.estado) {
            throw new BadRequestException('El producto no está activo');
        }

        // Verificar que no exista ya este producto en la orden
        const detalleExistente = await this.detalleRepository.findOne({
            where: {
                id_orden_compra: createDetalleDto.id_orden_compra,
                id_producto: createDetalleDto.id_producto,
            },
        });

        if (detalleExistente) {
            throw new BadRequestException(
                'El producto ya existe en esta orden de compra',
            );
        }

        // Calcular subtotal
        const subtotal = createDetalleDto.cantidad * createDetalleDto.precio_unitario;

        const detalle = this.detalleRepository.create({
            ...createDetalleDto,
            subtotal,
        });

        const detalleGuardado = await this.detalleRepository.save(detalle);

        // Recalcular totales de la orden
        await this.ordenCompraService.recalcularTotales(createDetalleDto.id_orden_compra);

        return detalleGuardado;
    }

    async findByOrden(id_orden_compra: string): Promise<OrdenCompraDetalle[]> {
        return await this.detalleRepository.find({
            where: { id_orden_compra },
            relations: ['producto'],
            order: { created_at: 'ASC' },
        });
    }

    async findOne(id: string): Promise<OrdenCompraDetalle> {
        const detalle = await this.detalleRepository.findOne({
            where: { id_orden_compra_detalle: id },
            relations: ['producto', 'ordenCompra'],
        });

        if (!detalle) {
            throw new NotFoundException('Detalle de orden no encontrado');
        }

        return detalle;
    }

    async update(
        id: string,
        updateDetalleDto: UpdateOrdenCompraDetalleDto,
    ): Promise<OrdenCompraDetalle> {
        const detalle = await this.findOne(id);

        // No permitir editar detalles de órdenes aprobadas o recibidas
        if (
            detalle.ordenCompra.estado === EstadoOrdenCompra.APROBADA ||
            detalle.ordenCompra.estado === EstadoOrdenCompra.RECIBIDA
        ) {
            throw new BadRequestException(
                'No se pueden editar detalles de una orden aprobada o recibida',
            );
        }

        // Recalcular subtotal si cambia cantidad o precio
        if (updateDetalleDto.cantidad !== undefined || updateDetalleDto.precio_unitario !== undefined) {
            const cantidad = updateDetalleDto.cantidad ?? detalle.cantidad;
            const precio = updateDetalleDto.precio_unitario ?? detalle.precio_unitario;
            const subtotal = cantidad * precio;
            Object.assign(updateDetalleDto, { subtotal });
        }

        await this.detalleRepository.update(id, updateDetalleDto);

        // Recalcular totales de la orden
        await this.ordenCompraService.recalcularTotales(detalle.id_orden_compra);

        return await this.findOne(id);
    }

    async remove(id: string): Promise<{ message: string }> {
        const detalle = await this.findOne(id);

        // No permitir eliminar detalles de órdenes aprobadas o recibidas
        if (
            detalle.ordenCompra.estado === EstadoOrdenCompra.APROBADA ||
            detalle.ordenCompra.estado === EstadoOrdenCompra.RECIBIDA
        ) {
            throw new BadRequestException(
                'No se pueden eliminar detalles de una orden aprobada o recibida',
            );
        }

        await this.detalleRepository.delete(id);

        // Recalcular totales de la orden
        await this.ordenCompraService.recalcularTotales(detalle.id_orden_compra);

        return { message: 'Detalle eliminado exitosamente' };
    }
}
