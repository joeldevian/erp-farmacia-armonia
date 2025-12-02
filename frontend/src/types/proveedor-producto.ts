import type { Proveedor } from './proveedor';
import type { Producto } from './producto';

export enum CalidadProveedor {
    ALTA = 'alta',
    MEDIA = 'media',
    BAJA = 'baja',
}

export enum EstadoProveedorProducto {
    ACTIVO = 'activo',
    INACTIVO = 'inactivo',
}

export interface ProveedorProducto {
    id_proveedor_producto: string;
    precio_referencia: number;
    tiempo_entrega_dias?: number;
    calidad: CalidadProveedor;
    estado: EstadoProveedorProducto;
    proveedor: Proveedor;
    producto: Producto;
    id_proveedor: string;
    id_producto: number;
    created_at: Date;
    updated_at: Date;
}

export interface CreateProveedorProductoDto {
    id_proveedor: string;
    id_producto: number;
    precio_referencia: number;
    tiempo_entrega_dias?: number;
    calidad?: CalidadProveedor;
}

export interface UpdateProveedorProductoDto
    extends Partial<CreateProveedorProductoDto> {
    estado?: EstadoProveedorProducto;
}
