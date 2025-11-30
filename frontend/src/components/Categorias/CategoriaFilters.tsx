import type React from 'react';
import { useState, useEffect } from 'react';

interface CategoriaFiltersProps {
    onFilterChange: (filtros: { nombre: string; estado: string }) => void;
    onCreateClick: () => void;
}

const CategoriaFilters: React.FC<CategoriaFiltersProps> = ({
    onFilterChange,
    onCreateClick,
}) => {
    const [nombre, setNombre] = useState('');
    const [estado, setEstado] = useState('todos');

    useEffect(() => {
        const timer = setTimeout(() => {
            onFilterChange({ nombre, estado });
        }, 300);

        return () => clearTimeout(timer);
    }, [nombre, estado]);

    return (
        <div
            className="content-card"
            style={{
                display: 'flex',
                gap: 'var(--spacing-md)',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginBottom: 'var(--spacing-lg)',
            }}
        >
            <div style={{ flex: '1 1 300px' }}>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Buscar por nombre..."
                    style={{
                        width: '100%',
                        padding: '0.625rem var(--spacing-md)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--border-radius-md)',
                        fontSize: '0.9375rem',
                    }}
                />
            </div>

            <div style={{ flex: '0 1 200px' }}>
                <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.625rem var(--spacing-md)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--border-radius-md)',
                        fontSize: '0.9375rem',
                        cursor: 'pointer',
                    }}
                >
                    <option value="todos">Todos los estados</option>
                    <option value="activos">Activos</option>
                    <option value="inactivos">Inactivos</option>
                </select>
            </div>

            <button
                onClick={onCreateClick}
                style={{
                    padding: '0.625rem 1.5rem',
                    border: 'none',
                    borderRadius: 'var(--border-radius-md)',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.9375rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}
            >
                <span style={{ fontSize: '1.25rem' }}>+</span>
                Nueva Categoría
            </button>
        </div>
    );
};

export default CategoriaFilters;
