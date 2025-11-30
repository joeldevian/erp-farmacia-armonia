import { useState, useEffect } from 'react';
import type { Categoria, CreateCategoriaDto, UpdateCategoriaDto } from '../../types/categoria';
import { categoriaService } from '../../services/categoriaService';
import CategoriaFilters from '../../components/Categorias/CategoriaFilters';
import CategoriaTable from '../../components/Categorias/CategoriaTable';
import CategoriaForm from '../../components/Categorias/CategoriaForm';
import ConfirmModal from '../../components/ConfirmModal';
import './CategoriasPage.css';

const CategoriasPage = () => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
    const [filtros, setFiltros] = useState<{ nombre: string; estado: string }>({
        nombre: '',
        estado: 'todos',
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Estados para modales de confirmación
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState<{
        type: 'delete' | 'hardDelete';
        id: number;
        step: 1 | 2;
    } | null>(null);

    const cargarCategorias = async () => {
        try {
            setLoading(true);
            setError(null);

            const filtrosAPI: { nombre?: string; estado?: boolean } = {};
            if (filtros.nombre) filtrosAPI.nombre = filtros.nombre;
            if (filtros.estado !== 'todos') {
                filtrosAPI.estado = filtros.estado === 'activos';
            }

            const data = await categoriaService.getCategorias(filtrosAPI);
            setCategorias(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarCategorias();
    }, [filtros]);

    const handleFilterChange = (newFiltros: { nombre: string; estado: string }) => {
        setFiltros(newFiltros);
    };

    const handleCreateClick = () => {
        setSelectedCategoria(null);
        setShowForm(true);
    };

    const handleEditClick = (categoria: Categoria) => {
        setSelectedCategoria(categoria);
        setShowForm(true);
    };

    const handleSave = async (data: CreateCategoriaDto | UpdateCategoriaDto) => {
        try {
            if (selectedCategoria) {
                await categoriaService.updateCategoria(selectedCategoria.id_categoria, data);
                setSuccessMessage('Categoría actualizada exitosamente');
            } else {
                await categoriaService.createCategoria(data as CreateCategoriaDto);
                setSuccessMessage('Categoría creada exitosamente');
            }
            setShowForm(false);
            setSelectedCategoria(null);
            await cargarCategorias();

            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err: any) {
            setError(err.message);
            setTimeout(() => setError(null), 5000);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedCategoria(null);
    };

    const handleDelete = (id: number) => {
        setConfirmAction({ type: 'delete', id, step: 1 });
        setShowConfirmModal(true);
    };

    const handleHardDelete = (id: number) => {
        setConfirmAction({ type: 'hardDelete', id, step: 1 });
        setShowConfirmModal(true);
    };

    const handleConfirmModalConfirm = async () => {
        if (!confirmAction) return;

        if (confirmAction.type === 'hardDelete' && confirmAction.step === 1) {
            // Mostrar segunda confirmación para hard delete
            setConfirmAction({ ...confirmAction, step: 2 });
            return;
        }

        // Ejecutar la acción
        setShowConfirmModal(false);

        try {
            if (confirmAction.type === 'delete') {
                const result = await categoriaService.deleteCategoria(confirmAction.id);
                setSuccessMessage(result.message);
            } else {
                const result = await categoriaService.hardDeleteCategoria(confirmAction.id);
                setSuccessMessage(result.message);
            }
            await cargarCategorias();
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err: any) {
            setError(err.message);
            setTimeout(() => setError(null), 5000);
        } finally {
            setConfirmAction(null);
        }
    };

    const handleConfirmModalCancel = () => {
        setShowConfirmModal(false);
        setConfirmAction(null);
    };

    const getConfirmModalProps = () => {
        if (!confirmAction) return null;

        if (confirmAction.type === 'delete') {
            return {
                title: 'Desactivar Categoría',
                message: '¿Estás seguro de desactivar esta categoría?\n\nLa categoría quedará inactiva pero no se eliminará permanentemente.',
                confirmText: 'Desactivar',
                type: 'warning' as const,
            };
        }

        if (confirmAction.step === 1) {
            return {
                title: '⚠️ Eliminar Permanentemente',
                message: '¿Estás seguro de ELIMINAR PERMANENTEMENTE esta categoría?\n\nEsta acción NO se puede deshacer.',
                confirmText: 'Continuar',
                type: 'danger' as const,
            };
        }

        return {
            title: '⚠️ Confirmación Final',
            message: '¿Realmente deseas eliminar esta categoría de forma permanente?\n\nEsta es tu última oportunidad para cancelar.',
            confirmText: 'Eliminar Permanentemente',
            type: 'danger' as const,
        };
    };

    const modalProps = getConfirmModalProps();

    return (
        <div className="main-content">
            <div className="page-header">
                <h1 className="page-title">Gestión de Categorías</h1>
                <p className="page-subtitle">
                    Administra las categorías de productos de la farmacia
                </p>
            </div>

            {successMessage && (
                <div className="alert alert-success">
                    ✓ {successMessage}
                </div>
            )}

            {error && (
                <div className="alert alert-error">
                    ✕ {error}
                </div>
            )}

            <CategoriaFilters
                onFilterChange={handleFilterChange}
                onCreateClick={handleCreateClick}
            />

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Cargando categorías...</p>
                </div>
            ) : (
                <CategoriaTable
                    categorias={categorias}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                    onHardDelete={handleHardDelete}
                />
            )}

            {showForm && (
                <div className="modal-overlay" onClick={handleCancel}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <CategoriaForm
                            categoria={selectedCategoria}
                            onSave={handleSave}
                            onCancel={handleCancel}
                        />
                    </div>
                </div>
            )}

            {modalProps && (
                <ConfirmModal
                    isOpen={showConfirmModal}
                    title={modalProps.title}
                    message={modalProps.message}
                    confirmText={modalProps.confirmText}
                    cancelText="Cancelar"
                    onConfirm={handleConfirmModalConfirm}
                    onCancel={handleConfirmModalCancel}
                    type={modalProps.type}
                />
            )}
        </div>
    );
};

export default CategoriasPage;
