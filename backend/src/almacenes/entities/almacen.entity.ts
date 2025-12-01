import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { ProductoAlmacen } from '../../productos-almacen/entities/producto-almacen.entity';

export enum TipoAlmacen {
    PRINCIPAL = 'principal',
    SECUNDARIO = 'secundario',
    TRANSITORIO = 'transitorio',
}

export enum EstadoAlmacen {
    ACTIVO = 'activo',
    INACTIVO = 'inactivo',
}

@Entity('almacenes')
export class Almacen {
    @PrimaryGeneratedColumn('uuid')
    id_almacen: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    nombre: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'varchar', length: 255 })
    ubicacion: string;

    @Column({ type: 'int' })
    capacidad_total: number;

    @Column({ type: 'int', default: 0 })
    capacidad_ocupada: number;

    @Column({
        type: 'enum',
        enum: TipoAlmacen,
        default: TipoAlmacen.PRINCIPAL,
    })
    tipo: TipoAlmacen;

    @Column({
        type: 'enum',
        enum: EstadoAlmacen,
        default: EstadoAlmacen.ACTIVO,
    })
    estado: EstadoAlmacen;

    // Relación con ProductoAlmacen
    @OneToMany(() => ProductoAlmacen, (productoAlmacen) => productoAlmacen.almacen)
    productosAlmacen: ProductoAlmacen[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
