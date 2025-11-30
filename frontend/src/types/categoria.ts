export interface Categoria {
    id_categoria: number;
    nombre: string;
    descripcion?: string;
    estado: boolean;
    fecha_creacion: string;
    fecha_actualizacion: string;
}

export interface CreateCategoriaDto {
    nombre: string;
    descripcion?: string;
    estado?: boolean;
}

export interface UpdateCategoriaDto {
    nombre?: string;
    descripcion?: string;
    estado?: boolean;
}
