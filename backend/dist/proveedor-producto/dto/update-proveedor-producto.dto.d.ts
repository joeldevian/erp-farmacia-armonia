import { CreateProveedorProductoDto } from './create-proveedor-producto.dto';
import { EstadoProveedorProducto } from '../entities/proveedor-producto.entity';
declare const UpdateProveedorProductoDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProveedorProductoDto>>;
export declare class UpdateProveedorProductoDto extends UpdateProveedorProductoDto_base {
    estado?: EstadoProveedorProducto;
}
export {};
