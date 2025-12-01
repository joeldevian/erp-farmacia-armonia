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
exports.LotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lote_entity_1 = require("./entities/lote.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
let LotesService = class LotesService {
    constructor(loteRepository, productoRepository) {
        this.loteRepository = loteRepository;
        this.productoRepository = productoRepository;
    }
    async findAll(filtros) {
        const where = {};
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
        for (const lote of lotes) {
            const estadoAnterior = lote.estado;
            lote.actualizarEstado();
            if (estadoAnterior !== lote.estado) {
                await this.loteRepository.save(lote);
            }
        }
        return lotes;
    }
    async findOne(id) {
        const lote = await this.loteRepository.findOne({
            where: { id_lote: id },
            relations: ['producto'],
        });
        if (!lote) {
            throw new common_1.NotFoundException(`Lote con ID ${id} no encontrado`);
        }
        const estadoAnterior = lote.estado;
        lote.actualizarEstado();
        if (estadoAnterior !== lote.estado) {
            await this.loteRepository.save(lote);
        }
        return lote;
    }
    async create(createLoteDto) {
        await this.validateCodigoUnico(createLoteDto.codigo_lote);
        this.validateFechas(createLoteDto.fecha_fabricacion, createLoteDto.fecha_vencimiento);
        this.validateCantidades(createLoteDto.cantidad_inicial, createLoteDto.cantidad_actual);
        await this.validateProductoExists(createLoteDto.id_producto);
        const lote = this.loteRepository.create(createLoteDto);
        lote.actualizarEstado();
        return await this.loteRepository.save(lote);
    }
    async update(id, updateLoteDto) {
        const lote = await this.findOne(id);
        if (updateLoteDto.codigo_lote && updateLoteDto.codigo_lote !== lote.codigo_lote) {
            await this.validateCodigoUnico(updateLoteDto.codigo_lote);
        }
        if (updateLoteDto.fecha_fabricacion || updateLoteDto.fecha_vencimiento) {
            const fechaFab = updateLoteDto.fecha_fabricacion || lote.fecha_fabricacion.toISOString().split('T')[0];
            const fechaVenc = updateLoteDto.fecha_vencimiento || lote.fecha_vencimiento.toISOString().split('T')[0];
            this.validateFechas(fechaFab, fechaVenc);
        }
        if (updateLoteDto.cantidad_inicial !== undefined ||
            updateLoteDto.cantidad_actual !== undefined) {
            const cantInicial = updateLoteDto.cantidad_inicial ?? lote.cantidad_inicial;
            const cantActual = updateLoteDto.cantidad_actual ?? lote.cantidad_actual;
            this.validateCantidades(cantInicial, cantActual);
        }
        if (updateLoteDto.id_producto) {
            await this.validateProductoExists(updateLoteDto.id_producto);
        }
        Object.assign(lote, updateLoteDto);
        lote.actualizarEstado();
        return await this.loteRepository.save(lote);
    }
    async remove(id) {
        const lote = await this.findOne(id);
        lote.estado = lote_entity_1.EstadoLote.AGOTADO;
        await this.loteRepository.save(lote);
        return {
            message: 'Lote desactivado exitosamente',
            entity: lote,
        };
    }
    async hardDelete(id) {
        const lote = await this.findOne(id);
        await this.loteRepository.remove(lote);
    }
    async findProximosAVencer(dias = 30) {
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
        for (const lote of lotes) {
            lote.actualizarEstado();
        }
        return lotes;
    }
    async validateCodigoUnico(codigoLote, excludeId) {
        const existing = await this.loteRepository.findOne({
            where: { codigo_lote: codigoLote },
        });
        if (existing && existing.id_lote !== excludeId) {
            throw new common_1.ConflictException(`Ya existe un lote con el código "${codigoLote}"`);
        }
    }
    validateFechas(fechaFabricacion, fechaVencimiento) {
        const fechaFab = new Date(fechaFabricacion);
        const fechaVenc = new Date(fechaVencimiento);
        if (fechaVenc <= fechaFab) {
            throw new common_1.BadRequestException('La fecha de vencimiento debe ser mayor a la fecha de fabricación');
        }
    }
    validateCantidades(cantidadInicial, cantidadActual) {
        if (cantidadActual > cantidadInicial) {
            throw new common_1.BadRequestException('La cantidad actual no puede ser mayor a la cantidad inicial');
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
};
exports.LotesService = LotesService;
exports.LotesService = LotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lote_entity_1.Lote)),
    __param(1, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LotesService);
//# sourceMappingURL=lotes.service.js.map