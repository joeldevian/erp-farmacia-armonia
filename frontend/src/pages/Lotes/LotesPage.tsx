import { useState } from 'react';
import type { Lote, CreateLoteDto, UpdateLoteDto } from '../../types/lote';
import { loteService } from '../../services/loteService';
import { useCrud } from '../../hooks/useCrud';
import LoteAlertas from '../../components/Lotes/LoteAlertas';
import LoteFilters from '../../components/Lotes/LoteFilters';
import LoteTable from '../../components/Lotes/LoteTable';
import LoteForm from '../../components/Lotes/LoteForm';
import ConfirmModal from '../../components/ConfirmModal';
import './LotesPage.css';

const LotesPage = () => {
    // Hook CRUD centralizado
    const {
        items: lotes,
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
    } = useCrud<Lote, CreateLoteDto, UpdateLoteDto>(loteService, {
        entityName: 'Lote',
    });

    // Estado local solo para UI
    const [showForm, setShowForm] = useState(false);
    const [selectedLote, setSelectedLote] = useState<Lote | null>(null);

    // Handlers de UI
    const handleFilterChange = (newFiltros: any) => {
        const apiFilters: any = {};
        if (newFiltros.id_producto) {
            apiFilters.id_producto = newFiltros.id_producto;
        }
        if (newFiltros.estado && newFiltros.estado !== 'todos') {
            apiFilters.estado = newFiltros.estado;
        }
        setFilters(apiFilters);
    };

    const handleCreateClick = () => {
        setSelectedLote(null);
        setShowForm(true);
    };

    const handleEditClick = (lote: Lote) => {
        setSelectedLote(lote);
        setShowForm(true);
    };

    const handleSave = async (data: CreateLoteDto | UpdateLoteDto) => {
        let success = false;

        if (selectedLote) {
            success = await updateItem(selectedLote.id_lote, data);
        } else {
            success = await createItem(data as CreateLoteDto);
        }

        if (success) {
            setShowForm(false);
            setSelectedLote(null);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedLote(null);
    };

    return (
        <div className="main-content">
            <div className="page-header">
                <h1 className="page-title">Gestión de Lotes</h1>
                <p className="page-subtitle">
                    Control de vencimientos y cantidades de inventario
                </p>
            </div>

            {successMessage && (
                <div className="alert alert-success">✓ {successMessage}</div>
            )}

            {error && <div className="alert alert-error">✕ {error}</div>}

            <LoteAlertas />

            <LoteFilters
                onFilterChange={handleFilterChange}
                onCreateClick={handleCreateClick}
            />

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Cargando lotes...</p>
                </div>
            ) : (
                <LoteTable
                    lotes={lotes}
                    onEdit={handleEditClick}
                    onDelete={(id) => deleteItem(id)}
                    onHardDelete={(id) => hardDeleteItem(id)}
                />
            )}

            {showForm && (
                <div className="modal-overlay" onClick={handleCancel}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <LoteForm
                            lote={selectedLote}
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

export default LotesPage;
