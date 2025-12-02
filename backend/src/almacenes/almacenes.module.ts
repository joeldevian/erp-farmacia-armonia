import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlmacenesService } from './almacenes.service';
import { AlmacenesController } from './almacenes.controller';
import { Almacen } from './entities/almacen.entity';
import { ProductoAlmacen } from '../productos-almacen/entities/producto-almacen.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Almacen, ProductoAlmacen])],
    controllers: [AlmacenesController],
    providers: [AlmacenesService],
    exports: [AlmacenesService],
})
export class AlmacenesModule { }
