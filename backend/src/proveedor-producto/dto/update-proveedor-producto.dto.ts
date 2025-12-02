import { PartialType } from '@nestjs/mapped-types';
import { CreateProveedorProductoDto } from './create-proveedor-producto.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { EstadoProveedorProducto } from '../entities/proveedor-producto.entity';

export class UpdateProveedorProductoDto extends PartialType(
    CreateProveedorProductoDto,
) {
    @IsEnum(EstadoProveedorProducto)
    @IsOptional()
    estado?: EstadoProveedorProducto;
}
