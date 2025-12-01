export enum TipoAlmacen {
    PRINCIPAL = 'principal',
    SECUNDARIO = 'secundario',
    TRANSITORIO = 'transitorio',
}

export enum EstadoAlmacen {
    ACTIVO = 'activo',
    INACTIVO = 'inactivo',
}

export interface Almacen {
    id_almacen: string;
    nombre: string;
    descripcion?: string;
    ubicacion: string;
    capacidad_total: number;
    capacidad_ocupada: number;
    tipo: TipoAlmacen;
    estado: EstadoAlmacen;
    created_at: Date | string;
    updated_at: Date | string;
}

export interface CreateAlmacenDto {
    nombre: string;
    descripcion?: string;
    ubicacion: string;
    capacidad_total: number;
    capacidad_ocupada: number;
    tipo: TipoAlmacen;
}

export interface UpdateAlmacenDto {
    nombre?: string;
    descripcion?: string;
    ubicacion?: string;
    capacidad_total?: number;
    capacidad_ocupada?: number;
    tipo?: TipoAlmacen;
}
