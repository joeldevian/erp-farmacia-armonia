import { Repository } from 'typeorm';
import { ProveedorProducto, EstadoProveedorProducto } from './entities/proveedor-producto.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { Producto } from '../productos/entities/producto.entity';
import type { CreateProveedorProductoDto } from './dto/create-proveedor-producto.dto';
import type { UpdateProveedorProductoDto } from './dto/update-proveedor-producto.dto';
export declare class ProveedorProductoService {
    private readonly proveedorProductoRepository;
    private readonly proveedorRepository;
    private readonly productoRepository;
    constructor(proveedorProductoRepository: Repository<ProveedorProducto>, proveedorRepository: Repository<Proveedor>, productoRepository: Repository<Producto>);
    findAll(filtros?: {
        id_proveedor?: string;
        id_producto?: number;
        estado?: EstadoProveedorProducto;
    }): Promise<ProveedorProducto[]>;
    findOne(id: string): Promise<ProveedorProducto>;
    create(createDto: CreateProveedorProductoDto): Promise<ProveedorProducto>;
    update(id: string, updateDto: UpdateProveedorProductoDto): Promise<ProveedorProducto>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findByProducto(id_producto: number): Promise<ProveedorProducto[]>;
    findMejorProveedor(id_producto: number): Promise<ProveedorProducto | null>;
    private validateProveedorExists;
    private validateProductoExists;
    private validateRelacionNoExiste;
}
