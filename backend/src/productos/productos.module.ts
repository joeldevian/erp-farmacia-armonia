import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { Laboratorio } from '../laboratorios/entities/laboratorio.entity';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';

@Module({
    imports: [TypeOrmModule.forFeature([Producto, Categoria, Laboratorio])],
    controllers: [ProductosController],
    providers: [ProductosService],
    exports: [ProductosService],
})
export class ProductosModule { }
