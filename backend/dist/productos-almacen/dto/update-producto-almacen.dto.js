"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductoAlmacenDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_producto_almacen_dto_1 = require("./create-producto-almacen.dto");
class UpdateProductoAlmacenDto extends (0, mapped_types_1.PartialType)(create_producto_almacen_dto_1.CreateProductoAlmacenDto) {
}
exports.UpdateProductoAlmacenDto = UpdateProductoAlmacenDto;
//# sourceMappingURL=update-producto-almacen.dto.js.map