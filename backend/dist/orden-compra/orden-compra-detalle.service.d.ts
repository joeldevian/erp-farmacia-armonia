import { Repository } from 'typeorm';
import type { CreateOrdenCompraDetalleDto } from './dto/create-orden-compra-detalle.dto';
import type { UpdateOrdenCompraDetalleDto } from './dto/update-orden-compra-detalle.dto';
import { OrdenCompraDetalle } from './entities/orden-compra-detalle.entity';
import { OrdenCompra } from './entities/orden-compra.entity';
import { Producto } from '../productos/entities/producto.entity';
import { OrdenCompraService } from './orden-compra.service';
export declare class OrdenCompraDetalleService {
    private readonly detalleRepository;
    private readonly ordenCompraRepository;
    private readonly productoRepository;
    private readonly ordenCompraService;
    constructor(detalleRepository: Repository<OrdenCompraDetalle>, ordenCompraRepository: Repository<OrdenCompra>, productoRepository: Repository<Producto>, ordenCompraService: OrdenCompraService);
    create(createDetalleDto: CreateOrdenCompraDetalleDto): Promise<OrdenCompraDetalle>;
    findByOrden(id_orden_compra: string): Promise<OrdenCompraDetalle[]>;
    findOne(id: string): Promise<OrdenCompraDetalle>;
    update(id: string, updateDetalleDto: UpdateOrdenCompraDetalleDto): Promise<OrdenCompraDetalle>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
