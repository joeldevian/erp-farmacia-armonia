import {
    IsNotEmpty,
    IsString,
    IsDateString,
    IsNumber,
    IsOptional,
    IsUUID,
    Min,
} from 'class-validator';

export class CreateOrdenCompraDto {
    @IsDateString({}, { message: 'La fecha de emisión debe ser válida' })
    @IsNotEmpty({ message: 'La fecha de emisión es requerida' })
    fecha_emision: string;

    @IsDateString({}, { message: 'La fecha de entrega estimada debe ser válida' })
    @IsNotEmpty({ message: 'La fecha de entrega estimada es requerida' })
    fecha_entrega_estimada: string;

    @IsUUID('4', { message: 'El ID del proveedor debe ser un UUID válido' })
    @IsNotEmpty({ message: 'El proveedor es requerido' })
    id_proveedor: string;

    @IsUUID('4', { message: 'El ID del almacén debe ser un UUID válido' })
    @IsNotEmpty({ message: 'El almacén es requerido' })
    id_almacen: string;

    @IsNumber(
        { maxDecimalPlaces: 2 },
        { message: 'El subtotal debe tener máximo 2 decimales' },
    )
    @Min(0, { message: 'El subtotal debe ser mayor o igual a 0' })
    @IsOptional()
    subtotal?: number;

    @IsNumber(
        { maxDecimalPlaces: 2 },
        { message: 'Los impuestos deben tener máximo 2 decimales' },
    )
    @Min(0, { message: 'Los impuestos deben ser mayor o igual a 0' })
    @IsNotEmpty({ message: 'Los impuestos son requeridos' })
    impuestos: number;

    @IsNumber(
        { maxDecimalPlaces: 2 },
        { message: 'El total debe tener máximo 2 decimales' },
    )
    @Min(0, { message: 'El total debe ser mayor o igual a 0' })
    @IsOptional()
    total?: number;

    @IsString({ message: 'Las observaciones deben ser texto' })
    @IsOptional()
    observaciones?: string;
}
