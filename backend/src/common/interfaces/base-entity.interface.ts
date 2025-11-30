export interface BaseEntity {
    id?: number;
    estado?: boolean;
    fecha_creacion?: Date;
    fecha_actualizacion?: Date;
}

export interface FindAllOptions {
    [key: string]: any;
}
