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
exports.OrdenCompraDetalleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const orden_compra_detalle_entity_1 = require("./entities/orden-compra-detalle.entity");
const orden_compra_entity_1 = require("./entities/orden-compra.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
const orden_compra_service_1 = require("./orden-compra.service");
let OrdenCompraDetalleService = class OrdenCompraDetalleService {
    constructor(detalleRepository, ordenCompraRepository, productoRepository, ordenCompraService) {
        this.detalleRepository = detalleRepository;
        this.ordenCompraRepository = ordenCompraRepository;
        this.productoRepository = productoRepository;
        this.ordenCompraService = ordenCompraService;
    }
    async create(createDetalleDto) {
        const orden = await this.ordenCompraRepository.findOne({
            where: { id_orden_compra: createDetalleDto.id_orden_compra },
        });
        if (!orden) {
            throw new common_1.NotFoundException('Orden de compra no encontrada');
        }
        if (orden.estado === orden_compra_entity_1.EstadoOrdenCompra.APROBADA ||
            orden.estado === orden_compra_entity_1.EstadoOrdenCompra.RECIBIDA) {
            throw new common_1.BadRequestException('No se pueden agregar detalles a una orden aprobada o recibida');
        }
        const producto = await this.productoRepository.findOne({
            where: { id_producto: createDetalleDto.id_producto },
        });
        if (!producto) {
            throw new common_1.NotFoundException('Producto no encontrado');
        }
        if (!producto.estado) {
            throw new common_1.BadRequestException('El producto no está activo');
        }
        const detalleExistente = await this.detalleRepository.findOne({
            where: {
                id_orden_compra: createDetalleDto.id_orden_compra,
                id_producto: createDetalleDto.id_producto,
            },
        });
        if (detalleExistente) {
            throw new common_1.BadRequestException('El producto ya existe en esta orden de compra');
        }
        const subtotal = createDetalleDto.cantidad * createDetalleDto.precio_unitario;
        const detalle = this.detalleRepository.create({
            ...createDetalleDto,
            subtotal,
        });
        const detalleGuardado = await this.detalleRepository.save(detalle);
        await this.ordenCompraService.recalcularTotales(createDetalleDto.id_orden_compra);
        return detalleGuardado;
    }
    async findByOrden(id_orden_compra) {
        return await this.detalleRepository.find({
            where: { id_orden_compra },
            relations: ['producto'],
            order: { created_at: 'ASC' },
        });
    }
    async findOne(id) {
        const detalle = await this.detalleRepository.findOne({
            where: { id_orden_compra_detalle: id },
            relations: ['producto', 'ordenCompra'],
        });
        if (!detalle) {
            throw new common_1.NotFoundException('Detalle de orden no encontrado');
        }
        return detalle;
    }
    async update(id, updateDetalleDto) {
        const detalle = await this.findOne(id);
        if (detalle.ordenCompra.estado === orden_compra_entity_1.EstadoOrdenCompra.APROBADA ||
            detalle.ordenCompra.estado === orden_compra_entity_1.EstadoOrdenCompra.RECIBIDA) {
            throw new common_1.BadRequestException('No se pueden editar detalles de una orden aprobada o recibida');
        }
        if (updateDetalleDto.cantidad !== undefined || updateDetalleDto.precio_unitario !== undefined) {
            const cantidad = updateDetalleDto.cantidad ?? detalle.cantidad;
            const precio = updateDetalleDto.precio_unitario ?? detalle.precio_unitario;
            const subtotal = cantidad * precio;
            Object.assign(updateDetalleDto, { subtotal });
        }
        await this.detalleRepository.update(id, updateDetalleDto);
        await this.ordenCompraService.recalcularTotales(detalle.id_orden_compra);
        return await this.findOne(id);
    }
    async remove(id) {
        const detalle = await this.findOne(id);
        if (detalle.ordenCompra.estado === orden_compra_entity_1.EstadoOrdenCompra.APROBADA ||
            detalle.ordenCompra.estado === orden_compra_entity_1.EstadoOrdenCompra.RECIBIDA) {
            throw new common_1.BadRequestException('No se pueden eliminar detalles de una orden aprobada o recibida');
        }
        await this.detalleRepository.delete(id);
        await this.ordenCompraService.recalcularTotales(detalle.id_orden_compra);
        return { message: 'Detalle eliminado exitosamente' };
    }
};
exports.OrdenCompraDetalleService = OrdenCompraDetalleService;
exports.OrdenCompraDetalleService = OrdenCompraDetalleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orden_compra_detalle_entity_1.OrdenCompraDetalle)),
    __param(1, (0, typeorm_1.InjectRepository)(orden_compra_entity_1.OrdenCompra)),
    __param(2, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        orden_compra_service_1.OrdenCompraService])
], OrdenCompraDetalleService);
//# sourceMappingURL=orden-compra-detalle.service.js.map