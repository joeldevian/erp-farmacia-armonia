import api from './api';
import type {
    Proveedor,
    CreateProveedorDto,
    UpdateProveedorDto,
    EstadoProveedor,
} from '../types/proveedor';

export const proveedorService = {
    async getProveedores(filtros?: {
        estado?: EstadoProveedor;
    }): Promise<Proveedor[]> {
        try {
            const params = new URLSearchParams();
            if (filtros?.estado) params.append('estado', filtros.estado);

            const response = await api.get<Proveedor[]>(
                `/proveedores?${params.toString()}`,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al obtener proveedores',
            );
        }
    },

    async getProveedorById(id: string): Promise<Proveedor> {
        try {
            const response = await api.get<Proveedor>(`/proveedores/${id}`);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al obtener el proveedor',
            );
        }
    },

    async createProveedor(data: CreateProveedorDto): Promise<Proveedor> {
        try {
            const response = await api.post<Proveedor>('/proveedores', data);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al crear el proveedor',
            );
        }
    },

    async updateProveedor(
        id: string,
        data: UpdateProveedorDto,
    ): Promise<Proveedor> {
        try {
            const response = await api.patch<Proveedor>(
                `/proveedores/${id}`,
                data,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                'Error al actualizar el proveedor',
            );
        }
    },

    async deleteProveedor(
        id: string,
    ): Promise<{ message: string; entity: Proveedor }> {
        try {
            const response = await api.delete<{
                message: string;
                entity: Proveedor;
            }>(`/proveedores/${id}`);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                'Error al desactivar el proveedor',
            );
        }
    },

    async hardDeleteProveedor(id: string): Promise<{ message: string }> {
        try {
            const response = await api.delete<{ message: string }>(
                `/proveedores/${id}/hard-delete`,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al eliminar el proveedor',
            );
        }
    },
};
