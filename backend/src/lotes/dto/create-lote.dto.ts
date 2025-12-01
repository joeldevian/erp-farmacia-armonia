import {
    IsNotEmpty,
    IsString,
    IsInt,
    IsDateString,
    Min,
    Length,
} from 'class-validator';

export class CreateLoteDto {
    @IsNotEmpty({ message: 'El código de lote es requerido' })
    @IsString()
    @Length(1, 100, {
        message: 'El código de lote debe tener entre 1 y 100 caracteres',
    })
    codigo_lote: string;

    @IsNotEmpty({ message: 'La fecha de fabricación es requerida' })
    @IsDateString({}, { message: 'La fecha de fabricación debe ser válida' })
    fecha_fabricacion: string;

    @IsNotEmpty({ message: 'La fecha de vencimiento es requerida' })
    @IsDateString({}, { message: 'La fecha de vencimiento debe ser válida' })
    fecha_vencimiento: string;

    @IsNotEmpty({ message: 'La cantidad inicial es requerida' })
    @IsInt({ message: 'La cantidad inicial debe ser un número entero' })
    @Min(1, { message: 'La cantidad inicial debe ser mayor a 0' })
    cantidad_inicial: number;

    @IsNotEmpty({ message: 'La cantidad actual es requerida' })
    @IsInt({ message: 'La cantidad actual debe ser un número entero' })
    @Min(0, { message: 'La cantidad actual debe ser mayor o igual a 0' })
    cantidad_actual: number;

    @IsNotEmpty({ message: 'El producto es requerido' })
    @IsInt({ message: 'El producto debe ser un número' })
    @Min(1, { message: 'El producto debe ser válido' })
    id_producto: number;
}
