import { Repository } from 'typeorm';
import { BaseService } from '../common/base.service';
import { Categoria } from './entities/categoria.entity';
import { Producto } from '../productos/entities/producto.entity';
import type { CreateCategoriaDto } from './dto/create-categoria.dto';
import type { UpdateCategoriaDto } from './dto/update-categoria.dto';
export declare class CategoriasService extends BaseService<Categoria> {
    private readonly categoriaRepository;
    private readonly productoRepository;
    constructor(categoriaRepository: Repository<Categoria>, productoRepository: Repository<Producto>);
    findOne(id: number): Promise<Categoria>;
    create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria>;
    update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria>;
    hardDelete(id: number): Promise<void>;
    private validateUniqueName;
}
