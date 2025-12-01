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
exports.Almacen = exports.EstadoAlmacen = exports.TipoAlmacen = void 0;
const typeorm_1 = require("typeorm");
const producto_almacen_entity_1 = require("../../productos-almacen/entities/producto-almacen.entity");
var TipoAlmacen;
(function (TipoAlmacen) {
    TipoAlmacen["PRINCIPAL"] = "principal";
    TipoAlmacen["SECUNDARIO"] = "secundario";
    TipoAlmacen["TRANSITORIO"] = "transitorio";
})(TipoAlmacen || (exports.TipoAlmacen = TipoAlmacen = {}));
var EstadoAlmacen;
(function (EstadoAlmacen) {
    EstadoAlmacen["ACTIVO"] = "activo";
    EstadoAlmacen["INACTIVO"] = "inactivo";
})(EstadoAlmacen || (exports.EstadoAlmacen = EstadoAlmacen = {}));
let Almacen = class Almacen {
};
exports.Almacen = Almacen;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Almacen.prototype, "id_almacen", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], Almacen.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Almacen.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Almacen.prototype, "ubicacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Almacen.prototype, "capacidad_total", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Almacen.prototype, "capacidad_ocupada", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TipoAlmacen,
        default: TipoAlmacen.PRINCIPAL,
    }),
    __metadata("design:type", String)
], Almacen.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoAlmacen,
        default: EstadoAlmacen.ACTIVO,
    }),
    __metadata("design:type", String)
], Almacen.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => producto_almacen_entity_1.ProductoAlmacen, (productoAlmacen) => productoAlmacen.almacen),
    __metadata("design:type", Array)
], Almacen.prototype, "productosAlmacen", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Almacen.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Almacen.prototype, "updated_at", void 0);
exports.Almacen = Almacen = __decorate([
    (0, typeorm_1.Entity)('almacenes')
], Almacen);
//# sourceMappingURL=almacen.entity.js.map