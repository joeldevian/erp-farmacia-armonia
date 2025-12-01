import type React from 'react';
import { useState, useEffect } from 'react';
import type { Lote, CreateLoteDto, UpdateLoteDto } from '../../types/lote';
import { productoService } from '../../services/productoService';
import type { Producto } from '../../types/producto';

interface LoteFormProps {
    lote: Lote | null;
    onSave: (data: CreateLoteDto | UpdateLoteDto) => Promise<void>;
    onCancel: () => void;
}

const LoteForm: React.FC<LoteFormProps> = ({ lote, onSave, onCancel }) => {
    const [formData, setFormData] = useState<CreateLoteDto>({
        codigo_lote: '',
        fecha_fabricacion: '',
        fecha_vencimiento: '',
        cantidad_inicial: 0,
        cantidad_actual: 0,
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

    // Cargar datos del lote si es edición
    useEffect(() => {
        if (lote) {
            setFormData({
                codigo_lote: lote.codigo_lote,
                fecha_fabricacion:
                    typeof lote.fecha_fabricacion === 'string'
                        ? lote.fecha_fabricacion.split('T')[0]
                        : new Date(lote.fecha_fabricacion).toISOString().split('T')[0],
                fecha_vencimiento:
                    typeof lote.fecha_vencimiento === 'string'
                        ? lote.fecha_vencimiento.split('T')[0]
                        : new Date(lote.fecha_vencimiento).toISOString().split('T')[0],
                cantidad_inicial: lote.cantidad_inicial,
                cantidad_actual: lote.cantidad_actual,
                id_producto: lote.id_producto,
            });
        }
    }, [lote]);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.codigo_lote.trim()) {
            newErrors.codigo_lote = 'El código de lote es requerido';
        }

        if (!formData.fecha_fabricacion) {
            newErrors.fecha_fabricacion = 'La fecha de fabricación es requerida';
        }

        if (!formData.fecha_vencimiento) {
            newErrors.fecha_vencimiento = 'La fecha de vencimiento es requerida';
        }

        if (
            formData.fecha_fabricacion &&
            formData.fecha_vencimiento &&
            new Date(formData.fecha_vencimiento) <=
            new Date(formData.fecha_fabricacion)
        ) {
            newErrors.fecha_vencimiento =
                'La fecha de vencimiento debe ser mayor a la fecha de fabricación';
        }

        if (!formData.id_producto || formData.id_producto === 0) {
            newErrors.id_producto = 'Debe seleccionar un producto';
        }

        if (formData.cantidad_inicial <= 0) {
            newErrors.cantidad_inicial =
                'La cantidad inicial debe ser mayor a 0';
        }

        if (formData.cantidad_actual < 0) {
            newErrors.cantidad_actual =
                'La cantidad actual debe ser mayor o igual a 0';
        }

        if (formData.cantidad_actual > formData.cantidad_inicial) {
            newErrors.cantidad_actual =
                'La cantidad actual no puede ser mayor a la cantidad inicial';
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
            const dataToSend: CreateLoteDto = {
                codigo_lote: formData.codigo_lote.trim(),
                fecha_fabricacion: formData.fecha_fabricacion,
                fecha_vencimiento: formData.fecha_vencimiento,
                cantidad_inicial: formData.cantidad_inicial,
                cantidad_actual: formData.cantidad_actual,
                id_producto: formData.id_producto,
            };

            await onSave(dataToSend);
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
                {lote ? 'Editar Lote' : 'Crear Lote'}
            </h2>

            <form onSubmit={handleSubmit}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 'var(--spacing-md)',
                    }}
                >
                    {/* Código de Lote */}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Código de Lote <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                            type="text"
                            name="codigo_lote"
                            value={formData.codigo_lote}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.codigo_lote ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                            }}
                        />
                        {errors.codigo_lote && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.codigo_lote}
                            </span>
                        )}
                    </div>

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
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.id_producto ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                                backgroundColor: 'white',
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

                    {/* Fecha de Fabricación */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Fecha de Fabricación <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                            type="date"
                            name="fecha_fabricacion"
                            value={formData.fecha_fabricacion}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.fecha_fabricacion ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                            }}
                        />
                        {errors.fecha_fabricacion && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.fecha_fabricacion}
                            </span>
                        )}
                    </div>

                    {/* Fecha de Vencimiento */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Fecha de Vencimiento <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                            type="date"
                            name="fecha_vencimiento"
                            value={formData.fecha_vencimiento}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.fecha_vencimiento ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                            }}
                        />
                        {errors.fecha_vencimiento && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.fecha_vencimiento}
                            </span>
                        )}
                    </div>

                    {/* Cantidad Inicial */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Cantidad Inicial <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                            type="number"
                            name="cantidad_inicial"
                            value={formData.cantidad_inicial}
                            onChange={handleChange}
                            min={1}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.cantidad_inicial ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                            }}
                        />
                        {errors.cantidad_inicial && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.cantidad_inicial}
                            </span>
                        )}
                    </div>

                    {/* Cantidad Actual */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Cantidad Actual <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                            type="number"
                            name="cantidad_actual"
                            value={formData.cantidad_actual}
                            onChange={handleChange}
                            min={0}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.cantidad_actual ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                            }}
                        />
                        {errors.cantidad_actual && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.cantidad_actual}
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
                        {isSubmitting ? 'Guardando...' : lote ? 'Actualizar' : 'Crear'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoteForm;
