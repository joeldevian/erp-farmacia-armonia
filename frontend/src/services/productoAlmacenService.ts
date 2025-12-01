import axios from 'axios';
import type {
    ProductoAlmacen,
    CreateProductoAlmacenDto,
    UpdateProductoAlmacenDto,
} from '../types/producto-almacen';

const API_URL = 'http://localhost:3000/productos-almacen';

export const productoAlmacenService = {
    /**
     * Obtener todas las asignaciones
     */
    async getProductosAlmacen(): Promise<ProductoAlmacen[]> {
        const response = await axios.get<ProductoAlmacen[]>(API_URL);
        return response.data;
    },

    /**
     * Obtener asignación por ID
     */
    async getProductoAlmacenById(id: string): Promise<ProductoAlmacen> {
        const response = await axios.get<ProductoAlmacen>(`${API_URL}/${id}`);
        return response.data;
    },

    /**
     * Crear asignación producto-almacén
     */
    async createProductoAlmacen(
        data: CreateProductoAlmacenDto,
    ): Promise<ProductoAlmacen> {
        const response = await axios.post<ProductoAlmacen>(API_URL, data);
        return response.data;
    },

    /**
     * Actualizar asignación
     */
    async updateProductoAlmacen(
        id: string,
        data: UpdateProductoAlmacenDto,
    ): Promise<ProductoAlmacen> {
        const response = await axios.patch<ProductoAlmacen>(`${API_URL}/${id}`, data);
        return response.data;
    },

    /**
     * Eliminar asignación
     */
    async deleteProductoAlmacen(id: string): Promise<void> {
        await axios.delete(`${API_URL}/${id}`);
    },

    /**
     * Obtener productos con bajo stock
     */
    async getProductosBajoStock(idAlmacen?: string): Promise<ProductoAlmacen[]> {
        const url = idAlmacen
            ? `${API_URL}/bajo-stock?id_almacen=${idAlmacen}`
            : `${API_URL}/bajo-stock`;
        const response = await axios.get<ProductoAlmacen[]>(url);
        return response.data;
    },

    /**
     * Obtener productos de un almacén específico
     */
    async getProductosPorAlmacen(idAlmacen: string): Promise<ProductoAlmacen[]> {
        const response = await axios.get<ProductoAlmacen[]>(
            `${API_URL}/almacen/${idAlmacen}`,
        );
        return response.data;
    },
};
