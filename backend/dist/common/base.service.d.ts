import { Repository } from 'typeorm';
import type { BaseEntity, FindAllOptions } from './interfaces/base-entity.interface';
export declare abstract class BaseService<T extends BaseEntity> {
    protected readonly repository: Repository<T>;
    protected readonly entityName: string;
    constructor(repository: Repository<T>, entityName: string);
    findAll(filters?: FindAllOptions): Promise<T[]>;
    findOne(id: number): Promise<T>;
    create(createDto: Partial<T>): Promise<T>;
    update(id: number, updateDto: Partial<T>): Promise<T>;
    remove(id: number): Promise<{
        message: string;
        entity: T;
    }>;
    hardDelete(id: number): Promise<void>;
    existsByField(field: keyof T, value: any, excludeId?: number): Promise<boolean>;
}
