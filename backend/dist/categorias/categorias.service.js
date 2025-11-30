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
exports.CategoriasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const categoria_entity_1 = require("./entities/categoria.entity");
let CategoriasService = class CategoriasService {
    constructor(categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }
    async findAll(filtros) {
        const where = {};
        if (filtros?.nombre) {
            where.nombre = (0, typeorm_2.Like)(`%${filtros.nombre}%`);
        }
        if (filtros?.estado !== undefined) {
            where.estado = filtros.estado;
        }
        return await this.categoriaRepository.find({
            where,
            order: { fecha_creacion: 'DESC' },
        });
    }
    async findOne(id) {
        const categoria = await this.categoriaRepository.findOne({
            where: { id_categoria: id },
        });
        if (!categoria) {
            throw new common_1.NotFoundException(`Categoría con ID ${id} no encontrada`);
        }
        return categoria;
    }
    async create(createCategoriaDto) {
        try {
            const categoria = this.categoriaRepository.create(createCategoriaDto);
            return await this.categoriaRepository.save(categoria);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException(`Ya existe una categoría con el nombre "${createCategoriaDto.nombre}"`);
            }
            throw error;
        }
    }
    async update(id, updateCategoriaDto) {
        const categoria = await this.findOne(id);
        try {
            Object.assign(categoria, updateCategoriaDto);
            return await this.categoriaRepository.save(categoria);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException(`Ya existe una categoría con el nombre "${updateCategoriaDto.nombre}"`);
            }
            throw error;
        }
    }
    async remove(id) {
        const categoria = await this.findOne(id);
        categoria.estado = false;
        const categoriaDesactivada = await this.categoriaRepository.save(categoria);
        return {
            message: 'Categoría desactivada exitosamente',
            categoria: categoriaDesactivada,
        };
    }
    async hardDelete(id) {
        const categoria = await this.findOne(id);
        await this.categoriaRepository.remove(categoria);
    }
};
exports.CategoriasService = CategoriasService;
exports.CategoriasService = CategoriasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categoria_entity_1.Categoria)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriasService);
//# sourceMappingURL=categorias.service.js.map