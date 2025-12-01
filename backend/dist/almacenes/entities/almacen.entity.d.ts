import { ProductoAlmacen } from '../../productos-almacen/entities/producto-almacen.entity';
export declare enum TipoAlmacen {
    PRINCIPAL = "principal",
    SECUNDARIO = "secundario",
    TRANSITORIO = "transitorio"
}
export declare enum EstadoAlmacen {
    ACTIVO = "activo",
    INACTIVO = "inactivo"
}
export declare class Almacen {
    id_almacen: string;
    nombre: string;
    descripcion: string;
    ubicacion: string;
    capacidad_total: number;
    capacidad_ocupada: number;
    tipo: TipoAlmacen;
    estado: EstadoAlmacen;
    productosAlmacen: ProductoAlmacen[];
    created_at: Date;
    updated_at: Date;
}
