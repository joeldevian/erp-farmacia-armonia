import type { ProveedorProducto } from '../../proveedor-producto/entities/proveedor-producto.entity';
export declare enum EstadoProveedor {
    ACTIVO = "activo",
    INACTIVO = "inactivo"
}
export declare class Proveedor {
    id_proveedor: string;
    razon_social: string;
    nombre_comercial: string;
    ruc: string;
    telefono: string;
    email: string;
    direccion: string;
    pagina_web: string;
    descripcion: string;
    estado: EstadoProveedor;
    proveedorProductos: ProveedorProducto[];
    created_at: Date;
    updated_at: Date;
}
