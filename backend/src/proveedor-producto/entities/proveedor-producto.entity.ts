import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { Proveedor } from '../../proveedores/entities/proveedor.entity';
import { Producto } from '../../productos/entities/producto.entity';

export enum CalidadProveedor {
    ALTA = 'alta',
    MEDIA = 'media',
    BAJA = 'baja',
}

export enum EstadoProveedorProducto {
    ACTIVO = 'activo',
    INACTIVO = 'inactivo',
}

@Entity('proveedor_producto')
@Index(['id_proveedor', 'id_producto'], { unique: true })
export class ProveedorProducto {
    @PrimaryGeneratedColumn('uuid')
    id_proveedor_producto: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio_referencia: number;

    @Column({ type: 'int', nullable: true })
    tiempo_entrega_dias: number;

    @Column({
        type: 'enum',
        enum: CalidadProveedor,
        default: CalidadProveedor.MEDIA,
    })
    calidad: CalidadProveedor;

    @Column({
        type: 'enum',
        enum: EstadoProveedorProducto,
        default: EstadoProveedorProducto.ACTIVO,
    })
    estado: EstadoProveedorProducto;

    // Relación con Proveedor
    @ManyToOne(() => Proveedor, (proveedor) => proveedor.proveedorProductos, {
        eager: true,
    })
    @JoinColumn({ name: 'id_proveedor' })
    proveedor: Proveedor;

    @Column()
    id_proveedor: string;

    // Relación con Producto
    @ManyToOne(() => Producto, { eager: true })
    @JoinColumn({ name: 'id_producto' })
    producto: Producto;

    @Column()
    id_producto: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
