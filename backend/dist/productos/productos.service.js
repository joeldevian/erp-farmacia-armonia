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
exports.ProductosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const base_service_1 = require("../common/base.service");
const producto_entity_1 = require("./entities/producto.entity");
const categoria_entity_1 = require("../categorias/entities/categoria.entity");
const laboratorio_entity_1 = require("../laboratorios/entities/laboratorio.entity");
let ProductosService = class ProductosService extends base_service_1.BaseService {
    constructor(productoRepository, categoriaRepository, laboratorioRepository) {
        super(productoRepository, 'Producto');
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
        this.laboratorioRepository = laboratorioRepository;
    }
    async findOne(id) {
        const producto = await this.productoRepository.findOne({
            where: { id_producto: id },
            relations: ['categoria', 'laboratorio'],
        });
        if (!producto) {
            throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado`);
        }
        return producto;
    }
    async create(createProductoDto) {
        await this.validateUniqueName(createProductoDto.nombre);
        await this.validateUniqueCodigoInterno(createProductoDto.codigo_interno);
        await this.validateCategoriaExists(createProductoDto.id_categoria);
        await this.validateLaboratorioExists(createProductoDto.id_laboratorio);
        this.validateStocks(createProductoDto.stock_minimo, createProductoDto.stock_maximo);
        return await super.create(createProductoDto);
    }
    async update(id, updateProductoDto) {
        if (updateProductoDto.nombre) {
            await this.validateUniqueName(updateProductoDto.nombre, id);
        }
        if (updateProductoDto.codigo_interno) {
            await this.validateUniqueCodigoInterno(updateProductoDto.codigo_interno, id);
        }
        if (updateProductoDto.id_categoria) {
            await this.validateCategoriaExists(updateProductoDto.id_categoria);
        }
        if (updateProductoDto.id_laboratorio) {
            await this.validateLaboratorioExists(updateProductoDto.id_laboratorio);
        }
        if (updateProductoDto.stock_minimo !== undefined ||
            updateProductoDto.stock_maximo !== undefined) {
            const producto = await this.findOne(id);
            const stockMin = updateProductoDto.stock_minimo ?? producto.stock_minimo;
            const stockMax = updateProductoDto.stock_maximo ?? producto.stock_maximo;
            this.validateStocks(stockMin, stockMax);
        }
        return await super.update(id, updateProductoDto);
    }
    async validateUniqueName(nombre, excludeId) {
        const existing = await this.productoRepository.findOne({
            where: { nombre },
        });
        if (existing && existing.id_producto !== excludeId) {
            throw new common_1.ConflictException(`Ya existe un producto con el nombre "${nombre}"`);
        }
    }
    async validateUniqueCodigoInterno(codigoInterno, excludeId) {
        const existing = await this.productoRepository.findOne({
            where: { codigo_interno: codigoInterno },
        });
        if (existing && existing.id_producto !== excludeId) {
            throw new common_1.ConflictException(`Ya existe un producto con el código interno "${codigoInterno}"`);
        }
    }
    async validateCategoriaExists(idCategoria) {
        const categoria = await this.categoriaRepository.findOne({
            where: { id_categoria: idCategoria },
        });
        if (!categoria) {
            throw new common_1.NotFoundException(`Categoría con ID ${idCategoria} no encontrada`);
        }
    }
    async validateLaboratorioExists(idLaboratorio) {
        const laboratorio = await this.laboratorioRepository.findOne({
            where: { id_laboratorio: idLaboratorio },
        });
        if (!laboratorio) {
            throw new common_1.NotFoundException(`Laboratorio con ID ${idLaboratorio} no encontrado`);
        }
    }
    validateStocks(stockMinimo, stockMaximo) {
        if (stockMinimo >= stockMaximo) {
            throw new common_1.BadRequestException('El stock mínimo debe ser menor que el stock máximo');
        }
    }
};
exports.ProductosService = ProductosService;
exports.ProductosService = ProductosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __param(1, (0, typeorm_1.InjectRepository)(categoria_entity_1.Categoria)),
    __param(2, (0, typeorm_1.InjectRepository)(laboratorio_entity_1.Laboratorio)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductosService);
//# sourceMappingURL=productos.service.js.map