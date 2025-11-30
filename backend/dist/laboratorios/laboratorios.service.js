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
exports.LaboratoriosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const base_service_1 = require("../common/base.service");
const laboratorio_entity_1 = require("./entities/laboratorio.entity");
let LaboratoriosService = class LaboratoriosService extends base_service_1.BaseService {
    constructor(laboratorioRepository) {
        super(laboratorioRepository, 'Laboratorio');
        this.laboratorioRepository = laboratorioRepository;
    }
    async findOne(id) {
        const laboratorio = await this.laboratorioRepository.findOne({
            where: { id_laboratorio: id },
        });
        if (!laboratorio) {
            throw new common_1.NotFoundException(`Laboratorio con ID ${id} no encontrado`);
        }
        return laboratorio;
    }
    async create(createLaboratorioDto) {
        await this.validateUniqueName(createLaboratorioDto.nombre);
        return await super.create(createLaboratorioDto);
    }
    async update(id, updateLaboratorioDto) {
        if (updateLaboratorioDto.nombre) {
            await this.validateUniqueName(updateLaboratorioDto.nombre, id);
        }
        return await super.update(id, updateLaboratorioDto);
    }
    async validateUniqueName(nombre, excludeId) {
        const existing = await this.laboratorioRepository.findOne({
            where: { nombre },
        });
        if (existing && existing.id_laboratorio !== excludeId) {
            throw new common_1.ConflictException(`Ya existe un laboratorio con el nombre "${nombre}"`);
        }
    }
};
exports.LaboratoriosService = LaboratoriosService;
exports.LaboratoriosService = LaboratoriosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(laboratorio_entity_1.Laboratorio)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LaboratoriosService);
//# sourceMappingURL=laboratorios.service.js.map