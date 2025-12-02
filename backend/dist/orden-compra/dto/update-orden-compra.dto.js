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
exports.UpdateOrdenCompraDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_orden_compra_dto_1 = require("./create-orden-compra.dto");
const class_validator_1 = require("class-validator");
const orden_compra_entity_1 = require("../entities/orden-compra.entity");
class UpdateOrdenCompraDto extends (0, mapped_types_1.PartialType)(create_orden_compra_dto_1.CreateOrdenCompraDto) {
}
exports.UpdateOrdenCompraDto = UpdateOrdenCompraDto;
__decorate([
    (0, class_validator_1.IsEnum)(orden_compra_entity_1.EstadoOrdenCompra, {
        message: 'El estado debe ser: pendiente, aprobada, rechazada, recibida o anulada',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrdenCompraDto.prototype, "estado", void 0);
//# sourceMappingURL=update-orden-compra.dto.js.map