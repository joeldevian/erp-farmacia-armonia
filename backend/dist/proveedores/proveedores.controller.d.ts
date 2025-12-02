import { ProveedoresService } from './proveedores.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import type { Proveedor } from './entities/proveedor.entity';
import { EstadoProveedor } from './entities/proveedor.entity';
export declare class ProveedoresController {
    private readonly proveedoresService;
    constructor(proveedoresService: ProveedoresService);
    findAll(estado?: EstadoProveedor): Promise<Proveedor[]>;
    findOne(id: string): Promise<Proveedor>;
    create(createProveedorDto: CreateProveedorDto): Promise<Proveedor>;
    update(id: string, updateProveedorDto: UpdateProveedorDto): Promise<Proveedor>;
    remove(id: string): Promise<{
        message: string;
        entity: Proveedor;
    }>;
    hardDelete(id: string): Promise<{
        message: string;
    }>;
}
