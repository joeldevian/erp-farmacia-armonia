import { CalidadProveedor } from '../entities/proveedor-producto.entity';
export declare class CreateProveedorProductoDto {
    id_proveedor: string;
    id_producto: number;
    precio_referencia: number;
    tiempo_entrega_dias?: number;
    calidad?: CalidadProveedor;
}
