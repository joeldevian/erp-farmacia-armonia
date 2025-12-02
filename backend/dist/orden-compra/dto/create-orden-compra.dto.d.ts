export declare class CreateOrdenCompraDto {
    fecha_emision: string;
    fecha_entrega_estimada: string;
    id_proveedor: string;
    id_almacen: string;
    subtotal?: number;
    impuestos: number;
    total?: number;
    observaciones?: string;
}
