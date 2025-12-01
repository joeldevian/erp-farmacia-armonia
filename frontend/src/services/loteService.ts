import api from './api';
import type {
    Lote,
    CreateLoteDto,
    UpdateLoteDto,
    EstadoLote,
} from '../types/lote';

export const loteService = {
    async getLotes(filtros?: {
        id_producto?: number;
        estado?: EstadoLote;
    }): Promise<Lote[]> {
        try {
            const params = new URLSearchParams();
            if (filtros?.id_producto)
                params.append('id_producto', String(filtros.id_producto));
            if (filtros?.estado) params.append('estado', filtros.estado);

            const response = await api.get<Lote[]>(
                `/lotes?${params.toString()}`,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al obtener lotes',
            );
        }
    },

    async getLoteById(id: string): Promise<Lote> {
        try {
            const response = await api.get<Lote>(`/lotes/${id}`);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al obtener el lote',
            );
        }
    },

    async createLote(data: CreateLoteDto): Promise<Lote> {
        try {
            const response = await api.post<Lote>('/lotes', data);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al crear el lote',
            );
        }
    },

    async updateLote(id: string, data: UpdateLoteDto): Promise<Lote> {
        try {
            const response = await api.patch<Lote>(`/lotes/${id}`, data);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al actualizar el lote',
            );
        }
    },

    async deleteLote(id: string): Promise<{ message: string; entity: Lote }> {
        try {
            const response = await api.delete<{
                message: string;
                entity: Lote;
            }>(`/lotes/${id}`);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al desactivar el lote',
            );
        }
    },

    async hardDeleteLote(id: string): Promise<{ message: string }> {
        try {
            const response = await api.delete<{ message: string }>(
                `/lotes/${id}/hard-delete`,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al eliminar el lote',
            );
        }
    },

    async getLotesProximosAVencer(dias: number = 30): Promise<Lote[]> {
        try {
            const response = await api.get<Lote[]>(
                `/lotes/proximos-vencer?dias=${dias}`,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                'Error al obtener lotes próximos a vencer',
            );
        }
    },
};
