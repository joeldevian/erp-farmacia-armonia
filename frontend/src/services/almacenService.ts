import axios from 'axios';
import type {
    Almacen,
    CreateAlmacenDto,
    UpdateAlmacenDto,
    TipoAlmacen,
    EstadoAlmacen,
} from '../types/almacen';

const API_URL = 'http://localhost:3000/almacenes';

export const almacenService = {
    /**
     * Obtener todos los almacenes con filtros opcionales
     */
    async getAlmacenes(filtros?: {
        tipo?: TipoAlmacen;
        estado?: EstadoAlmacen;
    }): Promise<Almacen[]> {
        const params = new URLSearchParams();
        if (filtros?.tipo) params.append('tipo', filtros.tipo);
        if (filtros?.estado) params.append('estado', filtros.estado);

        const url = params.toString() ? `${API_URL}?${params}` : API_URL;
        const response = await axios.get<Almacen[]>(url);
        return response.data;
    },

    /**
     * Obtener almacén por ID
     */
    async getAlmacenById(id: string): Promise<Almacen> {
        const response = await axios.get<Almacen>(`${API_URL}/${id}`);
        return response.data;
    },

    /**
     * Crear almacén
     */
    async createAlmacen(data: CreateAlmacenDto): Promise<Almacen> {
        const response = await axios.post<Almacen>(API_URL, data);
        return response.data;
    },

    /**
     * Actualizar almacén
     */
    async updateAlmacen(id: string, data: UpdateAlmacenDto): Promise<Almacen> {
        const response = await axios.patch<Almacen>(`${API_URL}/${id}`, data);
        return response.data;
    },

    /**
     * Soft delete (desactivar)
     */
    async deleteAlmacen(id: string): Promise<{ message: string; entity: Almacen }> {
        const response = await axios.delete<{ message: string; entity: Almacen }>(
            `${API_URL}/${id}`,
        );
        return response.data;
    },

    /**
     * Hard delete (eliminar permanentemente)
     */
    async hardDeleteAlmacen(id: string): Promise<{ message: string }> {
        const response = await axios.delete<{ message: string }>(
            `${API_URL}/${id}/hard-delete`,
        );
        return response.data;
    },

    /**
     * Obtener resumen de inventario del almacén
     */
    async getResumenInventario(id: string): Promise<any> {
        const response = await axios.get(`${API_URL}/${id}/resumen`);
        return response.data;
    },
};
