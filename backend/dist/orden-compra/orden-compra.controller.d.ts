import { OrdenCompraService } from './orden-compra.service';
import type { CreateOrdenCompraDto } from './dto/create-orden-compra.dto';
import type { UpdateOrdenCompraDto } from './dto/update-orden-compra.dto';
import type { CambiarEstadoDto } from './dto/cambiar-estado.dto';
import type { EstadoOrdenCompra } from './entities/orden-compra.entity';
export declare class OrdenCompraController {
    private readonly ordenCompraService;
    constructor(ordenCompraService: OrdenCompraService);
    create(createOrdenCompraDto: CreateOrdenCompraDto): Promise<import("./entities/orden-compra.entity").OrdenCompra>;
    findAll(estado?: EstadoOrdenCompra, id_proveedor?: string): Promise<import("./entities/orden-compra.entity").OrdenCompra[]>;
    findPendientes(): Promise<import("./entities/orden-compra.entity").OrdenCompra[]>;
    findByProveedor(id: string): Promise<import("./entities/orden-compra.entity").OrdenCompra[]>;
    findOne(id: string): Promise<import("./entities/orden-compra.entity").OrdenCompra>;
    update(id: string, updateOrdenCompraDto: UpdateOrdenCompraDto): Promise<import("./entities/orden-compra.entity").OrdenCompra>;
    cambiarEstado(id: string, cambiarEstadoDto: CambiarEstadoDto): Promise<import("./entities/orden-compra.entity").OrdenCompra>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
