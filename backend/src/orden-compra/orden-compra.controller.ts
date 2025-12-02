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
import { OrdenCompraService } from './orden-compra.service';
import type { CreateOrdenCompraDto } from './dto/create-orden-compra.dto';
import type { UpdateOrdenCompraDto } from './dto/update-orden-compra.dto';
import type { CambiarEstadoDto } from './dto/cambiar-estado.dto';
import type { EstadoOrdenCompra } from './entities/orden-compra.entity';

@Controller('orden-compra')
export class OrdenCompraController {
    constructor(private readonly ordenCompraService: OrdenCompraService) { }

    @Post()
    create(@Body() createOrdenCompraDto: CreateOrdenCompraDto) {
        return this.ordenCompraService.create(createOrdenCompraDto);
    }

    @Get()
    findAll(
        @Query('estado') estado?: EstadoOrdenCompra,
        @Query('id_proveedor') id_proveedor?: string,
    ) {
        return this.ordenCompraService.findAll({ estado, id_proveedor });
    }

    @Get('pendientes')
    findPendientes() {
        return this.ordenCompraService.findPendientes();
    }

    @Get('proveedor/:id')
    findByProveedor(@Param('id') id: string) {
        return this.ordenCompraService.findByProveedor(id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ordenCompraService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateOrdenCompraDto: UpdateOrdenCompraDto,
    ) {
        return this.ordenCompraService.update(id, updateOrdenCompraDto);
    }

    @Patch(':id/estado')
    cambiarEstado(
        @Param('id') id: string,
        @Body() cambiarEstadoDto: CambiarEstadoDto,
    ) {
        return this.ordenCompraService.cambiarEstado(id, cambiarEstadoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ordenCompraService.remove(id);
    }
}
