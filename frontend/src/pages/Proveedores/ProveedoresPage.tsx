import { useState, useEffect } from 'react';
import { proveedorService } from '../../services/proveedorService';
import type { Proveedor, CreateProveedorDto } from '../../types/proveedor';
import ProveedorForm from '../../components/Proveedores/ProveedorForm';
import ConfirmModal from '../../components/ConfirmModal';
import './ProveedoresPage.css';

const ProveedoresPage = () => {
    const [proveedores, setProveedores] = useState<Proveedor[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [proveedorEditar, setProveedorEditar] = useState<Proveedor | undefined>(undefined);
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        confirmText: string;
        type: 'warning' | 'danger';
        onConfirm: () => void;
    } | null>(null);

    useEffect(() => {
        loadProveedores();
    }, []);

    // Auto-ocultar mensajes después de 5 segundos
    useEffect(() => {
        if (successMessage || error) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
                setError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, error]);

    const loadProveedores = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await proveedorService.getProveedores();
            setProveedores(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNuevoProveedor = () => {
        setProveedorEditar(undefined);
        setShowModal(true);
    };

    const handleCreateProveedor = async (data: CreateProveedorDto) => {
        try {
            await proveedorService.createProveedor(data);
            setShowModal(false);
            setSuccessMessage('Proveedor creado exitosamente');
            await loadProveedores();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleUpdateProveedor = async (data: CreateProveedorDto) => {
        if (!proveedorEditar) return;
        try {
            await proveedorService.updateProveedor(proveedorEditar.id_proveedor, data);
            setShowModal(false);
            setProveedorEditar(undefined);
            setSuccessMessage('Proveedor actualizado exitosamente');
            await loadProveedores();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleCancelForm = () => {
        setShowModal(false);
        setProveedorEditar(undefined);
    };

    const handleEditar = (proveedor: Proveedor) => {
        setProveedorEditar(proveedor);
        setShowModal(true);
    };

    const handleDesactivar = (proveedor: Proveedor) => {
        const accion = proveedor.estado === 'activo' ? 'desactivar' : 'activar';
        const tipo = proveedor.estado === 'activo' ? 'warning' : 'warning';

        setConfirmModal({
            isOpen: true,
            title: `${accion.charAt(0).toUpperCase() + accion.slice(1)} Proveedor`,
            message: `¿Estás seguro de ${accion} el proveedor "${proveedor.razon_social}"?\n\nEsta acción cambiará el estado del proveedor.`,
            confirmText: accion.charAt(0).toUpperCase() + accion.slice(1),
            type: tipo,
            onConfirm: async () => {
                try {
                    const nuevoEstado = proveedor.estado === 'activo' ? 'inactivo' : 'activo';

                    await proveedorService.updateProveedor(proveedor.id_proveedor, {
                        estado: nuevoEstado as any,
                    });
                    setSuccessMessage(`Proveedor ${accion === 'desactivar' ? 'desactivado' : 'activado'} exitosamente`);
                    await loadProveedores();
                } catch (err: any) {
                    setError(err.message);
                }
                setConfirmModal(null);
            },
        });
    };

    const handleEliminar = (proveedor: Proveedor) => {
        setConfirmModal({
            isOpen: true,
            title: 'Eliminar Proveedor',
            message: `¿Estás seguro de eliminar permanentemente el proveedor "${proveedor.razon_social}"?\n\n⚠️ Esta acción NO se puede deshacer.\n\nSolo se puede eliminar si no tiene productos asociados.`,
            confirmText: 'Eliminar Permanentemente',
            type: 'danger',
            onConfirm: async () => {
                try {
                    await proveedorService.hardDeleteProveedor(proveedor.id_proveedor);
                    setSuccessMessage('Proveedor eliminado permanentemente');
                    await loadProveedores();
                } catch (err: any) {
                    setError(err.message || 'No se puede eliminar el proveedor porque tiene productos asociados');
                }
                setConfirmModal(null);
            },
        });
    };

    const handleCancelConfirm = () => {
        setConfirmModal(null);
    };

    if (loading) return <div className="loading">Cargando proveedores...</div>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Gestión de Proveedores</h1>
                <button className="btn-primary" onClick={handleNuevoProveedor}>
                    Nuevo Proveedor
                </button>
            </div>

            {successMessage && (
                <div className="alert alert-success">✓ {successMessage}</div>
            )}

            {error && <div className="alert alert-error">✕ {error}</div>}

            <div className="content-card">
                {proveedores.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                        No hay proveedores registrados. Crea uno nuevo para comenzar.
                    </p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Razón Social</th>
                                <th>RUC</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proveedores.map((proveedor) => (
                                <tr key={proveedor.id_proveedor}>
                                    <td>{proveedor.razon_social}</td>
                                    <td>{proveedor.ruc}</td>
                                    <td>{proveedor.email}</td>
                                    <td>{proveedor.telefono || '-'}</td>
                                    <td>
                                        <span
                                            className={`badge badge-${proveedor.estado}`}
                                        >
                                            {proveedor.estado}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-sm"
                                            onClick={() => handleEditar(proveedor)}
                                        >
                                            Editar
                                        </button>
                                        {proveedor.estado === 'activo' ? (
                                            <button
                                                className="btn-sm btn-danger"
                                                onClick={() => handleDesactivar(proveedor)}
                                            >
                                                Desactivar
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    className="btn-sm btn-success"
                                                    onClick={() => handleDesactivar(proveedor)}
                                                >
                                                    Activar
                                                </button>
                                                <button
                                                    className="btn-sm btn-delete"
                                                    onClick={() => handleEliminar(proveedor)}
                                                >
                                                    Eliminar
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && (
                <ProveedorForm
                    proveedor={proveedorEditar}
                    onSubmit={proveedorEditar ? handleUpdateProveedor : handleCreateProveedor}
                    onCancel={handleCancelForm}
                />
            )}

            {confirmModal && (
                <ConfirmModal
                    isOpen={confirmModal.isOpen}
                    title={confirmModal.title}
                    message={confirmModal.message}
                    confirmText={confirmModal.confirmText}
                    cancelText="Cancelar"
                    onConfirm={confirmModal.onConfirm}
                    onCancel={handleCancelConfirm}
                    type={confirmModal.type}
                />
            )}
        </div>
    );
};

export default ProveedoresPage;
