import type React from 'react';
import { useState, useEffect } from 'react';
import type {
    ProductoAlmacen,
    CreateProductoAlmacenDto,
    UpdateProductoAlmacenDto,
} from '../../types/producto-almacen';
import { productoService } from '../../services/productoService';
import { almacenService } from '../../services/almacenService';
import type { Producto } from '../../types/producto';
import type { Almacen } from '../../types/almacen';
import { EstadoAlmacen } from '../../types/almacen';

interface ProductoAlmacenFormProps {
    productoAlmacen: ProductoAlmacen | null;
    almacenId?: string;
    onSave: (data: CreateProductoAlmacenDto | UpdateProductoAlmacenDto) => Promise<void>;
    onCancel: () => void;
}

const ProductoAlmacenForm: React.FC<ProductoAlmacenFormProps> = ({
    productoAlmacen,
    almacenId,
    onSave,
    onCancel,
}) => {
    const [formData, setFormData] = useState<CreateProductoAlmacenDto>({
        stock: 0,
        stock_minimo: 10,
        stock_maximo: 100,
        id_producto: 0,
        id_almacen: almacenId || '',
    });

    const [productos, setProductos] = useState<Producto[]>([]);
    const [almacenes, setAlmacenes] = useState<Almacen[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    // Cargar productos y almacenes
    useEffect(() => {
        const loadData = async () => {
            try {
                const [prods, alms] = await Promise.all([
                    productoService.getProductos({ estado: true }),
                    almacenService.getAlmacenes({ estado: EstadoAlmacen.ACTIVO }),
                ]);
                setProductos(prods);
                setAlmacenes(alms);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Cargar datos del producto-almacén si es edición
    useEffect(() => {
        if (productoAlmacen) {
            setFormData({
                stock: productoAlmacen.stock,
                stock_minimo: productoAlmacen.stock_minimo,
                stock_maximo: productoAlmacen.stock_maximo,
                id_producto: productoAlmacen.id_producto,
                id_almacen: productoAlmacen.id_almacen,
            });
        }
    }, [productoAlmacen]);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.id_producto || formData.id_producto === 0) {
            newErrors.id_producto = 'Debe seleccionar un producto';
        }

        if (!formData.id_almacen) {
            newErrors.id_almacen = 'Debe seleccionar un almacén';
        }

        if (formData.stock < 0) {
            newErrors.stock = 'El stock debe ser mayor o igual a 0';
        }

        if (formData.stock_minimo < 0) {
            newErrors.stock_minimo = 'El stock mínimo debe ser mayor o igual a 0';
        }

        if (formData.stock_maximo <= 0) {
            newErrors.stock_maximo = 'El stock máximo debe ser mayor a 0';
        }

        if (formData.stock_maximo <= formData.stock_minimo) {
            newErrors.stock_maximo = 'El stock máximo debe ser mayor al stock mínimo';
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
                {productoAlmacen ? 'Editar Asignación' : 'Asignar Producto a Almacén'}
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
                            disabled={!!productoAlmacen}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.id_producto ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                                backgroundColor: productoAlmacen ? '#f3f4f6' : 'white',
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

                    {/* Almacén */}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Almacén <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <select
                            name="id_almacen"
                            value={formData.id_almacen}
                            onChange={handleChange}
                            disabled={!!almacenId || !!productoAlmacen}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.id_almacen ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                                backgroundColor: almacenId || productoAlmacen ? '#f3f4f6' : 'white',
                            }}
                        >
                            <option value="">Seleccionar almacén</option>
                            {almacenes.map((alm) => (
                                <option key={alm.id_almacen} value={alm.id_almacen}>
                                    {alm.nombre} - {alm.ubicacion}
                                </option>
                            ))}
                        </select>
                        {errors.id_almacen && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.id_almacen}
                            </span>
                        )}
                    </div>

                    {/* Stock */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Stock Actual <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            min={0}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.stock ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                            }}
                        />
                        {errors.stock && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.stock}
                            </span>
                        )}
                    </div>

                    {/* Stock Mínimo */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Stock Mínimo <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                            type="number"
                            name="stock_minimo"
                            value={formData.stock_minimo}
                            onChange={handleChange}
                            min={0}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.stock_minimo ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                            }}
                        />
                        {errors.stock_minimo && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.stock_minimo}
                            </span>
                        )}
                    </div>

                    {/* Stock Máximo */}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Stock Máximo <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                            type="number"
                            name="stock_maximo"
                            value={formData.stock_maximo}
                            onChange={handleChange}
                            min={1}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.stock_maximo ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                            }}
                        />
                        {errors.stock_maximo && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.stock_maximo}
                            </span>
                        )}
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
                        disabled={isSubmitting}
                        style={{
                            padding: 'var(--spacing-sm) var(--spacing-lg)',
                            border: 'none',
                            borderRadius: 'var(--border-radius-sm)',
                            backgroundColor: isSubmitting ? '#94a3b8' : '#059669',
                            color: 'white',
                            fontWeight: 500,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            opacity: isSubmitting ? 0.6 : 1,
                            transition: 'background-color 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            if (!isSubmitting)
                                e.currentTarget.style.backgroundColor = '#047857';
                        }}
                        onMouseLeave={(e) => {
                            if (!isSubmitting)
                                e.currentTarget.style.backgroundColor = '#059669';
                        }}
                    >
                        {isSubmitting ? 'Guardando...' : productoAlmacen ? 'Actualizar' : 'Asignar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductoAlmacenForm;
