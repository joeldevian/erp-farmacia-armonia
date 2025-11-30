import { LaboratoriosService } from './laboratorios.service';
import { CreateLaboratorioDto } from './dto/create-laboratorio.dto';
import { UpdateLaboratorioDto } from './dto/update-laboratorio.dto';
import type { Laboratorio } from './entities/laboratorio.entity';
export declare class LaboratoriosController {
    private readonly laboratoriosService;
    constructor(laboratoriosService: LaboratoriosService);
    findAll(nombre?: string, estado?: boolean): Promise<Laboratorio[]>;
    findOne(id: number): Promise<Laboratorio>;
    create(createLaboratorioDto: CreateLaboratorioDto): Promise<Laboratorio>;
    update(id: number, updateLaboratorioDto: UpdateLaboratorioDto): Promise<Laboratorio>;
    remove(id: number): Promise<{
        message: string;
        entity: Laboratorio;
    }>;
    hardDelete(id: number): Promise<{
        message: string;
    }>;
}
