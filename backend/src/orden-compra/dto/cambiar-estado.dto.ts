import { IsEnum, IsNotEmpty } from 'class-validator';
import { EstadoOrdenCompra } from '../entities/orden-compra.entity';

export class CambiarEstadoDto {
    @IsEnum(EstadoOrdenCompra, {
        message: 'El estado debe ser: pendiente, aprobada, rechazada, recibida o anulada',
    })
    @IsNotEmpty({ message: 'El estado es requerido' })
    estado: EstadoOrdenCompra;
}
