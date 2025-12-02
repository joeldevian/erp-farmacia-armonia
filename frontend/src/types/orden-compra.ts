export enum EstadoOrdenCompra {
    PENDIENTE = 'pendiente',
    APROBADA = 'aprobada',
    RECHAZADA = 'rechazada',
    RECIBIDA = 'recibida',
    ANULADA = 'anulada',
}

export interface OrdenCompra {
    id_orden_compra: string;
    numero_orden: string;
    fecha_emision: string;
    fecha_entrega_estimada: string;
    subtotal: number;
    impuestos: number;
    total: number;
    estado: EstadoOrdenCompra;
    observaciones?: string;
    id_proveedor: string;
    proveedor?: {
        id_proveedor: string;
        razon_social: string;
        ruc: string;
        email: string;
    };
    id_almacen: string;
    almacen?: {
        id_almacen: string;
        nombre: string;
    };
    detalles?: Array<{
        id_orden_compra_detalle: string;
        cantidad: number;
        precio_unitario: number;
        subtotal: number;
        producto: {
            id_producto: number;
            nombre: string;
            codigo_barras?: string;
        };
    }>;
    created_at: string;
    updated_at: string;
}

export interface CreateOrdenCompraDto {
    fecha_emision: string;
    fecha_entrega_estimada: string;
    id_proveedor: string;
    id_almacen: string;
    subtotal?: number;
    impuestos: number;
    total?: number;
    observaciones?: string;
}

export interface UpdateOrdenCompraDto {
    fecha_emision?: string;
    fecha_entrega_estimada?: string;
    id_proveedor?: string;
    id_almacen?: string;
    subtotal?: number;
    impuestos?: number;
    total?: number;
    observaciones?: string;
    estado?: EstadoOrdenCompra;
}

export interface CambiarEstadoDto {
    estado: EstadoOrdenCompra;
}
