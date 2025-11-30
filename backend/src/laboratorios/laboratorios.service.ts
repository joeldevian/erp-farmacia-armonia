import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common/base.service';
import { Laboratorio } from './entities/laboratorio.entity';
import type { CreateLaboratorioDto } from './dto/create-laboratorio.dto';
import type { UpdateLaboratorioDto } from './dto/update-laboratorio.dto';

@Injectable()
export class LaboratoriosService extends BaseService<Laboratorio> {
    constructor(
        @InjectRepository(Laboratorio)
        private readonly laboratorioRepository: Repository<Laboratorio>,
    ) {
        super(laboratorioRepository, 'Laboratorio');
    }

    /**
     * Sobrescribe findOne para usar id_laboratorio
     */
    async findOne(id: number): Promise<Laboratorio> {
        const laboratorio = await this.laboratorioRepository.findOne({
            where: { id_laboratorio: id },
        });

        if (!laboratorio) {
            throw new NotFoundException(`Laboratorio con ID ${id} no encontrado`);
        }

        return laboratorio;
    }

    /**
     * Sobrescribe el método create para validar nombre único
     */
    async create(createLaboratorioDto: CreateLaboratorioDto): Promise<Laboratorio> {
        await this.validateUniqueName(createLaboratorioDto.nombre);
        return await super.create(createLaboratorioDto);
    }

    /**
     * Sobrescribe el método update para validar nombre único
     */
    async update(
        id: number,
        updateLaboratorioDto: UpdateLaboratorioDto,
    ): Promise<Laboratorio> {
        if (updateLaboratorioDto.nombre) {
            await this.validateUniqueName(updateLaboratorioDto.nombre, id);
        }
        return await super.update(id, updateLaboratorioDto);
    }

    /**
     * Valida que el nombre del laboratorio sea único
     */
    private async validateUniqueName(
        nombre: string,
        excludeId?: number,
    ): Promise<void> {
        const existing = await this.laboratorioRepository.findOne({
            where: { nombre },
        });

        if (existing && existing.id_laboratorio !== excludeId) {
            throw new ConflictException(
                `Ya existe un laboratorio con el nombre "${nombre}"`,
            );
        }
    }
}
