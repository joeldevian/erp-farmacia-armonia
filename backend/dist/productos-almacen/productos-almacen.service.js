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
exports.ProductosAlmacenService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const producto_almacen_entity_1 = require("./entities/producto-almacen.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
const almacen_entity_1 = require("../almacenes/entities/almacen.entity");
let ProductosAlmacenService = class ProductosAlmacenService {
    constructor(productoAlmacenRepository, productoRepository, almacenRepository) {
        this.productoAlmacenRepository = productoAlmacenRepository;
        this.productoRepository = productoRepository;
        this.almacenRepository = almacenRepository;
    }
    async findAll() {
        const asignaciones = await this.productoAlmacenRepository.find({
            relations: ['producto', 'almacen'],
            order: { created_at: 'DESC' },
        });
        for (const asignacion of asignaciones) {
            const estadoAnterior = asignacion.estado;
            asignacion.actualizarEstado();
            if (estadoAnterior !== asignacion.estado) {
                await this.productoAlmacenRepository.save(asignacion);
            }
        }
        return asignaciones;
    }
    async findOne(id) {
        const asignacion = await this.productoAlmacenRepository.findOne({
            where: { id_producto_almacen: id },
            relations: ['producto', 'almacen'],
        });
        if (!asignacion) {
            throw new common_1.NotFoundException(`Asignación con ID ${id} no encontrada`);
        }
        const estadoAnterior = asignacion.estado;
        asignacion.actualizarEstado();
        if (estadoAnterior !== asignacion.estado) {
            await this.productoAlmacenRepository.save(asignacion);
        }
        return asignacion;
    }
    async create(createProductoAlmacenDto) {
        await this.validateAsignacionUnica(createProductoAlmacenDto.id_producto, createProductoAlmacenDto.id_almacen);
        this.validateStocks(createProductoAlmacenDto.stock_minimo, createProductoAlmacenDto.stock_maximo);
        await this.validateProductoExists(createProductoAlmacenDto.id_producto);
        await this.validateAlmacenExists(createProductoAlmacenDto.id_almacen);
        const asignacion = this.productoAlmacenRepository.create(createProductoAlmacenDto);
        asignacion.actualizarEstado();
        return await this.productoAlmacenRepository.save(asignacion);
    }
    async update(id, updateProductoAlmacenDto) {
        const asignacion = await this.findOne(id);
        if (updateProductoAlmacenDto.id_producto ||
            updateProductoAlmacenDto.id_almacen) {
            const idProducto = updateProductoAlmacenDto.id_producto ?? asignacion.id_producto;
            const idAlmacen = updateProductoAlmacenDto.id_almacen ?? asignacion.id_almacen;
            if (idProducto !== asignacion.id_producto ||
                idAlmacen !== asignacion.id_almacen) {
                await this.validateAsignacionUnica(idProducto, idAlmacen, id);
            }
        }
        if (updateProductoAlmacenDto.stock_minimo !== undefined ||
            updateProductoAlmacenDto.stock_maximo !== undefined) {
            const stockMin = updateProductoAlmacenDto.stock_minimo ?? asignacion.stock_minimo;
            const stockMax = updateProductoAlmacenDto.stock_maximo ?? asignacion.stock_maximo;
            this.validateStocks(stockMin, stockMax);
        }
        if (updateProductoAlmacenDto.id_producto) {
            await this.validateProductoExists(updateProductoAlmacenDto.id_producto);
        }
        if (updateProductoAlmacenDto.id_almacen) {
            await this.validateAlmacenExists(updateProductoAlmacenDto.id_almacen);
        }
        Object.assign(asignacion, updateProductoAlmacenDto);
        asignacion.actualizarEstado();
        return await this.productoAlmacenRepository.save(asignacion);
    }
    async remove(id) {
        const asignacion = await this.findOne(id);
        await this.productoAlmacenRepository.remove(asignacion);
    }
    async findBajoStock(idAlmacen) {
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
        for (const asignacion of asignaciones) {
            asignacion.actualizarEstado();
        }
        return asignaciones;
    }
    async findPorAlmacen(idAlmacen) {
        const asignaciones = await this.productoAlmacenRepository.find({
            where: { id_almacen: idAlmacen },
            relations: ['producto', 'almacen'],
            order: { created_at: 'DESC' },
        });
        for (const asignacion of asignaciones) {
            const estadoAnterior = asignacion.estado;
            asignacion.actualizarEstado();
            if (estadoAnterior !== asignacion.estado) {
                await this.productoAlmacenRepository.save(asignacion);
            }
        }
        return asignaciones;
    }
    async validateAsignacionUnica(idProducto, idAlmacen, excludeId) {
        const existing = await this.productoAlmacenRepository.findOne({
            where: {
                id_producto: idProducto,
                id_almacen: idAlmacen,
            },
        });
        if (existing && existing.id_producto_almacen !== excludeId) {
            throw new common_1.ConflictException('Este producto ya está asignado a este almacén');
        }
    }
    validateStocks(stockMinimo, stockMaximo) {
        if (stockMaximo <= stockMinimo) {
            throw new common_1.BadRequestException('El stock máximo debe ser mayor al stock mínimo');
        }
    }
    async validateProductoExists(idProducto) {
        const producto = await this.productoRepository.findOne({
            where: { id_producto: idProducto },
        });
        if (!producto) {
            throw new common_1.NotFoundException(`Producto con ID ${idProducto} no encontrado`);
        }
    }
    async validateAlmacenExists(idAlmacen) {
        const almacen = await this.almacenRepository.findOne({
            where: { id_almacen: idAlmacen },
        });
        if (!almacen) {
            throw new common_1.NotFoundException(`Almacén con ID ${idAlmacen} no encontrado`);
        }
    }
};
exports.ProductosAlmacenService = ProductosAlmacenService;
exports.ProductosAlmacenService = ProductosAlmacenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producto_almacen_entity_1.ProductoAlmacen)),
    __param(1, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __param(2, (0, typeorm_1.InjectRepository)(almacen_entity_1.Almacen)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductosAlmacenService);
//# sourceMappingURL=productos-almacen.service.js.map