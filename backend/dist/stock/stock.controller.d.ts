import { StockService } from './stock.service';
import type { CreateStockDto } from './dto/create-stock.dto';
import type { UpdateStockDto } from './dto/update-stock.dto';
import { EstadoStock } from './entities/stock.entity';
export declare class StockController {
    private readonly stockService;
    constructor(stockService: StockService);
    create(createStockDto: CreateStockDto): Promise<import("./entities/stock.entity").Stock>;
    findAll(estado?: EstadoStock): Promise<import("./entities/stock.entity").Stock[]>;
    findBajoStock(): Promise<import("./entities/stock.entity").Stock[]>;
    findSinStock(): Promise<import("./entities/stock.entity").Stock[]>;
    findOne(id: string): Promise<import("./entities/stock.entity").Stock>;
    update(id: string, updateStockDto: UpdateStockDto): Promise<import("./entities/stock.entity").Stock>;
    remove(id: string): Promise<void>;
    hardDelete(id: string): Promise<void>;
}
