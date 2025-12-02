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
exports.Lote = exports.EstadoLote = void 0;
const typeorm_1 = require("typeorm");
const producto_entity_1 = require("../../productos/entities/producto.entity");
var EstadoLote;
(function (EstadoLote) {
    EstadoLote["ACTIVO"] = "activo";
    EstadoLote["EXPIRADO"] = "expirado";
    EstadoLote["AGOTADO"] = "agotado";
})(EstadoLote || (exports.EstadoLote = EstadoLote = {}));
let Lote = class Lote {
    actualizarEstado() {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaVenc = new Date(this.fecha_vencimiento);
        fechaVenc.setHours(0, 0, 0, 0);
        if (this.cantidad_actual === 0) {
            this.estado = EstadoLote.AGOTADO;
            return;
        }
        if (fechaVenc < hoy) {
            this.estado = EstadoLote.EXPIRADO;
        }
        else {
            this.estado = EstadoLote.ACTIVO;
        }
    }
};
exports.Lote = Lote;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Lote.prototype, "id_lote", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    __metadata("design:type", String)
], Lote.prototype, "codigo_lote", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Lote.prototype, "fecha_fabricacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Lote.prototype, "fecha_vencimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Lote.prototype, "cantidad_inicial", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Lote.prototype, "cantidad_actual", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoLote,
        default: EstadoLote.ACTIVO,
    }),
    __metadata("design:type", String)
], Lote.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_producto' }),
    __metadata("design:type", producto_entity_1.Producto)
], Lote.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Lote.prototype, "id_producto", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Lote.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Lote.prototype, "updated_at", void 0);
exports.Lote = Lote = __decorate([
    (0, typeorm_1.Entity)('lotes')
], Lote);
//# sourceMappingURL=lote.entity.js.map