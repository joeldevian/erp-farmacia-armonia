import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsEnum,
    IsInt,
    IsBoolean,
    Min,
    Length,
} from 'class-validator';
import { TipoProducto } from '../entities/producto.entity';

export class CreateProductoDto {
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString()
    @Length(1, 255, { message: 'El nombre debe tener entre 1 y 255 caracteres' })
    nombre: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsNotEmpty({ message: 'El tipo de producto es requerido' })
    @IsEnum(TipoProducto, { message: 'Tipo de producto inválido' })
    tipo_producto: TipoProducto;

    @IsOptional()
    @IsString()
    @Length(0, 100)
    codigo_barra?: string;

    @IsNotEmpty({ message: 'El código interno es requerido' })
    @IsString()
    @Length(1, 100, {
        message: 'El código interno debe tener entre 1 y 100 caracteres',
    })
    codigo_interno: string;

    @IsNotEmpty({ message: 'La categoría es requerida' })
    @IsInt({ message: 'La categoría debe ser un número' })
    @Min(1, { message: 'La categoría debe ser válida' })
    id_categoria: number;

    @IsNotEmpty({ message: 'El laboratorio es requerido' })
    @IsInt({ message: 'El laboratorio debe ser un número' })
    @Min(1, { message: 'El laboratorio debe ser válido' })
    id_laboratorio: number;

    @IsNotEmpty({ message: 'La unidad de medida es requerida' })
    @IsString()
    @Length(1, 100)
    unidad_medida: string;

    @IsOptional()
    @IsString()
    @Length(0, 255)
    concentracion?: string;

    @IsOptional()
    @IsString()
    @Length(0, 255)
    presentacion?: string;

    @IsOptional()
    @IsBoolean()
    requiere_receta?: boolean;

    @IsNotEmpty({ message: 'El stock mínimo es requerido' })
    @IsInt({ message: 'El stock mínimo debe ser un número entero' })
    @Min(0, { message: 'El stock mínimo debe ser mayor o igual a 0' })
    stock_minimo: number;

    @IsNotEmpty({ message: 'El stock máximo es requerido' })
    @IsInt({ message: 'El stock máximo debe ser un número entero' })
    @Min(1, { message: 'El stock máximo debe ser mayor a 0' })
    stock_maximo: number;
}
