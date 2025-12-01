import { LotesService } from './lotes.service';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import type { Lote } from './entities/lote.entity';
import { EstadoLote } from './entities/lote.entity';
export declare class LotesController {
    private readonly lotesService;
    constructor(lotesService: LotesService);
    findAll(idProducto?: number, estado?: EstadoLote): Promise<Lote[]>;
    findProximosAVencer(dias?: number): Promise<Lote[]>;
    findOne(id: string): Promise<Lote>;
    create(createLoteDto: CreateLoteDto): Promise<Lote>;
    update(id: string, updateLoteDto: UpdateLoteDto): Promise<Lote>;
    remove(id: string): Promise<{
        message: string;
        entity: Lote;
    }>;
    hardDelete(id: string): Promise<{
        message: string;
    }>;
}
