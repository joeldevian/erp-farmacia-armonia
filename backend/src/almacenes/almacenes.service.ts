import {
    Injectable,
    ConflictException,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Almacen, TipoAlmacen, EstadoAlmacen } from './entities/almacen.entity';
import { ProductoAlmacen } from '../productos-almacen/entities/producto-almacen.entity';
import type { CreateAlmacenDto } from './dto/create-almacen.dto';
import type { UpdateAlmacenDto } from './dto/update-almacen.dto';

@Injectable()
export class AlmacenesService {
    constructor(
        @InjectRepository(Almacen)
        private readonly almacenRepository: Repository<Almacen>,
        @InjectRepository(ProductoAlmacen)
        private readonly productoAlmacenRepository: Repository<ProductoAlmacen>,
    ) { }

    /**
     * Listar todos los almacenes con filtros
     */
    async findAll(filtros?: {
        tipo?: TipoAlmacen;
        estado?: EstadoAlmacen;
    }): Promise<Almacen[]> {
        const where: any = {};

        if (filtros?.tipo) {
            where.tipo = filtros.tipo;
        }

        if (filtros?.estado) {
            where.estado = filtros.estado;
        }

        return await this.almacenRepository.find({
            where,
            order: { nombre: 'ASC' },
        });
    }

    /**
     * Obtener almacén por UUID
     */
    async findOne(id: string): Promise<Almacen> {
        const almacen = await this.almacenRepository.findOne({
            where: { id_almacen: id },
            relations: ['productosAlmacen', 'productosAlmacen.producto'],
        });

        if (!almacen) {
            throw new NotFoundException(`Almacén con ID ${id} no encontrado`);
        }

        return almacen;
    }

    /**
     * Crear almacén con validaciones
     */
    async create(createAlmacenDto: CreateAlmacenDto): Promise<Almacen> {
        // Validar nombre único
        await this.validateNombreUnico(createAlmacenDto.nombre);

        // Validar capacidades
        this.validateCapacidades(
            createAlmacenDto.capacidad_total,
            createAlmacenDto.capacidad_ocupada,
        );

        // Crear almacén
        const almacen = this.almacenRepository.create(createAlmacenDto);

        return await this.almacenRepository.save(almacen);
    }

    /**
     * Actualizar almacén
     */
    async update(id: string, updateAlmacenDto: UpdateAlmacenDto): Promise<Almacen> {
        const almacen = await this.findOne(id);

        // Validar nombre único si se está actualizando
        if (updateAlmacenDto.nombre && updateAlmacenDto.nombre !== almacen.nombre) {
            await this.validateNombreUnico(updateAlmacenDto.nombre);
        }

        // Validar capacidades si se están actualizando
        if (
            updateAlmacenDto.capacidad_total !== undefined ||
            updateAlmacenDto.capacidad_ocupada !== undefined
        ) {
            const capTotal =
                updateAlmacenDto.capacidad_total ?? almacen.capacidad_total;
            const capOcupada =
                updateAlmacenDto.capacidad_ocupada ?? almacen.capacidad_ocupada;
            this.validateCapacidades(capTotal, capOcupada);
        }

        // Actualizar
        Object.assign(almacen, updateAlmacenDto);

        return await this.almacenRepository.save(almacen);
    }

    /**
     * Soft delete (marcar como inactivo)
     */
    async remove(id: string): Promise<{ message: string; entity: Almacen }> {
        const almacen = await this.findOne(id);
        almacen.estado = EstadoAlmacen.INACTIVO;
        await this.almacenRepository.save(almacen);

        return {
            message: 'Almacén desactivado exitosamente',
            entity: almacen,
        };
    }

    /**
     * Hard delete con validación de productos-almacén asociados
     */
    async hardDelete(id: string): Promise<void> {
        const almacen = await this.almacenRepository.findOne({
            where: { id_almacen: id },
        });

        if (!almacen) {
            throw new NotFoundException(`Almacén con ID ${id} no encontrado`);
        }

        // Verificar si hay productos asociados a este almacén
        const productosAsociados = await this.productoAlmacenRepository.count({
            where: { id_almacen: id },
        });

        if (productosAsociados > 0) {
            throw new ConflictException(
                `No se puede eliminar el almacén "${almacen.nombre}" porque tiene ${productosAsociados} producto(s) asociado(s). Primero debes reasignar o eliminar los productos del almacén.`,
            );
        }

        await this.almacenRepository.remove(almacen);
    }

    /**
     * Obtener resumen de inventario del almacén
     */
    async getResumenInventario(id: string): Promise<any> {
        const almacen = await this.findOne(id);

        const totalProductos = almacen.productosAlmacen?.length || 0;
        const stockTotal = almacen.productosAlmacen?.reduce(
            (sum, pa) => sum + pa.stock,
            0,
        ) || 0;

        const productosBajoStock = almacen.productosAlmacen?.filter(
            (pa) => pa.stock < pa.stock_minimo,
        ).length || 0;

        const productosSobreStock = almacen.productosAlmacen?.filter(
            (pa) => pa.stock > pa.stock_maximo,
        ).length || 0;

        return {
            almacen: {
                id_almacen: almacen.id_almacen,
                nombre: almacen.nombre,
                ubicacion: almacen.ubicacion,
                tipo: almacen.tipo,
                capacidad_total: almacen.capacidad_total,
                capacidad_ocupada: almacen.capacidad_ocupada,
            },
            resumen: {
                total_productos: totalProductos,
                stock_total: stockTotal,
                productos_bajo_stock: productosBajoStock,
                productos_sobre_stock: productosSobreStock,
            },
        };
    }

    /**
     * Validar que el nombre sea único
     */
    private async validateNombreUnico(
        nombre: string,
        excludeId?: string,
    ): Promise<void> {
        const existing = await this.almacenRepository.findOne({
            where: { nombre },
        });

        if (existing && existing.id_almacen !== excludeId) {
            throw new ConflictException(
                `Ya existe un almacén con el nombre "${nombre}"`,
            );
        }
    }

    /**
     * Validar que capacidad_ocupada <= capacidad_total
     */
    private validateCapacidades(
        capacidadTotal: number,
        capacidadOcupada: number,
    ): void {
        if (capacidadOcupada > capacidadTotal) {
            throw new BadRequestException(
                'La capacidad ocupada no puede ser mayor a la capacidad total',
            );
        }
    }
}
