import { Proveedor } from '../../proveedores/entities/proveedor.entity';
import { Producto } from '../../productos/entities/producto.entity';
export declare enum CalidadProveedor {
    ALTA = "alta",
    MEDIA = "media",
    BAJA = "baja"
}
export declare enum EstadoProveedorProducto {
    ACTIVO = "activo",
    INACTIVO = "inactivo"
}
export declare class ProveedorProducto {
    id_proveedor_producto: string;
    precio_referencia: number;
    tiempo_entrega_dias: number;
    calidad: CalidadProveedor;
    estado: EstadoProveedorProducto;
    proveedor: Proveedor;
    id_proveedor: string;
    producto: Producto;
    id_producto: number;
    created_at: Date;
    updated_at: Date;
}
