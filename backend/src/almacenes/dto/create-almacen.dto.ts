import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsInt,
    IsEnum,
    Min,
    Length,
} from 'class-validator';
import { TipoAlmacen } from '../entities/almacen.entity';

export class CreateAlmacenDto {
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString()
    @Length(1, 255, { message: 'El nombre debe tener entre 1 y 255 caracteres' })
    nombre: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsNotEmpty({ message: 'La ubicación es requerida' })
    @IsString()
    @Length(1, 255, { message: 'La ubicación debe tener entre 1 y 255 caracteres' })
    ubicacion: string;

    @IsNotEmpty({ message: 'La capacidad total es requerida' })
    @IsInt({ message: 'La capacidad total debe ser un número entero' })
    @Min(1, { message: 'La capacidad total debe ser mayor a 0' })
    capacidad_total: number;

    @IsNotEmpty({ message: 'La capacidad ocupada es requerida' })
    @IsInt({ message: 'La capacidad ocupada debe ser un número entero' })
    @Min(0, { message: 'La capacidad ocupada debe ser mayor o igual a 0' })
    capacidad_ocupada: number;

    @IsNotEmpty({ message: 'El tipo de almacén es requerido' })
    @IsEnum(TipoAlmacen, { message: 'Tipo de almacén inválido' })
    tipo: TipoAlmacen;
}
