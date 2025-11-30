import api from './api';
import type { Categoria, CreateCategoriaDto, UpdateCategoriaDto } from '../types/categoria';

export const categoriaService = {
    async getCategorias(filtros?: {
        nombre?: string;
        estado?: boolean;
    }): Promise<Categoria[]> {
        try {
            const params = new URLSearchParams();
            if (filtros?.nombre) params.append('nombre', filtros.nombre);
            if (filtros?.estado !== undefined)
                params.append('estado', String(filtros.estado));

            const response = await api.get<Categoria[]>(
                `/categorias?${params.toString()}`,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al obtener categorías',
            );
        }
    },

    async getCategoriaById(id: number): Promise<Categoria> {
        try {
            const response = await api.get<Categoria>(`/categorias/${id}`);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al obtener la categoría',
            );
        }
    },

    async createCategoria(data: CreateCategoriaDto): Promise<Categoria> {
        try {
            const response = await api.post<Categoria>('/categorias', data);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al crear la categoría',
            );
        }
    },

    async updateCategoria(
        id: number,
        data: UpdateCategoriaDto,
    ): Promise<Categoria> {
        try {
            const response = await api.put<Categoria>(`/categorias/${id}`, data);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al actualizar la categoría',
            );
        }
    },

    async deleteCategoria(
        id: number,
    ): Promise<{ message: string; categoria: Categoria }> {
        try {
            const response = await api.delete<{
                message: string;
                categoria: Categoria;
            }>(`/categorias/${id}`);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al desactivar la categoría',
            );
        }
    },

    async hardDeleteCategoria(id: number): Promise<{ message: string }> {
        try {
            const response = await api.delete<{ message: string }>(
                `/categorias/${id}/hard-delete`,
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Error al eliminar la categoría',
            );
        }
    },
};
