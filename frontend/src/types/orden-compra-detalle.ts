export interface OrdenCompraDetalle {
    id_orden_compra_detalle: string;
    id_orden_compra: string;
    id_producto: number;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
    producto?: {
        id_producto: number;
        nombre: string;
        codigo_barras?: string;
    };
    created_at: string;
    updated_at: string;
}

export interface CreateOrdenCompraDetalleDto {
    id_orden_compra: string;
    id_producto: number;
    cantidad: number;
    precio_unitario: number;
}

export interface UpdateOrdenCompraDetalleDto {
    id_orden_compra?: string;
    id_producto?: number;
    cantidad?: number;
    precio_unitario?: number;
}
