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
exports.ProveedoresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const proveedor_entity_1 = require("./entities/proveedor.entity");
const proveedor_producto_entity_1 = require("../proveedor-producto/entities/proveedor-producto.entity");
let ProveedoresService = class ProveedoresService {
    constructor(proveedorRepository, proveedorProductoRepository) {
        this.proveedorRepository = proveedorRepository;
        this.proveedorProductoRepository = proveedorProductoRepository;
    }
    async findAll(filtros) {
        const where = {};
        if (filtros?.estado) {
            where.estado = filtros.estado;
        }
        return await this.proveedorRepository.find({
            where,
            order: { razon_social: 'ASC' },
        });
    }
    async findOne(id) {
        const proveedor = await this.proveedorRepository.findOne({
            where: { id_proveedor: id },
            relations: ['proveedorProductos', 'proveedorProductos.producto'],
        });
        if (!proveedor) {
            throw new common_1.NotFoundException(`Proveedor con ID ${id} no encontrado`);
        }
        return proveedor;
    }
    async create(createProveedorDto) {
        await this.validateRucUnico(createProveedorDto.ruc);
        await this.validateEmailUnico(createProveedorDto.email);
        await this.validateRazonSocialUnica(createProveedorDto.razon_social);
        const proveedor = this.proveedorRepository.create(createProveedorDto);
        return await this.proveedorRepository.save(proveedor);
    }
    async update(id, updateProveedorDto) {
        const proveedor = await this.findOne(id);
        if (updateProveedorDto.ruc && updateProveedorDto.ruc !== proveedor.ruc) {
            await this.validateRucUnico(updateProveedorDto.ruc);
        }
        if (updateProveedorDto.email &&
            updateProveedorDto.email !== proveedor.email) {
            await this.validateEmailUnico(updateProveedorDto.email);
        }
        if (updateProveedorDto.razon_social &&
            updateProveedorDto.razon_social !== proveedor.razon_social) {
            await this.validateRazonSocialUnica(updateProveedorDto.razon_social);
        }
        Object.assign(proveedor, updateProveedorDto);
        return await this.proveedorRepository.save(proveedor);
    }
    async remove(id) {
        const proveedor = await this.findOne(id);
        proveedor.estado = proveedor_entity_1.EstadoProveedor.INACTIVO;
        await this.proveedorRepository.save(proveedor);
        return {
            message: 'Proveedor desactivado exitosamente',
            entity: proveedor,
        };
    }
    async hardDelete(id) {
        const proveedor = await this.proveedorRepository.findOne({
            where: { id_proveedor: id },
        });
        if (!proveedor) {
            throw new common_1.NotFoundException(`Proveedor con ID ${id} no encontrado`);
        }
        const productosAsociados = await this.proveedorProductoRepository.count({
            where: { id_proveedor: id },
        });
        if (productosAsociados > 0) {
            throw new common_1.ConflictException(`No se puede eliminar el proveedor "${proveedor.razon_social}" porque tiene ${productosAsociados} producto(s) asociado(s). Primero debes eliminar las relaciones.`);
        }
        await this.proveedorRepository.remove(proveedor);
    }
    async validateRucUnico(ruc) {
        const existing = await this.proveedorRepository.findOne({
            where: { ruc },
        });
        if (existing) {
            throw new common_1.ConflictException(`Ya existe un proveedor con el RUC "${ruc}"`);
        }
    }
    async validateEmailUnico(email) {
        const existing = await this.proveedorRepository.findOne({
            where: { email },
        });
        if (existing) {
            throw new common_1.ConflictException(`Ya existe un proveedor con el email "${email}"`);
        }
    }
    async validateRazonSocialUnica(razon_social) {
        const existing = await this.proveedorRepository.findOne({
            where: { razon_social },
        });
        if (existing) {
            throw new common_1.ConflictException(`Ya existe un proveedor con la razón social "${razon_social}"`);
        }
    }
};
exports.ProveedoresService = ProveedoresService;
exports.ProveedoresService = ProveedoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(proveedor_entity_1.Proveedor)),
    __param(1, (0, typeorm_1.InjectRepository)(proveedor_producto_entity_1.ProveedorProducto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProveedoresService);
//# sourceMappingURL=proveedores.service.js.map