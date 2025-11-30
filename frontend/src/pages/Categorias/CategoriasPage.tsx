import type React from 'react';
import { useState, useEffect } from 'react';
import type { Categoria, CreateCategoriaDto, UpdateCategoriaDto } from '../../types/categoria';
import { categoriaService } from '../../services/categoriaService';
import CategoriaFilters from '../../components/Categorias/CategoriaFilters';
import CategoriaTable from '../../components/Categorias/CategoriaTable';
import CategoriaForm from '../../components/Categorias/CategoriaForm';
import './CategoriasPage.css';

const CategoriasPage: React.FC = () => {
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

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Estás seguro de desactivar esta categoría?')) {
            return;
        }

        try {
            const result = await categoriaService.deleteCategoria(id);
            setSuccessMessage(result.message);
            await cargarCategorias();

            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err: any) {
            setError(err.message);
            setTimeout(() => setError(null), 5000);
        }
    };

    const handleHardDelete = async (id: number) => {
        if (
            !window.confirm(
                '⚠️ ¿Estás seguro de ELIMINAR PERMANENTEMENTE esta categoría?\n\nEsta acción NO se puede deshacer.',
            )
        ) {
            return;
        }

        if (
            !window.confirm(
                '⚠️ CONFIRMACIÓN FINAL: ¿Realmente deseas eliminar esta categoría de forma permanente?',
            )
        ) {
            return;
        }

        try {
            const result = await categoriaService.hardDeleteCategoria(id);
            setSuccessMessage(result.message);
            await cargarCategorias();

            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err: any) {
            setError(err.message);
            setTimeout(() => setError(null), 5000);
        }
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
        </div>
    );
};

export default CategoriasPage;
