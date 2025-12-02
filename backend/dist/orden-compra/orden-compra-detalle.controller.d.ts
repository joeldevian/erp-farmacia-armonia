import { OrdenCompraDetalleService } from './orden-compra-detalle.service';
import type { CreateOrdenCompraDetalleDto } from './dto/create-orden-compra-detalle.dto';
import type { UpdateOrdenCompraDetalleDto } from './dto/update-orden-compra-detalle.dto';
export declare class OrdenCompraDetalleController {
    private readonly detalleService;
    constructor(detalleService: OrdenCompraDetalleService);
    create(createDetalleDto: CreateOrdenCompraDetalleDto): Promise<import("./entities/orden-compra-detalle.entity").OrdenCompraDetalle>;
    findByOrden(id: string): Promise<import("./entities/orden-compra-detalle.entity").OrdenCompraDetalle[]>;
    findOne(id: string): Promise<import("./entities/orden-compra-detalle.entity").OrdenCompraDetalle>;
    update(id: string, updateDetalleDto: UpdateOrdenCompraDetalleDto): Promise<import("./entities/orden-compra-detalle.entity").OrdenCompraDetalle>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
