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
exports.LaboratoriosController = void 0;
const common_1 = require("@nestjs/common");
const laboratorios_service_1 = require("./laboratorios.service");
const create_laboratorio_dto_1 = require("./dto/create-laboratorio.dto");
const update_laboratorio_dto_1 = require("./dto/update-laboratorio.dto");
let LaboratoriosController = class LaboratoriosController {
    constructor(laboratoriosService) {
        this.laboratoriosService = laboratoriosService;
    }
    async findAll(nombre, estado) {
        return await this.laboratoriosService.findAll({ nombre, estado });
    }
    async findOne(id) {
        return await this.laboratoriosService.findOne(id);
    }
    async create(createLaboratorioDto) {
        return await this.laboratoriosService.create(createLaboratorioDto);
    }
    async update(id, updateLaboratorioDto) {
        return await this.laboratoriosService.update(id, updateLaboratorioDto);
    }
    async remove(id) {
        return await this.laboratoriosService.remove(id);
    }
    async hardDelete(id) {
        await this.laboratoriosService.hardDelete(id);
        return { message: 'Laboratorio eliminado permanentemente' };
    }
};
exports.LaboratoriosController = LaboratoriosController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('nombre')),
    __param(1, (0, common_1.Query)('estado', new common_1.ParseBoolPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], LaboratoriosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LaboratoriosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_laboratorio_dto_1.CreateLaboratorioDto]),
    __metadata("design:returntype", Promise)
], LaboratoriosController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_laboratorio_dto_1.UpdateLaboratorioDto]),
    __metadata("design:returntype", Promise)
], LaboratoriosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LaboratoriosController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':id/hard-delete'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LaboratoriosController.prototype, "hardDelete", null);
exports.LaboratoriosController = LaboratoriosController = __decorate([
    (0, common_1.Controller)('laboratorios'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __metadata("design:paramtypes", [laboratorios_service_1.LaboratoriosService])
], LaboratoriosController);
//# sourceMappingURL=laboratorios.controller.js.map