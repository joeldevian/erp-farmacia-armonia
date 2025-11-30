import { useState } from 'react';
import type { Categoria, CreateCategoriaDto, UpdateCategoriaDto } from '../../types/categoria';
import { categoriaService } from '../../services/categoriaService';
import { useCrud } from '../../hooks/useCrud';
import CategoriaFilters from '../../components/Categorias/CategoriaFilters';
import CategoriaTable from '../../components/Categorias/CategoriaTable';
import CategoriaForm from '../../components/Categorias/CategoriaForm';
import ConfirmModal from '../../components/ConfirmModal';
import './CategoriasPage.css';

const CategoriasPage = () => {
    // Hook CRUD centralizado - inicializar sin filtros
    const {
        items: categorias,
        loading,
        error,
        successMessage,
        createItem,
        updateItem,
        deleteItem,
        hardDeleteItem,
        setFilters,
        confirmModal,
        handleConfirmAction,
        handleCancelAction,
    } = useCrud<Categoria, CreateCategoriaDto, UpdateCategoriaDto>(categoriaService, {
        entityName: 'Categoría',
        initialFilters: {}, // Sin filtros iniciales
    });

    // Estado local solo para UI
    const [showForm, setShowForm] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);

    // Handlers de UI
    const handleFilterChange = (newFiltros: { nombre: string; estado: string }) => {
        // Convertir filtros de UI a formato API
        const apiFilters: any = {};
        if (newFiltros.nombre) apiFilters.nombre = newFiltros.nombre;
        if (newFiltros.estado !== 'todos') {
            apiFilters.estado = newFiltros.estado === 'activos';
        }
        setFilters(apiFilters);
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
        let success = false;

        if (selectedCategoria) {
            success = await updateItem(selectedCategoria.id_categoria, data);
        } else {
            success = await createItem(data as CreateCategoriaDto);
        }

        if (success) {
            setShowForm(false);
            setSelectedCategoria(null);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedCategoria(null);
    };

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
                    onDelete={(id) => deleteItem(id)}
                    onHardDelete={(id) => hardDeleteItem(id)}
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

            {confirmModal && (
                <ConfirmModal
                    isOpen={confirmModal.isOpen}
                    title={confirmModal.title}
                    message={confirmModal.message}
                    confirmText={confirmModal.confirmText}
                    cancelText="Cancelar"
                    onConfirm={handleConfirmAction}
                    onCancel={handleCancelAction}
                    type={confirmModal.type}
                />
            )}
        </div>
    );
};

export default CategoriasPage;
