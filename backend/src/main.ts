import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configurar CORS para permitir conexiones desde el frontend
    app.enableCors({
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    const port = process.env.PORT || 3000;
    await app.listen(port);

    console.log(`🚀 ERP Farmacia ARMONÍA - Backend corriendo en: http://localhost:${port}`);
    console.log(`📊 Base de datos: ${process.env.DB_NAME || 'armonia'}`);
}

bootstrap();
