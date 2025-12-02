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
exports.Proveedor = exports.EstadoProveedor = void 0;
const typeorm_1 = require("typeorm");
var EstadoProveedor;
(function (EstadoProveedor) {
    EstadoProveedor["ACTIVO"] = "activo";
    EstadoProveedor["INACTIVO"] = "inactivo";
})(EstadoProveedor || (exports.EstadoProveedor = EstadoProveedor = {}));
let Proveedor = class Proveedor {
};
exports.Proveedor = Proveedor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Proveedor.prototype, "id_proveedor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], Proveedor.prototype, "razon_social", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Proveedor.prototype, "nombre_comercial", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 11, unique: true }),
    __metadata("design:type", String)
], Proveedor.prototype, "ruc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], Proveedor.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], Proveedor.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Proveedor.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Proveedor.prototype, "pagina_web", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Proveedor.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoProveedor,
        default: EstadoProveedor.ACTIVO,
    }),
    __metadata("design:type", String)
], Proveedor.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('ProveedorProducto', 'proveedor'),
    __metadata("design:type", Array)
], Proveedor.prototype, "proveedorProductos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Proveedor.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Proveedor.prototype, "updated_at", void 0);
exports.Proveedor = Proveedor = __decorate([
    (0, typeorm_1.Entity)('proveedores')
], Proveedor);
//# sourceMappingURL=proveedor.entity.js.map