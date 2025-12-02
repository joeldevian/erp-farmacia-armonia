import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import type { CreateOrdenCompraDto } from './dto/create-orden-compra.dto';
import type { UpdateOrdenCompraDto } from './dto/update-orden-compra.dto';
import type { CambiarEstadoDto } from './dto/cambiar-estado.dto';
import { OrdenCompra, EstadoOrdenCompra } from './entities/orden-compra.entity';
import { OrdenCompraDetalle } from './entities/orden-compra-detalle.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { Almacen } from '../almacenes/entities/almacen.entity';
import { Stock } from '../stock/entities/stock.entity';
import { ProductoAlmacen } from '../productos-almacen/entities/producto-almacen.entity';
import { Lote, EstadoLote } from '../lotes/entities/lote.entity';
import { Producto } from '../productos/entities/producto.entity';

@Injectable()
export class OrdenCompraService {
    constructor(
        @InjectRepository(OrdenCompra)
        private readonly ordenCompraRepository: Repository<OrdenCompra>,
        @InjectRepository(OrdenCompraDetalle)
        private readonly detalleRepository: Repository<OrdenCompraDetalle>,
        @InjectRepository(Proveedor)
        private readonly proveedorRepository: Repository<Proveedor>,
        @InjectRepository(Almacen)
        private readonly almacenRepository: Repository<Almacen>,
        @InjectRepository(Stock)
        private readonly stockRepository: Repository<Stock>,
        @InjectRepository(ProductoAlmacen)
        private readonly productoAlmacenRepository: Repository<ProductoAlmacen>,
        @InjectRepository(Lote)
        private readonly loteRepository: Repository<Lote>,
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>,
        private readonly dataSource: DataSource,
    ) { }

    async create(createOrdenCompraDto: CreateOrdenCompraDto): Promise<OrdenCompra> {
        // Validar que el proveedor existe y está activo
        const proveedor = await this.proveedorRepository.findOne({
            where: { id_proveedor: createOrdenCompraDto.id_proveedor },
        });

        if (!proveedor) {
            throw new NotFoundException('Proveedor no encontrado');
        }

        if (proveedor.estado !== 'activo') {
            throw new BadRequestException('El proveedor no está activo');
        }

        // Validar que el almacén existe y está activo
        const almacen = await this.almacenRepository.findOne({
            where: { id_almacen: createOrdenCompraDto.id_almacen },
        });

        if (!almacen) {
            throw new NotFoundException('Almacén no encontrado');
        }

        if (almacen.estado !== 'activo') {
            throw new BadRequestException('El almacén no está activo');
        }

        // Generar número de orden
        const numeroOrden = await this.generarNumeroOrden();

        // Calcular total
        const subtotal = createOrdenCompraDto.subtotal || 0;
        const total = subtotal + createOrdenCompraDto.impuestos;

        const ordenCompra = this.ordenCompraRepository.create({
            ...createOrdenCompraDto,
            numero_orden: numeroOrden,
            subtotal,
            total,
            estado: EstadoOrdenCompra.PENDIENTE,
        });

        return await this.ordenCompraRepository.save(ordenCompra);
    }

    async findAll(filters?: {
        estado?: EstadoOrdenCompra;
        id_proveedor?: string;
    }): Promise<OrdenCompra[]> {
        const query = this.ordenCompraRepository
            .createQueryBuilder('orden')
            .leftJoinAndSelect('orden.proveedor', 'proveedor')
            .leftJoinAndSelect('orden.detalles', 'detalles')
            .leftJoinAndSelect('detalles.producto', 'producto')
            .orderBy('orden.created_at', 'DESC');

        if (filters?.estado) {
            query.andWhere('orden.estado = :estado', { estado: filters.estado });
        }

        if (filters?.id_proveedor) {
            query.andWhere('orden.id_proveedor = :id_proveedor', {
                id_proveedor: filters.id_proveedor,
            });
        }

        return await query.getMany();
    }

    async findOne(id: string): Promise<OrdenCompra> {
        const orden = await this.ordenCompraRepository.findOne({
            where: { id_orden_compra: id },
            relations: ['proveedor', 'detalles', 'detalles.producto'],
        });

        if (!orden) {
            throw new NotFoundException('Orden de compra no encontrada');
        }

        return orden;
    }

    async findPendientes(): Promise<OrdenCompra[]> {
        return await this.findAll({ estado: EstadoOrdenCompra.PENDIENTE });
    }

    async findByProveedor(id_proveedor: string): Promise<OrdenCompra[]> {
        return await this.findAll({ id_proveedor });
    }

    async update(
        id: string,
        updateOrdenCompraDto: UpdateOrdenCompraDto,
    ): Promise<OrdenCompra> {
        const orden = await this.findOne(id);

        // No permitir editar órdenes aprobadas o recibidas
        if (
            orden.estado === EstadoOrdenCompra.APROBADA ||
            orden.estado === EstadoOrdenCompra.RECIBIDA
        ) {
            throw new BadRequestException(
                'No se puede editar una orden aprobada o recibida',
            );
        }

        // Recalcular total si se modifican subtotal o impuestos
        if (updateOrdenCompraDto.subtotal !== undefined || updateOrdenCompraDto.impuestos !== undefined) {
            const subtotal = updateOrdenCompraDto.subtotal ?? orden.subtotal;
            const impuestos = updateOrdenCompraDto.impuestos ?? orden.impuestos;
            updateOrdenCompraDto.total = subtotal + impuestos;
        }

        await this.ordenCompraRepository.update(id, updateOrdenCompraDto);
        return await this.findOne(id);
    }

    async cambiarEstado(
        id: string,
        cambiarEstadoDto: CambiarEstadoDto,
    ): Promise<OrdenCompra> {
        const orden = await this.findOne(id);
        const estadoActual = orden.estado;
        const nuevoEstado = cambiarEstadoDto.estado;

        // Validar transiciones de estado
        this.validarTransicionEstado(estadoActual, nuevoEstado);

        // Si se aprueba, validar que tenga detalles
        if (nuevoEstado === EstadoOrdenCompra.APROBADA) {
            if (!orden.detalles || orden.detalles.length === 0) {
                throw new BadRequestException(
                    'No se puede aprobar una orden sin detalles',
                );
            }
        }

        // Si se recibe, ejecutar lógica de recepción
        if (nuevoEstado === EstadoOrdenCompra.RECIBIDA) {
            await this.recibirOrden(orden);
        }

        await this.ordenCompraRepository.update(id, { estado: nuevoEstado });
        return await this.findOne(id);
    }

    async remove(id: string): Promise<{ message: string }> {
        const orden = await this.findOne(id);

        // No permitir eliminar órdenes recibidas
        if (orden.estado === EstadoOrdenCompra.RECIBIDA) {
            throw new BadRequestException(
                'No se puede eliminar una orden recibida',
            );
        }

        // Anulación lógica
        await this.ordenCompraRepository.update(id, {
            estado: EstadoOrdenCompra.ANULADA,
        });

        return { message: 'Orden de compra anulada exitosamente' };
    }

    async recalcularTotales(id: string): Promise<OrdenCompra> {
        const orden = await this.findOne(id);

        // Calcular subtotal sumando los detalles
        const subtotal = orden.detalles.reduce(
            (sum, detalle) => sum + Number(detalle.subtotal),
            0,
        );

        const total = subtotal + Number(orden.impuestos);

        await this.ordenCompraRepository.update(id, { subtotal, total });
        return await this.findOne(id);
    }

    private async generarNumeroOrden(): Promise<string> {
        const year = new Date().getFullYear();
        const count = await this.ordenCompraRepository.count({
            where: {
                numero_orden: Like(`OC-${year}-%`),
            },
        });

        return `OC-${year}-${String(count + 1).padStart(4, '0')}`;
    }

    private validarTransicionEstado(
        estadoActual: EstadoOrdenCompra,
        nuevoEstado: EstadoOrdenCompra,
    ): void {
        const transicionesPermitidas: Record<EstadoOrdenCompra, EstadoOrdenCompra[]> = {
            [EstadoOrdenCompra.PENDIENTE]: [
                EstadoOrdenCompra.APROBADA,
                EstadoOrdenCompra.RECHAZADA,
                EstadoOrdenCompra.ANULADA,
            ],
            [EstadoOrdenCompra.APROBADA]: [
                EstadoOrdenCompra.RECIBIDA,
                EstadoOrdenCompra.ANULADA,
            ],
            [EstadoOrdenCompra.RECHAZADA]: [],
            [EstadoOrdenCompra.RECIBIDA]: [],
            [EstadoOrdenCompra.ANULADA]: [],
        };

        if (!transicionesPermitidas[estadoActual].includes(nuevoEstado)) {
            throw new BadRequestException(
                `No se puede cambiar de estado ${estadoActual} a ${nuevoEstado}`,
            );
        }
    }

    private async recibirOrden(orden: OrdenCompra): Promise<void> {
        // Validar que esté aprobada
        if (orden.estado !== EstadoOrdenCompra.APROBADA) {
            throw new BadRequestException(
                'Solo se pueden recibir órdenes aprobadas',
            );
        }

        // Validar que tenga detalles
        if (!orden.detalles || orden.detalles.length === 0) {
            throw new BadRequestException(
                'La orden no tiene productos para recepcionar',
            );
        }

        // Usar transacción para garantizar atomicidad
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Procesar cada detalle de la orden
            for (const detalle of orden.detalles) {
                const cantidad = detalle.cantidad;
                const idProducto = detalle.id_producto;
                const idAlmacen = orden.id_almacen;

                // 1. Actualizar Stock General
                let stock = await queryRunner.manager.findOne(Stock, {
                    where: { id_producto: idProducto },
                    relations: ['producto'],
                });

                if (!stock) {
                    // Crear stock si no existe
                    const producto = await queryRunner.manager.findOne(Producto, {
                        where: { id_producto: idProducto },
                    });

                    if (!producto) {
                        throw new NotFoundException(
                            `Producto ${idProducto} no encontrado`,
                        );
                    }

                    stock = queryRunner.manager.create(Stock, {
                        id_producto: idProducto,
                        cantidad_total: 0,
                        cantidad_disponible: 0,
                        cantidad_reservada: 0,
                        producto: producto,
                    });
                }

                // Incrementar stock
                stock.cantidad_total += cantidad;
                stock.recalcular();
                await queryRunner.manager.save(Stock, stock);

                // 2. Actualizar Stock por Almacén (ProductoAlmacen)
                let productoAlmacen = await queryRunner.manager.findOne(
                    ProductoAlmacen,
                    {
                        where: {
                            id_producto: idProducto,
                            id_almacen: idAlmacen,
                        },
                        relations: ['producto'],
                    },
                );

                if (!productoAlmacen) {
                    // Crear ProductoAlmacen si no existe
                    const producto = await queryRunner.manager.findOne(Producto, {
                        where: { id_producto: idProducto },
                    });

                    productoAlmacen = queryRunner.manager.create(ProductoAlmacen, {
                        stock: 0,
                        stock_minimo: producto?.stock_minimo || 10,
                        stock_maximo: producto?.stock_maximo || 1000,
                    });
                    productoAlmacen.id_producto = idProducto;
                    productoAlmacen.id_almacen = idAlmacen;
                }

                // Incrementar stock en almacén
                productoAlmacen.stock += cantidad;
                productoAlmacen.actualizarEstado();
                await queryRunner.manager.save(ProductoAlmacen, productoAlmacen);

                // 3. Crear Lote
                const codigoLote = await this.generarCodigoLote(queryRunner);
                const fechaActual = new Date();
                const fechaVencimiento = new Date();
                fechaVencimiento.setFullYear(fechaActual.getFullYear() + 2); // 2 años de vencimiento

                const lote = queryRunner.manager.create(Lote, {
                    codigo_lote: codigoLote,
                    fecha_fabricacion: fechaActual,
                    fecha_vencimiento: fechaVencimiento,
                    cantidad_inicial: cantidad,
                    cantidad_actual: cantidad,
                    estado: EstadoLote.ACTIVO,
                });
                lote.id_producto = idProducto;

                await queryRunner.manager.save(Lote, lote);
            }

            // Confirmar transacción
            await queryRunner.commitTransaction();
        } catch (error) {
            // Revertir transacción en caso de error
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            // Liberar conexión
            await queryRunner.release();
        }
    }

    /**
     * Genera un código único para el lote
     */
    private async generarCodigoLote(queryRunner: any): Promise<string> {
        const year = new Date().getFullYear();
        const count = await queryRunner.manager.count(Lote, {
            where: {
                codigo_lote: Like(`LOTE-${year}-%`),
            },
        });

        return `LOTE-${year}-${String(count + 1).padStart(4, '0')}`;
    }
}

function Like(arg0: string): import("typeorm").FindOperator<string> {
    const { Like: TypeORMLike } = require('typeorm');
    return TypeORMLike(arg0);
}
