import { TipoProducto } from '../entities/producto.entity';
export declare class CreateProductoDto {
    nombre: string;
    descripcion?: string;
    tipo_producto: TipoProducto;
    codigo_barra?: string;
    codigo_interno: string;
    id_categoria: number;
    id_laboratorio: number;
    unidad_medida: string;
    concentracion?: string;
    presentacion?: string;
    requiere_receta?: boolean;
    stock_minimo: number;
    stock_maximo: number;
}
