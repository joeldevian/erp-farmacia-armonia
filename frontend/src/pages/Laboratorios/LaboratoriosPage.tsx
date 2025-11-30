import { useState } from 'react';
import type { Laboratorio, CreateLaboratorioDto, UpdateLaboratorioDto } from '../../types/laboratorio';
import { laboratorioService } from '../../services/laboratorioService';
import { useCrud } from '../../hooks/useCrud';
import LaboratorioFilters from '../../components/Laboratorios/LaboratorioFilters';
import LaboratorioTable from '../../components/Laboratorios/LaboratorioTable';
import LaboratorioForm from '../../components/Laboratorios/LaboratorioForm';
import ConfirmModal from '../../components/ConfirmModal';
import './LaboratoriosPage.css';

const LaboratoriosPage = () => {
    // Hook CRUD centralizado
    const {
        items: laboratorios,
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
    } = useCrud<Laboratorio, CreateLaboratorioDto, UpdateLaboratorioDto>(
        laboratorioService,
        { entityName: 'Laboratorio' }
    );

    // Estado local solo para UI
    const [showForm, setShowForm] = useState(false);
    const [selectedLaboratorio, setSelectedLaboratorio] = useState<Laboratorio | null>(null);

    // Handlers de UI
    const handleFilterChange = (newFiltros: { nombre: string; estado: string }) => {
        const apiFilters: any = {};
        if (newFiltros.nombre) apiFilters.nombre = newFiltros.nombre;
        if (newFiltros.estado !== 'todos') {
            apiFilters.estado = newFiltros.estado === 'activos';
        }
        setFilters(apiFilters);
    };

    const handleCreateClick = () => {
        setSelectedLaboratorio(null);
        setShowForm(true);
    };

    const handleEditClick = (laboratorio: Laboratorio) => {
        setSelectedLaboratorio(laboratorio);
        setShowForm(true);
    };

    const handleSave = async (data: CreateLaboratorioDto | UpdateLaboratorioDto) => {
        let success = false;

        if (selectedLaboratorio) {
            success = await updateItem(selectedLaboratorio.id_laboratorio, data);
        } else {
            success = await createItem(data as CreateLaboratorioDto);
        }

        if (success) {
            setShowForm(false);
            setSelectedLaboratorio(null);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedLaboratorio(null);
    };

    return (
        <div className="main-content">
            <div className="page-header">
                <h1 className="page-title">Gestión de Laboratorios</h1>
                <p className="page-subtitle">
                    Administra los laboratorios farmacéuticos
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

            <LaboratorioFilters
                onFilterChange={handleFilterChange}
                onCreateClick={handleCreateClick}
            />

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Cargando laboratorios...</p>
                </div>
            ) : (
                <LaboratorioTable
                    laboratorios={laboratorios}
                    onEdit={handleEditClick}
                    onDelete={(id) => deleteItem(id)}
                    onHardDelete={(id) => hardDeleteItem(id)}
                />
            )}

            {showForm && (
                <div className="modal-overlay" onClick={handleCancel}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <LaboratorioForm
                            laboratorio={selectedLaboratorio}
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

export default LaboratoriosPage;
