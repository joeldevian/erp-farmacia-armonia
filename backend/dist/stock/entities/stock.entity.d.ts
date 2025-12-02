import { Producto } from '../../productos/entities/producto.entity';
export declare enum EstadoStock {
    NORMAL = "normal",
    BAJO_STOCK = "bajo_stock",
    SIN_STOCK = "sin_stock"
}
export declare class Stock {
    id_stock: string;
    cantidad_total: number;
    cantidad_disponible: number;
    cantidad_reservada: number;
    estado: EstadoStock;
    producto: Producto;
    id_producto: number;
    created_at: Date;
    updated_at: Date;
    recalcular(): void;
}
