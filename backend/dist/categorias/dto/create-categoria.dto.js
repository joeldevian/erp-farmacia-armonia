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
exports.CreateCategoriaDto = void 0;
const class_validator_1 = require("class-validator");
class CreateCategoriaDto {
}
exports.CreateCategoriaDto = CreateCategoriaDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser un texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido' }),
    (0, class_validator_1.MaxLength)(255, { message: 'El nombre no puede exceder 255 caracteres' }),
    __metadata("design:type", String)
], CreateCategoriaDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La descripción debe ser un texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCategoriaDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: 'El estado debe ser verdadero o falso' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCategoriaDto.prototype, "estado", void 0);
//# sourceMappingURL=create-categoria.dto.js.map