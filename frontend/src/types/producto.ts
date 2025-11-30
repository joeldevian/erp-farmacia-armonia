export enum TipoProducto {
    MEDICAMENTO = 'medicamento',
    INSUMO = 'insumo',
    HIGIENE = 'higiene',
    EQUIPO = 'equipo',
}

export interface Producto {
    id_producto: number;
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
    requiere_receta: boolean;
    stock_minimo: number;
    stock_maximo: number;
    estado: boolean;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
    // Relaciones
    categoria?: {
        id_categoria: number;
        nombre: string;
    };
    laboratorio?: {
        id_laboratorio: number;
        nombre: string;
    };
}

export interface CreateProductoDto {
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

export interface UpdateProductoDto extends Partial<CreateProductoDto> { }
