import {
    IsUUID,
    IsNumber,
    Min,
    IsInt,
    IsEnum,
    IsOptional,
} from 'class-validator';
import { CalidadProveedor } from '../entities/proveedor-producto.entity';

export class CreateProveedorProductoDto {
    @IsUUID('4', { message: 'El ID del proveedor debe ser un UUID válido' })
    id_proveedor: string;

    @IsNumber({}, { message: 'El ID del producto debe ser un número' })
    id_producto: number;

    @IsNumber(
        { maxDecimalPlaces: 2 },
        { message: 'El precio debe tener máximo 2 decimales' },
    )
    @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
    precio_referencia: number;

    @IsInt({ message: 'El tiempo de entrega debe ser un número entero' })
    @Min(1, { message: 'El tiempo de entrega debe ser al menos 1 día' })
    @IsOptional()
    tiempo_entrega_dias?: number;

    @IsEnum(CalidadProveedor, {
        message: 'La calidad debe ser: alta, media o baja',
    })
    @IsOptional()
    calidad?: CalidadProveedor;
}
