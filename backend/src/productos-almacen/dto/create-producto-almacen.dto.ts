import {
    IsNotEmpty,
    IsInt,
    IsString,
    Min,
} from 'class-validator';

export class CreateProductoAlmacenDto {
    @IsNotEmpty({ message: 'El stock es requerido' })
    @IsInt({ message: 'El stock debe ser un número entero' })
    @Min(0, { message: 'El stock debe ser mayor o igual a 0' })
    stock: number;

    @IsNotEmpty({ message: 'El stock mínimo es requerido' })
    @IsInt({ message: 'El stock mínimo debe ser un número entero' })
    @Min(0, { message: 'El stock mínimo debe ser mayor o igual a 0' })
    stock_minimo: number;

    @IsNotEmpty({ message: 'El stock máximo es requerido' })
    @IsInt({ message: 'El stock máximo debe ser un número entero' })
    @Min(1, { message: 'El stock máximo debe ser mayor a 0' })
    stock_maximo: number;

    @IsNotEmpty({ message: 'El producto es requerido' })
    @IsInt({ message: 'El producto debe ser un número' })
    @Min(1, { message: 'El producto debe ser válido' })
    id_producto: number;

    @IsNotEmpty({ message: 'El almacén es requerido' })
    @IsString()
    id_almacen: string;
}
