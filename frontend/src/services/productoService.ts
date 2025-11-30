import api from './api';
import type {
    Producto,
    CreateProductoDto,
    UpdateProductoDto,
    TipoProducto,
} from '../types/producto';

export const productoService = {
    async getProductos(filtros?: {
        nombre?: string;
        codigo_interno?: string;
        id_categoria?: number;
        id_laboratorio?: number;
        tipo_producto?: TipoProducto;
        estado?: boolean;
    }): Promise<Producto[]> {
        try {
            const params = new URLSearchParams();
            if (filtros?.nombre) params.append('nombre', filtros.nombre);
            if (filtros?.codigo_interno)
                params.append('codigo_interno', filtros.codigo_interno);
            if (filtros?.id_categoria)
                params.append('id_categoria', String(filtros.id_categoria));
            if (filtros?.id_laboratorio)
                params.append('id_laboratorio', String(filtros.id_laboratorio));
            if (filtros?.tipo_producto)
                params.append('tipo_producto', filtros.tipo_producto);
            if (filtros?.estado !== undefined)
                params.append('estado', String(filtros.estado));

            const response = await api.get<Producto[]>(
                `/productos?${params.toString()}`,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al obtener productos',
            );
        }
    },

    async getProductoById(id: number): Promise<Producto> {
        try {
            const response = await api.get<Producto>(`/productos/${id}`);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al obtener el producto',
            );
        }
    },

    async createProducto(data: CreateProductoDto): Promise<Producto> {
        try {
            const response = await api.post<Producto>('/productos', data);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al crear el producto',
            );
        }
    },

    async updateProducto(
        id: number,
        data: UpdateProductoDto,
    ): Promise<Producto> {
        try {
            const response = await api.put<Producto>(`/productos/${id}`, data);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al actualizar el producto',
            );
        }
    },

    async deleteProducto(
        id: number,
    ): Promise<{ message: string; entity: Producto }> {
        try {
            const response = await api.delete<{
                message: string;
                entity: Producto;
            }>(`/productos/${id}`);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al desactivar el producto',
            );
        }
    },

    async hardDeleteProducto(id: number): Promise<{ message: string }> {
        try {
            const response = await api.delete<{ message: string }>(
                `/productos/${id}/hard-delete`,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al eliminar el producto',
            );
        }
    },
};
