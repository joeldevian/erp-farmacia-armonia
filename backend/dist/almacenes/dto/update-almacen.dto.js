"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAlmacenDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_almacen_dto_1 = require("./create-almacen.dto");
class UpdateAlmacenDto extends (0, mapped_types_1.PartialType)(create_almacen_dto_1.CreateAlmacenDto) {
}
exports.UpdateAlmacenDto = UpdateAlmacenDto;
//# sourceMappingURL=update-almacen.dto.js.map