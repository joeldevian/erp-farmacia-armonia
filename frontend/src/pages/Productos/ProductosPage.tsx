import { useState } from 'react';
import type {
    Producto,
    CreateProductoDto,
    UpdateProductoDto,
} from '../../types/producto';
import { productoService } from '../../services/productoService';
import { useCrud } from '../../hooks/useCrud';
import ProductoFilters from '../../components/Productos/ProductoFilters';
import ProductoTable from '../../components/Productos/ProductoTable';
import ProductoForm from '../../components/Productos/ProductoForm';
import ConfirmModal from '../../components/ConfirmModal';
import './ProductosPage.css';

const ProductosPage = () => {
    // Hook CRUD centralizado
    const {
        items: productos,
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
    } = useCrud<Producto, CreateProductoDto, UpdateProductoDto>(
        productoService,
        { entityName: 'Producto' },
    );

    // Estado local solo para UI
    const [showForm, setShowForm] = useState(false);
    const [selectedProducto, setSelectedProducto] = useState<Producto | null>(
        null,
    );

    // Handlers de UI
    const handleFilterChange = (newFiltros: any) => {
        const apiFilters: any = {};
        if (newFiltros.busqueda) {
            apiFilters.nombre = newFiltros.busqueda;
        }
        if (newFiltros.id_categoria) {
            apiFilters.id_categoria = newFiltros.id_categoria;
        }
        if (newFiltros.id_laboratorio) {
            apiFilters.id_laboratorio = newFiltros.id_laboratorio;
        }
        if (newFiltros.tipo_producto) {
            apiFilters.tipo_producto = newFiltros.tipo_producto;
        }
        if (newFiltros.estado !== 'todos') {
            apiFilters.estado = newFiltros.estado === 'activos';
        }
        setFilters(apiFilters);
    };

    const handleCreateClick = () => {
        setSelectedProducto(null);
        setShowForm(true);
    };

    const handleEditClick = (producto: Producto) => {
        setSelectedProducto(producto);
        setShowForm(true);
    };

    const handleSave = async (
        data: CreateProductoDto | UpdateProductoDto,
    ) => {
        let success = false;

        if (selectedProducto) {
            success = await updateItem(selectedProducto.id_producto, data);
        } else {
            success = await createItem(data as CreateProductoDto);
        }

        if (success) {
            setShowForm(false);
            setSelectedProducto(null);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedProducto(null);
    };

    return (
        <div className="main-content">
            <div className="page-header">
                <h1 className="page-title">Gestión de Productos</h1>
                <p className="page-subtitle">
                    Administra el inventario de productos farmacéuticos
                </p>
            </div>

            {successMessage && (
                <div className="alert alert-success">✓ {successMessage}</div>
            )}

            {error && <div className="alert alert-error">✕ {error}</div>}

            <ProductoFilters
                onFilterChange={handleFilterChange}
                onCreateClick={handleCreateClick}
            />

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Cargando productos...</p>
                </div>
            ) : (
                <ProductoTable
                    productos={productos}
                    onEdit={handleEditClick}
                    onDelete={(id) => deleteItem(id)}
                    onHardDelete={(id) => hardDeleteItem(id)}
                />
            )}

            {showForm && (
                <div className="modal-overlay" onClick={handleCancel}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <ProductoForm
                            producto={selectedProducto}
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

export default ProductosPage;
