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
exports.AlmacenesController = void 0;
const common_1 = require("@nestjs/common");
const almacenes_service_1 = require("./almacenes.service");
const almacen_entity_1 = require("./entities/almacen.entity");
let AlmacenesController = class AlmacenesController {
    constructor(almacenesService) {
        this.almacenesService = almacenesService;
    }
    create(createAlmacenDto) {
        return this.almacenesService.create(createAlmacenDto);
    }
    findAll(tipo, estado) {
        return this.almacenesService.findAll({ tipo, estado });
    }
    findOne(id) {
        return this.almacenesService.findOne(id);
    }
    getResumenInventario(id) {
        return this.almacenesService.getResumenInventario(id);
    }
    update(id, updateAlmacenDto) {
        return this.almacenesService.update(id, updateAlmacenDto);
    }
    remove(id) {
        return this.almacenesService.remove(id);
    }
    hardDelete(id) {
        return this.almacenesService.hardDelete(id);
    }
};
exports.AlmacenesController = AlmacenesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], AlmacenesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('tipo')),
    __param(1, (0, common_1.Query)('estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AlmacenesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlmacenesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/resumen'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlmacenesController.prototype, "getResumenInventario", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function]),
    __metadata("design:returntype", void 0)
], AlmacenesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlmacenesController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':id/hard-delete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlmacenesController.prototype, "hardDelete", null);
exports.AlmacenesController = AlmacenesController = __decorate([
    (0, common_1.Controller)('almacenes'),
    __metadata("design:paramtypes", [almacenes_service_1.AlmacenesService])
], AlmacenesController);
//# sourceMappingURL=almacenes.controller.js.map