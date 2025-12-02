import { Repository } from 'typeorm';
import { Proveedor, EstadoProveedor } from './entities/proveedor.entity';
import { ProveedorProducto } from '../proveedor-producto/entities/proveedor-producto.entity';
import type { CreateProveedorDto } from './dto/create-proveedor.dto';
import type { UpdateProveedorDto } from './dto/update-proveedor.dto';
export declare class ProveedoresService {
    private readonly proveedorRepository;
    private readonly proveedorProductoRepository;
    constructor(proveedorRepository: Repository<Proveedor>, proveedorProductoRepository: Repository<ProveedorProducto>);
    findAll(filtros?: {
        estado?: EstadoProveedor;
    }): Promise<Proveedor[]>;
    findOne(id: string): Promise<Proveedor>;
    create(createProveedorDto: CreateProveedorDto): Promise<Proveedor>;
    update(id: string, updateProveedorDto: UpdateProveedorDto): Promise<Proveedor>;
    remove(id: string): Promise<{
        message: string;
        entity: Proveedor;
    }>;
    hardDelete(id: string): Promise<void>;
    private validateRucUnico;
    private validateEmailUnico;
    private validateRazonSocialUnica;
}
