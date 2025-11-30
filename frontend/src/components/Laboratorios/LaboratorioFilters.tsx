import type React from 'react';
import { useState } from 'react';

interface LaboratorioFiltersProps {
    onFilterChange: (filtros: { nombre: string; estado: string }) => void;
    onCreateClick: () => void;
}

const LaboratorioFilters: React.FC<LaboratorioFiltersProps> = ({
    onFilterChange,
    onCreateClick,
}) => {
    const [nombre, setNombre] = useState('');
    const [estado, setEstado] = useState('todos');

    const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNombre(value);
        onFilterChange({ nombre: value, estado });
    };

    const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setEstado(value);
        onFilterChange({ nombre, estado: value });
    };

    return (
        <div className="content-card" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 300px' }}>
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={nombre}
                        onChange={handleNombreChange}
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-sm)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--border-radius-sm)',
                            fontSize: '1rem',
                        }}
                    />
                </div>

                <div style={{ flex: '0 1 200px' }}>
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
                    + Crear Laboratorio
                </button>
            </div>
        </div>
    );
};

export default LaboratorioFilters;
