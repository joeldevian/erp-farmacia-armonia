import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdenCompraDto } from './create-orden-compra.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { EstadoOrdenCompra } from '../entities/orden-compra.entity';

export class UpdateOrdenCompraDto extends PartialType(CreateOrdenCompraDto) {
    @IsEnum(EstadoOrdenCompra, {
        message: 'El estado debe ser: pendiente, aprobada, rechazada, recibida o anulada',
    })
    @IsOptional()
    estado?: EstadoOrdenCompra;
}
