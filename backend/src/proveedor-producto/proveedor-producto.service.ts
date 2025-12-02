import {
    Injectable,
    ConflictException,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    ProveedorProducto,
    CalidadProveedor,
    EstadoProveedorProducto,
} from './entities/proveedor-producto.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { Producto } from '../productos/entities/producto.entity';
import type { CreateProveedorProductoDto } from './dto/create-proveedor-producto.dto';
import type { UpdateProveedorProductoDto } from './dto/update-proveedor-producto.dto';

@Injectable()
export class ProveedorProductoService {
    constructor(
        @InjectRepository(ProveedorProducto)
        private readonly proveedorProductoRepository: Repository<ProveedorProducto>,
        @InjectRepository(Proveedor)
        private readonly proveedorRepository: Repository<Proveedor>,
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>,
    ) { }

    /**
     * Listar todas las asignaciones con filtros
     */
    async findAll(filtros?: {
        id_proveedor?: string;
        id_producto?: number;
        estado?: EstadoProveedorProducto;
    }): Promise<ProveedorProducto[]> {
        const where: any = {};

        if (filtros?.id_proveedor) {
            where.id_proveedor = filtros.id_proveedor;
        }

        if (filtros?.id_producto) {
            where.id_producto = filtros.id_producto;
        }

        if (filtros?.estado) {
            where.estado = filtros.estado;
        }

        return await this.proveedorProductoRepository.find({
            where,
            order: { created_at: 'DESC' },
        });
    }

    /**
     * Obtener relación específica por UUID
     */
    async findOne(id: string): Promise<ProveedorProducto> {
        const relacion = await this.proveedorProductoRepository.findOne({
            where: { id_proveedor_producto: id },
        });

        if (!relacion) {
            throw new NotFoundException(
                `Relación proveedor-producto con ID ${id} no encontrada`,
            );
        }

        return relacion;
    }

    /**
     * Asignar producto a proveedor con validaciones
     */
    async create(
        createDto: CreateProveedorProductoDto,
    ): Promise<ProveedorProducto> {
        // Validar que el proveedor existe
        await this.validateProveedorExists(createDto.id_proveedor);

        // Validar que el producto existe
        await this.validateProductoExists(createDto.id_producto);

        // Validar que no exista la relación
        await this.validateRelacionNoExiste(
            createDto.id_proveedor,
            createDto.id_producto,
        );

        const relacion =
            this.proveedorProductoRepository.create(createDto);
        return await this.proveedorProductoRepository.save(relacion);
    }

    /**
     * Actualizar relación proveedor-producto
     */
    async update(
        id: string,
        updateDto: UpdateProveedorProductoDto,
    ): Promise<ProveedorProducto> {
        const relacion = await this.findOne(id);

        Object.assign(relacion, updateDto);
        return await this.proveedorProductoRepository.save(relacion);
    }

    /**
     * Eliminar relación proveedor-producto
     */
    async remove(id: string): Promise<{ message: string }> {
        const relacion = await this.findOne(id);
        await this.proveedorProductoRepository.remove(relacion);

        return {
            message: 'Relación proveedor-producto eliminada exitosamente',
        };
    }

    /**
     * Buscar proveedores por producto
     */
    async findByProducto(id_producto: number): Promise<ProveedorProducto[]> {
        // Validar que el producto existe
        await this.validateProductoExists(id_producto);

        return await this.proveedorProductoRepository.find({
            where: {
                id_producto,
                estado: EstadoProveedorProducto.ACTIVO,
            },
            order: { precio_referencia: 'ASC' },
        });
    }

    /**
     * Encontrar el mejor proveedor para un producto
     * Criterios: 1) Calidad, 2) Precio, 3) Tiempo de entrega
     */
    async findMejorProveedor(
        id_producto: number,
    ): Promise<ProveedorProducto | null> {
        const proveedores = await this.findByProducto(id_producto);

        if (proveedores.length === 0) {
            return null;
        }

        // Puntajes de calidad
        const calidadScore = {
            [CalidadProveedor.ALTA]: 3,
            [CalidadProveedor.MEDIA]: 2,
            [CalidadProveedor.BAJA]: 1,
        };

        // Ordenar por: 1) Calidad (desc), 2) Precio (asc), 3) Tiempo (asc)
        const sorted = proveedores.sort((a, b) => {
            // 1. Comparar calidad (mayor es mejor)
            const calidadDiff =
                calidadScore[b.calidad] - calidadScore[a.calidad];
            if (calidadDiff !== 0) return calidadDiff;

            // 2. Comparar precio (menor es mejor)
            const precioDiff =
                Number(a.precio_referencia) - Number(b.precio_referencia);
            if (precioDiff !== 0) return precioDiff;

            // 3. Comparar tiempo de entrega (menor es mejor)
            const tiempoA = a.tiempo_entrega_dias || 999;
            const tiempoB = b.tiempo_entrega_dias || 999;
            return tiempoA - tiempoB;
        });

        return sorted[0];
    }

    /**
     * Validar que el proveedor existe
     */
    private async validateProveedorExists(
        id_proveedor: string,
    ): Promise<void> {
        const proveedor = await this.proveedorRepository.findOne({
            where: { id_proveedor },
        });

        if (!proveedor) {
            throw new NotFoundException(
                `Proveedor con ID ${id_proveedor} no encontrado`,
            );
        }
    }

    /**
     * Validar que el producto existe
     */
    private async validateProductoExists(id_producto: number): Promise<void> {
        const producto = await this.productoRepository.findOne({
            where: { id_producto },
        });

        if (!producto) {
            throw new NotFoundException(
                `Producto con ID ${id_producto} no encontrado`,
            );
        }
    }

    /**
     * Validar que no exista la relación proveedor-producto
     */
    private async validateRelacionNoExiste(
        id_proveedor: string,
        id_producto: number,
    ): Promise<void> {
        const existing = await this.proveedorProductoRepository.findOne({
            where: { id_proveedor, id_producto },
        });

        if (existing) {
            throw new ConflictException(
                'Ya existe una relación entre este proveedor y producto',
            );
        }
    }
}
