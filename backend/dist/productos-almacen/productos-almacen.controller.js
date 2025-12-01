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
exports.ProductosAlmacenController = void 0;
const common_1 = require("@nestjs/common");
const productos_almacen_service_1 = require("./productos-almacen.service");
let ProductosAlmacenController = class ProductosAlmacenController {
    constructor(productosAlmacenService) {
        this.productosAlmacenService = productosAlmacenService;
    }
    create(createProductoAlmacenDto) {
        return this.productosAlmacenService.create(createProductoAlmacenDto);
    }
    findAll() {
        return this.productosAlmacenService.findAll();
    }
    findBajoStock(idAlmacen) {
        return this.productosAlmacenService.findBajoStock(idAlmacen);
    }
    findPorAlmacen(id) {
        return this.productosAlmacenService.findPorAlmacen(id);
    }
    findOne(id) {
        return this.productosAlmacenService.findOne(id);
    }
    update(id, updateProductoAlmacenDto) {
        return this.productosAlmacenService.update(id, updateProductoAlmacenDto);
    }
    remove(id) {
        return this.productosAlmacenService.remove(id);
    }
};
exports.ProductosAlmacenController = ProductosAlmacenController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], ProductosAlmacenController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductosAlmacenController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('bajo-stock'),
    __param(0, (0, common_1.Query)('id_almacen')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductosAlmacenController.prototype, "findBajoStock", null);
__decorate([
    (0, common_1.Get)('almacen/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductosAlmacenController.prototype, "findPorAlmacen", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductosAlmacenController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function]),
    __metadata("design:returntype", void 0)
], ProductosAlmacenController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductosAlmacenController.prototype, "remove", null);
exports.ProductosAlmacenController = ProductosAlmacenController = __decorate([
    (0, common_1.Controller)('productos-almacen'),
    __metadata("design:paramtypes", [productos_almacen_service_1.ProductosAlmacenService])
], ProductosAlmacenController);
//# sourceMappingURL=productos-almacen.controller.js.map