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
exports.CreateAlmacenDto = void 0;
const class_validator_1 = require("class-validator");
const almacen_entity_1 = require("../entities/almacen.entity");
class CreateAlmacenDto {
}
exports.CreateAlmacenDto = CreateAlmacenDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 255, { message: 'El nombre debe tener entre 1 y 255 caracteres' }),
    __metadata("design:type", String)
], CreateAlmacenDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAlmacenDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La ubicación es requerida' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 255, { message: 'La ubicación debe tener entre 1 y 255 caracteres' }),
    __metadata("design:type", String)
], CreateAlmacenDto.prototype, "ubicacion", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La capacidad total es requerida' }),
    (0, class_validator_1.IsInt)({ message: 'La capacidad total debe ser un número entero' }),
    (0, class_validator_1.Min)(1, { message: 'La capacidad total debe ser mayor a 0' }),
    __metadata("design:type", Number)
], CreateAlmacenDto.prototype, "capacidad_total", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La capacidad ocupada es requerida' }),
    (0, class_validator_1.IsInt)({ message: 'La capacidad ocupada debe ser un número entero' }),
    (0, class_validator_1.Min)(0, { message: 'La capacidad ocupada debe ser mayor o igual a 0' }),
    __metadata("design:type", Number)
], CreateAlmacenDto.prototype, "capacidad_ocupada", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El tipo de almacén es requerido' }),
    (0, class_validator_1.IsEnum)(almacen_entity_1.TipoAlmacen, { message: 'Tipo de almacén inválido' }),
    __metadata("design:type", String)
], CreateAlmacenDto.prototype, "tipo", void 0);
//# sourceMappingURL=create-almacen.dto.js.map