import { Repository } from 'typeorm';
import { Almacen, TipoAlmacen, EstadoAlmacen } from './entities/almacen.entity';
import type { CreateAlmacenDto } from './dto/create-almacen.dto';
import type { UpdateAlmacenDto } from './dto/update-almacen.dto';
export declare class AlmacenesService {
    private readonly almacenRepository;
    constructor(almacenRepository: Repository<Almacen>);
    findAll(filtros?: {
        tipo?: TipoAlmacen;
        estado?: EstadoAlmacen;
    }): Promise<Almacen[]>;
    findOne(id: string): Promise<Almacen>;
    create(createAlmacenDto: CreateAlmacenDto): Promise<Almacen>;
    update(id: string, updateAlmacenDto: UpdateAlmacenDto): Promise<Almacen>;
    remove(id: string): Promise<{
        message: string;
        entity: Almacen;
    }>;
    hardDelete(id: string): Promise<void>;
    getResumenInventario(id: string): Promise<any>;
    private validateNombreUnico;
    private validateCapacidades;
}
