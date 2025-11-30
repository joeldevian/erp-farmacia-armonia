import { Repository } from 'typeorm';
import { BaseService } from '../common/base.service';
import { Producto } from './entities/producto.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { Laboratorio } from '../laboratorios/entities/laboratorio.entity';
import type { CreateProductoDto } from './dto/create-producto.dto';
import type { UpdateProductoDto } from './dto/update-producto.dto';
export declare class ProductosService extends BaseService<Producto> {
    private readonly productoRepository;
    private readonly categoriaRepository;
    private readonly laboratorioRepository;
    constructor(productoRepository: Repository<Producto>, categoriaRepository: Repository<Categoria>, laboratorioRepository: Repository<Laboratorio>);
    findOne(id: number): Promise<Producto>;
    create(createProductoDto: CreateProductoDto): Promise<Producto>;
    update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto>;
    private validateUniqueName;
    private validateUniqueCodigoInterno;
    private validateCategoriaExists;
    private validateLaboratorioExists;
    private validateStocks;
}
