import api from './api';
import type { Laboratorio, CreateLaboratorioDto, UpdateLaboratorioDto } from '../types/laboratorio';

export const laboratorioService = {
    async getLaboratorios(filtros?: {
        nombre?: string;
        estado?: boolean;
    }): Promise<Laboratorio[]> {
        try {
            const params = new URLSearchParams();
            if (filtros?.nombre) params.append('nombre', filtros.nombre);
            if (filtros?.estado !== undefined)
                params.append('estado', String(filtros.estado));

            const response = await api.get<Laboratorio[]>(
                `/laboratorios?${params.toString()}`,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al obtener laboratorios',
            );
        }
    },

    async getLaboratorioById(id: number): Promise<Laboratorio> {
        try {
            const response = await api.get<Laboratorio>(`/laboratorios/${id}`);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al obtener el laboratorio',
            );
        }
    },

    async createLaboratorio(data: CreateLaboratorioDto): Promise<Laboratorio> {
        try {
            const response = await api.post<Laboratorio>('/laboratorios', data);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al crear el laboratorio',
            );
        }
    },

    async updateLaboratorio(
        id: number,
        data: UpdateLaboratorioDto,
    ): Promise<Laboratorio> {
        try {
            const response = await api.put<Laboratorio>(`/laboratorios/${id}`, data);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al actualizar el laboratorio',
            );
        }
    },

    async deleteLaboratorio(
        id: number,
    ): Promise<{ message: string; entity: Laboratorio }> {
        try {
            const response = await api.delete<{
                message: string;
                entity: Laboratorio;
            }>(`/laboratorios/${id}`);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al desactivar el laboratorio',
            );
        }
    },

    async hardDeleteLaboratorio(id: number): Promise<{ message: string }> {
        try {
            const response = await api.delete<{ message: string }>(
                `/laboratorios/${id}/hard-delete`,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al eliminar el laboratorio',
            );
        }
    },
};
