"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlmacenesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const almacenes_service_1 = require("./almacenes.service");
const almacenes_controller_1 = require("./almacenes.controller");
const almacen_entity_1 = require("./entities/almacen.entity");
const producto_almacen_entity_1 = require("../productos-almacen/entities/producto-almacen.entity");
let AlmacenesModule = class AlmacenesModule {
};
exports.AlmacenesModule = AlmacenesModule;
exports.AlmacenesModule = AlmacenesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([almacen_entity_1.Almacen, producto_almacen_entity_1.ProductoAlmacen])],
        controllers: [almacenes_controller_1.AlmacenesController],
        providers: [almacenes_service_1.AlmacenesService],
        exports: [almacenes_service_1.AlmacenesService],
    })
], AlmacenesModule);
//# sourceMappingURL=almacenes.module.js.map