import { Repository } from 'typeorm';
import { Stock, EstadoStock } from './entities/stock.entity';
import { Producto } from '../productos/entities/producto.entity';
import type { CreateStockDto } from './dto/create-stock.dto';
import type { UpdateStockDto } from './dto/update-stock.dto';
export declare class StockService {
    private readonly stockRepository;
    private readonly productoRepository;
    constructor(stockRepository: Repository<Stock>, productoRepository: Repository<Producto>);
    findAll(filtros?: {
        estado?: EstadoStock;
    }): Promise<Stock[]>;
    findOne(id: string): Promise<Stock>;
    create(createStockDto: CreateStockDto): Promise<Stock>;
    update(id: string, updateStockDto: UpdateStockDto): Promise<Stock>;
    remove(id: string): Promise<void>;
    hardDelete(id: string): Promise<void>;
    findBajoStock(): Promise<Stock[]>;
    findSinStock(): Promise<Stock[]>;
    private validateProductoUnico;
    private validateCantidadReservada;
    private validateProductoExists;
}
