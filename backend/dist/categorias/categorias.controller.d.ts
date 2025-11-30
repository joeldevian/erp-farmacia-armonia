import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import type { Categoria } from './entities/categoria.entity';
export declare class CategoriasController {
    private readonly categoriasService;
    constructor(categoriasService: CategoriasService);
    findAll(nombre?: string, estado?: boolean): Promise<Categoria[]>;
    findOne(id: number): Promise<Categoria>;
    create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria>;
    update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria>;
    remove(id: number): Promise<{
        message: string;
        entity: Categoria;
    }>;
    hardDelete(id: number): Promise<{
        message: string;
    }>;
}
