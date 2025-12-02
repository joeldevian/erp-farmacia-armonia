import { Repository } from 'typeorm';
import { BaseService } from '../common/base.service';
import { Laboratorio } from './entities/laboratorio.entity';
import { Producto } from '../productos/entities/producto.entity';
import type { CreateLaboratorioDto } from './dto/create-laboratorio.dto';
import type { UpdateLaboratorioDto } from './dto/update-laboratorio.dto';
export declare class LaboratoriosService extends BaseService<Laboratorio> {
    private readonly laboratorioRepository;
    private readonly productoRepository;
    constructor(laboratorioRepository: Repository<Laboratorio>, productoRepository: Repository<Producto>);
    findOne(id: number): Promise<Laboratorio>;
    create(createLaboratorioDto: CreateLaboratorioDto): Promise<Laboratorio>;
    update(id: number, updateLaboratorioDto: UpdateLaboratorioDto): Promise<Laboratorio>;
    hardDelete(id: number): Promise<void>;
    private validateUniqueName;
}
