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
exports.OrdenCompraDetalleController = void 0;
const common_1 = require("@nestjs/common");
const orden_compra_detalle_service_1 = require("./orden-compra-detalle.service");
let OrdenCompraDetalleController = class OrdenCompraDetalleController {
    constructor(detalleService) {
        this.detalleService = detalleService;
    }
    create(createDetalleDto) {
        return this.detalleService.create(createDetalleDto);
    }
    findByOrden(id) {
        return this.detalleService.findByOrden(id);
    }
    findOne(id) {
        return this.detalleService.findOne(id);
    }
    update(id, updateDetalleDto) {
        return this.detalleService.update(id, updateDetalleDto);
    }
    remove(id) {
        return this.detalleService.remove(id);
    }
};
exports.OrdenCompraDetalleController = OrdenCompraDetalleController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], OrdenCompraDetalleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('orden/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdenCompraDetalleController.prototype, "findByOrden", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdenCompraDetalleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function]),
    __metadata("design:returntype", void 0)
], OrdenCompraDetalleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdenCompraDetalleController.prototype, "remove", null);
exports.OrdenCompraDetalleController = OrdenCompraDetalleController = __decorate([
    (0, common_1.Controller)('orden-compra-detalle'),
    __metadata("design:paramtypes", [orden_compra_detalle_service_1.OrdenCompraDetalleService])
], OrdenCompraDetalleController);
//# sourceMappingURL=orden-compra-detalle.controller.js.map