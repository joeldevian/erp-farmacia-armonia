import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ordenCompraService } from '../../services/ordenCompraService';
import { EstadoOrdenCompra } from '../../types/orden-compra';
import type { OrdenCompra } from '../../types/orden-compra';
import ConfirmModal from '../../components/ConfirmModal';
import './OrdenCompraDetailPage.css';

const OrdenCompraDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [orden, setOrden] = useState<OrdenCompra | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        confirmText: string;
        type: 'warning' | 'danger';
        onConfirm: () => void;
    } | null>(null);

    useEffect(() => {
        if (id) {
            loadOrden();
        }
    }, [id]);

    useEffect(() => {
        if (successMessage || error) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
                setError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, error]);

    const loadOrden = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await ordenCompraService.getOrdenCompra(id!);
            setOrden(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCambiarEstado = (nuevoEstado: EstadoOrdenCompra) => {
        const mensajes: Record<EstadoOrdenCompra, { title: string; message: string; type: 'warning' | 'danger' }> = {
            pendiente: { title: '', message: '', type: 'warning' },
            aprobada: {
                title: 'Aprobar Orden',
                message: '¿Estás seguro de aprobar esta orden de compra?\n\nEsto autorizará la compra al proveedor.',
                type: 'warning',
            },
            rechazada: {
                title: 'Rechazar Orden',
                message: '¿Estás seguro de rechazar esta orden de compra?\n\nEsta acción no se puede deshacer.',
                type: 'danger',
            },
            recibida: {
                title: 'Recepcionar Orden',
                message: '¿Confirmas la recepción de esta orden?\n\n⚠️ Esto actualizará el inventario automáticamente.\nEsta acción es IRREVERSIBLE.',
                type: 'warning',
            },
            anulada: {
                title: 'Anular Orden',
                message: '¿Estás seguro de anular esta orden de compra?\n\nEsta acción no se puede deshacer.',
                type: 'danger',
            },
        };

        const config = mensajes[nuevoEstado];

        setConfirmModal({
            isOpen: true,
            title: config.title,
            message: config.message,
            confirmText: config.title.split(' ')[0],
            type: config.type,
            onConfirm: async () => {
                try {
                    await ordenCompraService.cambiarEstado(id!, { estado: nuevoEstado });
                    setSuccessMessage(`Orden ${nuevoEstado} exitosamente`);
                    await loadOrden();
                } catch (err: any) {
                    setError(err.message);
                }
                setConfirmModal(null);
            },
        });
    };

    const handleAnular = () => {
        setConfirmModal({
            isOpen: true,
            title: 'Anular Orden',
            message: `¿Estás seguro de anular la orden ${orden?.numero_orden}?\n\nEsta acción no se puede deshacer.`,
            confirmText: 'Anular',
            type: 'danger',
            onConfirm: async () => {
                try {
                    await ordenCompraService.deleteOrdenCompra(id!);
                    setSuccessMessage('Orden anulada exitosamente');
                    setTimeout(() => navigate('/ordenes-compra'), 1500);
                } catch (err: any) {
                    setError(err.message);
                }
                setConfirmModal(null);
            },
        });
    };

    const getEstadoBadgeClass = (estado: EstadoOrdenCompra) => {
        const classes: Record<EstadoOrdenCompra, string> = {
            pendiente: 'badge-warning',
            aprobada: 'badge-info',
            rechazada: 'badge-danger',
            recibida: 'badge-success',
            anulada: 'badge-secondary',
        };
        return classes[estado] || 'badge-secondary';
    };

    const renderAcciones = () => {
        if (!orden) return null;

        switch (orden.estado) {
            case 'pendiente':
                return (
                    <>
                        <button
                            className="btn-success"
                            onClick={() => handleCambiarEstado(EstadoOrdenCompra.APROBADA)}
                        >
                            Aprobar
                        </button>
                        <button
                            className="btn-danger"
                            onClick={() => handleCambiarEstado(EstadoOrdenCompra.RECHAZADA)}
                        >
                            Rechazar
                        </button>
                        <button
                            className="btn-secondary"
                            onClick={handleAnular}
                        >
                            Anular
                        </button>
                    </>
                );
            case 'aprobada':
                return (
                    <>
                        <button
                            className="btn-primary"
                            onClick={() => handleCambiarEstado(EstadoOrdenCompra.RECIBIDA)}
                        >
                            Confirmar Recepción
                        </button>
                        <button
                            className="btn-secondary"
                            onClick={handleAnular}
                        >
                            Anular
                        </button>
                    </>
                );
            case 'recibida':
            case 'rechazada':
            case 'anulada':
                return (
                    <button
                        className="btn-secondary"
                        onClick={() => navigate('/ordenes-compra')}
                    >
                        Volver al Listado
                    </button>
                );
            default:
                return null;
        }
    };

    if (loading) return <div className="loading">Cargando orden...</div>;
    if (!orden) return <div className="error">Orden no encontrada</div>;

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1>Orden de Compra {orden.numero_orden}</h1>
                    <span className={`badge ${getEstadoBadgeClass(orden.estado)}`}>
                        {orden.estado}
                    </span>
                </div>
                <button
                    className="btn-secondary"
                    onClick={() => navigate('/ordenes-compra')}
                >
                    Volver
                </button>
            </div>

            {successMessage && (
                <div className="alert alert-success">✓ {successMessage}</div>
            )}

            {error && <div className="alert alert-error">✕ {error}</div>}

            {/* Información del Proveedor */}
            <div className="content-card">
                <h2>Información del Proveedor</h2>
                <div className="info-grid">
                    <div className="info-item">
                        <label>Razón Social:</label>
                        <span>{orden.proveedor?.razon_social}</span>
                    </div>
                    <div className="info-item">
                        <label>RUC:</label>
                        <span>{orden.proveedor?.ruc}</span>
                    </div>
                    <div className="info-item">
                        <label>Email:</label>
                        <span>{orden.proveedor?.email}</span>
                    </div>
                </div>
            </div>

            {/* Información de la Orden */}
            <div className="content-card">
                <h2>Información de la Orden</h2>
                <div className="info-grid">
                    <div className="info-item">
                        <label>Fecha de Emisión:</label>
                        <span>{new Date(orden.fecha_emision).toLocaleDateString()}</span>
                    </div>
                    <div className="info-item">
                        <label>Fecha de Entrega Estimada:</label>
                        <span>{new Date(orden.fecha_entrega_estimada).toLocaleDateString()}</span>
                    </div>
                    {orden.observaciones && (
                        <div className="info-item full-width">
                            <label>Observaciones:</label>
                            <span>{orden.observaciones}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Productos */}
            <div className="content-card">
                <h2>Productos</h2>
                {orden.detalles && orden.detalles.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Código</th>
                                <th>Cantidad</th>
                                <th>Precio Unit.</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orden.detalles.map((detalle) => (
                                <tr key={detalle.id_orden_compra_detalle}>
                                    <td>{detalle.producto.nombre}</td>
                                    <td>{detalle.producto.codigo_barras || '-'}</td>
                                    <td>{detalle.cantidad}</td>
                                    <td>S/ {Number(detalle.precio_unitario).toFixed(2)}</td>
                                    <td>S/ {Number(detalle.subtotal).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay productos en esta orden</p>
                )}
            </div>

            {/* Totales */}
            <div className="content-card totales-card">
                <div className="totales">
                    <div className="total-row">
                        <span>Subtotal:</span>
                        <span>S/ {Number(orden.subtotal).toFixed(2)}</span>
                    </div>
                    <div className="total-row">
                        <span>Impuestos:</span>
                        <span>S/ {Number(orden.impuestos).toFixed(2)}</span>
                    </div>
                    <div className="total-row total-final">
                        <span>Total:</span>
                        <span>S/ {Number(orden.total).toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Acciones */}
            <div className="form-actions">
                {renderAcciones()}
            </div>

            {confirmModal && (
                <ConfirmModal
                    isOpen={confirmModal.isOpen}
                    title={confirmModal.title}
                    message={confirmModal.message}
                    confirmText={confirmModal.confirmText}
                    cancelText="Cancelar"
                    onConfirm={confirmModal.onConfirm}
                    onCancel={() => setConfirmModal(null)}
                    type={confirmModal.type}
                />
            )}
        </div>
    );
};

export default OrdenCompraDetailPage;
