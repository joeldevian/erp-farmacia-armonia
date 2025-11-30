import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import type { Producto } from './entities/producto.entity';
import { TipoProducto } from './entities/producto.entity';
export declare class ProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    findAll(nombre?: string, codigoInterno?: string, idCategoria?: number, idLaboratorio?: number, tipoProducto?: TipoProducto, estado?: boolean): Promise<Producto[]>;
    findOne(id: number): Promise<Producto>;
    create(createProductoDto: CreateProductoDto): Promise<Producto>;
    update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto>;
    remove(id: number): Promise<{
        message: string;
        entity: Producto;
    }>;
    hardDelete(id: number): Promise<{
        message: string;
    }>;
}
