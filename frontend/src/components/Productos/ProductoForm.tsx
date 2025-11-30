import type React from 'react';
import { useState, useEffect } from 'react';
import type {
    Producto,
    CreateProductoDto,
    UpdateProductoDto,
    TipoProducto,
} from '../../types/producto';
import { categoriaService } from '../../services/categoriaService';
import { laboratorioService } from '../../services/laboratorioService';
import type { Categoria } from '../../types/categoria';
import type { Laboratorio } from '../../types/laboratorio';

interface ProductoFormProps {
    producto: Producto | null;
    onSave: (data: CreateProductoDto | UpdateProductoDto) => Promise<void>;
    onCancel: () => void;
}

const ProductoForm: React.FC<ProductoFormProps> = ({
    producto,
    onSave,
    onCancel,
}) => {
    const [formData, setFormData] = useState<CreateProductoDto>({
        nombre: '',
        descripcion: '',
        tipo_producto: 'medicamento' as TipoProducto,
        codigo_barra: '',
        codigo_interno: '',
        id_categoria: 0,
        id_laboratorio: 0,
        unidad_medida: '',
        concentracion: '',
        presentacion: '',
        requiere_receta: false,
        stock_minimo: 0,
        stock_maximo: 10,
    });

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [laboratorios, setLaboratorios] = useState<Laboratorio[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    // Cargar categorías y laboratorios
    useEffect(() => {
        const loadData = async () => {
            try {
                const [cats, labs] = await Promise.all([
                    categoriaService.getCategorias({ estado: true }),
                    laboratorioService.getLaboratorios({ estado: true }),
                ]);
                setCategorias(cats);
                setLaboratorios(labs);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Cargar datos del producto si es edición
    useEffect(() => {
        if (producto) {
            setFormData({
                nombre: producto.nombre,
                descripcion: producto.descripcion || '',
                tipo_producto: producto.tipo_producto,
                codigo_barra: producto.codigo_barra || '',
                codigo_interno: producto.codigo_interno,
                id_categoria: producto.id_categoria,
                id_laboratorio: producto.id_laboratorio,
                unidad_medida: producto.unidad_medida,
                concentracion: producto.concentracion || '',
                presentacion: producto.presentacion || '',
                requiere_receta: producto.requiere_receta,
                stock_minimo: producto.stock_minimo,
                stock_maximo: producto.stock_maximo,
            });
        }
    }, [producto]);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        }

        if (!formData.codigo_interno.trim()) {
            newErrors.codigo_interno = 'El código interno es requerido';
        }

        if (!formData.id_categoria || formData.id_categoria === 0) {
            newErrors.id_categoria = 'Debe seleccionar una categoría';
        }

        if (!formData.id_laboratorio || formData.id_laboratorio === 0) {
            newErrors.id_laboratorio = 'Debe seleccionar un laboratorio';
        }

        if (!formData.unidad_medida.trim()) {
            newErrors.unidad_medida = 'La unidad de medida es requerida';
        }

        if (formData.stock_minimo < 0) {
            newErrors.stock_minimo = 'El stock mínimo debe ser mayor o igual a 0';
        }

        if (formData.stock_maximo <= 0) {
            newErrors.stock_maximo = 'El stock máximo debe ser mayor a 0';
        }

        if (formData.stock_minimo >= formData.stock_maximo) {
            newErrors.stock_maximo =
                'El stock máximo debe ser mayor que el stock mínimo';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        let finalValue: any = value;

        // Convertir a número para campos específicos
        if (name === 'id_categoria' || name === 'id_laboratorio') {
            finalValue = Number(value);
        } else if (type === 'checkbox') {
            finalValue = checked;
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
            const dataToSend: any = {
                nombre: formData.nombre.trim(),
                tipo_producto: formData.tipo_producto,
                codigo_interno: formData.codigo_interno.trim(),
                id_categoria: formData.id_categoria,
                id_laboratorio: formData.id_laboratorio,
                unidad_medida: formData.unidad_medida.trim(),
                requiere_receta: formData.requiere_receta,
                stock_minimo: formData.stock_minimo,
                stock_maximo: formData.stock_maximo,
            };

            if (formData.descripcion?.trim())
                dataToSend.descripcion = formData.descripcion.trim();
            if (formData.codigo_barra?.trim())
                dataToSend.codigo_barra = formData.codigo_barra.trim();
            if (formData.concentracion?.trim())
                dataToSend.concentracion = formData.concentracion.trim();
            if (formData.presentacion?.trim())
                dataToSend.presentacion = formData.presentacion.trim();

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
                maxWidth: '800px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
            }}
        >
            <h2
                style={{
                    marginBottom: 'var(--spacing-lg)',
                    color: 'var(--text-primary)',
                }}
            >
                {producto ? 'Editar Producto' : 'Crear Producto'}
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

                    {/* Tipo de Producto */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Tipo de Producto <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <select
                            name="tipo_producto"
                            value={formData.tipo_producto}
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
                            <option value="medicamento">Medicamento</option>
                            <option value="insumo">Insumo</option>
                            <option value="higiene">Higiene</option>
                            <option value="equipo">Equipo</option>
                        </select>
                    </div>

                    {/* Código Interno */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Código Interno <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                            type="text"
                            name="codigo_interno"
                            value={formData.codigo_interno}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.codigo_interno ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                            }}
                        />
                        {errors.codigo_interno && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.codigo_interno}
                            </span>
                        )}
                    </div>

                    {/* Código de Barra */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Código de Barra
                        </label>
                        <input
                            type="text"
                            name="codigo_barra"
                            value={formData.codigo_barra}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                            }}
                        />
                    </div>

                    {/* Categoría */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Categoría <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <select
                            name="id_categoria"
                            value={formData.id_categoria}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.id_categoria ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                                backgroundColor: 'white',
                            }}
                        >
                            <option value={0}>Seleccionar categoría</option>
                            {categorias.map((cat) => (
                                <option key={cat.id_categoria} value={cat.id_categoria}>
                                    {cat.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.id_categoria && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.id_categoria}
                            </span>
                        )}
                    </div>

                    {/* Laboratorio */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Laboratorio <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <select
                            name="id_laboratorio"
                            value={formData.id_laboratorio}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.id_laboratorio ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                                backgroundColor: 'white',
                            }}
                        >
                            <option value={0}>Seleccionar laboratorio</option>
                            {laboratorios.map((lab) => (
                                <option key={lab.id_laboratorio} value={lab.id_laboratorio}>
                                    {lab.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.id_laboratorio && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.id_laboratorio}
                            </span>
                        )}
                    </div>

                    {/* Unidad de Medida */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Unidad de Medida <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <select
                            name="unidad_medida"
                            value={formData.unidad_medida}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: `1px solid ${errors.unidad_medida ? '#dc2626' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                                backgroundColor: 'white',
                            }}
                        >
                            <option value="">Seleccionar</option>
                            <option value="tableta">Tableta</option>
                            <option value="capsula">Cápsula</option>
                            <option value="frasco">Frasco</option>
                            <option value="caja">Caja</option>
                            <option value="ampolla">Ampolla</option>
                            <option value="sobre">Sobre</option>
                            <option value="tubo">Tubo</option>
                            <option value="unidad">Unidad</option>
                        </select>
                        {errors.unidad_medida && (
                            <span
                                style={{
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem',
                                    display: 'block',
                                }}
                            >
                                {errors.unidad_medida}
                            </span>
                        )}
                    </div>

                    {/* Concentración */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Concentración
                        </label>
                        <input
                            type="text"
                            name="concentracion"
                            value={formData.concentracion}
                            onChange={handleChange}
                            placeholder="Ej: 500mg"
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                            }}
                        />
                    </div>

                    {/* Presentación */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-xs)',
                                fontWeight: 500,
                            }}
                        >
                            Presentación
                        </label>
                        <input
                            type="text"
                            name="presentacion"
                            value={formData.presentacion}
                            onChange={handleChange}
                            placeholder="Ej: Caja x 20 tabletas"
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-sm)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '1rem',
                            }}
                        />
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
                    <div>
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

                    {/* Requiere Receta */}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                cursor: 'pointer',
                            }}
                        >
                            <input
                                type="checkbox"
                                name="requiere_receta"
                                checked={formData.requiere_receta}
                                onChange={handleChange}
                                style={{ cursor: 'pointer' }}
                            />
                            <span>Requiere receta médica</span>
                        </label>
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
                        {isSubmitting
                            ? 'Guardando...'
                            : producto
                                ? 'Actualizar'
                                : 'Crear'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductoForm;
