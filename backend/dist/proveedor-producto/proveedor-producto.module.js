"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedorProductoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const proveedor_producto_service_1 = require("./proveedor-producto.service");
const proveedor_producto_controller_1 = require("./proveedor-producto.controller");
const proveedor_producto_entity_1 = require("./entities/proveedor-producto.entity");
const proveedor_entity_1 = require("../proveedores/entities/proveedor.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
let ProveedorProductoModule = class ProveedorProductoModule {
};
exports.ProveedorProductoModule = ProveedorProductoModule;
exports.ProveedorProductoModule = ProveedorProductoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([proveedor_producto_entity_1.ProveedorProducto, proveedor_entity_1.Proveedor, producto_entity_1.Producto]),
        ],
        controllers: [proveedor_producto_controller_1.ProveedorProductoController],
        providers: [proveedor_producto_service_1.ProveedorProductoService],
        exports: [proveedor_producto_service_1.ProveedorProductoService],
    })
], ProveedorProductoModule);
//# sourceMappingURL=proveedor-producto.module.js.map