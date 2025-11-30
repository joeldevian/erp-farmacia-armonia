export interface Laboratorio {
    id_laboratorio: number;
    nombre: string;
    direccion?: string;
    telefono?: string;
    correo?: string;
    ruc?: string;
    estado: boolean;
    fecha_creacion: string;
    fecha_actualizacion: string;
}

export interface CreateLaboratorioDto {
    nombre: string;
    direccion?: string;
    telefono?: string;
    correo?: string;
    ruc?: string;
}

export interface UpdateLaboratorioDto extends Partial<CreateLaboratorioDto> { }
