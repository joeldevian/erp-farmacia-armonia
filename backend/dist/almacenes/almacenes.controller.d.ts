import { AlmacenesService } from './almacenes.service';
import type { CreateAlmacenDto } from './dto/create-almacen.dto';
import type { UpdateAlmacenDto } from './dto/update-almacen.dto';
import { TipoAlmacen, EstadoAlmacen } from './entities/almacen.entity';
export declare class AlmacenesController {
    private readonly almacenesService;
    constructor(almacenesService: AlmacenesService);
    create(createAlmacenDto: CreateAlmacenDto): Promise<import("./entities/almacen.entity").Almacen>;
    findAll(tipo?: TipoAlmacen, estado?: EstadoAlmacen): Promise<import("./entities/almacen.entity").Almacen[]>;
    findOne(id: string): Promise<import("./entities/almacen.entity").Almacen>;
    getResumenInventario(id: string): Promise<any>;
    update(id: string, updateAlmacenDto: UpdateAlmacenDto): Promise<import("./entities/almacen.entity").Almacen>;
    remove(id: string): Promise<{
        message: string;
        entity: import("./entities/almacen.entity").Almacen;
    }>;
    hardDelete(id: string): Promise<void>;
}
