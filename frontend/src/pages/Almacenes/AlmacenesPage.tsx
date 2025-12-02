import type React from 'react';
import { useState } from 'react';
import { almacenService } from '../../services/almacenService';
import type { Almacen, CreateAlmacenDto, UpdateAlmacenDto } from '../../types/almacen';
import { useCrud } from '../../hooks/useCrud';
import AlmacenTable from '../../components/Almacenes/AlmacenTable';
import AlmacenForm from '../../components/Almacenes/AlmacenForm';
import AlmacenFilters from '../../components/Almacenes/AlmacenFilters';
import ConfirmModal from '../../components/ConfirmModal';
import './AlmacenesPage.css';

const AlmacenesPage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [editingAlmacen, setEditingAlmacen] = useState<Almacen | null>(null);

    const {
        items: almacenes,
        loading,
        error,
        successMessage,
        setFilters,
        createItem,
        updateItem,
        deleteItem,
        hardDeleteItem,
        confirmModal,
        handleConfirmAction,
        handleCancelAction,
    } = useCrud<Almacen, CreateAlmacenDto, UpdateAlmacenDto>(almacenService, {
        entityName: 'Almacén',
        entityNamePlural: 'Almacenes',
        autoLoad: true,
    });

    const handleCreate = () => {
        setEditingAlmacen(null);
        setShowModal(true);
    };

    const handleEdit = (almacen: Almacen) => {
        setEditingAlmacen(almacen);
        setShowModal(true);
    };

    const handleSave = async (data: CreateAlmacenDto | UpdateAlmacenDto) => {
        let success = false;

        if (editingAlmacen) {
            success = await updateItem(editingAlmacen.id_almacen, data as UpdateAlmacenDto);
        } else {
            success = await createItem(data as CreateAlmacenDto);
        }

        if (success) {
            setShowModal(false);
            setEditingAlmacen(null);
        }
    };

    const handleCancel = () => {
        setShowModal(false);
        setEditingAlmacen(null);
    };

    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
    };

    const handleDelete = (id: string) => {
        deleteItem(id);
    };

    const handleHardDelete = (id: string) => {
        hardDeleteItem(id);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Gestión de Almacenes</h1>
                <p className="page-description">
                    Administra los almacenes de la farmacia
                </p>
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

            <AlmacenFilters
                onFilterChange={handleFilterChange}
                onCreateClick={handleCreate}
            />

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Cargando almacenes...</p>
                </div>
            ) : (
                <AlmacenTable
                    almacenes={almacenes}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onHardDelete={handleHardDelete}
                />
            )}

            {/* Modal de formulario */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCancel}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <AlmacenForm
                            almacen={editingAlmacen}
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
                    type={confirmModal.type}
                    onConfirm={handleConfirmAction}
                    onCancel={handleCancelAction}
                />
            )}
        </div>
    );
};

export default AlmacenesPage;
