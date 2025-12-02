import { CreateOrdenCompraDto } from './create-orden-compra.dto';
import { EstadoOrdenCompra } from '../entities/orden-compra.entity';
declare const UpdateOrdenCompraDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateOrdenCompraDto>>;
export declare class UpdateOrdenCompraDto extends UpdateOrdenCompraDto_base {
    estado?: EstadoOrdenCompra;
}
export {};
