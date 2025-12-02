import type React from 'react';
import { useState, useEffect } from 'react';
import type { Stock, CreateStockDto, UpdateStockDto } from '../../types/stock';
import { productoService } from '../../services/productoService';
import type { Producto } from '../../types/producto';

interface StockFormProps {
    stock: Stock | null;
    onSave: (data: CreateStockDto | UpdateStockDto) => Promise<void>;
    onCancel: () => void;
}

const StockForm: React.FC<StockFormProps> = ({ stock, onSave, onCancel }) => {
    const [formData, setFormData] = useState<CreateStockDto>({
        cantidad_total: 0,
        cantidad_reservada: 0,
        id_producto: 0,
    });

    const [productos, setProductos] = useState<Producto[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    // Cargar productos
    useEffect(() => {
        const loadProductos = async () => {
            try {
                const prods = await productoService.getProductos({ estado: true });
                setProductos(prods);
            } catch (error) {
                console.error('Error al cargar productos:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProductos();
    }, []);

    // Cargar datos del stock si es edición
    useEffect(() => {
        if (stock) {
            setFormData({
                cantidad_total: stock.cantidad_total,
                cantidad_reservada: stock.cantidad_reservada,
                id_producto: stock.id_producto,
            });
        }
    }, [stock]);

    // Calcular cantidad disponible en tiempo real
    const cantidadDisponible = formData.cantidad_total - formData.cantidad_reservada;

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.id_producto || formData.id_producto === 0) {
            newErrors.id_producto = 'Debe seleccionar un producto';
        }

        if (formData.cantidad_total < 0) {
            newErrors.cantidad_total = 'La cantidad total debe ser mayor o igual a 0';
        }

        if (formData.cantidad_reservada < 0) {
            newErrors.cantidad_reservada = 'La cantidad reservada debe ser mayor o igual a 0';
        }

        if (formData.cantidad_reservada > formData.cantidad_total) {
            newErrors.cantidad_reservada =
                'La cantidad reservada no puede ser mayor a la cantidad total';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value, type } = e.target;

        let finalValue: any = value;

        if (name === 'id_producto') {
            finalValue = Number(value);
        } else if (type === 'number') {
            finalValue = Number(value);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: finalValue,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            await onSave(formData);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <div
            style={{
                padding: 'var(--spacing-lg)',
                maxWidth: '600px',
                width: '100%',
            }}
        >
            <h2
                style={{
                    marginBottom: 'var(--spacing-lg)',
                    color: 'var(--text-primary)',
                }}
            >
                {stock ? 'Editar Stock' : 'Crear Stock'}
            </h2>

            <form onSubmit={handleSubmit}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 'var(--spacing-md)',
                    }}
                >
                    {/* Producto */}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Producto <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <select
                            name="id_producto"
                            value={formData.id_producto}
                            onChange={handleChange}
                            disabled={!!stock}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.id_producto ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                                backgroundColor: stock ? '#f3f4f6' : 'white',
                            }}
                        >
                            <option value={0}>Seleccionar producto</option>
                            {productos.map((prod) => (
                                <option key={prod.id_producto} value={prod.id_producto}>
                                    {prod.nombre} ({prod.codigo_interno})
                                </option>
                            ))}
                        </select>
                        {errors.id_producto && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.id_producto}
                            </span>
                        )}
                    </div>

                    {/* Cantidad Total */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Cantidad Total <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                            type="number"
                            name="cantidad_total"
                            value={formData.cantidad_total}
                            onChange={handleChange}
                            min={0}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.cantidad_total ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                            }}
                        />
                        {errors.cantidad_total && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.cantidad_total}
                            </span>
                        )}
                    </div>

                    {/* Cantidad Reservada */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Cantidad Reservada <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                            type="number"
                            name="cantidad_reservada"
                            value={formData.cantidad_reservada}
                            onChange={handleChange}
                            min={0}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.cantidad_reservada ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                            }}
                        />
                        {errors.cantidad_reservada && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.cantidad_reservada}
                            </span>
                        )}
                    </div>

                    {/* Vista previa de cantidad disponible */}
                    <div
                        style={{
                            gridColumn: '1 / -1',
                            padding: 'var(--spacing-md)',
                            backgroundColor: cantidadDisponible >= 0 ? '#d1fae5' : '#fee2e2',
                            borderRadius: 'var(--border-radius-sm)',
                            border: `2px solid ${cantidadDisponible >= 0 ? '#059669' : '#dc2626'}`,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <strong style={{ color: cantidadDisponible >= 0 ? '#065f46' : '#991b1b' }}>
                                Cantidad Disponible:
                            </strong>
                            <span
                                style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    color: cantidadDisponible >= 0 ? '#065f46' : '#991b1b',
                                }}
                            >
                                {cantidadDisponible}
                            </span>
                        </div>
                        <div
                            style={{
                                fontSize: '0.875rem',
                                color: cantidadDisponible >= 0 ? '#065f46' : '#991b1b',
                                marginTop: '0.25rem',
                            }}
                        >
                            {cantidadDisponible < 0
                                ? '⚠️ La cantidad reservada no puede ser mayor a la total'
                                : '✓ Cálculo correcto'}
                        </div>
                    </div>
                </div>

                {/* Botones */}
                <div
                    style={{
                        display: 'flex',
                        gap: 'var(--spacing-md)',
                        justifyContent: 'flex-end',
                        marginTop: 'var(--spacing-lg)',
                    }}
                >
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        style={{
                            padding: 'var(--spacing-sm) var(--spacing-lg)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--border-radius-sm)',
                            backgroundColor: 'white',
                            color: 'var(--text-primary)',
                            fontWeight: 500,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            opacity: isSubmitting ? 0.6 : 1,
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting || cantidadDisponible < 0}
                        style={{
                            padding: 'var(--spacing-sm) var(--spacing-lg)',
                            border: 'none',
                            borderRadius: 'var(--border-radius-sm)',
                            backgroundColor:
                                isSubmitting || cantidadDisponible < 0 ? '#94a3b8' : '#059669',
                            color: 'white',
                            fontWeight: 500,
                            cursor:
                                isSubmitting || cantidadDisponible < 0 ? 'not-allowed' : 'pointer',
                            opacity: isSubmitting || cantidadDisponible < 0 ? 0.6 : 1,
                            transition: 'background-color 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            if (!isSubmitting && cantidadDisponible >= 0)
                                e.currentTarget.style.backgroundColor = '#047857';
                        }}
                        onMouseLeave={(e) => {
                            if (!isSubmitting && cantidadDisponible >= 0)
                                e.currentTarget.style.backgroundColor = '#059669';
                        }}
                    >
                        {isSubmitting ? 'Guardando...' : stock ? 'Actualizar' : 'Crear'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StockForm;
