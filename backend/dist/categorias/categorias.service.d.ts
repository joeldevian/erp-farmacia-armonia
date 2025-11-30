import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import type { CreateCategoriaDto } from './dto/create-categoria.dto';
import type { UpdateCategoriaDto } from './dto/update-categoria.dto';
export declare class CategoriasService {
    private readonly categoriaRepository;
    constructor(categoriaRepository: Repository<Categoria>);
    findAll(filtros?: {
        nombre?: string;
        estado?: boolean;
    }): Promise<Categoria[]>;
    findOne(id: number): Promise<Categoria>;
    create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria>;
    update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria>;
    remove(id: number): Promise<{
        message: string;
        categoria: Categoria;
    }>;
    hardDelete(id: number): Promise<void>;
}
