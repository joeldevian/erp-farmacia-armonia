import { OrdenCompra } from './orden-compra.entity';
import { Producto } from '../../productos/entities/producto.entity';
export declare class OrdenCompraDetalle {
    id_orden_compra_detalle: string;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
    id_orden_compra: string;
    id_producto: number;
    ordenCompra: OrdenCompra;
    producto: Producto;
    created_at: Date;
    updated_at: Date;
}
