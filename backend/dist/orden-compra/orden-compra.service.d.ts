import { Repository, DataSource } from 'typeorm';
import type { CreateOrdenCompraDto } from './dto/create-orden-compra.dto';
import type { UpdateOrdenCompraDto } from './dto/update-orden-compra.dto';
import type { CambiarEstadoDto } from './dto/cambiar-estado.dto';
import { OrdenCompra, EstadoOrdenCompra } from './entities/orden-compra.entity';
import { OrdenCompraDetalle } from './entities/orden-compra-detalle.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { Almacen } from '../almacenes/entities/almacen.entity';
import { Stock } from '../stock/entities/stock.entity';
import { ProductoAlmacen } from '../productos-almacen/entities/producto-almacen.entity';
import { Lote } from '../lotes/entities/lote.entity';
import { Producto } from '../productos/entities/producto.entity';
export declare class OrdenCompraService {
    private readonly ordenCompraRepository;
    private readonly detalleRepository;
    private readonly proveedorRepository;
    private readonly almacenRepository;
    private readonly stockRepository;
    private readonly productoAlmacenRepository;
    private readonly loteRepository;
    private readonly productoRepository;
    private readonly dataSource;
    constructor(ordenCompraRepository: Repository<OrdenCompra>, detalleRepository: Repository<OrdenCompraDetalle>, proveedorRepository: Repository<Proveedor>, almacenRepository: Repository<Almacen>, stockRepository: Repository<Stock>, productoAlmacenRepository: Repository<ProductoAlmacen>, loteRepository: Repository<Lote>, productoRepository: Repository<Producto>, dataSource: DataSource);
    create(createOrdenCompraDto: CreateOrdenCompraDto): Promise<OrdenCompra>;
    findAll(filters?: {
        estado?: EstadoOrdenCompra;
        id_proveedor?: string;
    }): Promise<OrdenCompra[]>;
    findOne(id: string): Promise<OrdenCompra>;
    findPendientes(): Promise<OrdenCompra[]>;
    findByProveedor(id_proveedor: string): Promise<OrdenCompra[]>;
    update(id: string, updateOrdenCompraDto: UpdateOrdenCompraDto): Promise<OrdenCompra>;
    cambiarEstado(id: string, cambiarEstadoDto: CambiarEstadoDto): Promise<OrdenCompra>;
    remove(id: string): Promise<{
        message: string;
    }>;
    recalcularTotales(id: string): Promise<OrdenCompra>;
    private generarNumeroOrden;
    private validarTransicionEstado;
    private recibirOrden;
    private generarCodigoLote;
}
