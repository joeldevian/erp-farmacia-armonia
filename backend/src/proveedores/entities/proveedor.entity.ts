import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import type { ProveedorProducto } from '../../proveedor-producto/entities/proveedor-producto.entity';

export enum EstadoProveedor {
    ACTIVO = 'activo',
    INACTIVO = 'inactivo',
}

@Entity('proveedores')
export class Proveedor {
    @PrimaryGeneratedColumn('uuid')
    id_proveedor: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    razon_social: string;

    @Column({ type: 'varchar', length: 255 })
    nombre_comercial: string;

    @Column({ type: 'varchar', length: 11, unique: true })
    ruc: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    telefono: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'text' })
    direccion: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    pagina_web: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({
        type: 'enum',
        enum: EstadoProveedor,
        default: EstadoProveedor.ACTIVO,
    })
    estado: EstadoProveedor;

    // Relación con ProveedorProducto
    @OneToMany('ProveedorProducto', 'proveedor')
    proveedorProductos: ProveedorProducto[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
