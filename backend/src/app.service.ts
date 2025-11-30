import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHealthCheck(): object {
        return {
            status: 'ok',
            message: 'ERP Farmacia ARMONÍA - Backend funcionando correctamente',
            timestamp: new Date().toISOString(),
            database: 'PostgreSQL - armonia',
        };
    }
}
