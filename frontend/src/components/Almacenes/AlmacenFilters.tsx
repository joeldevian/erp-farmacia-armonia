import type React from 'react';
import { useState } from 'react';
import { TipoAlmacen, EstadoAlmacen } from '../../types/almacen';

interface AlmacenFiltersProps {
    onFilterChange: (filtros: any) => void;
    onCreateClick: () => void;
}

const AlmacenFilters: React.FC<AlmacenFiltersProps> = ({
    onFilterChange,
    onCreateClick,
}) => {
    const [tipo, setTipo] = useState('todos');
    const [estado, setEstado] = useState('todos');

    const handleFilterChange = () => {
        onFilterChange({
            tipo: tipo !== 'todos' ? tipo : undefined,
            estado: estado !== 'todos' ? estado : undefined,
        });
    };

    const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTipo(e.target.value);
        onFilterChange({
            tipo: e.target.value !== 'todos' ? e.target.value : undefined,
            estado: estado !== 'todos' ? estado : undefined,
        });
    };

    const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEstado(e.target.value);
        onFilterChange({
            tipo: tipo !== 'todos' ? tipo : undefined,
            estado: e.target.value !== 'todos' ? e.target.value : undefined,
        });
    };

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
                        Tipo
                    </label>
                    <select
                        value={tipo}
                        onChange={handleTipoChange}
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
                        <option value={TipoAlmacen.PRINCIPAL}>Principal</option>
                        <option value={TipoAlmacen.SECUNDARIO}>Secundario</option>
                        <option value={TipoAlmacen.TRANSITORIO}>Transitorio</option>
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
                        onChange={handleEstadoChange}
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
                        <option value={EstadoAlmacen.ACTIVO}>Activo</option>
                        <option value={EstadoAlmacen.INACTIVO}>Inactivo</option>
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
                    + Crear Almacén
                </button>
            </div>
        </div>
    );
};

export default AlmacenFilters;
