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
exports.CreateOrdenCompraDetalleDto = void 0;
const class_validator_1 = require("class-validator");
class CreateOrdenCompraDetalleDto {
}
exports.CreateOrdenCompraDetalleDto = CreateOrdenCompraDetalleDto;
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'El ID de la orden debe ser un UUID válido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La orden de compra es requerida' }),
    __metadata("design:type", String)
], CreateOrdenCompraDetalleDto.prototype, "id_orden_compra", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'El ID del producto debe ser un número entero' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El producto es requerido' }),
    __metadata("design:type", Number)
], CreateOrdenCompraDetalleDto.prototype, "id_producto", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'La cantidad debe ser un número entero' }),
    (0, class_validator_1.Min)(1, { message: 'La cantidad debe ser mayor a 0' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La cantidad es requerida' }),
    __metadata("design:type", Number)
], CreateOrdenCompraDetalleDto.prototype, "cantidad", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: 'El precio unitario debe tener máximo 2 decimales' }),
    (0, class_validator_1.Min)(0.01, { message: 'El precio unitario debe ser mayor a 0' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El precio unitario es requerido' }),
    __metadata("design:type", Number)
], CreateOrdenCompraDetalleDto.prototype, "precio_unitario", void 0);
//# sourceMappingURL=create-orden-compra-detalle.dto.js.map