import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Proveedor } from '../../proveedores/entities/proveedor.entity';
import { Almacen } from '../../almacenes/entities/almacen.entity';
import { OrdenCompraDetalle } from './orden-compra-detalle.entity';

export enum EstadoOrdenCompra {
    PENDIENTE = 'pendiente',
    APROBADA = 'aprobada',
    RECHAZADA = 'rechazada',
    RECIBIDA = 'recibida',
    ANULADA = 'anulada',
}

@Entity('orden_compra')
export class OrdenCompra {
    @PrimaryGeneratedColumn('uuid')
    id_orden_compra: string;

    @Column({ unique: true, length: 50 })
    numero_orden: string;

    @Column({ type: 'date' })
    fecha_emision: Date;

    @Column({ type: 'date' })
    fecha_entrega_estimada: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    impuestos: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;

    @Column({
        type: 'enum',
        enum: EstadoOrdenCompra,
        default: EstadoOrdenCompra.PENDIENTE,
    })
    estado: EstadoOrdenCompra;

    @Column({ type: 'text', nullable: true })
    observaciones?: string;

    @Column()
    id_proveedor: string;

    @ManyToOne(() => Proveedor, { eager: true })
    @JoinColumn({ name: 'id_proveedor' })
    proveedor: Proveedor;

    @Column()
    id_almacen: string;

    @ManyToOne(() => Almacen, { eager: true })
    @JoinColumn({ name: 'id_almacen' })
    almacen: Almacen;

    @OneToMany(() => OrdenCompraDetalle, (detalle) => detalle.ordenCompra, {
        cascade: true,
    })
    detalles: OrdenCompraDetalle[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
