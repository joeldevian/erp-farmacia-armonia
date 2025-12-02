import axios from 'axios';
import type {
    Stock,
    CreateStockDto,
    UpdateStockDto,
    EstadoStock,
} from '../types/stock';

const API_URL = 'http://localhost:3000/stock';

export const stockService = {
    /**
     * Obtener todos los stocks con filtros opcionales
     */
    getStocks: async (filtros?: { estado?: EstadoStock }): Promise<Stock[]> => {
        const params = new URLSearchParams();
        if (filtros?.estado) params.append('estado', filtros.estado);

        const url = params.toString() ? `${API_URL}?${params}` : API_URL;
        const response = await axios.get<Stock[]>(url);
        return response.data;
    },

    /**
     * Obtener stock por ID
     */
    getStockById: async (id: string): Promise<Stock> => {
        const response = await axios.get<Stock>(`${API_URL}/${id}`);
        return response.data;
    },

    /**
     * Crear stock
     */
    createStock: async (data: CreateStockDto): Promise<Stock> => {
        const response = await axios.post<Stock>(API_URL, data);
        return response.data;
    },

    /**
     * Actualizar stock
     */
    updateStock: async (id: string, data: UpdateStockDto): Promise<Stock> => {
        const response = await axios.patch<Stock>(`${API_URL}/${id}`, data);
        return response.data;
    },

    /**
     * Eliminar stock
     */
    deleteStock: async (id: string): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    },

    /**
     * Hard delete
     */
    hardDeleteStock: async (id: string): Promise<{ message: string }> => {
        const response = await axios.delete<{ message: string }>(
            `${API_URL}/${id}/hard-delete`,
        );
        return response.data;
    },

    /**
     * Obtener productos con bajo stock
     */
    getStocksBajoStock: async (): Promise<Stock[]> => {
        const response = await axios.get<Stock[]>(`${API_URL}/bajo`);
        return response.data;
    },

    /**
     * Obtener productos sin stock
     */
    getStocksSinStock: async (): Promise<Stock[]> => {
        const response = await axios.get<Stock[]>(`${API_URL}/sin`);
        return response.data;
    },
};
