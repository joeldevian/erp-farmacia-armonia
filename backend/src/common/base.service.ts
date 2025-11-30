import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import type { BaseEntity, FindAllOptions } from './interfaces/base-entity.interface';

export abstract class BaseService<T extends BaseEntity> {
    constructor(
        protected readonly repository: Repository<T>,
        protected readonly entityName: string,
    ) { }

    /**
     * Encuentra todos los registros con filtros opcionales
     */
    async findAll(filters?: FindAllOptions): Promise<T[]> {
        const where: Record<string, any> = {};

        if (filters) {
            Object.keys(filters).forEach((key) => {
                const value = filters[key];
                if (value !== undefined && value !== null && value !== '') {
                    // Si es string, usar ILIKE para búsqueda case-insensitive
                    if (typeof value === 'string') {
                        where[key] = ILike(`%${value}%`);
                    } else {
                        where[key] = value;
                    }
                }
            });
        }

        return await this.repository.find({ where: where as FindOptionsWhere<T> });
    }

    /**
     * Encuentra un registro por ID
     */
    async findOne(id: number): Promise<T> {
        const entity = await this.repository.findOne({
            where: { id } as FindOptionsWhere<T>,
        });

        if (!entity) {
            throw new NotFoundException(`${this.entityName} con ID ${id} no encontrada`);
        }

        return entity;
    }

    /**
     * Crea un nuevo registro
     */
    async create(createDto: Partial<T>): Promise<T> {
        const entity = this.repository.create(createDto as any);
        const saved = await this.repository.save(entity);
        return saved as unknown as T;
    }

    /**
     * Actualiza un registro existente
     */
    async update(id: number, updateDto: Partial<T>): Promise<T> {
        const entity = await this.findOne(id);
        Object.assign(entity, updateDto);
        const saved = await this.repository.save(entity);
        return saved as unknown as T;
    }

    /**
     * Soft delete - cambia el estado a false
     */
    async remove(id: number): Promise<{ message: string; entity: T }> {
        const entity = await this.findOne(id);

        if ('estado' in entity) {
            (entity as any).estado = false;
            await this.repository.save(entity);
        }

        return {
            message: `${this.entityName} desactivada exitosamente`,
            entity,
        };
    }

    /**
     * Hard delete - elimina físicamente el registro
     */
    async hardDelete(id: number): Promise<void> {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }

    /**
     * Verifica si existe un registro con un campo específico
     */
    async existsByField(field: keyof T, value: any, excludeId?: number): Promise<boolean> {
        const where: Record<string, any> = {
            [field]: value,
        };

        if (excludeId) {
            where['id'] = { $ne: excludeId };
        }

        const count = await this.repository.count({ where: where as FindOptionsWhere<T> });
        return count > 0;
    }
}
