"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenCompraModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orden_compra_service_1 = require("./orden-compra.service");
const orden_compra_controller_1 = require("./orden-compra.controller");
const orden_compra_detalle_service_1 = require("./orden-compra-detalle.service");
const orden_compra_detalle_controller_1 = require("./orden-compra-detalle.controller");
const orden_compra_entity_1 = require("./entities/orden-compra.entity");
const orden_compra_detalle_entity_1 = require("./entities/orden-compra-detalle.entity");
const proveedor_entity_1 = require("../proveedores/entities/proveedor.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
const almacen_entity_1 = require("../almacenes/entities/almacen.entity");
const stock_entity_1 = require("../stock/entities/stock.entity");
const producto_almacen_entity_1 = require("../productos-almacen/entities/producto-almacen.entity");
const lote_entity_1 = require("../lotes/entities/lote.entity");
let OrdenCompraModule = class OrdenCompraModule {
};
exports.OrdenCompraModule = OrdenCompraModule;
exports.OrdenCompraModule = OrdenCompraModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                orden_compra_entity_1.OrdenCompra,
                orden_compra_detalle_entity_1.OrdenCompraDetalle,
                proveedor_entity_1.Proveedor,
                producto_entity_1.Producto,
                almacen_entity_1.Almacen,
                stock_entity_1.Stock,
                producto_almacen_entity_1.ProductoAlmacen,
                lote_entity_1.Lote,
            ]),
        ],
        controllers: [orden_compra_controller_1.OrdenCompraController, orden_compra_detalle_controller_1.OrdenCompraDetalleController],
        providers: [orden_compra_service_1.OrdenCompraService, orden_compra_detalle_service_1.OrdenCompraDetalleService],
        exports: [orden_compra_service_1.OrdenCompraService, orden_compra_detalle_service_1.OrdenCompraDetalleService],
    })
], OrdenCompraModule);
//# sourceMappingURL=orden-compra.module.js.map