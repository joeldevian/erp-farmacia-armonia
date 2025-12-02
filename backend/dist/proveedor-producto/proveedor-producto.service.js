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
exports.ProveedorProductoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const proveedor_producto_entity_1 = require("./entities/proveedor-producto.entity");
const proveedor_entity_1 = require("../proveedores/entities/proveedor.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
let ProveedorProductoService = class ProveedorProductoService {
    constructor(proveedorProductoRepository, proveedorRepository, productoRepository) {
        this.proveedorProductoRepository = proveedorProductoRepository;
        this.proveedorRepository = proveedorRepository;
        this.productoRepository = productoRepository;
    }
    async findAll(filtros) {
        const where = {};
        if (filtros?.id_proveedor) {
            where.id_proveedor = filtros.id_proveedor;
        }
        if (filtros?.id_producto) {
            where.id_producto = filtros.id_producto;
        }
        if (filtros?.estado) {
            where.estado = filtros.estado;
        }
        return await this.proveedorProductoRepository.find({
            where,
            order: { created_at: 'DESC' },
        });
    }
    async findOne(id) {
        const relacion = await this.proveedorProductoRepository.findOne({
            where: { id_proveedor_producto: id },
        });
        if (!relacion) {
            throw new common_1.NotFoundException(`Relación proveedor-producto con ID ${id} no encontrada`);
        }
        return relacion;
    }
    async create(createDto) {
        await this.validateProveedorExists(createDto.id_proveedor);
        await this.validateProductoExists(createDto.id_producto);
        await this.validateRelacionNoExiste(createDto.id_proveedor, createDto.id_producto);
        const relacion = this.proveedorProductoRepository.create(createDto);
        return await this.proveedorProductoRepository.save(relacion);
    }
    async update(id, updateDto) {
        const relacion = await this.findOne(id);
        Object.assign(relacion, updateDto);
        return await this.proveedorProductoRepository.save(relacion);
    }
    async remove(id) {
        const relacion = await this.findOne(id);
        await this.proveedorProductoRepository.remove(relacion);
        return {
            message: 'Relación proveedor-producto eliminada exitosamente',
        };
    }
    async findByProducto(id_producto) {
        await this.validateProductoExists(id_producto);
        return await this.proveedorProductoRepository.find({
            where: {
                id_producto,
                estado: proveedor_producto_entity_1.EstadoProveedorProducto.ACTIVO,
            },
            order: { precio_referencia: 'ASC' },
        });
    }
    async findMejorProveedor(id_producto) {
        const proveedores = await this.findByProducto(id_producto);
        if (proveedores.length === 0) {
            return null;
        }
        const calidadScore = {
            [proveedor_producto_entity_1.CalidadProveedor.ALTA]: 3,
            [proveedor_producto_entity_1.CalidadProveedor.MEDIA]: 2,
            [proveedor_producto_entity_1.CalidadProveedor.BAJA]: 1,
        };
        const sorted = proveedores.sort((a, b) => {
            const calidadDiff = calidadScore[b.calidad] - calidadScore[a.calidad];
            if (calidadDiff !== 0)
                return calidadDiff;
            const precioDiff = Number(a.precio_referencia) - Number(b.precio_referencia);
            if (precioDiff !== 0)
                return precioDiff;
            const tiempoA = a.tiempo_entrega_dias || 999;
            const tiempoB = b.tiempo_entrega_dias || 999;
            return tiempoA - tiempoB;
        });
        return sorted[0];
    }
    async validateProveedorExists(id_proveedor) {
        const proveedor = await this.proveedorRepository.findOne({
            where: { id_proveedor },
        });
        if (!proveedor) {
            throw new common_1.NotFoundException(`Proveedor con ID ${id_proveedor} no encontrado`);
        }
    }
    async validateProductoExists(id_producto) {
        const producto = await this.productoRepository.findOne({
            where: { id_producto },
        });
        if (!producto) {
            throw new common_1.NotFoundException(`Producto con ID ${id_producto} no encontrado`);
        }
    }
    async validateRelacionNoExiste(id_proveedor, id_producto) {
        const existing = await this.proveedorProductoRepository.findOne({
            where: { id_proveedor, id_producto },
        });
        if (existing) {
            throw new common_1.ConflictException('Ya existe una relación entre este proveedor y producto');
        }
    }
};
exports.ProveedorProductoService = ProveedorProductoService;
exports.ProveedorProductoService = ProveedorProductoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(proveedor_producto_entity_1.ProveedorProducto)),
    __param(1, (0, typeorm_1.InjectRepository)(proveedor_entity_1.Proveedor)),
    __param(2, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProveedorProductoService);
//# sourceMappingURL=proveedor-producto.service.js.map