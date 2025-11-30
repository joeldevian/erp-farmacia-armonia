"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
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
//# sourceMappingURL=main.js.map