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
exports.StockService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const stock_entity_1 = require("./entities/stock.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
let StockService = class StockService {
    constructor(stockRepository, productoRepository) {
        this.stockRepository = stockRepository;
        this.productoRepository = productoRepository;
    }
    async findAll(filtros) {
        const where = {};
        if (filtros?.estado) {
            where.estado = filtros.estado;
        }
        const stocks = await this.stockRepository.find({
            where,
            relations: ['producto'],
            order: { created_at: 'DESC' },
        });
        for (const stock of stocks) {
            const estadoAnterior = stock.estado;
            stock.recalcular();
            if (estadoAnterior !== stock.estado) {
                await this.stockRepository.save(stock);
            }
        }
        return stocks;
    }
    async findOne(id) {
        const stock = await this.stockRepository.findOne({
            where: { id_stock: id },
            relations: ['producto'],
        });
        if (!stock) {
            throw new common_1.NotFoundException(`Stock con ID ${id} no encontrado`);
        }
        const estadoAnterior = stock.estado;
        stock.recalcular();
        if (estadoAnterior !== stock.estado) {
            await this.stockRepository.save(stock);
        }
        return stock;
    }
    async create(createStockDto) {
        await this.validateProductoExists(createStockDto.id_producto);
        await this.validateProductoUnico(createStockDto.id_producto);
        this.validateCantidadReservada(createStockDto.cantidad_total, createStockDto.cantidad_reservada);
        const stock = this.stockRepository.create(createStockDto);
        stock.recalcular();
        return await this.stockRepository.save(stock);
    }
    async update(id, updateStockDto) {
        const stock = await this.findOne(id);
        if (updateStockDto.id_producto) {
            await this.validateProductoExists(updateStockDto.id_producto);
            if (updateStockDto.id_producto !== stock.id_producto) {
                await this.validateProductoUnico(updateStockDto.id_producto, id);
            }
        }
        if (updateStockDto.cantidad_total !== undefined ||
            updateStockDto.cantidad_reservada !== undefined) {
            const cantTotal = updateStockDto.cantidad_total ?? stock.cantidad_total;
            const cantReservada = updateStockDto.cantidad_reservada ?? stock.cantidad_reservada;
            this.validateCantidadReservada(cantTotal, cantReservada);
        }
        Object.assign(stock, updateStockDto);
        stock.recalcular();
        return await this.stockRepository.save(stock);
    }
    async remove(id) {
        const stock = await this.findOne(id);
        await this.stockRepository.remove(stock);
    }
    async hardDelete(id) {
        const stock = await this.findOne(id);
        await this.stockRepository.remove(stock);
    }
    async findBajoStock() {
        const stocks = await this.stockRepository.find({
            relations: ['producto'],
            order: { cantidad_disponible: 'ASC' },
        });
        const stocksBajos = [];
        for (const stock of stocks) {
            stock.recalcular();
            if (stock.estado === stock_entity_1.EstadoStock.BAJO_STOCK) {
                stocksBajos.push(stock);
                await this.stockRepository.save(stock);
            }
        }
        return stocksBajos;
    }
    async findSinStock() {
        const stocks = await this.stockRepository.find({
            relations: ['producto'],
            order: { updated_at: 'DESC' },
        });
        const stocksSin = [];
        for (const stock of stocks) {
            stock.recalcular();
            if (stock.estado === stock_entity_1.EstadoStock.SIN_STOCK) {
                stocksSin.push(stock);
                await this.stockRepository.save(stock);
            }
        }
        return stocksSin;
    }
    async validateProductoUnico(idProducto, excludeId) {
        const existing = await this.stockRepository.findOne({
            where: { id_producto: idProducto },
        });
        if (existing && existing.id_stock !== excludeId) {
            throw new common_1.ConflictException(`El producto con ID ${idProducto} ya tiene un stock asignado`);
        }
    }
    validateCantidadReservada(cantidadTotal, cantidadReservada) {
        if (cantidadReservada > cantidadTotal) {
            throw new common_1.BadRequestException('La cantidad reservada no puede ser mayor a la cantidad total');
        }
    }
    async validateProductoExists(idProducto) {
        const producto = await this.productoRepository.findOne({
            where: { id_producto: idProducto },
        });
        if (!producto) {
            throw new common_1.NotFoundException(`Producto con ID ${idProducto} no encontrado`);
        }
    }
};
exports.StockService = StockService;
exports.StockService = StockService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stock_entity_1.Stock)),
    __param(1, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StockService);
//# sourceMappingURL=stock.service.js.map