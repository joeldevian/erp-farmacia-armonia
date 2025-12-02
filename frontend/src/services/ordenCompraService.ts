import type {
    OrdenCompra,
    CreateOrdenCompraDto,
    UpdateOrdenCompraDto,
    CambiarEstadoDto,
    EstadoOrdenCompra,
} from '../types/orden-compra';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const ordenCompraService = {
    async getOrdenesCompra(filters?: {
        estado?: EstadoOrdenCompra;
        id_proveedor?: string;
    }): Promise<OrdenCompra[]> {
        const params = new URLSearchParams();
        if (filters?.estado) params.append('estado', filters.estado);
        if (filters?.id_proveedor) params.append('id_proveedor', filters.id_proveedor);

        const queryString = params.toString();
        const url = `${API_URL}/orden-compra${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al obtener órdenes de compra');
        }
        return response.json();
    },

    async getOrdenCompra(id: string): Promise<OrdenCompra> {
        const response = await fetch(`${API_URL}/orden-compra/${id}`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al obtener la orden de compra');
        }
        return response.json();
    },

    async getOrdenesPendientes(): Promise<OrdenCompra[]> {
        const response = await fetch(`${API_URL}/orden-compra/pendientes`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al obtener órdenes pendientes');
        }
        return response.json();
    },

    async getOrdenesByProveedor(id_proveedor: string): Promise<OrdenCompra[]> {
        const response = await fetch(`${API_URL}/orden-compra/proveedor/${id_proveedor}`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al obtener órdenes del proveedor');
        }
        return response.json();
    },

    async createOrdenCompra(data: CreateOrdenCompraDto): Promise<OrdenCompra> {
        const response = await fetch(`${API_URL}/orden-compra`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al crear la orden de compra');
        }
        return response.json();
    },

    async updateOrdenCompra(
        id: string,
        data: UpdateOrdenCompraDto,
    ): Promise<OrdenCompra> {
        const response = await fetch(`${API_URL}/orden-compra/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al actualizar la orden de compra');
        }
        return response.json();
    },

    async cambiarEstado(id: string, data: CambiarEstadoDto): Promise<OrdenCompra> {
        const response = await fetch(`${API_URL}/orden-compra/${id}/estado`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al cambiar el estado de la orden');
        }
        return response.json();
    },

    async deleteOrdenCompra(id: string): Promise<{ message: string }> {
        const response = await fetch(`${API_URL}/orden-compra/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al anular la orden de compra');
        }
        return response.json();
    },
};
