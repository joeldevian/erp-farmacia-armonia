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
import { AlmacenesService } from './almacenes.service';
import type { CreateAlmacenDto } from './dto/create-almacen.dto';
import type { UpdateAlmacenDto } from './dto/update-almacen.dto';
import { TipoAlmacen, EstadoAlmacen } from './entities/almacen.entity';

@Controller('almacenes')
export class AlmacenesController {
    constructor(private readonly almacenesService: AlmacenesService) { }

    @Post()
    create(@Body() createAlmacenDto: CreateAlmacenDto) {
        return this.almacenesService.create(createAlmacenDto);
    }

    @Get()
    findAll(
        @Query('tipo') tipo?: TipoAlmacen,
        @Query('estado') estado?: EstadoAlmacen,
    ) {
        return this.almacenesService.findAll({ tipo, estado });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.almacenesService.findOne(id);
    }

    @Get(':id/resumen')
    getResumenInventario(@Param('id') id: string) {
        return this.almacenesService.getResumenInventario(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAlmacenDto: UpdateAlmacenDto) {
        return this.almacenesService.update(id, updateAlmacenDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.almacenesService.remove(id);
    }

    @Delete(':id/hard-delete')
    hardDelete(@Param('id') id: string) {
        return this.almacenesService.hardDelete(id);
    }
}
