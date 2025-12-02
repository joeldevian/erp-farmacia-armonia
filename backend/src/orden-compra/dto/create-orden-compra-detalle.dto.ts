import { IsNotEmpty, IsNumber, IsUUID, Min, IsInt } from 'class-validator';

export class CreateOrdenCompraDetalleDto {
    @IsUUID('4', { message: 'El ID de la orden debe ser un UUID válido' })
    @IsNotEmpty({ message: 'La orden de compra es requerida' })
    id_orden_compra: string;

    @IsInt({ message: 'El ID del producto debe ser un número entero' })
    @IsNotEmpty({ message: 'El producto es requerido' })
    id_producto: number;

    @IsInt({ message: 'La cantidad debe ser un número entero' })
    @Min(1, { message: 'La cantidad debe ser mayor a 0' })
    @IsNotEmpty({ message: 'La cantidad es requerida' })
    cantidad: number;

    @IsNumber(
        { maxDecimalPlaces: 2 },
        { message: 'El precio unitario debe tener máximo 2 decimales' },
    )
    @Min(0.01, { message: 'El precio unitario debe ser mayor a 0' })
    @IsNotEmpty({ message: 'El precio unitario es requerido' })
    precio_unitario: number;
}
