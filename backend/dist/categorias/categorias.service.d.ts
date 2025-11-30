import { Repository } from 'typeorm';
import { BaseService } from '../common/base.service';
import { Categoria } from './entities/categoria.entity';
import type { CreateCategoriaDto } from './dto/create-categoria.dto';
import type { UpdateCategoriaDto } from './dto/update-categoria.dto';
export declare class CategoriasService extends BaseService<Categoria> {
    private readonly categoriaRepository;
    constructor(categoriaRepository: Repository<Categoria>);
    findOne(id: number): Promise<Categoria>;
    create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria>;
    update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria>;
    private validateUniqueName;
}
