import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';

export enum EstadoStock {
    NORMAL = 'normal',
    BAJO_STOCK = 'bajo_stock',
    SIN_STOCK = 'sin_stock',
}

@Entity('stock')
export class Stock {
    @PrimaryGeneratedColumn('uuid')
    id_stock: string;

    @Column({ type: 'int', default: 0 })
    cantidad_total: number;

    @Column({ type: 'int', default: 0 })
    cantidad_disponible: number;

    @Column({ type: 'int', default: 0 })
    cantidad_reservada: number;

    @Column({
        type: 'enum',
        enum: EstadoStock,
        default: EstadoStock.NORMAL,
    })
    estado: EstadoStock;

    // Relación 1:1 con Producto
    @OneToOne(() => Producto, { eager: true })
    @JoinColumn({ name: 'id_producto' })
    producto: Producto;

    @Column({ unique: true })
    @Index({ unique: true })
    id_producto: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    /**
     * Recalcula cantidad_disponible y estado automáticamente
     */
    recalcular(): void {
        // Calcular cantidad disponible
        this.cantidad_disponible = this.cantidad_total - this.cantidad_reservada;

        // Calcular estado
        if (this.cantidad_disponible === 0) {
            this.estado = EstadoStock.SIN_STOCK;
        } else if (this.producto && this.cantidad_disponible < this.producto.stock_minimo) {
            this.estado = EstadoStock.BAJO_STOCK;
        } else {
            this.estado = EstadoStock.NORMAL;
        }
    }
}
