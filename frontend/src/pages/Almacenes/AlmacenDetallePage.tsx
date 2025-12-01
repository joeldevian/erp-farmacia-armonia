import type React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { almacenService } from '../../services/almacenService';
import { productoAlmacenService } from '../../services/productoAlmacenService';
import type { Almacen } from '../../types/almacen';
import type {
    ProductoAlmacen,
    CreateProductoAlmacenDto,
    UpdateProductoAlmacenDto,
} from '../../types/producto-almacen';
import ProductoAlmacenTable from '../../components/ProductosAlmacen/ProductoAlmacenTable';
import ProductoAlmacenForm from '../../components/ProductosAlmacen/ProductoAlmacenForm';
import StockAlertas from '../../components/ProductosAlmacen/StockAlertas';
import './AlmacenesPage.css';

const AlmacenDetallePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [almacen, setAlmacen] = useState<Almacen | null>(null);
    const [productosAlmacen, setProductosAlmacen] = useState<ProductoAlmacen[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProductoAlmacen, setEditingProductoAlmacen] =
        useState<ProductoAlmacen | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            loadAlmacen();
            loadProductosAlmacen();
        }
    }, [id]);

    const loadAlmacen = async () => {
        if (!id) return;

        try {
            const data = await almacenService.getAlmacenById(id);
            setAlmacen(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar almacén');
        } finally {
            setLoading(false);
        }
    };

    const loadProductosAlmacen = async () => {
        if (!id) return;

        try {
            const data = await productoAlmacenService.getProductosPorAlmacen(id);
            setProductosAlmacen(data);
        } catch (err: any) {
            console.error('Error al cargar productos:', err);
        }
    };

    const handleCreate = () => {
        setEditingProductoAlmacen(null);
        setShowForm(true);
    };

    const handleEdit = (productoAlmacen: ProductoAlmacen) => {
        setEditingProductoAlmacen(productoAlmacen);
        setShowForm(true);
    };

    const handleSave = async (data: CreateProductoAlmacenDto | UpdateProductoAlmacenDto) => {
        try {
            if (editingProductoAlmacen) {
                await productoAlmacenService.updateProductoAlmacen(
                    editingProductoAlmacen.id_producto_almacen,
                    data as UpdateProductoAlmacenDto,
                );
                setSuccessMessage('Asignación actualizada exitosamente');
            } else {
                await productoAlmacenService.createProductoAlmacen(data as CreateProductoAlmacenDto);
                setSuccessMessage('Producto asignado exitosamente');
            }

            setShowForm(false);
            setEditingProductoAlmacen(null);
            await loadProductosAlmacen();

            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err: any) {
            setError(err.message || 'Error al guardar');
            setTimeout(() => setError(null), 5000);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingProductoAlmacen(null);
    };

    const handleDelete = async (idProductoAlmacen: string) => {
        if (!window.confirm('¿Estás seguro de eliminar esta asignación?')) {
            return;
        }

        try {
            await productoAlmacenService.deleteProductoAlmacen(idProductoAlmacen);
            setSuccessMessage('Asignación eliminada exitosamente');
            await loadProductosAlmacen();
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err: any) {
            setError(err.message || 'Error al eliminar');
            setTimeout(() => setError(null), 5000);
        }
    };

    const handleVolver = () => {
        navigate('/almacenes');
    };

    if (loading) {
        return (
            <div className="page-container">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Cargando almacén...</p>
                </div>
            </div>
        );
    }

    if (!almacen) {
        return (
            <div className="page-container">
                <div className="alert alert-error">
                    <span>Almacén no encontrado</span>
                </div>
                <button onClick={handleVolver} style={{ marginTop: 'var(--spacing-md)' }}>
                    Volver
                </button>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <button
                        onClick={handleVolver}
                        style={{
                            padding: '0.5rem 1rem',
                            border: '1px solid var(--border-color)',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            marginBottom: 'var(--spacing-sm)',
                        }}
                    >
                        ← Volver
                    </button>
                    <h1>{almacen.nombre}</h1>
                    <p className="page-description">{almacen.descripcion || almacen.ubicacion}</p>
                </div>
            </div>

            {error && (
                <div className="alert alert-error">
                    <span className="alert-icon">⚠️</span>
                    <span>{error}</span>
                </div>
            )}

            {successMessage && (
                <div className="alert alert-success">
                    <span className="alert-icon">✓</span>
                    <span>{successMessage}</span>
                </div>
            )}

            {/* Información del almacén */}
            <div className="content-card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 'var(--spacing-md)',
                    }}
                >
                    <div>
                        <strong style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                            Ubicación
                        </strong>
                        <p style={{ marginTop: '0.25rem' }}>{almacen.ubicacion}</p>
                    </div>
                    <div>
                        <strong style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                            Tipo
                        </strong>
                        <p style={{ marginTop: '0.25rem', textTransform: 'capitalize' }}>
                            {almacen.tipo}
                        </p>
                    </div>
                    <div>
                        <strong style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                            Capacidad
                        </strong>
                        <p style={{ marginTop: '0.25rem' }}>
                            {almacen.capacidad_ocupada} / {almacen.capacidad_total} (
                            {((almacen.capacidad_ocupada / almacen.capacidad_total) * 100).toFixed(0)}%)
                        </p>
                    </div>
                    <div>
                        <strong style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                            Estado
                        </strong>
                        <p style={{ marginTop: '0.25rem', textTransform: 'capitalize' }}>
                            {almacen.estado}
                        </p>
                    </div>
                </div>
            </div>

            {/* Alertas de stock */}
            <StockAlertas almacenId={id} />

            {/* Productos del almacén */}
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'var(--spacing-md)',
                    }}
                >
                    <h2>Productos en este Almacén ({productosAlmacen.length})</h2>
                    {!showForm && (
                        <button
                            onClick={handleCreate}
                            style={{
                                padding: 'var(--spacing-sm) var(--spacing-lg)',
                                border: 'none',
                                borderRadius: 'var(--border-radius-sm)',
                                backgroundColor: '#059669',
                                color: 'white',
                                fontWeight: 500,
                                cursor: 'pointer',
                                fontSize: '1rem',
                            }}
                        >
                            + Asignar Producto
                        </button>
                    )}
                </div>

                {!showForm ? (
                    <ProductoAlmacenTable
                        productosAlmacen={productosAlmacen}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ) : (
                    <div className="form-container">
                        <ProductoAlmacenForm
                            productoAlmacen={editingProductoAlmacen}
                            almacenId={id}
                            onSave={handleSave}
                            onCancel={handleCancel}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlmacenDetallePage;
