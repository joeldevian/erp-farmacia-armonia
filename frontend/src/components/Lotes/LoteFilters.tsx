import type React from 'react';
import { useState, useEffect } from 'react';
import { productoService } from '../../services/productoService';
import type { Producto } from '../../types/producto';
import { EstadoLote } from '../../types/lote';

interface LoteFiltersProps {
    onFilterChange: (filtros: any) => void;
    onCreateClick: () => void;
}

const LoteFilters: React.FC<LoteFiltersProps> = ({
    onFilterChange,
    onCreateClick,
}) => {
    const [idProducto, setIdProducto] = useState('');
    const [estado, setEstado] = useState('todos');
    const [productos, setProductos] = useState<Producto[]>([]);

    // Cargar productos al montar
    useEffect(() => {
        const loadProductos = async () => {
            try {
                const prods = await productoService.getProductos({ estado: true });
                setProductos(prods);
            } catch (error) {
                console.error('Error al cargar productos:', error);
            }
        };
        loadProductos();
    }, []);

    const handleFilterChange = () => {
        onFilterChange({
            id_producto: idProducto ? Number(idProducto) : undefined,
            estado: estado !== 'todos' ? estado : undefined,
        });
    };

    useEffect(() => {
        handleFilterChange();
    }, [idProducto, estado]);

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
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '0.25rem',
                            fontSize: '0.875rem',
                        }}
                    >
                        Producto
                    </label>
                    <select
                        value={idProducto}
                        onChange={(e) => setIdProducto(e.target.value)}
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
                        {productos.map((prod) => (
                            <option key={prod.id_producto} value={prod.id_producto}>
                                {prod.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '0.25rem',
                            fontSize: '0.875rem',
                        }}
                    >
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
                        <option value={EstadoLote.ACTIVO}>Activo</option>
                        <option value={EstadoLote.EXPIRADO}>Expirado</option>
                        <option value={EstadoLote.AGOTADO}>Agotado</option>
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
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = '#047857')
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = '#059669')
                    }
                >
                    + Crear Lote
                </button>
            </div>
        </div>
    );
};

export default LoteFilters;
