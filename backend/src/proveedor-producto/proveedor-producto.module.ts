import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProveedorProductoService } from './proveedor-producto.service';
import { ProveedorProductoController } from './proveedor-producto.controller';
import { ProveedorProducto } from './entities/proveedor-producto.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { Producto } from '../productos/entities/producto.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProveedorProducto, Proveedor, Producto]),
    ],
    controllers: [ProveedorProductoController],
    providers: [ProveedorProductoService],
    exports: [ProveedorProductoService],
})
export class ProveedorProductoModule { }
