"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenCompraService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const orden_compra_entity_1 = require("./entities/orden-compra.entity");
const orden_compra_detalle_entity_1 = require("./entities/orden-compra-detalle.entity");
const proveedor_entity_1 = require("../proveedores/entities/proveedor.entity");
const almacen_entity_1 = require("../almacenes/entities/almacen.entity");
const stock_entity_1 = require("../stock/entities/stock.entity");
const producto_almacen_entity_1 = require("../productos-almacen/entities/producto-almacen.entity");
const lote_entity_1 = require("../lotes/entities/lote.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
let OrdenCompraService = class OrdenCompraService {
    constructor(ordenCompraRepository, detalleRepository, proveedorRepository, almacenRepository, stockRepository, productoAlmacenRepository, loteRepository, productoRepository, dataSource) {
        this.ordenCompraRepository = ordenCompraRepository;
        this.detalleRepository = detalleRepository;
        this.proveedorRepository = proveedorRepository;
        this.almacenRepository = almacenRepository;
        this.stockRepository = stockRepository;
        this.productoAlmacenRepository = productoAlmacenRepository;
        this.loteRepository = loteRepository;
        this.productoRepository = productoRepository;
        this.dataSource = dataSource;
    }
    async create(createOrdenCompraDto) {
        const proveedor = await this.proveedorRepository.findOne({
            where: { id_proveedor: createOrdenCompraDto.id_proveedor },
        });
        if (!proveedor) {
            throw new common_1.NotFoundException('Proveedor no encontrado');
        }
        if (proveedor.estado !== 'activo') {
            throw new common_1.BadRequestException('El proveedor no está activo');
        }
        const almacen = await this.almacenRepository.findOne({
            where: { id_almacen: createOrdenCompraDto.id_almacen },
        });
        if (!almacen) {
            throw new common_1.NotFoundException('Almacén no encontrado');
        }
        if (almacen.estado !== 'activo') {
            throw new common_1.BadRequestException('El almacén no está activo');
        }
        const numeroOrden = await this.generarNumeroOrden();
        const subtotal = createOrdenCompraDto.subtotal || 0;
        const total = subtotal + createOrdenCompraDto.impuestos;
        const ordenCompra = this.ordenCompraRepository.create({
            ...createOrdenCompraDto,
            numero_orden: numeroOrden,
            subtotal,
            total,
            estado: orden_compra_entity_1.EstadoOrdenCompra.PENDIENTE,
        });
        return await this.ordenCompraRepository.save(ordenCompra);
    }
    async findAll(filters) {
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
    async findOne(id) {
        const orden = await this.ordenCompraRepository.findOne({
            where: { id_orden_compra: id },
            relations: ['proveedor', 'detalles', 'detalles.producto'],
        });
        if (!orden) {
            throw new common_1.NotFoundException('Orden de compra no encontrada');
        }
        return orden;
    }
    async findPendientes() {
        return await this.findAll({ estado: orden_compra_entity_1.EstadoOrdenCompra.PENDIENTE });
    }
    async findByProveedor(id_proveedor) {
        return await this.findAll({ id_proveedor });
    }
    async update(id, updateOrdenCompraDto) {
        const orden = await this.findOne(id);
        if (orden.estado === orden_compra_entity_1.EstadoOrdenCompra.APROBADA ||
            orden.estado === orden_compra_entity_1.EstadoOrdenCompra.RECIBIDA) {
            throw new common_1.BadRequestException('No se puede editar una orden aprobada o recibida');
        }
        if (updateOrdenCompraDto.subtotal !== undefined || updateOrdenCompraDto.impuestos !== undefined) {
            const subtotal = updateOrdenCompraDto.subtotal ?? orden.subtotal;
            const impuestos = updateOrdenCompraDto.impuestos ?? orden.impuestos;
            updateOrdenCompraDto.total = subtotal + impuestos;
        }
        await this.ordenCompraRepository.update(id, updateOrdenCompraDto);
        return await this.findOne(id);
    }
    async cambiarEstado(id, cambiarEstadoDto) {
        const orden = await this.findOne(id);
        const estadoActual = orden.estado;
        const nuevoEstado = cambiarEstadoDto.estado;
        this.validarTransicionEstado(estadoActual, nuevoEstado);
        if (nuevoEstado === orden_compra_entity_1.EstadoOrdenCompra.APROBADA) {
            if (!orden.detalles || orden.detalles.length === 0) {
                throw new common_1.BadRequestException('No se puede aprobar una orden sin detalles');
            }
        }
        if (nuevoEstado === orden_compra_entity_1.EstadoOrdenCompra.RECIBIDA) {
            await this.recibirOrden(orden);
        }
        await this.ordenCompraRepository.update(id, { estado: nuevoEstado });
        return await this.findOne(id);
    }
    async remove(id) {
        const orden = await this.findOne(id);
        if (orden.estado === orden_compra_entity_1.EstadoOrdenCompra.RECIBIDA) {
            throw new common_1.BadRequestException('No se puede eliminar una orden recibida');
        }
        await this.ordenCompraRepository.update(id, {
            estado: orden_compra_entity_1.EstadoOrdenCompra.ANULADA,
        });
        return { message: 'Orden de compra anulada exitosamente' };
    }
    async recalcularTotales(id) {
        const orden = await this.findOne(id);
        const subtotal = orden.detalles.reduce((sum, detalle) => sum + Number(detalle.subtotal), 0);
        const total = subtotal + Number(orden.impuestos);
        await this.ordenCompraRepository.update(id, { subtotal, total });
        return await this.findOne(id);
    }
    async generarNumeroOrden() {
        const year = new Date().getFullYear();
        const count = await this.ordenCompraRepository.count({
            where: {
                numero_orden: Like(`OC-${year}-%`),
            },
        });
        return `OC-${year}-${String(count + 1).padStart(4, '0')}`;
    }
    validarTransicionEstado(estadoActual, nuevoEstado) {
        const transicionesPermitidas = {
            [orden_compra_entity_1.EstadoOrdenCompra.PENDIENTE]: [
                orden_compra_entity_1.EstadoOrdenCompra.APROBADA,
                orden_compra_entity_1.EstadoOrdenCompra.RECHAZADA,
                orden_compra_entity_1.EstadoOrdenCompra.ANULADA,
            ],
            [orden_compra_entity_1.EstadoOrdenCompra.APROBADA]: [
                orden_compra_entity_1.EstadoOrdenCompra.RECIBIDA,
                orden_compra_entity_1.EstadoOrdenCompra.ANULADA,
            ],
            [orden_compra_entity_1.EstadoOrdenCompra.RECHAZADA]: [],
            [orden_compra_entity_1.EstadoOrdenCompra.RECIBIDA]: [],
            [orden_compra_entity_1.EstadoOrdenCompra.ANULADA]: [],
        };
        if (!transicionesPermitidas[estadoActual].includes(nuevoEstado)) {
            throw new common_1.BadRequestException(`No se puede cambiar de estado ${estadoActual} a ${nuevoEstado}`);
        }
    }
    async recibirOrden(orden) {
        if (orden.estado !== orden_compra_entity_1.EstadoOrdenCompra.APROBADA) {
            throw new common_1.BadRequestException('Solo se pueden recibir órdenes aprobadas');
        }
        if (!orden.detalles || orden.detalles.length === 0) {
            throw new common_1.BadRequestException('La orden no tiene productos para recepcionar');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            for (const detalle of orden.detalles) {
                const cantidad = detalle.cantidad;
                const idProducto = detalle.id_producto;
                const idAlmacen = orden.id_almacen;
                let stock = await queryRunner.manager.findOne(stock_entity_1.Stock, {
                    where: { id_producto: idProducto },
                    relations: ['producto'],
                });
                if (!stock) {
                    const producto = await queryRunner.manager.findOne(producto_entity_1.Producto, {
                        where: { id_producto: idProducto },
                    });
                    if (!producto) {
                        throw new common_1.NotFoundException(`Producto ${idProducto} no encontrado`);
                    }
                    stock = queryRunner.manager.create(stock_entity_1.Stock, {
                        id_producto: idProducto,
                        cantidad_total: 0,
                        cantidad_disponible: 0,
                        cantidad_reservada: 0,
                        producto: producto,
                    });
                }
                stock.cantidad_total += cantidad;
                stock.recalcular();
                await queryRunner.manager.save(stock_entity_1.Stock, stock);
                let productoAlmacen = await queryRunner.manager.findOne(producto_almacen_entity_1.ProductoAlmacen, {
                    where: {
                        id_producto: idProducto,
                        id_almacen: idAlmacen,
                    },
                    relations: ['producto'],
                });
                if (!productoAlmacen) {
                    const producto = await queryRunner.manager.findOne(producto_entity_1.Producto, {
                        where: { id_producto: idProducto },
                    });
                    productoAlmacen = queryRunner.manager.create(producto_almacen_entity_1.ProductoAlmacen, {
                        stock: 0,
                        stock_minimo: producto?.stock_minimo || 10,
                        stock_maximo: producto?.stock_maximo || 1000,
                    });
                    productoAlmacen.id_producto = idProducto;
                    productoAlmacen.id_almacen = idAlmacen;
                }
                productoAlmacen.stock += cantidad;
                productoAlmacen.actualizarEstado();
                await queryRunner.manager.save(producto_almacen_entity_1.ProductoAlmacen, productoAlmacen);
                const codigoLote = await this.generarCodigoLote(queryRunner);
                const fechaActual = new Date();
                const fechaVencimiento = new Date();
                fechaVencimiento.setFullYear(fechaActual.getFullYear() + 2);
                const lote = queryRunner.manager.create(lote_entity_1.Lote, {
                    codigo_lote: codigoLote,
                    fecha_fabricacion: fechaActual,
                    fecha_vencimiento: fechaVencimiento,
                    cantidad_inicial: cantidad,
                    cantidad_actual: cantidad,
                    estado: lote_entity_1.EstadoLote.ACTIVO,
                });
                lote.id_producto = idProducto;
                await queryRunner.manager.save(lote_entity_1.Lote, lote);
            }
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async generarCodigoLote(queryRunner) {
        const year = new Date().getFullYear();
        const count = await queryRunner.manager.count(lote_entity_1.Lote, {
            where: {
                codigo_lote: Like(`LOTE-${year}-%`),
            },
        });
        return `LOTE-${year}-${String(count + 1).padStart(4, '0')}`;
    }
};
exports.OrdenCompraService = OrdenCompraService;
exports.OrdenCompraService = OrdenCompraService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orden_compra_entity_1.OrdenCompra)),
    __param(1, (0, typeorm_1.InjectRepository)(orden_compra_detalle_entity_1.OrdenCompraDetalle)),
    __param(2, (0, typeorm_1.InjectRepository)(proveedor_entity_1.Proveedor)),
    __param(3, (0, typeorm_1.InjectRepository)(almacen_entity_1.Almacen)),
    __param(4, (0, typeorm_1.InjectRepository)(stock_entity_1.Stock)),
    __param(5, (0, typeorm_1.InjectRepository)(producto_almacen_entity_1.ProductoAlmacen)),
    __param(6, (0, typeorm_1.InjectRepository)(lote_entity_1.Lote)),
    __param(7, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], OrdenCompraService);
function Like(arg0) {
    const { Like: TypeORMLike } = require('typeorm');
    return TypeORMLike(arg0);
}
//# sourceMappingURL=orden-compra.service.js.map