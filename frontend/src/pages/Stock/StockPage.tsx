import type React from 'react';
import { useState } from 'react';
import { stockService } from '../../services/stockService';
import type { Stock, CreateStockDto, UpdateStockDto } from '../../types/stock';
import { useCrud } from '../../hooks/useCrud';
import StockTable from '../../components/Stock/StockTable';
import StockForm from '../../components/Stock/StockForm';
import StockFilters from '../../components/Stock/StockFilters';
import StockAlertas from '../../components/Stock/StockAlertas';
import ConfirmModal from '../../components/ConfirmModal';
import './StockPage.css';

const StockPage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [editingStock, setEditingStock] = useState<Stock | null>(null);

    const {
        items: stocks,
        loading,
        error,
        successMessage,
        setFilters,
        createItem,
        updateItem,
        deleteItem,
        confirmModal,
        handleConfirmAction,
        handleCancelAction,
    } = useCrud<Stock, CreateStockDto, UpdateStockDto>(stockService, {
        entityName: 'Stock',
        entityNamePlural: 'Stocks',
        autoLoad: true,
    });

    const handleCreate = () => {
        setEditingStock(null);
        setShowModal(true);
    };

    const handleEdit = (stock: Stock) => {
        setEditingStock(stock);
        setShowModal(true);
    };

    const handleSave = async (data: CreateStockDto | UpdateStockDto) => {
        let success = false;

        if (editingStock) {
            success = await updateItem(editingStock.id_stock, data as UpdateStockDto);
        } else {
            success = await createItem(data as CreateStockDto);
        }

        if (success) {
            setShowModal(false);
            setEditingStock(null);
        }
    };

    const handleCancel = () => {
        setShowModal(false);
        setEditingStock(null);
    };

    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
    };

    const handleDelete = (id: string) => {
        deleteItem(id);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Gestión de Stock Global</h1>
                <p className="page-description">
                    Administra el stock global de productos
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

            {/* Alertas de stock */}
            <StockAlertas />

            <StockFilters
                onFilterChange={handleFilterChange}
                onCreateClick={handleCreate}
            />

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Cargando stocks...</p>
                </div>
            ) : (
                <StockTable
                    stocks={stocks}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {/* Modal de formulario */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCancel}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <StockForm
                            stock={editingStock}
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

export default StockPage;
