import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { Laboratorio } from '../../laboratorios/entities/laboratorio.entity';

export enum TipoProducto {
    MEDICAMENTO = 'medicamento',
    INSUMO = 'insumo',
    HIGIENE = 'higiene',
    EQUIPO = 'equipo',
}

@Entity('productos')
export class Producto {
    @PrimaryGeneratedColumn()
    id_producto: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    nombre: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({
        type: 'enum',
        enum: TipoProducto,
        default: TipoProducto.MEDICAMENTO,
    })
    tipo_producto: TipoProducto;

    @Column({ type: 'varchar', length: 100, nullable: true })
    codigo_barra: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    codigo_interno: string;

    @Column({ type: 'varchar', length: 100 })
    unidad_medida: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    concentracion: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    presentacion: string;

    @Column({ type: 'boolean', default: false })
    requiere_receta: boolean;

    @Column({ type: 'int' })
    stock_minimo: number;

    @Column({ type: 'int' })
    stock_maximo: number;

    @Column({ type: 'boolean', default: true })
    estado: boolean;

    // Relaciones
    @ManyToOne(() => Categoria, { eager: true })
    @JoinColumn({ name: 'id_categoria' })
    categoria: Categoria;

    @Column()
    id_categoria: number;

    @ManyToOne(() => Laboratorio, { eager: true })
    @JoinColumn({ name: 'id_laboratorio' })
    laboratorio: Laboratorio;

    @Column()
    id_laboratorio: number;

    @CreateDateColumn({ type: 'timestamp' })
    fecha_creacion: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    fecha_actualizacion: Date;
}
