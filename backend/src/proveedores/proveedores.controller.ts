import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import type { Proveedor } from './entities/proveedor.entity';
import { EstadoProveedor } from './entities/proveedor.entity';

@Controller('proveedores')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class ProveedoresController {
    constructor(private readonly proveedoresService: ProveedoresService) { }

    @Get()
    async findAll(
        @Query('estado') estado?: EstadoProveedor,
    ): Promise<Proveedor[]> {
        return await this.proveedoresService.findAll({ estado });
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Proveedor> {
        return await this.proveedoresService.findOne(id);
    }

    @Post()
    async create(
        @Body() createProveedorDto: CreateProveedorDto,
    ): Promise<Proveedor> {
        return await this.proveedoresService.create(createProveedorDto);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateProveedorDto: UpdateProveedorDto,
    ): Promise<Proveedor> {
        return await this.proveedoresService.update(id, updateProveedorDto);
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
    ): Promise<{ message: string; entity: Proveedor }> {
        return await this.proveedoresService.remove(id);
    }

    @Delete(':id/hard-delete')
    async hardDelete(@Param('id') id: string): Promise<{ message: string }> {
        await this.proveedoresService.hardDelete(id);
        return { message: 'Proveedor eliminado permanentemente' };
    }
}
