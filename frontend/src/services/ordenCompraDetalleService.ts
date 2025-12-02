import type {
    OrdenCompraDetalle,
    CreateOrdenCompraDetalleDto,
    UpdateOrdenCompraDetalleDto,
} from '../types/orden-compra-detalle';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const ordenCompraDetalleService = {
    async getDetallesByOrden(id_orden_compra: string): Promise<OrdenCompraDetalle[]> {
        const response = await fetch(
            `${API_URL}/orden-compra-detalle/orden/${id_orden_compra}`,
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al obtener los detalles');
        }
        return response.json();
    },

    async getDetalle(id: string): Promise<OrdenCompraDetalle> {
        const response = await fetch(`${API_URL}/orden-compra-detalle/${id}`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al obtener el detalle');
        }
        return response.json();
    },

    async createDetalle(
        data: CreateOrdenCompraDetalleDto,
    ): Promise<OrdenCompraDetalle> {
        const response = await fetch(`${API_URL}/orden-compra-detalle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al agregar el producto');
        }
        return response.json();
    },

    async updateDetalle(
        id: string,
        data: UpdateOrdenCompraDetalleDto,
    ): Promise<OrdenCompraDetalle> {
        const response = await fetch(`${API_URL}/orden-compra-detalle/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al actualizar el detalle');
        }
        return response.json();
    },

    async deleteDetalle(id: string): Promise<{ message: string }> {
        const response = await fetch(`${API_URL}/orden-compra-detalle/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al eliminar el producto');
        }
        return response.json();
    },
};
