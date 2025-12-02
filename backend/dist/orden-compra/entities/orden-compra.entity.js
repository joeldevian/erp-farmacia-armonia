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
exports.OrdenCompra = exports.EstadoOrdenCompra = void 0;
const typeorm_1 = require("typeorm");
const proveedor_entity_1 = require("../../proveedores/entities/proveedor.entity");
const almacen_entity_1 = require("../../almacenes/entities/almacen.entity");
const orden_compra_detalle_entity_1 = require("./orden-compra-detalle.entity");
var EstadoOrdenCompra;
(function (EstadoOrdenCompra) {
    EstadoOrdenCompra["PENDIENTE"] = "pendiente";
    EstadoOrdenCompra["APROBADA"] = "aprobada";
    EstadoOrdenCompra["RECHAZADA"] = "rechazada";
    EstadoOrdenCompra["RECIBIDA"] = "recibida";
    EstadoOrdenCompra["ANULADA"] = "anulada";
})(EstadoOrdenCompra || (exports.EstadoOrdenCompra = EstadoOrdenCompra = {}));
let OrdenCompra = class OrdenCompra {
};
exports.OrdenCompra = OrdenCompra;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrdenCompra.prototype, "id_orden_compra", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 50 }),
    __metadata("design:type", String)
], OrdenCompra.prototype, "numero_orden", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], OrdenCompra.prototype, "fecha_emision", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], OrdenCompra.prototype, "fecha_entrega_estimada", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrdenCompra.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrdenCompra.prototype, "impuestos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrdenCompra.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoOrdenCompra,
        default: EstadoOrdenCompra.PENDIENTE,
    }),
    __metadata("design:type", String)
], OrdenCompra.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], OrdenCompra.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrdenCompra.prototype, "id_proveedor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proveedor_entity_1.Proveedor, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_proveedor' }),
    __metadata("design:type", proveedor_entity_1.Proveedor)
], OrdenCompra.prototype, "proveedor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrdenCompra.prototype, "id_almacen", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => almacen_entity_1.Almacen, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_almacen' }),
    __metadata("design:type", almacen_entity_1.Almacen)
], OrdenCompra.prototype, "almacen", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orden_compra_detalle_entity_1.OrdenCompraDetalle, (detalle) => detalle.ordenCompra, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], OrdenCompra.prototype, "detalles", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrdenCompra.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrdenCompra.prototype, "updated_at", void 0);
exports.OrdenCompra = OrdenCompra = __decorate([
    (0, typeorm_1.Entity)('orden_compra')
], OrdenCompra);
//# sourceMappingURL=orden-compra.entity.js.map