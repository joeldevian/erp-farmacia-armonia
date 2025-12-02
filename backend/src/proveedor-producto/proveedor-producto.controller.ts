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
import { ProveedorProductoService } from './proveedor-producto.service';
import { CreateProveedorProductoDto } from './dto/create-proveedor-producto.dto';
import { UpdateProveedorProductoDto } from './dto/update-proveedor-producto.dto';
import type { ProveedorProducto } from './entities/proveedor-producto.entity';
import { EstadoProveedorProducto } from './entities/proveedor-producto.entity';

@Controller('proveedor-producto')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class ProveedorProductoController {
    constructor(
        private readonly proveedorProductoService: ProveedorProductoService,
    ) { }

    @Get()
    async findAll(
        @Query('id_proveedor') id_proveedor?: string,
        @Query('id_producto', new ParseIntPipe({ optional: true }))
        id_producto?: number,
        @Query('estado') estado?: EstadoProveedorProducto,
    ): Promise<ProveedorProducto[]> {
        return await this.proveedorProductoService.findAll({
            id_proveedor,
            id_producto,
            estado,
        });
    }

    @Get('producto/:id')
    async findByProducto(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ProveedorProducto[]> {
        return await this.proveedorProductoService.findByProducto(id);
    }

    @Get('mejor/:id')
    async findMejorProveedor(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ProveedorProducto | null> {
        return await this.proveedorProductoService.findMejorProveedor(id);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ProveedorProducto> {
        return await this.proveedorProductoService.findOne(id);
    }

    @Post()
    async create(
        @Body() createDto: CreateProveedorProductoDto,
    ): Promise<ProveedorProducto> {
        return await this.proveedorProductoService.create(createDto);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateDto: UpdateProveedorProductoDto,
    ): Promise<ProveedorProducto> {
        return await this.proveedorProductoService.update(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<{ message: string }> {
        return await this.proveedorProductoService.remove(id);
    }
}
