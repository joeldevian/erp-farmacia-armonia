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
exports.AlmacenesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const almacen_entity_1 = require("./entities/almacen.entity");
const producto_almacen_entity_1 = require("../productos-almacen/entities/producto-almacen.entity");
let AlmacenesService = class AlmacenesService {
    constructor(almacenRepository, productoAlmacenRepository) {
        this.almacenRepository = almacenRepository;
        this.productoAlmacenRepository = productoAlmacenRepository;
    }
    async findAll(filtros) {
        const where = {};
        if (filtros?.tipo) {
            where.tipo = filtros.tipo;
        }
        if (filtros?.estado) {
            where.estado = filtros.estado;
        }
        return await this.almacenRepository.find({
            where,
            order: { nombre: 'ASC' },
        });
    }
    async findOne(id) {
        const almacen = await this.almacenRepository.findOne({
            where: { id_almacen: id },
            relations: ['productosAlmacen', 'productosAlmacen.producto'],
        });
        if (!almacen) {
            throw new common_1.NotFoundException(`Almacén con ID ${id} no encontrado`);
        }
        return almacen;
    }
    async create(createAlmacenDto) {
        await this.validateNombreUnico(createAlmacenDto.nombre);
        this.validateCapacidades(createAlmacenDto.capacidad_total, createAlmacenDto.capacidad_ocupada);
        const almacen = this.almacenRepository.create(createAlmacenDto);
        return await this.almacenRepository.save(almacen);
    }
    async update(id, updateAlmacenDto) {
        const almacen = await this.findOne(id);
        if (updateAlmacenDto.nombre && updateAlmacenDto.nombre !== almacen.nombre) {
            await this.validateNombreUnico(updateAlmacenDto.nombre);
        }
        if (updateAlmacenDto.capacidad_total !== undefined ||
            updateAlmacenDto.capacidad_ocupada !== undefined) {
            const capTotal = updateAlmacenDto.capacidad_total ?? almacen.capacidad_total;
            const capOcupada = updateAlmacenDto.capacidad_ocupada ?? almacen.capacidad_ocupada;
            this.validateCapacidades(capTotal, capOcupada);
        }
        Object.assign(almacen, updateAlmacenDto);
        return await this.almacenRepository.save(almacen);
    }
    async remove(id) {
        const almacen = await this.findOne(id);
        almacen.estado = almacen_entity_1.EstadoAlmacen.INACTIVO;
        await this.almacenRepository.save(almacen);
        return {
            message: 'Almacén desactivado exitosamente',
            entity: almacen,
        };
    }
    async hardDelete(id) {
        const almacen = await this.almacenRepository.findOne({
            where: { id_almacen: id },
        });
        if (!almacen) {
            throw new common_1.NotFoundException(`Almacén con ID ${id} no encontrado`);
        }
        const productosAsociados = await this.productoAlmacenRepository.count({
            where: { id_almacen: id },
        });
        if (productosAsociados > 0) {
            throw new common_1.ConflictException(`No se puede eliminar el almacén "${almacen.nombre}" porque tiene ${productosAsociados} producto(s) asociado(s). Primero debes reasignar o eliminar los productos del almacén.`);
        }
        await this.almacenRepository.remove(almacen);
    }
    async getResumenInventario(id) {
        const almacen = await this.findOne(id);
        const totalProductos = almacen.productosAlmacen?.length || 0;
        const stockTotal = almacen.productosAlmacen?.reduce((sum, pa) => sum + pa.stock, 0) || 0;
        const productosBajoStock = almacen.productosAlmacen?.filter((pa) => pa.stock < pa.stock_minimo).length || 0;
        const productosSobreStock = almacen.productosAlmacen?.filter((pa) => pa.stock > pa.stock_maximo).length || 0;
        return {
            almacen: {
                id_almacen: almacen.id_almacen,
                nombre: almacen.nombre,
                ubicacion: almacen.ubicacion,
                tipo: almacen.tipo,
                capacidad_total: almacen.capacidad_total,
                capacidad_ocupada: almacen.capacidad_ocupada,
            },
            resumen: {
                total_productos: totalProductos,
                stock_total: stockTotal,
                productos_bajo_stock: productosBajoStock,
                productos_sobre_stock: productosSobreStock,
            },
        };
    }
    async validateNombreUnico(nombre, excludeId) {
        const existing = await this.almacenRepository.findOne({
            where: { nombre },
        });
        if (existing && existing.id_almacen !== excludeId) {
            throw new common_1.ConflictException(`Ya existe un almacén con el nombre "${nombre}"`);
        }
    }
    validateCapacidades(capacidadTotal, capacidadOcupada) {
        if (capacidadOcupada > capacidadTotal) {
            throw new common_1.BadRequestException('La capacidad ocupada no puede ser mayor a la capacidad total');
        }
    }
};
exports.AlmacenesService = AlmacenesService;
exports.AlmacenesService = AlmacenesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(almacen_entity_1.Almacen)),
    __param(1, (0, typeorm_1.InjectRepository)(producto_almacen_entity_1.ProductoAlmacen)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AlmacenesService);
//# sourceMappingURL=almacenes.service.js.map