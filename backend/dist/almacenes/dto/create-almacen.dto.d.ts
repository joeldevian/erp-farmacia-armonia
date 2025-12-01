import { TipoAlmacen } from '../entities/almacen.entity';
export declare class CreateAlmacenDto {
    nombre: string;
    descripcion?: string;
    ubicacion: string;
    capacidad_total: number;
    capacidad_ocupada: number;
    tipo: TipoAlmacen;
}
