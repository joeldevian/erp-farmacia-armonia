import { Producto } from '../../productos/entities/producto.entity';
import { Almacen } from '../../almacenes/entities/almacen.entity';
export declare enum EstadoStock {
    NORMAL = "normal",
    BAJO_STOCK = "bajo_stock",
    SOBRE_STOCK = "sobre_stock"
}
export declare class ProductoAlmacen {
    id_producto_almacen: string;
    stock: number;
    stock_minimo: number;
    stock_maximo: number;
    estado: EstadoStock;
    producto: Producto;
    id_producto: number;
    almacen: Almacen;
    id_almacen: string;
    created_at: Date;
    updated_at: Date;
    actualizarEstado(): void;
}
