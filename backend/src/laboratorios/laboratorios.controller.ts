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
import { LaboratoriosService } from './laboratorios.service';
import { CreateLaboratorioDto } from './dto/create-laboratorio.dto';
import { UpdateLaboratorioDto } from './dto/update-laboratorio.dto';
import type { Laboratorio } from './entities/laboratorio.entity';

@Controller('laboratorios')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class LaboratoriosController {
    constructor(private readonly laboratoriosService: LaboratoriosService) { }

    @Get()
    async findAll(
        @Query('nombre') nombre?: string,
        @Query('estado', new ParseBoolPipe({ optional: true })) estado?: boolean,
    ): Promise<Laboratorio[]> {
        return await this.laboratoriosService.findAll({ nombre, estado });
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Laboratorio> {
        return await this.laboratoriosService.findOne(id);
    }

    @Post()
    async create(
        @Body() createLaboratorioDto: CreateLaboratorioDto,
    ): Promise<Laboratorio> {
        return await this.laboratoriosService.create(createLaboratorioDto);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateLaboratorioDto: UpdateLaboratorioDto,
    ): Promise<Laboratorio> {
        return await this.laboratoriosService.update(id, updateLaboratorioDto);
    }

    @Delete(':id')
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<{ message: string; entity: Laboratorio }> {
        return await this.laboratoriosService.remove(id);
    }

    @Delete(':id/hard-delete')
    async hardDelete(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<{ message: string }> {
        await this.laboratoriosService.hardDelete(id);
        return { message: 'Laboratorio eliminado permanentemente' };
    }
}
