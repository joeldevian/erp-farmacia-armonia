import { ProveedorProductoService } from './proveedor-producto.service';
import { CreateProveedorProductoDto } from './dto/create-proveedor-producto.dto';
import { UpdateProveedorProductoDto } from './dto/update-proveedor-producto.dto';
import type { ProveedorProducto } from './entities/proveedor-producto.entity';
import { EstadoProveedorProducto } from './entities/proveedor-producto.entity';
export declare class ProveedorProductoController {
    private readonly proveedorProductoService;
    constructor(proveedorProductoService: ProveedorProductoService);
    findAll(id_proveedor?: string, id_producto?: number, estado?: EstadoProveedorProducto): Promise<ProveedorProducto[]>;
    findByProducto(id: number): Promise<ProveedorProducto[]>;
    findMejorProveedor(id: number): Promise<ProveedorProducto | null>;
    findOne(id: string): Promise<ProveedorProducto>;
    create(createDto: CreateProveedorProductoDto): Promise<ProveedorProducto>;
    update(id: string, updateDto: UpdateProveedorProductoDto): Promise<ProveedorProducto>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
