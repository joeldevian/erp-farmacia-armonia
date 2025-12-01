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
import { ProductosAlmacenService } from './productos-almacen.service';
import type { CreateProductoAlmacenDto } from './dto/create-producto-almacen.dto';
import type { UpdateProductoAlmacenDto } from './dto/update-producto-almacen.dto';

@Controller('productos-almacen')
export class ProductosAlmacenController {
    constructor(
        private readonly productosAlmacenService: ProductosAlmacenService,
    ) { }

    @Post()
    create(@Body() createProductoAlmacenDto: CreateProductoAlmacenDto) {
        return this.productosAlmacenService.create(createProductoAlmacenDto);
    }

    @Get()
    findAll() {
        return this.productosAlmacenService.findAll();
    }

    @Get('bajo-stock')
    findBajoStock(@Query('id_almacen') idAlmacen?: string) {
        return this.productosAlmacenService.findBajoStock(idAlmacen);
    }

    @Get('almacen/:id')
    findPorAlmacen(@Param('id') id: string) {
        return this.productosAlmacenService.findPorAlmacen(id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productosAlmacenService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductoAlmacenDto: UpdateProductoAlmacenDto,
    ) {
        return this.productosAlmacenService.update(id, updateProductoAlmacenDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productosAlmacenService.remove(id);
    }
}
