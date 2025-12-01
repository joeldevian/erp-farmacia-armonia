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
exports.LotesController = void 0;
const common_1 = require("@nestjs/common");
const lotes_service_1 = require("./lotes.service");
const create_lote_dto_1 = require("./dto/create-lote.dto");
const update_lote_dto_1 = require("./dto/update-lote.dto");
const lote_entity_1 = require("./entities/lote.entity");
let LotesController = class LotesController {
    constructor(lotesService) {
        this.lotesService = lotesService;
    }
    async findAll(idProducto, estado) {
        return await this.lotesService.findAll({
            id_producto: idProducto,
            estado,
        });
    }
    async findProximosAVencer(dias) {
        return await this.lotesService.findProximosAVencer(dias || 30);
    }
    async findOne(id) {
        return await this.lotesService.findOne(id);
    }
    async create(createLoteDto) {
        return await this.lotesService.create(createLoteDto);
    }
    async update(id, updateLoteDto) {
        return await this.lotesService.update(id, updateLoteDto);
    }
    async remove(id) {
        return await this.lotesService.remove(id);
    }
    async hardDelete(id) {
        await this.lotesService.hardDelete(id);
        return { message: 'Lote eliminado permanentemente' };
    }
};
exports.LotesController = LotesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('id_producto', new common_1.ParseIntPipe({ optional: true }))),
    __param(1, (0, common_1.Query)('estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], LotesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('proximos-vencer'),
    __param(0, (0, common_1.Query)('dias', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LotesController.prototype, "findProximosAVencer", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LotesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lote_dto_1.CreateLoteDto]),
    __metadata("design:returntype", Promise)
], LotesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lote_dto_1.UpdateLoteDto]),
    __metadata("design:returntype", Promise)
], LotesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LotesController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':id/hard-delete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LotesController.prototype, "hardDelete", null);
exports.LotesController = LotesController = __decorate([
    (0, common_1.Controller)('lotes'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __metadata("design:paramtypes", [lotes_service_1.LotesService])
], LotesController);
//# sourceMappingURL=lotes.controller.js.map