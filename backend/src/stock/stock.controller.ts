import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { StockService } from './stock.service';
import type { CreateStockDto } from './dto/create-stock.dto';
import type { UpdateStockDto } from './dto/update-stock.dto';
import { EstadoStock } from './entities/stock.entity';

@Controller('stock')
export class StockController {
    constructor(private readonly stockService: StockService) { }

    @Post()
    create(@Body() createStockDto: CreateStockDto) {
        return this.stockService.create(createStockDto);
    }

    @Get()
    findAll(@Query('estado') estado?: EstadoStock) {
        return this.stockService.findAll({ estado });
    }

    @Get('bajo')
    findBajoStock() {
        return this.stockService.findBajoStock();
    }

    @Get('sin')
    findSinStock() {
        return this.stockService.findSinStock();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.stockService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
        return this.stockService.update(id, updateStockDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.stockService.remove(id);
    }

    @Delete(':id/hard-delete')
    hardDelete(@Param('id') id: string) {
        return this.stockService.hardDelete(id);
    }
}
