import { ProductosAlmacenService } from './productos-almacen.service';
import type { CreateProductoAlmacenDto } from './dto/create-producto-almacen.dto';
import type { UpdateProductoAlmacenDto } from './dto/update-producto-almacen.dto';
export declare class ProductosAlmacenController {
    private readonly productosAlmacenService;
    constructor(productosAlmacenService: ProductosAlmacenService);
    create(createProductoAlmacenDto: CreateProductoAlmacenDto): Promise<import("./entities/producto-almacen.entity").ProductoAlmacen>;
    findAll(): Promise<import("./entities/producto-almacen.entity").ProductoAlmacen[]>;
    findBajoStock(idAlmacen?: string): Promise<import("./entities/producto-almacen.entity").ProductoAlmacen[]>;
    findPorAlmacen(id: string): Promise<import("./entities/producto-almacen.entity").ProductoAlmacen[]>;
    findOne(id: string): Promise<import("./entities/producto-almacen.entity").ProductoAlmacen>;
    update(id: string, updateProductoAlmacenDto: UpdateProductoAlmacenDto): Promise<import("./entities/producto-almacen.entity").ProductoAlmacen>;
    remove(id: string): Promise<void>;
}
