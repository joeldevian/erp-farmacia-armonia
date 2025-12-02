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
exports.CreateStockDto = void 0;
const class_validator_1 = require("class-validator");
class CreateStockDto {
}
exports.CreateStockDto = CreateStockDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La cantidad total es requerida' }),
    (0, class_validator_1.IsInt)({ message: 'La cantidad total debe ser un número entero' }),
    (0, class_validator_1.Min)(0, { message: 'La cantidad total debe ser mayor o igual a 0' }),
    __metadata("design:type", Number)
], CreateStockDto.prototype, "cantidad_total", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La cantidad reservada es requerida' }),
    (0, class_validator_1.IsInt)({ message: 'La cantidad reservada debe ser un número entero' }),
    (0, class_validator_1.Min)(0, { message: 'La cantidad reservada debe ser mayor o igual a 0' }),
    __metadata("design:type", Number)
], CreateStockDto.prototype, "cantidad_reservada", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El producto es requerido' }),
    (0, class_validator_1.IsInt)({ message: 'El producto debe ser un número' }),
    (0, class_validator_1.Min)(1, { message: 'El producto debe ser válido' }),
    __metadata("design:type", Number)
], CreateStockDto.prototype, "id_producto", void 0);
//# sourceMappingURL=create-stock.dto.js.map