import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenCompraService } from './orden-compra.service';
import { OrdenCompraController } from './orden-compra.controller';
import { OrdenCompraDetalleService } from './orden-compra-detalle.service';
import { OrdenCompraDetalleController } from './orden-compra-detalle.controller';
import { OrdenCompra } from './entities/orden-compra.entity';
import { OrdenCompraDetalle } from './entities/orden-compra-detalle.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Almacen } from '../almacenes/entities/almacen.entity';
import { Stock } from '../stock/entities/stock.entity';
import { ProductoAlmacen } from '../productos-almacen/entities/producto-almacen.entity';
import { Lote } from '../lotes/entities/lote.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrdenCompra,
            OrdenCompraDetalle,
            Proveedor,
            Producto,
            Almacen,
            Stock,
            ProductoAlmacen,
            Lote,
        ]),
    ],
    controllers: [OrdenCompraController, OrdenCompraDetalleController],
    providers: [OrdenCompraService, OrdenCompraDetalleService],
    exports: [OrdenCompraService, OrdenCompraDetalleService],
})
export class OrdenCompraModule { }
