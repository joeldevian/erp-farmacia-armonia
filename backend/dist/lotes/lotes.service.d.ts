import { Repository } from 'typeorm';
import { Lote, EstadoLote } from './entities/lote.entity';
import { Producto } from '../productos/entities/producto.entity';
import type { CreateLoteDto } from './dto/create-lote.dto';
import type { UpdateLoteDto } from './dto/update-lote.dto';
export declare class LotesService {
    private readonly loteRepository;
    private readonly productoRepository;
    constructor(loteRepository: Repository<Lote>, productoRepository: Repository<Producto>);
    findAll(filtros?: {
        id_producto?: number;
        estado?: EstadoLote;
    }): Promise<Lote[]>;
    findOne(id: string): Promise<Lote>;
    create(createLoteDto: CreateLoteDto): Promise<Lote>;
    update(id: string, updateLoteDto: UpdateLoteDto): Promise<Lote>;
    remove(id: string): Promise<{
        message: string;
        entity: Lote;
    }>;
    hardDelete(id: string): Promise<void>;
    findProximosAVencer(dias?: number): Promise<Lote[]>;
    private validateCodigoUnico;
    private validateFechas;
    private validateCantidades;
    private validateProductoExists;
}
