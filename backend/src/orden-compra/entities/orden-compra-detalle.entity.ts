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
import { OrdenCompra } from './orden-compra.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('orden_compra_detalle')
@Index(['id_orden_compra', 'id_producto'], { unique: true })
export class OrdenCompraDetalle {
    @PrimaryGeneratedColumn('uuid')
    id_orden_compra_detalle: string;

    @Column({ type: 'int' })
    cantidad: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio_unitario: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number;

    @Column()
    id_orden_compra: string;

    @Column()
    id_producto: number;

    @ManyToOne(() => OrdenCompra, (orden) => orden.detalles, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'id_orden_compra' })
    ordenCompra: OrdenCompra;

    @ManyToOne(() => Producto, { eager: true })
    @JoinColumn({ name: 'id_producto' })
    producto: Producto;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
