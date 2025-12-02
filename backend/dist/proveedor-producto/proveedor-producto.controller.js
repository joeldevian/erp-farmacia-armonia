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
exports.ProveedorProductoController = void 0;
const common_1 = require("@nestjs/common");
const proveedor_producto_service_1 = require("./proveedor-producto.service");
const create_proveedor_producto_dto_1 = require("./dto/create-proveedor-producto.dto");
const update_proveedor_producto_dto_1 = require("./dto/update-proveedor-producto.dto");
const proveedor_producto_entity_1 = require("./entities/proveedor-producto.entity");
let ProveedorProductoController = class ProveedorProductoController {
    constructor(proveedorProductoService) {
        this.proveedorProductoService = proveedorProductoService;
    }
    async findAll(id_proveedor, id_producto, estado) {
        return await this.proveedorProductoService.findAll({
            id_proveedor,
            id_producto,
            estado,
        });
    }
    async findByProducto(id) {
        return await this.proveedorProductoService.findByProducto(id);
    }
    async findMejorProveedor(id) {
        return await this.proveedorProductoService.findMejorProveedor(id);
    }
    async findOne(id) {
        return await this.proveedorProductoService.findOne(id);
    }
    async create(createDto) {
        return await this.proveedorProductoService.create(createDto);
    }
    async update(id, updateDto) {
        return await this.proveedorProductoService.update(id, updateDto);
    }
    async remove(id) {
        return await this.proveedorProductoService.remove(id);
    }
};
exports.ProveedorProductoController = ProveedorProductoController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('id_proveedor')),
    __param(1, (0, common_1.Query)('id_producto', new common_1.ParseIntPipe({ optional: true }))),
    __param(2, (0, common_1.Query)('estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], ProveedorProductoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('producto/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProveedorProductoController.prototype, "findByProducto", null);
__decorate([
    (0, common_1.Get)('mejor/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProveedorProductoController.prototype, "findMejorProveedor", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProveedorProductoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_proveedor_producto_dto_1.CreateProveedorProductoDto]),
    __metadata("design:returntype", Promise)
], ProveedorProductoController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_proveedor_producto_dto_1.UpdateProveedorProductoDto]),
    __metadata("design:returntype", Promise)
], ProveedorProductoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProveedorProductoController.prototype, "remove", null);
exports.ProveedorProductoController = ProveedorProductoController = __decorate([
    (0, common_1.Controller)('proveedor-producto'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __metadata("design:paramtypes", [proveedor_producto_service_1.ProveedorProductoService])
], ProveedorProductoController);
//# sourceMappingURL=proveedor-producto.controller.js.map