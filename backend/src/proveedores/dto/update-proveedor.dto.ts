import { PartialType } from '@nestjs/mapped-types';
import { CreateProveedorDto } from './create-proveedor.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { EstadoProveedor } from '../entities/proveedor.entity';

export class UpdateProveedorDto extends PartialType(CreateProveedorDto) {
    @IsEnum(EstadoProveedor)
    @IsOptional()
    estado?: EstadoProveedor;
}
