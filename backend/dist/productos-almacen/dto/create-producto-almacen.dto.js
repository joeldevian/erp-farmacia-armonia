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
exports.CreateProductoAlmacenDto = void 0;
const class_validator_1 = require("class-validator");
class CreateProductoAlmacenDto {
}
exports.CreateProductoAlmacenDto = CreateProductoAlmacenDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El stock es requerido' }),
    (0, class_validator_1.IsInt)({ message: 'El stock debe ser un número entero' }),
    (0, class_validator_1.Min)(0, { message: 'El stock debe ser mayor o igual a 0' }),
    __metadata("design:type", Number)
], CreateProductoAlmacenDto.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El stock mínimo es requerido' }),
    (0, class_validator_1.IsInt)({ message: 'El stock mínimo debe ser un número entero' }),
    (0, class_validator_1.Min)(0, { message: 'El stock mínimo debe ser mayor o igual a 0' }),
    __metadata("design:type", Number)
], CreateProductoAlmacenDto.prototype, "stock_minimo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El stock máximo es requerido' }),
    (0, class_validator_1.IsInt)({ message: 'El stock máximo debe ser un número entero' }),
    (0, class_validator_1.Min)(1, { message: 'El stock máximo debe ser mayor a 0' }),
    __metadata("design:type", Number)
], CreateProductoAlmacenDto.prototype, "stock_maximo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El producto es requerido' }),
    (0, class_validator_1.IsInt)({ message: 'El producto debe ser un número' }),
    (0, class_validator_1.Min)(1, { message: 'El producto debe ser válido' }),
    __metadata("design:type", Number)
], CreateProductoAlmacenDto.prototype, "id_producto", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El almacén es requerido' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductoAlmacenDto.prototype, "id_almacen", void 0);
//# sourceMappingURL=create-producto-almacen.dto.js.map