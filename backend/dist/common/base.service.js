"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
class BaseService {
    constructor(repository, entityName) {
        this.repository = repository;
        this.entityName = entityName;
    }
    async findAll(filters) {
        const where = {};
        if (filters) {
            Object.keys(filters).forEach((key) => {
                const value = filters[key];
                if (value !== undefined && value !== null && value !== '') {
                    if (typeof value === 'string') {
                        where[key] = (0, typeorm_1.ILike)(`%${value}%`);
                    }
                    else {
                        where[key] = value;
                    }
                }
            });
        }
        return await this.repository.find({ where: where });
    }
    async findOne(id) {
        const entity = await this.repository.findOne({
            where: { id },
        });
        if (!entity) {
            throw new common_1.NotFoundException(`${this.entityName} con ID ${id} no encontrada`);
        }
        return entity;
    }
    async create(createDto) {
        const entity = this.repository.create(createDto);
        const saved = await this.repository.save(entity);
        return saved;
    }
    async update(id, updateDto) {
        const entity = await this.findOne(id);
        Object.assign(entity, updateDto);
        const saved = await this.repository.save(entity);
        return saved;
    }
    async remove(id) {
        const entity = await this.findOne(id);
        if ('estado' in entity) {
            entity.estado = false;
            await this.repository.save(entity);
        }
        return {
            message: `${this.entityName} desactivada exitosamente`,
            entity,
        };
    }
    async hardDelete(id) {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
    async existsByField(field, value, excludeId) {
        const where = {
            [field]: value,
        };
        if (excludeId) {
            where['id'] = { $ne: excludeId };
        }
        const count = await this.repository.count({ where: where });
        return count > 0;
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map