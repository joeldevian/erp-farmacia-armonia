import {
    IsNotEmpty,
    IsInt,
    Min,
} from 'class-validator';

export class CreateStockDto {
    @IsNotEmpty({ message: 'La cantidad total es requerida' })
    @IsInt({ message: 'La cantidad total debe ser un número entero' })
    @Min(0, { message: 'La cantidad total debe ser mayor o igual a 0' })
    cantidad_total: number;

    @IsNotEmpty({ message: 'La cantidad reservada es requerida' })
    @IsInt({ message: 'La cantidad reservada debe ser un número entero' })
    @Min(0, { message: 'La cantidad reservada debe ser mayor o igual a 0' })
    cantidad_reservada: number;

    @IsNotEmpty({ message: 'El producto es requerido' })
    @IsInt({ message: 'El producto debe ser un número' })
    @Min(1, { message: 'El producto debe ser válido' })
    id_producto: number;
}
