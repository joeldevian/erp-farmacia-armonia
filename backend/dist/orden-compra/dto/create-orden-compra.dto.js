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
exports.CreateOrdenCompraDto = void 0;
const class_validator_1 = require("class-validator");
class CreateOrdenCompraDto {
}
exports.CreateOrdenCompraDto = CreateOrdenCompraDto;
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'La fecha de emisión debe ser válida' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha de emisión es requerida' }),
    __metadata("design:type", String)
], CreateOrdenCompraDto.prototype, "fecha_emision", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'La fecha de entrega estimada debe ser válida' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha de entrega estimada es requerida' }),
    __metadata("design:type", String)
], CreateOrdenCompraDto.prototype, "fecha_entrega_estimada", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'El ID del proveedor debe ser un UUID válido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El proveedor es requerido' }),
    __metadata("design:type", String)
], CreateOrdenCompraDto.prototype, "id_proveedor", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'El ID del almacén debe ser un UUID válido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El almacén es requerido' }),
    __metadata("design:type", String)
], CreateOrdenCompraDto.prototype, "id_almacen", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: 'El subtotal debe tener máximo 2 decimales' }),
    (0, class_validator_1.Min)(0, { message: 'El subtotal debe ser mayor o igual a 0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOrdenCompraDto.prototype, "subtotal", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: 'Los impuestos deben tener máximo 2 decimales' }),
    (0, class_validator_1.Min)(0, { message: 'Los impuestos deben ser mayor o igual a 0' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Los impuestos son requeridos' }),
    __metadata("design:type", Number)
], CreateOrdenCompraDto.prototype, "impuestos", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: 'El total debe tener máximo 2 decimales' }),
    (0, class_validator_1.Min)(0, { message: 'El total debe ser mayor o igual a 0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOrdenCompraDto.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Las observaciones deben ser texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrdenCompraDto.prototype, "observaciones", void 0);
//# sourceMappingURL=create-orden-compra.dto.js.map