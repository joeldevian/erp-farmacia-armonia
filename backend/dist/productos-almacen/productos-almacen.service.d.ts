import { Repository } from 'typeorm';
import { ProductoAlmacen } from './entities/producto-almacen.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Almacen } from '../almacenes/entities/almacen.entity';
import type { CreateProductoAlmacenDto } from './dto/create-producto-almacen.dto';
import type { UpdateProductoAlmacenDto } from './dto/update-producto-almacen.dto';
export declare class ProductosAlmacenService {
    private readonly productoAlmacenRepository;
    private readonly productoRepository;
    private readonly almacenRepository;
    constructor(productoAlmacenRepository: Repository<ProductoAlmacen>, productoRepository: Repository<Producto>, almacenRepository: Repository<Almacen>);
    findAll(): Promise<ProductoAlmacen[]>;
    findOne(id: string): Promise<ProductoAlmacen>;
    create(createProductoAlmacenDto: CreateProductoAlmacenDto): Promise<ProductoAlmacen>;
    update(id: string, updateProductoAlmacenDto: UpdateProductoAlmacenDto): Promise<ProductoAlmacen>;
    remove(id: string): Promise<void>;
    findBajoStock(idAlmacen?: string): Promise<ProductoAlmacen[]>;
    findPorAlmacen(idAlmacen: string): Promise<ProductoAlmacen[]>;
    private validateAsignacionUnica;
    private validateStocks;
    private validateProductoExists;
    private validateAlmacenExists;
}
