import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    Query,
    ParseIntPipe,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { LotesService } from './lotes.service';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import type { Lote } from './entities/lote.entity';
import { EstadoLote } from './entities/lote.entity';

@Controller('lotes')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class LotesController {
    constructor(private readonly lotesService: LotesService) { }

    @Get()
    async findAll(
        @Query('id_producto', new ParseIntPipe({ optional: true }))
        idProducto?: number,
        @Query('estado') estado?: EstadoLote,
    ): Promise<Lote[]> {
        return await this.lotesService.findAll({
            id_producto: idProducto,
            estado,
        });
    }

    @Get('proximos-vencer')
    async findProximosAVencer(
        @Query('dias', new ParseIntPipe({ optional: true })) dias?: number,
    ): Promise<Lote[]> {
        return await this.lotesService.findProximosAVencer(dias || 30);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Lote> {
        return await this.lotesService.findOne(id);
    }

    @Post()
    async create(@Body() createLoteDto: CreateLoteDto): Promise<Lote> {
        return await this.lotesService.create(createLoteDto);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateLoteDto: UpdateLoteDto,
    ): Promise<Lote> {
        return await this.lotesService.update(id, updateLoteDto);
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
    ): Promise<{ message: string; entity: Lote }> {
        return await this.lotesService.remove(id);
    }

    @Delete(':id/hard-delete')
    async hardDelete(@Param('id') id: string): Promise<{ message: string }> {
        await this.lotesService.hardDelete(id);
        return { message: 'Lote eliminado permanentemente' };
    }
}
