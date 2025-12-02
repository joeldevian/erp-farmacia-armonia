import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseConfig } from './config/database.config';
import { CategoriasModule } from './categorias/categorias.module';
import { LaboratoriosModule } from './laboratorios/laboratorios.module';
import { ProductosModule } from './productos/productos.module';
import { LotesModule } from './lotes/lotes.module';
import { AlmacenesModule } from './almacenes/almacenes.module';
import { ProductosAlmacenModule } from './productos-almacen/productos-almacen.module';
import { StockModule } from './stock/stock.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRoot(getDatabaseConfig()),
        CategoriasModule,
        LaboratoriosModule,
        ProductosModule,
        LotesModule,
        AlmacenesModule,
        ProductosAlmacenModule,
        StockModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
