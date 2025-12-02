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
const base_service_1 = require("../common/base.service");
const categoria_entity_1 = require("./entities/categoria.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
let CategoriasService = class CategoriasService extends base_service_1.BaseService {
    constructor(categoriaRepository, productoRepository) {
        super(categoriaRepository, 'Categoría');
        this.categoriaRepository = categoriaRepository;
        this.productoRepository = productoRepository;
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
        await this.validateUniqueName(createCategoriaDto.nombre);
        return await super.create(createCategoriaDto);
    }
    async update(id, updateCategoriaDto) {
        if (updateCategoriaDto.nombre) {
            await this.validateUniqueName(updateCategoriaDto.nombre, id);
        }
        return await super.update(id, updateCategoriaDto);
    }
    async hardDelete(id) {
        const categoria = await this.categoriaRepository.findOne({
            where: { id_categoria: id },
        });
        if (!categoria) {
            throw new common_1.NotFoundException(`Categoría con ID ${id} no encontrada`);
        }
        const productosAsociados = await this.productoRepository.count({
            where: { id_categoria: id },
        });
        if (productosAsociados > 0) {
            throw new common_1.ConflictException(`No se puede eliminar la categoría "${categoria.nombre}" porque tiene ${productosAsociados} producto(s) asociado(s). Primero debes reasignar o eliminar los productos.`);
        }
        await this.categoriaRepository.remove(categoria);
    }
    async validateUniqueName(nombre, excludeId) {
        const whereClause = { nombre };
        if (excludeId) {
            const existing = await this.categoriaRepository.findOne({
                where: { nombre },
            });
            if (existing && existing.id_categoria !== excludeId) {
                throw new common_1.ConflictException(`Ya existe una categoría con el nombre "${nombre}"`);
            }
        }
        else {
            const exists = await this.categoriaRepository.findOne({
                where: { nombre },
            });
            if (exists) {
                throw new common_1.ConflictException(`Ya existe una categoría con el nombre "${nombre}"`);
            }
        }
    }
};
exports.CategoriasService = CategoriasService;
exports.CategoriasService = CategoriasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categoria_entity_1.Categoria)),
    __param(1, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CategoriasService);
//# sourceMappingURL=categorias.service.js.map