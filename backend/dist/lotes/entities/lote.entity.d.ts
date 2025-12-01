import { Producto } from '../../productos/entities/producto.entity';
export declare enum EstadoLote {
    ACTIVO = "activo",
    EXPIRADO = "expirado",
    AGOTADO = "agotado"
}
export declare class Lote {
    id_lote: string;
    codigo_lote: string;
    fecha_fabricacion: Date;
    fecha_vencimiento: Date;
    cantidad_inicial: number;
    cantidad_actual: number;
    estado: EstadoLote;
    producto: Producto;
    id_producto: number;
    created_at: Date;
    updated_at: Date;
    actualizarEstado(): void;
}
