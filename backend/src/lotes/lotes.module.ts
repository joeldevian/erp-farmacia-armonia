import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lote } from './entities/lote.entity';
import { Producto } from '../productos/entities/producto.entity';
import { LotesController } from './lotes.controller';
import { LotesService } from './lotes.service';

@Module({
    imports: [TypeOrmModule.forFeature([Lote, Producto])],
    controllers: [LotesController],
    providers: [LotesService],
    exports: [LotesService],
})
export class LotesModule { }
