export enum EstadoLote {
    ACTIVO = 'activo',
    EXPIRADO = 'expirado',
    AGOTADO = 'agotado',
}

export interface Lote {
    id_lote: string;
    codigo_lote: string;
    fecha_fabricacion: Date | string;
    fecha_vencimiento: Date | string;
    cantidad_inicial: number;
    cantidad_actual: number;
    estado: EstadoLote;
    id_producto: number;
    created_at: Date | string;
    updated_at: Date | string;
    // Relación
    producto?: {
        id_producto: number;
        nombre: string;
        codigo_interno: string;
    };
}

export interface CreateLoteDto {
    codigo_lote: string;
    fecha_fabricacion: string;
    fecha_vencimiento: string;
    cantidad_inicial: number;
    cantidad_actual: number;
    id_producto: number;
}

export interface UpdateLoteDto extends Partial<CreateLoteDto> { }
