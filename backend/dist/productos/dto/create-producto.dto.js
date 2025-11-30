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
exports.CreateProductoDto = void 0;
const class_validator_1 = require("class-validator");
const producto_entity_1 = require("../entities/producto.entity");
class CreateProductoDto {
}
exports.CreateProductoDto = CreateProductoDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 255, { message: 'El nombre debe tener entre 1 y 255 caracteres' }),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El tipo de producto es requerido' }),
    (0, class_validator_1.IsEnum)(producto_entity_1.TipoProducto, { message: 'Tipo de producto inválido' }),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "tipo_producto", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "codigo_barra", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El código interno es requerido' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100, {
        message: 'El código interno debe tener entre 1 y 100 caracteres',
    }),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "codigo_interno", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La categoría es requerida' }),
    (0, class_validator_1.IsInt)({ message: 'La categoría debe ser un número' }),
    (0, class_validator_1.Min)(1, { message: 'La categoría debe ser válida' }),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "id_categoria", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El laboratorio es requerido' }),
    (0, class_validator_1.IsInt)({ message: 'El laboratorio debe ser un número' }),
    (0, class_validator_1.Min)(1, { message: 'El laboratorio debe ser válido' }),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "id_laboratorio", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La unidad de medida es requerida' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "unidad_medida", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 255),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "concentracion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 255),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "presentacion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateProductoDto.prototype, "requiere_receta", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El stock mínimo es requerido' }),
    (0, class_validator_1.IsInt)({ message: 'El stock mínimo debe ser un número entero' }),
    (0, class_validator_1.Min)(0, { message: 'El stock mínimo debe ser mayor o igual a 0' }),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "stock_minimo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El stock máximo es requerido' }),
    (0, class_validator_1.IsInt)({ message: 'El stock máximo debe ser un número entero' }),
    (0, class_validator_1.Min)(1, { message: 'El stock máximo debe ser mayor a 0' }),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "stock_maximo", void 0);
//# sourceMappingURL=create-producto.dto.js.map