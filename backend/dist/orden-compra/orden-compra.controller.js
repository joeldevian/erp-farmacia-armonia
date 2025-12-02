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
exports.OrdenCompraController = void 0;
const common_1 = require("@nestjs/common");
const orden_compra_service_1 = require("./orden-compra.service");
let OrdenCompraController = class OrdenCompraController {
    constructor(ordenCompraService) {
        this.ordenCompraService = ordenCompraService;
    }
    create(createOrdenCompraDto) {
        return this.ordenCompraService.create(createOrdenCompraDto);
    }
    findAll(estado, id_proveedor) {
        return this.ordenCompraService.findAll({ estado, id_proveedor });
    }
    findPendientes() {
        return this.ordenCompraService.findPendientes();
    }
    findByProveedor(id) {
        return this.ordenCompraService.findByProveedor(id);
    }
    findOne(id) {
        return this.ordenCompraService.findOne(id);
    }
    update(id, updateOrdenCompraDto) {
        return this.ordenCompraService.update(id, updateOrdenCompraDto);
    }
    cambiarEstado(id, cambiarEstadoDto) {
        return this.ordenCompraService.cambiarEstado(id, cambiarEstadoDto);
    }
    remove(id) {
        return this.ordenCompraService.remove(id);
    }
};
exports.OrdenCompraController = OrdenCompraController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], OrdenCompraController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('estado')),
    __param(1, (0, common_1.Query)('id_proveedor')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], OrdenCompraController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pendientes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdenCompraController.prototype, "findPendientes", null);
__decorate([
    (0, common_1.Get)('proveedor/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdenCompraController.prototype, "findByProveedor", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdenCompraController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function]),
    __metadata("design:returntype", void 0)
], OrdenCompraController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/estado'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function]),
    __metadata("design:returntype", void 0)
], OrdenCompraController.prototype, "cambiarEstado", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdenCompraController.prototype, "remove", null);
exports.OrdenCompraController = OrdenCompraController = __decorate([
    (0, common_1.Controller)('orden-compra'),
    __metadata("design:paramtypes", [orden_compra_service_1.OrdenCompraService])
], OrdenCompraController);
//# sourceMappingURL=orden-compra.controller.js.map