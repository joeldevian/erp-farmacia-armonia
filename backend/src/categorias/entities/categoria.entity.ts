import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

@Entity('categorias')
export class Categoria {
    @PrimaryGeneratedColumn()
    id_categoria: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    nombre: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'boolean', default: true })
    estado: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    fecha_creacion: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    fecha_actualizacion: Date;

    // Relación con Productos (se implementará cuando se cree el módulo de productos)
    // @OneToMany(() => Producto, (producto) => producto.categoria)
    // productos: Producto[];
}
