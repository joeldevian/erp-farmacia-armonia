import type React from 'react';
import { useState, useEffect } from 'react';
import type { Almacen, CreateAlmacenDto, UpdateAlmacenDto } from '../../types/almacen';
import { TipoAlmacen } from '../../types/almacen';

interface AlmacenFormProps {
    almacen: Almacen | null;
    onSave: (data: CreateAlmacenDto | UpdateAlmacenDto) => Promise<void>;
    onCancel: () => void;
}

const AlmacenForm: React.FC<AlmacenFormProps> = ({ almacen, onSave, onCancel }) => {
    const [formData, setFormData] = useState<CreateAlmacenDto>({
        nombre: '',
        descripcion: '',
        ubicacion: '',
        capacidad_total: 100,
        capacidad_ocupada: 0,
        tipo: TipoAlmacen.PRINCIPAL,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (almacen) {
            setFormData({
                nombre: almacen.nombre,
                descripcion: almacen.descripcion || '',
                ubicacion: almacen.ubicacion,
                capacidad_total: almacen.capacidad_total,
                capacidad_ocupada: almacen.capacidad_ocupada,
                tipo: almacen.tipo,
            });
        }
    }, [almacen]);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        }

        if (!formData.ubicacion.trim()) {
            newErrors.ubicacion = 'La ubicación es requerida';
        }

        if (formData.capacidad_total <= 0) {
            newErrors.capacidad_total = 'La capacidad total debe ser mayor a 0';
        }

        if (formData.capacidad_ocupada < 0) {
            newErrors.capacidad_ocupada =
                'La capacidad ocupada debe ser mayor o igual a 0';
        }

        if (formData.capacidad_ocupada > formData.capacidad_total) {
            newErrors.capacidad_ocupada =
                'La capacidad ocupada no puede ser mayor a la capacidad total';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
        const { name, value, type } = e.target;

        let finalValue: any = value;

        if (type === 'number') {
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
            const dataToSend: CreateAlmacenDto = {
                nombre: formData.nombre.trim(),
                descripcion: formData.descripcion?.trim() || undefined,
                ubicacion: formData.ubicacion.trim(),
                capacidad_total: formData.capacidad_total,
                capacidad_ocupada: formData.capacidad_ocupada,
                tipo: formData.tipo,
            };

            await onSave(dataToSend);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                {almacen ? 'Editar Almacén' : 'Crear Almacén'}
            </h2>

            <form onSubmit={handleSubmit}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 'var(--spacing-md)',
                    }}
                >
                    {/* Nombre */}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Nombre <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.nombre ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                            }}
                        />
                        {errors.nombre && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.nombre}
                            </span>
                        )}
                    </div>

                    {/* Descripción */}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Descripción
                        </label>
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            rows={3}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                                resize: 'vertical',
                            }}
                        />
                    </div>

                    {/* Ubicación */}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Ubicación <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                            type="text"
                            name="ubicacion"
                            value={formData.ubicacion}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.ubicacion ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                            }}
                        />
                        {errors.ubicacion && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.ubicacion}
                            </span>
                        )}
                    </div>

                    {/* Tipo */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Tipo <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <select
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                                backgroundColor: 'white',
                            }}
                        >
                            <option value={TipoAlmacen.PRINCIPAL}>Principal</option>
                            <option value={TipoAlmacen.SECUNDARIO}>Secundario</option>
                            <option value={TipoAlmacen.TRANSITORIO}>Transitorio</option>
                        </select>
                    </div>

                    {/* Capacidad Total */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Capacidad Total <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                            type="number"
                            name="capacidad_total"
                            value={formData.capacidad_total}
                            onChange={handleChange}
                            min={1}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.capacidad_total ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                            }}
                        />
                        {errors.capacidad_total && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.capacidad_total}
                            </span>
                        )}
                    </div>

                    {/* Capacidad Ocupada */}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Capacidad Ocupada <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                            type="number"
                            name="capacidad_ocupada"
                            value={formData.capacidad_ocupada}
                            onChange={handleChange}
                            min={0}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.capacidad_ocupada ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                            }}
                        />
                        {errors.capacidad_ocupada && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.capacidad_ocupada}
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
                        {isSubmitting ? 'Guardando...' : almacen ? 'Actualizar' : 'Crear'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AlmacenForm;
