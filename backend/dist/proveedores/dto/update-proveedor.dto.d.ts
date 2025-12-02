import { CreateProveedorDto } from './create-proveedor.dto';
import { EstadoProveedor } from '../entities/proveedor.entity';
declare const UpdateProveedorDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProveedorDto>>;
export declare class UpdateProveedorDto extends UpdateProveedorDto_base {
    estado?: EstadoProveedor;
}
export {};
