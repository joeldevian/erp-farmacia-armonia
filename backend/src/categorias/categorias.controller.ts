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
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import type { Categoria } from './entities/categoria.entity';

@Controller('categorias')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class CategoriasController {
    constructor(private readonly categoriasService: CategoriasService) { }

    @Get()
    async findAll(
        @Query('nombre') nombre?: string,
        @Query('estado', new ParseBoolPipe({ optional: true })) estado?: boolean,
    ): Promise<Categoria[]> {
        return await this.categoriasService.findAll({ nombre, estado });
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
        return await this.categoriasService.findOne(id);
    }

    @Post()
    async create(
        @Body() createCategoriaDto: CreateCategoriaDto,
    ): Promise<Categoria> {
        return await this.categoriasService.create(createCategoriaDto);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCategoriaDto: UpdateCategoriaDto,
    ): Promise<Categoria> {
        return await this.categoriasService.update(id, updateCategoriaDto);
    }

    @Delete(':id')
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<{ message: string; entity: Categoria }> {
        return await this.categoriasService.remove(id);
    }

    @Delete(':id/hard-delete')
    async hardDelete(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<{ message: string }> {
        await this.categoriasService.hardDelete(id);
        return { message: 'Categoría eliminada permanentemente' };
    }
}
