"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosAlmacenModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const productos_almacen_service_1 = require("./productos-almacen.service");
const productos_almacen_controller_1 = require("./productos-almacen.controller");
const producto_almacen_entity_1 = require("./entities/producto-almacen.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
const almacen_entity_1 = require("../almacenes/entities/almacen.entity");
let ProductosAlmacenModule = class ProductosAlmacenModule {
};
exports.ProductosAlmacenModule = ProductosAlmacenModule;
exports.ProductosAlmacenModule = ProductosAlmacenModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([producto_almacen_entity_1.ProductoAlmacen, producto_entity_1.Producto, almacen_entity_1.Almacen])],
        controllers: [productos_almacen_controller_1.ProductosAlmacenController],
        providers: [productos_almacen_service_1.ProductosAlmacenService],
        exports: [productos_almacen_service_1.ProductosAlmacenService],
    })
], ProductosAlmacenModule);
//# sourceMappingURL=productos-almacen.module.js.map