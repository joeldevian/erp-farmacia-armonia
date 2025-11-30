import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

@Entity('laboratorios')
export class Laboratorio {
    @PrimaryGeneratedColumn()
    id_laboratorio: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    nombre: string;

    @Column({ type: 'text', nullable: true })
    direccion: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    telefono: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    correo: string;

    @Column({ type: 'varchar', length: 11, nullable: true })
    ruc: string;

    @Column({ type: 'boolean', default: true })
    estado: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    fecha_creacion: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    fecha_actualizacion: Date;

    // Relación con Productos (se implementará cuando se cree el módulo de productos)
    // @OneToMany(() => Producto, (producto) => producto.laboratorio)
    // productos: Producto[];
}
