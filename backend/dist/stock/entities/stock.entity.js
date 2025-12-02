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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stock = exports.EstadoStock = void 0;
const typeorm_1 = require("typeorm");
const producto_entity_1 = require("../../productos/entities/producto.entity");
var EstadoStock;
(function (EstadoStock) {
    EstadoStock["NORMAL"] = "normal";
    EstadoStock["BAJO_STOCK"] = "bajo_stock";
    EstadoStock["SIN_STOCK"] = "sin_stock";
})(EstadoStock || (exports.EstadoStock = EstadoStock = {}));
let Stock = class Stock {
    recalcular() {
        this.cantidad_disponible = this.cantidad_total - this.cantidad_reservada;
        if (this.cantidad_disponible === 0) {
            this.estado = EstadoStock.SIN_STOCK;
        }
        else if (this.producto && this.cantidad_disponible < this.producto.stock_minimo) {
            this.estado = EstadoStock.BAJO_STOCK;
        }
        else {
            this.estado = EstadoStock.NORMAL;
        }
    }
};
exports.Stock = Stock;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Stock.prototype, "id_stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Stock.prototype, "cantidad_total", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Stock.prototype, "cantidad_disponible", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Stock.prototype, "cantidad_reservada", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoStock,
        default: EstadoStock.NORMAL,
    }),
    __metadata("design:type", String)
], Stock.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => producto_entity_1.Producto, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_producto' }),
    __metadata("design:type", producto_entity_1.Producto)
], Stock.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, typeorm_1.Index)({ unique: true }),
    __metadata("design:type", Number)
], Stock.prototype, "id_producto", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Stock.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Stock.prototype, "updated_at", void 0);
exports.Stock = Stock = __decorate([
    (0, typeorm_1.Entity)('stock')
], Stock);
//# sourceMappingURL=stock.entity.js.map