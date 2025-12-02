import {
    Injectable,
    ConflictException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor, EstadoProveedor } from './entities/proveedor.entity';
import { ProveedorProducto } from '../proveedor-producto/entities/proveedor-producto.entity';
import type { CreateProveedorDto } from './dto/create-proveedor.dto';
import type { UpdateProveedorDto } from './dto/update-proveedor.dto';

@Injectable()
export class ProveedoresService {
    constructor(
        @InjectRepository(Proveedor)
        private readonly proveedorRepository: Repository<Proveedor>,
        @InjectRepository(ProveedorProducto)
        private readonly proveedorProductoRepository: Repository<ProveedorProducto>,
    ) { }

    /**
     * Listar todos los proveedores con filtros
     */
    async findAll(filtros?: {
        estado?: EstadoProveedor;
    }): Promise<Proveedor[]> {
        const where: any = {};

        if (filtros?.estado) {
            where.estado = filtros.estado;
        }

        return await this.proveedorRepository.find({
            where,
            order: { razon_social: 'ASC' },
        });
    }

    /**
     * Obtener proveedor por UUID con productos asociados
     */
    async findOne(id: string): Promise<Proveedor> {
        const proveedor = await this.proveedorRepository.findOne({
            where: { id_proveedor: id },
            relations: ['proveedorProductos', 'proveedorProductos.producto'],
        });

        if (!proveedor) {
            throw new NotFoundException(
                `Proveedor con ID ${id} no encontrado`,
            );
        }

        return proveedor;
    }

    /**
     * Crear proveedor con validaciones
     */
    async create(createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
        // Validar RUC único
        await this.validateRucUnico(createProveedorDto.ruc);

        // Validar email único
        await this.validateEmailUnico(createProveedorDto.email);

        // Validar razón social única
        await this.validateRazonSocialUnica(createProveedorDto.razon_social);

        const proveedor = this.proveedorRepository.create(createProveedorDto);
        return await this.proveedorRepository.save(proveedor);
    }

    /**
     * Actualizar proveedor
     */
    async update(
        id: string,
        updateProveedorDto: UpdateProveedorDto,
    ): Promise<Proveedor> {
        const proveedor = await this.findOne(id);

        // Validar RUC único si se está actualizando
        if (updateProveedorDto.ruc && updateProveedorDto.ruc !== proveedor.ruc) {
            await this.validateRucUnico(updateProveedorDto.ruc);
        }

        // Validar email único si se está actualizando
        if (
            updateProveedorDto.email &&
            updateProveedorDto.email !== proveedor.email
        ) {
            await this.validateEmailUnico(updateProveedorDto.email);
        }

        // Validar razón social única si se está actualizando
        if (
            updateProveedorDto.razon_social &&
            updateProveedorDto.razon_social !== proveedor.razon_social
        ) {
            await this.validateRazonSocialUnica(
                updateProveedorDto.razon_social,
            );
        }

        Object.assign(proveedor, updateProveedorDto);
        return await this.proveedorRepository.save(proveedor);
    }

    /**
     * Soft delete (cambiar estado a inactivo)
     */
    async remove(id: string): Promise<{ message: string; entity: Proveedor }> {
        const proveedor = await this.findOne(id);
        proveedor.estado = EstadoProveedor.INACTIVO;
        await this.proveedorRepository.save(proveedor);

        return {
            message: 'Proveedor desactivado exitosamente',
            entity: proveedor,
        };
    }

    /**
     * Hard delete con validación de productos asociados
     */
    async hardDelete(id: string): Promise<void> {
        const proveedor = await this.proveedorRepository.findOne({
            where: { id_proveedor: id },
        });

        if (!proveedor) {
            throw new NotFoundException(
                `Proveedor con ID ${id} no encontrado`,
            );
        }

        // Verificar si hay productos asociados
        const productosAsociados =
            await this.proveedorProductoRepository.count({
                where: { id_proveedor: id },
            });

        if (productosAsociados > 0) {
            throw new ConflictException(
                `No se puede eliminar el proveedor "${proveedor.razon_social}" porque tiene ${productosAsociados} producto(s) asociado(s). Primero debes eliminar las relaciones.`,
            );
        }

        await this.proveedorRepository.remove(proveedor);
    }

    /**
     * Validar que el RUC sea único
     */
    private async validateRucUnico(ruc: string): Promise<void> {
        const existing = await this.proveedorRepository.findOne({
            where: { ruc },
        });

        if (existing) {
            throw new ConflictException(
                `Ya existe un proveedor con el RUC "${ruc}"`,
            );
        }
    }

    /**
     * Validar que el email sea único
     */
    private async validateEmailUnico(email: string): Promise<void> {
        const existing = await this.proveedorRepository.findOne({
            where: { email },
        });

        if (existing) {
            throw new ConflictException(
                `Ya existe un proveedor con el email "${email}"`,
            );
        }
    }

    /**
     * Validar que la razón social sea única
     */
    private async validateRazonSocialUnica(
        razon_social: string,
    ): Promise<void> {
        const existing = await this.proveedorRepository.findOne({
            where: { razon_social },
        });

        if (existing) {
            throw new ConflictException(
                `Ya existe un proveedor con la razón social "${razon_social}"`,
            );
        }
    }
}
