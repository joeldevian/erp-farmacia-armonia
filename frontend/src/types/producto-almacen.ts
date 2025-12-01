import type { Producto } from './producto';
import type { Almacen } from './almacen';

export enum EstadoStock {
    NORMAL = 'normal',
    BAJO_STOCK = 'bajo_stock',
    SOBRE_STOCK = 'sobre_stock',
}

export interface ProductoAlmacen {
    id_producto_almacen: string;
    stock: number;
    stock_minimo: number;
    stock_maximo: number;
    estado: EstadoStock;
    id_producto: number;
    id_almacen: string;
    producto?: Producto;
    almacen?: Almacen;
    created_at: Date | string;
    updated_at: Date | string;
}

export interface CreateProductoAlmacenDto {
    stock: number;
    stock_minimo: number;
    stock_maximo: number;
    id_producto: number;
    id_almacen: string;
}

export interface UpdateProductoAlmacenDto {
    stock?: number;
    stock_minimo?: number;
    stock_maximo?: number;
    id_producto?: number;
    id_almacen?: string;
}
