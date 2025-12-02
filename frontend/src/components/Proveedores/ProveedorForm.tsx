import type React from 'react';
import { useState, useEffect } from 'react';
import type { CreateProveedorDto, Proveedor } from '../../types/proveedor';
import './ProveedorForm.css';

interface ProveedorFormProps {
    proveedor?: Proveedor; // Si existe, es modo edición
    onSubmit: (data: CreateProveedorDto) => Promise<void>;
    onCancel: () => void;
}

const ProveedorForm: React.FC<ProveedorFormProps> = ({ proveedor, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<CreateProveedorDto>({
        razon_social: '',
        nombre_comercial: '',
        ruc: '',
        email: '',
        direccion: '',
        telefono: '',
        pagina_web: '',
        descripcion: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Cargar datos del proveedor si es modo edición
    useEffect(() => {
        if (proveedor) {
            setFormData({
                razon_social: proveedor.razon_social,
                nombre_comercial: proveedor.nombre_comercial,
                ruc: proveedor.ruc,
                email: proveedor.email,
                direccion: proveedor.direccion,
                telefono: proveedor.telefono || '',
                pagina_web: proveedor.pagina_web || '',
                descripcion: proveedor.descripcion || '',
            });
        }
    }, [proveedor]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await onSubmit(formData);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{proveedor ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h2>
                    <button className="close-btn" onClick={onCancel}>
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="razon_social">
                                Razón Social <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="razon_social"
                                name="razon_social"
                                value={formData.razon_social}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nombre_comercial">
                                Nombre Comercial <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="nombre_comercial"
                                name="nombre_comercial"
                                value={formData.nombre_comercial}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="ruc">
                                RUC <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="ruc"
                                name="ruc"
                                value={formData.ruc}
                                onChange={handleChange}
                                maxLength={11}
                                pattern="[0-9]{11}"
                                title="El RUC debe tener 11 dígitos"
                                required
                                disabled={!!proveedor} // RUC no editable
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">
                                Email <span className="required">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="pagina_web">Página Web</label>
                            <input
                                type="url"
                                id="pagina_web"
                                name="pagina_web"
                                value={formData.pagina_web}
                                onChange={handleChange}
                                placeholder="https://"
                            />
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="direccion">
                                Dirección <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="direccion"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="descripcion">Descripción</label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                rows={3}
                            />
                        </div>
                    </div>

                    {error && <div className="form-error">{error}</div>}

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : proveedor ? 'Actualizar Proveedor' : 'Guardar Proveedor'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProveedorForm;
