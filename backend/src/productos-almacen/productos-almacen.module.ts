import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosAlmacenService } from './productos-almacen.service';
import { ProductosAlmacenController } from './productos-almacen.controller';
import { ProductoAlmacen } from './entities/producto-almacen.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Almacen } from '../almacenes/entities/almacen.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductoAlmacen, Producto, Almacen])],
    controllers: [ProductosAlmacenController],
    providers: [ProductosAlmacenService],
    exports: [ProductosAlmacenService],
})
export class ProductosAlmacenModule { }
