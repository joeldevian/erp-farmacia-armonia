import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { OrdenCompraDetalleService } from './orden-compra-detalle.service';
import type { CreateOrdenCompraDetalleDto } from './dto/create-orden-compra-detalle.dto';
import type { UpdateOrdenCompraDetalleDto } from './dto/update-orden-compra-detalle.dto';

@Controller('orden-compra-detalle')
export class OrdenCompraDetalleController {
    constructor(
        private readonly detalleService: OrdenCompraDetalleService,
    ) { }

    @Post()
    create(@Body() createDetalleDto: CreateOrdenCompraDetalleDto) {
        return this.detalleService.create(createDetalleDto);
    }

    @Get('orden/:id')
    findByOrden(@Param('id') id: string) {
        return this.detalleService.findByOrden(id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.detalleService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateDetalleDto: UpdateOrdenCompraDetalleDto,
    ) {
        return this.detalleService.update(id, updateDetalleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.detalleService.remove(id);
    }
}
