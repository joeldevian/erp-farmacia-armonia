import type React from 'react';
import { useState } from 'react';
import { EstadoStock } from '../../types/stock';

interface StockFiltersProps {
    onFilterChange: (filtros: any) => void;
    onCreateClick: () => void;
}

const StockFilters: React.FC<StockFiltersProps> = ({
    onFilterChange,
    onCreateClick,
}) => {
    const [estado, setEstado] = useState('todos');

    const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEstado(e.target.value);
        onFilterChange({
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
                        <option value={EstadoStock.NORMAL}>Normal</option>
                        <option value={EstadoStock.BAJO_STOCK}>Bajo Stock</option>
                        <option value={EstadoStock.SIN_STOCK}>Sin Stock</option>
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
                    + Crear Stock
                </button>
            </div>
        </div>
    );
};

export default StockFilters;
