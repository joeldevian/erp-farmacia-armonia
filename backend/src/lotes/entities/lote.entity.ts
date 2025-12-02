import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';

export enum EstadoLote {
    ACTIVO = 'activo',
    EXPIRADO = 'expirado',
    AGOTADO = 'agotado',
}

@Entity('lotes')
export class Lote {
    @PrimaryGeneratedColumn('uuid')
    id_lote: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    codigo_lote: string;

    @Column({ type: 'date' })
    fecha_fabricacion: Date;

    @Column({ type: 'date' })
    fecha_vencimiento: Date;

    @Column({ type: 'int' })
    cantidad_inicial: number;

    @Column({ type: 'int' })
    cantidad_actual: number;

    @Column({
        type: 'enum',
        enum: EstadoLote,
        default: EstadoLote.ACTIVO,
    })
    estado: EstadoLote;

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

    /**
     * Actualiza el estado del lote basado en fechas y cantidades
     * No sobrescribe el estado AGOTADO si cantidad_actual es 0
     */
    actualizarEstado(): void {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const fechaVenc = new Date(this.fecha_vencimiento);
        fechaVenc.setHours(0, 0, 0, 0);

        // Si cantidad es 0, mantener como AGOTADO (respeta soft delete)
        if (this.cantidad_actual === 0) {
            this.estado = EstadoLote.AGOTADO;
            return; // No continuar con otras validaciones
        }

        // Si está vencido
        if (fechaVenc < hoy) {
            this.estado = EstadoLote.EXPIRADO;
        }
        // Si tiene stock y no está vencido
        else {
            this.estado = EstadoLote.ACTIVO;
        }
    }
}
