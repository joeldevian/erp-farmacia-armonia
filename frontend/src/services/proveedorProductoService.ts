import api from './api';
import type {
    ProveedorProducto,
    CreateProveedorProductoDto,
    UpdateProveedorProductoDto,
    EstadoProveedorProducto,
} from '../types/proveedor-producto';

export const proveedorProductoService = {
    async getProveedorProductos(filtros?: {
        id_proveedor?: string;
        id_producto?: number;
        estado?: EstadoProveedorProducto;
    }): Promise<ProveedorProducto[]> {
        try {
            const params = new URLSearchParams();
            if (filtros?.id_proveedor)
                params.append('id_proveedor', filtros.id_proveedor);
            if (filtros?.id_producto)
                params.append('id_producto', String(filtros.id_producto));
            if (filtros?.estado) params.append('estado', filtros.estado);

            const response = await api.get<ProveedorProducto[]>(
                `/proveedor-producto?${params.toString()}`,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                'Error al obtener relaciones proveedor-producto',
            );
        }
    },

    async getProveedorProductoById(id: string): Promise<ProveedorProducto> {
        try {
            const response = await api.get<ProveedorProducto>(
                `/proveedor-producto/${id}`,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                'Error al obtener la relación',
            );
        }
    },

    async createProveedorProducto(
        data: CreateProveedorProductoDto,
    ): Promise<ProveedorProducto> {
        try {
            const response = await api.post<ProveedorProducto>(
                '/proveedor-producto',
                data,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                'Error al asignar producto a proveedor',
            );
        }
    },

    async updateProveedorProducto(
        id: string,
        data: UpdateProveedorProductoDto,
    ): Promise<ProveedorProducto> {
        try {
            const response = await api.patch<ProveedorProducto>(
                `/proveedor-producto/${id}`,
                data,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                'Error al actualizar la relación',
            );
        }
    },

    async deleteProveedorProducto(id: string): Promise<{ message: string }> {
        try {
            const response = await api.delete<{ message: string }>(
                `/proveedor-producto/${id}`,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                'Error al eliminar la relación',
            );
        }
    },

    async getProveedoresByProducto(
        id_producto: number,
    ): Promise<ProveedorProducto[]> {
        try {
            const response = await api.get<ProveedorProducto[]>(
                `/proveedor-producto/producto/${id_producto}`,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                'Error al buscar proveedores del producto',
            );
        }
    },

    async getMejorProveedor(
        id_producto: number,
    ): Promise<ProveedorProducto | null> {
        try {
            const response = await api.get<ProveedorProducto | null>(
                `/proveedor-producto/mejor/${id_producto}`,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                'Error al buscar mejor proveedor',
            );
        }
    },
};
