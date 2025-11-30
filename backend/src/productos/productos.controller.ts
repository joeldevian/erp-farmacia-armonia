import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    ParseIntPipe,
    UsePipes,
    ValidationPipe,
    ParseBoolPipe,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import type { Producto } from './entities/producto.entity';
import { TipoProducto } from './entities/producto.entity';

@Controller('productos')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class ProductosController {
    constructor(private readonly productosService: ProductosService) { }

    @Get()
    async findAll(
        @Query('nombre') nombre?: string,
        @Query('codigo_interno') codigoInterno?: string,
        @Query('id_categoria', new ParseIntPipe({ optional: true }))
        idCategoria?: number,
        @Query('id_laboratorio', new ParseIntPipe({ optional: true }))
        idLaboratorio?: number,
        @Query('tipo_producto') tipoProducto?: TipoProducto,
        @Query('estado', new ParseBoolPipe({ optional: true })) estado?: boolean,
    ): Promise<Producto[]> {
        return await this.productosService.findAll({
            nombre,
            codigo_interno: codigoInterno,
            id_categoria: idCategoria,
            id_laboratorio: idLaboratorio,
            tipo_producto: tipoProducto,
            estado,
        });
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Producto> {
        return await this.productosService.findOne(id);
    }

    @Post()
    async create(
        @Body() createProductoDto: CreateProductoDto,
    ): Promise<Producto> {
        return await this.productosService.create(createProductoDto);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProductoDto: UpdateProductoDto,
    ): Promise<Producto> {
        return await this.productosService.update(id, updateProductoDto);
    }

    @Delete(':id')
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<{ message: string; entity: Producto }> {
        return await this.productosService.remove(id);
    }

    @Delete(':id/hard-delete')
    async hardDelete(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<{ message: string }> {
        await this.productosService.hardDelete(id);
        return { message: 'Producto eliminado permanentemente' };
    }
}
