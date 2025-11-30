import type React from 'react';
import { useState, useEffect } from 'react';
import { categoriaService } from '../../services/categoriaService';
import { laboratorioService } from '../../services/laboratorioService';
import type { Categoria } from '../../types/categoria';
import type { Laboratorio } from '../../types/laboratorio';
import { TipoProducto } from '../../types/producto';

interface ProductoFiltersProps {
    onFilterChange: (filtros: any) => void;
    onCreateClick: () => void;
}

const ProductoFilters: React.FC<ProductoFiltersProps> = ({
    onFilterChange,
    onCreateClick,
}) => {
    const [busqueda, setBusqueda] = useState('');
    const [idCategoria, setIdCategoria] = useState('');
    const [idLaboratorio, setIdLaboratorio] = useState('');
    const [tipoProducto, setTipoProducto] = useState('');
    const [estado, setEstado] = useState('todos');

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [laboratorios, setLaboratorios] = useState<Laboratorio[]>([]);

    // Cargar categorías y laboratorios al montar
    useEffect(() => {
        const loadData = async () => {
            try {
                const [cats, labs] = await Promise.all([
                    categoriaService.getCategorias({ estado: true }),
                    laboratorioService.getLaboratorios({ estado: true }),
                ]);
                setCategorias(cats);
                setLaboratorios(labs);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };
        loadData();
    }, []);

    const handleFilterChange = () => {
        onFilterChange({
            busqueda,
            id_categoria: idCategoria ? Number(idCategoria) : undefined,
            id_laboratorio: idLaboratorio ? Number(idLaboratorio) : undefined,
            tipo_producto: tipoProducto || undefined,
            estado,
        });
    };

    useEffect(() => {
        handleFilterChange();
    }, [busqueda, idCategoria, idLaboratorio, tipoProducto, estado]);

    return (
        <div className="content-card" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'var(--spacing-md)',
                    alignItems: 'end',
                }}
            >
                <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                        Buscar
                    </label>
                    <input
                        type="text"
                        placeholder="Nombre o código..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-sm)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--border-radius-sm)',
                            fontSize: '1rem',
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                        Categoría
                    </label>
                    <select
                        value={idCategoria}
                        onChange={(e) => setIdCategoria(e.target.value)}
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-sm)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--border-radius-sm)',
                            fontSize: '1rem',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="">Todas</option>
                        {categorias.map((cat) => (
                            <option key={cat.id_categoria} value={cat.id_categoria}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                        Laboratorio
                    </label>
                    <select
                        value={idLaboratorio}
                        onChange={(e) => setIdLaboratorio(e.target.value)}
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-sm)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--border-radius-sm)',
                            fontSize: '1rem',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="">Todos</option>
                        {laboratorios.map((lab) => (
                            <option key={lab.id_laboratorio} value={lab.id_laboratorio}>
                                {lab.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                        Tipo
                    </label>
                    <select
                        value={tipoProducto}
                        onChange={(e) => setTipoProducto(e.target.value)}
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-sm)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--border-radius-sm)',
                            fontSize: '1rem',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="">Todos</option>
                        <option value={TipoProducto.MEDICAMENTO}>Medicamento</option>
                        <option value={TipoProducto.INSUMO}>Insumo</option>
                        <option value={TipoProducto.HIGIENE}>Higiene</option>
                        <option value={TipoProducto.EQUIPO}>Equipo</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                        Estado
                    </label>
                    <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-sm)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--border-radius-sm)',
                            fontSize: '1rem',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="todos">Todos</option>
                        <option value="activos">Activos</option>
                        <option value="inactivos">Inactivos</option>
                    </select>
                </div>

                <button
                    onClick={onCreateClick}
                    style={{
                        padding: 'var(--spacing-sm) var(--spacing-lg)',
                        border: 'none',
                        borderRadius: 'var(--border-radius-sm)',
                        backgroundColor: '#059669',
                        color: 'white',
                        fontWeight: 500,
                        cursor: 'pointer',
                        fontSize: '1rem',
                        whiteSpace: 'nowrap',
                        transition: 'background-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#047857')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#059669')}
                >
                    + Crear Producto
                </button>
            </div>
        </div>
    );
};

export default ProductoFilters;
