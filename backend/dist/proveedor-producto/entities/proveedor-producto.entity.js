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
exports.ProveedorProducto = exports.EstadoProveedorProducto = exports.CalidadProveedor = void 0;
const typeorm_1 = require("typeorm");
const proveedor_entity_1 = require("../../proveedores/entities/proveedor.entity");
const producto_entity_1 = require("../../productos/entities/producto.entity");
var CalidadProveedor;
(function (CalidadProveedor) {
    CalidadProveedor["ALTA"] = "alta";
    CalidadProveedor["MEDIA"] = "media";
    CalidadProveedor["BAJA"] = "baja";
})(CalidadProveedor || (exports.CalidadProveedor = CalidadProveedor = {}));
var EstadoProveedorProducto;
(function (EstadoProveedorProducto) {
    EstadoProveedorProducto["ACTIVO"] = "activo";
    EstadoProveedorProducto["INACTIVO"] = "inactivo";
})(EstadoProveedorProducto || (exports.EstadoProveedorProducto = EstadoProveedorProducto = {}));
let ProveedorProducto = class ProveedorProducto {
};
exports.ProveedorProducto = ProveedorProducto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProveedorProducto.prototype, "id_proveedor_producto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ProveedorProducto.prototype, "precio_referencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ProveedorProducto.prototype, "tiempo_entrega_dias", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CalidadProveedor,
        default: CalidadProveedor.MEDIA,
    }),
    __metadata("design:type", String)
], ProveedorProducto.prototype, "calidad", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoProveedorProducto,
        default: EstadoProveedorProducto.ACTIVO,
    }),
    __metadata("design:type", String)
], ProveedorProducto.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proveedor_entity_1.Proveedor, (proveedor) => proveedor.proveedorProductos, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'id_proveedor' }),
    __metadata("design:type", proveedor_entity_1.Proveedor)
], ProveedorProducto.prototype, "proveedor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProveedorProducto.prototype, "id_proveedor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_producto' }),
    __metadata("design:type", producto_entity_1.Producto)
], ProveedorProducto.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProveedorProducto.prototype, "id_producto", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ProveedorProducto.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ProveedorProducto.prototype, "updated_at", void 0);
exports.ProveedorProducto = ProveedorProducto = __decorate([
    (0, typeorm_1.Entity)('proveedor_producto'),
    (0, typeorm_1.Index)(['id_proveedor', 'id_producto'], { unique: true })
], ProveedorProducto);
//# sourceMappingURL=proveedor-producto.entity.js.map