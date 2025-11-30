import type React from 'react';
import { useState, useEffect } from 'react';
import type { Categoria, CreateCategoriaDto, UpdateCategoriaDto } from '../../types/categoria';

interface CategoriaFormProps {
    categoria?: Categoria | null;
    onSave: (data: CreateCategoriaDto | UpdateCategoriaDto) => Promise<void>;
    onCancel: () => void;
}

const CategoriaForm: React.FC<CategoriaFormProps> = ({
    categoria,
    onSave,
    onCancel,
}) => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        estado: true,
    });
    const [errors, setErrors] = useState<{ nombre?: string }>({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (categoria) {
            setFormData({
                nombre: categoria.nombre,
                descripcion: categoria.descripcion || '',
                estado: categoria.estado,
            });
        }
    }, [categoria]);

    const validate = (): boolean => {
        const newErrors: { nombre?: string } = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        } else if (formData.nombre.trim().length < 3) {
            newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setSubmitting(true);
        try {
            await onSave({
                nombre: formData.nombre.trim(),
                descripcion: formData.descripcion.trim() || undefined,
                estado: formData.estado,
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ padding: 'var(--spacing-xl)' }}>
            <h2 style={{ marginBottom: 'var(--spacing-lg)', fontSize: '1.5rem', fontWeight: 700 }}>
                {categoria ? 'Editar Categoría' : 'Nueva Categoría'}
            </h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <label
                        htmlFor="nombre"
                        style={{
                            display: 'block',
                            marginBottom: 'var(--spacing-xs)',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                        }}
                    >
                        Nombre <span style={{ color: 'var(--accent-color)' }}>*</span>
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-md)',
                            border: `1px solid ${errors.nombre ? 'var(--accent-color)' : 'var(--border-color)'}`,
                            borderRadius: 'var(--border-radius-sm)',
                            fontSize: '0.9375rem',
                        }}
                        placeholder="Ej: Analgésicos"
                    />
                    {errors.nombre && (
                        <p style={{ color: 'var(--accent-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                            {errors.nombre}
                        </p>
                    )}
                </div>

                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <label
                        htmlFor="descripcion"
                        style={{
                            display: 'block',
                            marginBottom: 'var(--spacing-xs)',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                        }}
                    >
                        Descripción
                    </label>
                    <textarea
                        id="descripcion"
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        rows={4}
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-md)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--border-radius-sm)',
                            fontSize: '0.9375rem',
                            fontFamily: 'inherit',
                            resize: 'vertical',
                        }}
                        placeholder="Descripción opcional de la categoría"
                    />
                </div>

                <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={formData.estado}
                            onChange={(e) => setFormData({ ...formData, estado: e.target.checked })}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Categoría activa</span>
                    </label>
                </div>

                <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-end' }}>
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={submitting}
                        style={{
                            padding: '0.625rem 1.5rem',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--border-radius-sm)',
                            backgroundColor: 'var(--bg-white)',
                            color: 'var(--text-secondary)',
                            fontWeight: 500,
                            cursor: submitting ? 'not-allowed' : 'pointer',
                            opacity: submitting ? 0.6 : 1,
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        style={{
                            padding: '0.625rem 1.5rem',
                            border: 'none',
                            borderRadius: 'var(--border-radius-sm)',
                            backgroundColor: 'var(--primary-color)',
                            color: 'white',
                            fontWeight: 500,
                            cursor: submitting ? 'not-allowed' : 'pointer',
                            opacity: submitting ? 0.6 : 1,
                        }}
                    >
                        {submitting ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CategoriaForm;
