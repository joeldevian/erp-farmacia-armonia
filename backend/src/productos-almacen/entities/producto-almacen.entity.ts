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
import { Producto } from '../../productos/entities/producto.entity';
import { Almacen } from '../../almacenes/entities/almacen.entity';

export enum EstadoStock {
    NORMAL = 'normal',
    BAJO_STOCK = 'bajo_stock',
    SOBRE_STOCK = 'sobre_stock',
}

@Entity('productos_almacen')
@Index(['id_producto', 'id_almacen'], { unique: true })
export class ProductoAlmacen {
    @PrimaryGeneratedColumn('uuid')
    id_producto_almacen: string;

    @Column({ type: 'int', default: 0 })
    stock: number;

    @Column({ type: 'int' })
    stock_minimo: number;

    @Column({ type: 'int' })
    stock_maximo: number;

    @Column({
        type: 'enum',
        enum: EstadoStock,
        default: EstadoStock.NORMAL,
    })
    estado: EstadoStock;

    // Relación con Producto
    @ManyToOne(() => Producto, { eager: true })
    @JoinColumn({ name: 'id_producto' })
    producto: Producto;

    @Column()
    id_producto: number;

    // Relación con Almacen
    @ManyToOne(() => Almacen, (almacen) => almacen.productosAlmacen, { eager: true })
    @JoinColumn({ name: 'id_almacen' })
    almacen: Almacen;

    @Column()
    id_almacen: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    /**
     * Actualiza el estado del producto en almacén basado en stock
     */
    actualizarEstado(): void {
        if (this.stock < this.stock_minimo) {
            this.estado = EstadoStock.BAJO_STOCK;
        } else if (this.stock > this.stock_maximo) {
            this.estado = EstadoStock.SOBRE_STOCK;
        } else {
            this.estado = EstadoStock.NORMAL;
        }
    }
}
