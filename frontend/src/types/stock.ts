import type { Producto } from './producto';

export enum EstadoStock {
    NORMAL = 'normal',
    BAJO_STOCK = 'bajo_stock',
    SIN_STOCK = 'sin_stock',
}

export interface Stock {
    id_stock: string;
    cantidad_total: number;
    cantidad_disponible: number;
    cantidad_reservada: number;
    estado: EstadoStock;
    id_producto: number;
    producto?: Producto;
    created_at: Date | string;
    updated_at: Date | string;
}

export interface CreateStockDto {
    cantidad_total: number;
    cantidad_reservada: number;
    id_producto: number;
}

export interface UpdateStockDto {
    cantidad_total?: number;
    cantidad_reservada?: number;
    id_producto?: number;
}
