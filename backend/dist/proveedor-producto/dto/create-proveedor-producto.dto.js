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
exports.CreateProveedorProductoDto = void 0;
const class_validator_1 = require("class-validator");
const proveedor_producto_entity_1 = require("../entities/proveedor-producto.entity");
class CreateProveedorProductoDto {
}
exports.CreateProveedorProductoDto = CreateProveedorProductoDto;
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'El ID del proveedor debe ser un UUID válido' }),
    __metadata("design:type", String)
], CreateProveedorProductoDto.prototype, "id_proveedor", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'El ID del producto debe ser un número' }),
    __metadata("design:type", Number)
], CreateProveedorProductoDto.prototype, "id_producto", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: 'El precio debe tener máximo 2 decimales' }),
    (0, class_validator_1.Min)(0, { message: 'El precio debe ser mayor o igual a 0' }),
    __metadata("design:type", Number)
], CreateProveedorProductoDto.prototype, "precio_referencia", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'El tiempo de entrega debe ser un número entero' }),
    (0, class_validator_1.Min)(1, { message: 'El tiempo de entrega debe ser al menos 1 día' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProveedorProductoDto.prototype, "tiempo_entrega_dias", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(proveedor_producto_entity_1.CalidadProveedor, {
        message: 'La calidad debe ser: alta, media o baja',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProveedorProductoDto.prototype, "calidad", void 0);
//# sourceMappingURL=create-proveedor-producto.dto.js.map