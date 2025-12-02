export enum EstadoProveedor {
    ACTIVO = 'activo',
    INACTIVO = 'inactivo',
}

export interface Proveedor {
    id_proveedor: string;
    razon_social: string;
    nombre_comercial: string;
    ruc: string;
    telefono?: string;
    email: string;
    direccion: string;
    pagina_web?: string;
    descripcion?: string;
    estado: EstadoProveedor;
    created_at: Date;
    updated_at: Date;
}

export interface CreateProveedorDto {
    razon_social: string;
    nombre_comercial: string;
    ruc: string;
    telefono?: string;
    email: string;
    direccion: string;
    pagina_web?: string;
    descripcion?: string;
}

export interface UpdateProveedorDto extends Partial<CreateProveedorDto> {
    estado?: EstadoProveedor;
}
