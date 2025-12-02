import { Proveedor } from '../../proveedores/entities/proveedor.entity';
import { Almacen } from '../../almacenes/entities/almacen.entity';
import { OrdenCompraDetalle } from './orden-compra-detalle.entity';
export declare enum EstadoOrdenCompra {
    PENDIENTE = "pendiente",
    APROBADA = "aprobada",
    RECHAZADA = "rechazada",
    RECIBIDA = "recibida",
    ANULADA = "anulada"
}
export declare class OrdenCompra {
    id_orden_compra: string;
    numero_orden: string;
    fecha_emision: Date;
    fecha_entrega_estimada: Date;
    subtotal: number;
    impuestos: number;
    total: number;
    estado: EstadoOrdenCompra;
    observaciones?: string;
    id_proveedor: string;
    proveedor: Proveedor;
    id_almacen: string;
    almacen: Almacen;
    detalles: OrdenCompraDetalle[];
    created_at: Date;
    updated_at: Date;
}
