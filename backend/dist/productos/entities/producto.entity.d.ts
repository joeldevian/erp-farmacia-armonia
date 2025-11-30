import { Categoria } from '../../categorias/entities/categoria.entity';
import { Laboratorio } from '../../laboratorios/entities/laboratorio.entity';
export declare enum TipoProducto {
    MEDICAMENTO = "medicamento",
    INSUMO = "insumo",
    HIGIENE = "higiene",
    EQUIPO = "equipo"
}
export declare class Producto {
    id_producto: number;
    nombre: string;
    descripcion: string;
    tipo_producto: TipoProducto;
    codigo_barra: string;
    codigo_interno: string;
    unidad_medida: string;
    concentracion: string;
    presentacion: string;
    requiere_receta: boolean;
    stock_minimo: number;
    stock_maximo: number;
    estado: boolean;
    categoria: Categoria;
    id_categoria: number;
    laboratorio: Laboratorio;
    id_laboratorio: number;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
}
