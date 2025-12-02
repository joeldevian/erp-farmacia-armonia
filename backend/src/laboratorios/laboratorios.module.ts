import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laboratorio } from './entities/laboratorio.entity';
import { LaboratoriosController } from './laboratorios.controller';
import { LaboratoriosService } from './laboratorios.service';
import { Producto } from '../productos/entities/producto.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Laboratorio, Producto])],
    controllers: [LaboratoriosController],
    providers: [LaboratoriosService],
    exports: [LaboratoriosService],
})
export class LaboratoriosModule { }
