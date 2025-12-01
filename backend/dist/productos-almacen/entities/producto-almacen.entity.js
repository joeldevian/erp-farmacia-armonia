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
exports.ProductoAlmacen = exports.EstadoStock = void 0;
const typeorm_1 = require("typeorm");
const producto_entity_1 = require("../../productos/entities/producto.entity");
const almacen_entity_1 = require("../../almacenes/entities/almacen.entity");
var EstadoStock;
(function (EstadoStock) {
    EstadoStock["NORMAL"] = "normal";
    EstadoStock["BAJO_STOCK"] = "bajo_stock";
    EstadoStock["SOBRE_STOCK"] = "sobre_stock";
})(EstadoStock || (exports.EstadoStock = EstadoStock = {}));
let ProductoAlmacen = class ProductoAlmacen {
    actualizarEstado() {
        if (this.stock < this.stock_minimo) {
            this.estado = EstadoStock.BAJO_STOCK;
        }
        else if (this.stock > this.stock_maximo) {
            this.estado = EstadoStock.SOBRE_STOCK;
        }
        else {
            this.estado = EstadoStock.NORMAL;
        }
    }
};
exports.ProductoAlmacen = ProductoAlmacen;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductoAlmacen.prototype, "id_producto_almacen", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ProductoAlmacen.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], ProductoAlmacen.prototype, "stock_minimo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], ProductoAlmacen.prototype, "stock_maximo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoStock,
        default: EstadoStock.NORMAL,
    }),
    __metadata("design:type", String)
], ProductoAlmacen.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_producto' }),
    __metadata("design:type", producto_entity_1.Producto)
], ProductoAlmacen.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductoAlmacen.prototype, "id_producto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => almacen_entity_1.Almacen, (almacen) => almacen.productosAlmacen, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_almacen' }),
    __metadata("design:type", almacen_entity_1.Almacen)
], ProductoAlmacen.prototype, "almacen", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductoAlmacen.prototype, "id_almacen", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ProductoAlmacen.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ProductoAlmacen.prototype, "updated_at", void 0);
exports.ProductoAlmacen = ProductoAlmacen = __decorate([
    (0, typeorm_1.Entity)('productos_almacen'),
    (0, typeorm_1.Index)(['id_producto', 'id_almacen'], { unique: true })
], ProductoAlmacen);
//# sourceMappingURL=producto-almacen.entity.js.map