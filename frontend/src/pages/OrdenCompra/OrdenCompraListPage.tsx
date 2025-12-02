import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordenCompraService } from '../../services/ordenCompraService';
import type { OrdenCompra, EstadoOrdenCompra } from '../../types/orden-compra';
import './OrdenCompraListPage.css';

const OrdenCompraListPage = () => {
    const navigate = useNavigate();
    const [ordenes, setOrdenes] = useState<OrdenCompra[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        loadOrdenes();
    }, []);

    // Auto-ocultar mensajes
    useEffect(() => {
        if (successMessage || error) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
                setError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, error]);

    const loadOrdenes = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await ordenCompraService.getOrdenesCompra();
            setOrdenes(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
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

    if (loading) return <div className="loading">Cargando órdenes de compra...</div>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Órdenes de Compra</h1>
                <button
                    className="btn-primary"
                    onClick={() => navigate('/ordenes-compra/nueva')}
                >
                    Nueva Orden de Compra
                </button>
            </div>

            {successMessage && (
                <div className="alert alert-success">✓ {successMessage}</div>
            )}

            {error && <div className="alert alert-error">✕ {error}</div>}

            <div className="content-card">
                {ordenes.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                        No hay órdenes de compra registradas.
                    </p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Número</th>
                                <th>Proveedor</th>
                                <th>Fecha Emisión</th>
                                <th>Fecha Entrega</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordenes.map((orden) => (
                                <tr key={orden.id_orden_compra}>
                                    <td>{orden.numero_orden}</td>
                                    <td>{orden.proveedor?.razon_social || '-'}</td>
                                    <td>{new Date(orden.fecha_emision).toLocaleDateString()}</td>
                                    <td>{new Date(orden.fecha_entrega_estimada).toLocaleDateString()}</td>
                                    <td>S/ {Number(orden.total).toFixed(2)}</td>
                                    <td>
                                        <span className={`badge ${getEstadoBadgeClass(orden.estado)}`}>
                                            {orden.estado}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-sm"
                                            onClick={() => navigate(`/ordenes-compra/${orden.id_orden_compra}`)}
                                        >
                                            Ver Detalle
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default OrdenCompraListPage;
