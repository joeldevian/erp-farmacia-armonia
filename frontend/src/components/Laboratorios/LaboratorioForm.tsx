import type React from 'react';
import { useState, useEffect } from 'react';
import type { Laboratorio, CreateLaboratorioDto, UpdateLaboratorioDto } from '../../types/laboratorio';

interface LaboratorioFormProps {
    laboratorio: Laboratorio | null;
    onSave: (data: CreateLaboratorioDto | UpdateLaboratorioDto) => Promise<void>;
    onCancel: () => void;
}

const LaboratorioForm: React.FC<LaboratorioFormProps> = ({
    laboratorio,
    onSave,
    onCancel,
}) => {
    const [formData, setFormData] = useState<CreateLaboratorioDto>({
        nombre: '',
        direccion: '',
        telefono: '',
        correo: '',
        ruc: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (laboratorio) {
            setFormData({
                nombre: laboratorio.nombre,
                direccion: laboratorio.direccion || '',
                telefono: laboratorio.telefono || '',
                correo: laboratorio.correo || '',
                ruc: laboratorio.ruc || '',
            });
        }
    }, [laboratorio]);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        // Nombre requerido
        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        }

        // Validar correo si se proporciona
        if (formData.correo && formData.correo.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.correo)) {
                newErrors.correo = 'El correo debe ser válido';
            }
        }

        // Validar teléfono si se proporciona
        if (formData.telefono && formData.telefono.trim()) {
            const telefonoRegex = /^[0-9\-\s]+$/;
            if (!telefonoRegex.test(formData.telefono)) {
                newErrors.telefono = 'El teléfono debe contener solo números, guiones y espacios';
            }
        }

        // Validar RUC si se proporciona
        if (formData.ruc && formData.ruc.trim()) {
            const rucRegex = /^[0-9]{11}$/;
            if (!rucRegex.test(formData.ruc)) {
                newErrors.ruc = 'El RUC debe tener exactamente 11 dígitos';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Limpiar error del campo al escribir
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
            // Limpiar campos vacíos opcionales
            const dataToSend: any = { nombre: formData.nombre.trim() };
            if (formData.direccion?.trim()) dataToSend.direccion = formData.direccion.trim();
            if (formData.telefono?.trim()) dataToSend.telefono = formData.telefono.trim();
            if (formData.correo?.trim()) dataToSend.correo = formData.correo.trim();
            if (formData.ruc?.trim()) dataToSend.ruc = formData.ruc.trim();

            await onSave(dataToSend);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ padding: 'var(--spacing-lg)', maxWidth: '600px', width: '100%' }}>
            <h2 style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--text-primary)' }}>
                {laboratorio ? 'Editar Laboratorio' : 'Crear Laboratorio'}
            </h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 500 }}>
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
                        <span style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                            {errors.nombre}
                        </span>
                    )}
                </div>

                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 500 }}>
                        Dirección
                    </label>
                    <textarea
                        name="direccion"
                        value={formData.direccion}
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

                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 500 }}>
                        Teléfono
                    </label>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="Ej: 01-234-5678"
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-sm)',
                            border: `1px solid ${errors.telefono ? '#dc2626' : 'var(--border-color)'}`,
                            borderRadius: 'var(--border-radius-sm)',
                            fontSize: '1rem',
                        }}
                    />
                    {errors.telefono && (
                        <span style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                            {errors.telefono}
                        </span>
                    )}
                </div>

                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 500 }}>
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        placeholder="ejemplo@laboratorio.com"
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-sm)',
                            border: `1px solid ${errors.correo ? '#dc2626' : 'var(--border-color)'}`,
                            borderRadius: 'var(--border-radius-sm)',
                            fontSize: '1rem',
                        }}
                    />
                    {errors.correo && (
                        <span style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                            {errors.correo}
                        </span>
                    )}
                </div>

                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 500 }}>
                        RUC
                    </label>
                    <input
                        type="text"
                        name="ruc"
                        value={formData.ruc}
                        onChange={handleChange}
                        placeholder="12345678901"
                        maxLength={11}
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-sm)',
                            border: `1px solid ${errors.ruc ? '#dc2626' : 'var(--border-color)'}`,
                            borderRadius: 'var(--border-radius-sm)',
                            fontSize: '1rem',
                        }}
                    />
                    {errors.ruc && (
                        <span style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                            {errors.ruc}
                        </span>
                    )}
                    <span style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                        Debe tener exactamente 11 dígitos
                    </span>
                </div>

                <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-end' }}>
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
                            if (!isSubmitting) e.currentTarget.style.backgroundColor = '#047857';
                        }}
                        onMouseLeave={(e) => {
                            if (!isSubmitting) e.currentTarget.style.backgroundColor = '#059669';
                        }}
                    >
                        {isSubmitting ? 'Guardando...' : laboratorio ? 'Actualizar' : 'Crear'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LaboratorioForm;
