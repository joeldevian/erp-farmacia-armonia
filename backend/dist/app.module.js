"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_config_1 = require("./config/database.config");
const categorias_module_1 = require("./categorias/categorias.module");
const laboratorios_module_1 = require("./laboratorios/laboratorios.module");
const productos_module_1 = require("./productos/productos.module");
const lotes_module_1 = require("./lotes/lotes.module");
const almacenes_module_1 = require("./almacenes/almacenes.module");
const productos_almacen_module_1 = require("./productos-almacen/productos-almacen.module");
const stock_module_1 = require("./stock/stock.module");
const proveedores_module_1 = require("./proveedores/proveedores.module");
const proveedor_producto_module_1 = require("./proveedor-producto/proveedor-producto.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot((0, database_config_1.getDatabaseConfig)()),
            categorias_module_1.CategoriasModule,
            laboratorios_module_1.LaboratoriosModule,
            productos_module_1.ProductosModule,
            lotes_module_1.LotesModule,
            almacenes_module_1.AlmacenesModule,
            productos_almacen_module_1.ProductosAlmacenModule,
            stock_module_1.StockModule,
            proveedores_module_1.ProveedoresModule,
            proveedor_producto_module_1.ProveedorProductoModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map