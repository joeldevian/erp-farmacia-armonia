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
exports.CreateLoteDto = void 0;
const class_validator_1 = require("class-validator");
class CreateLoteDto {
}
exports.CreateLoteDto = CreateLoteDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El código de lote es requerido' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100, {
        message: 'El código de lote debe tener entre 1 y 100 caracteres',
    }),
    __metadata("design:type", String)
], CreateLoteDto.prototype, "codigo_lote", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha de fabricación es requerida' }),
    (0, class_validator_1.IsDateString)({}, { message: 'La fecha de fabricación debe ser válida' }),
    __metadata("design:type", String)
], CreateLoteDto.prototype, "fecha_fabricacion", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha de vencimiento es requerida' }),
    (0, class_validator_1.IsDateString)({}, { message: 'La fecha de vencimiento debe ser válida' }),
    __metadata("design:type", String)
], CreateLoteDto.prototype, "fecha_vencimiento", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La cantidad inicial es requerida' }),
    (0, class_validator_1.IsInt)({ message: 'La cantidad inicial debe ser un número entero' }),
    (0, class_validator_1.Min)(1, { message: 'La cantidad inicial debe ser mayor a 0' }),
    __metadata("design:type", Number)
], CreateLoteDto.prototype, "cantidad_inicial", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La cantidad actual es requerida' }),
    (0, class_validator_1.IsInt)({ message: 'La cantidad actual debe ser un número entero' }),
    (0, class_validator_1.Min)(0, { message: 'La cantidad actual debe ser mayor o igual a 0' }),
    __metadata("design:type", Number)
], CreateLoteDto.prototype, "cantidad_actual", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El producto es requerido' }),
    (0, class_validator_1.IsInt)({ message: 'El producto debe ser un número' }),
    (0, class_validator_1.Min)(1, { message: 'El producto debe ser válido' }),
    __metadata("design:type", Number)
], CreateLoteDto.prototype, "id_producto", void 0);
//# sourceMappingURL=create-lote.dto.js.map