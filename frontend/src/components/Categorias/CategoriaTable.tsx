import type React from 'react';
import type { Categoria } from '../../types/categoria';

interface CategoriaTableProps {
    categorias: Categoria[];
    onEdit: (categoria: Categoria) => void;
    onDelete: (id: number) => void;
    onHardDelete: (id: number) => void;
}

const CategoriaTable: React.FC<CategoriaTableProps> = ({
    categorias,
    onEdit,
    onDelete,
    onHardDelete,
}) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (categorias.length === 0) {
        return (
            <div className="content-card" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                    No se encontraron categorías
                </p>
            </div>
        );
    }

    return (
        <div className="content-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '2px solid var(--border-color)' }}>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }}>
                                ID
                            </th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }}>
                                Nombre
                            </th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }}>
                                Descripción
                            </th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'center', fontWeight: 600, color: 'var(--text-primary)' }}>
                                Estado
                            </th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }}>
                                Fecha Creación
                            </th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'center', fontWeight: 600, color: 'var(--text-primary)' }}>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria) => (
                            <tr
                                key={categoria.id_categoria}
                                style={{
                                    borderBottom: '1px solid var(--border-color)',
                                    transition: 'background-color var(--transition-fast)',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
                                    {categoria.id_categoria}
                                </td>
                                <td style={{ padding: 'var(--spacing-md)', fontWeight: 600, color: 'var(--text-primary)' }}>
                                    {categoria.nombre}
                                </td>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
                                    {categoria.descripcion ? (
                                        categoria.descripcion.length > 50
                                            ? `${categoria.descripcion.substring(0, 50)}...`
                                            : categoria.descripcion
                                    ) : (
                                        <span style={{ fontStyle: 'italic', color: 'var(--text-light)' }}>Sin descripción</span>
                                    )}
                                </td>
                                <td style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '12px',
                                            fontSize: '0.8125rem',
                                            fontWeight: 600,
                                            backgroundColor: categoria.estado ? 'var(--primary-light)' : '#f1f5f9',
                                            color: categoria.estado ? 'var(--primary-dark)' : '#64748b',
                                        }}
                                    >
                                        {categoria.estado ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                    {formatDate(categoria.fecha_creacion)}
                                </td>
                                <td style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'center', flexWrap: 'wrap' }}>
                                        <button
                                            onClick={() => onEdit(categoria)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                border: 'none',
                                                borderRadius: 'var(--border-radius-sm)',
                                                backgroundColor: '#e6f2ff',
                                                color: '#0891b2',
                                                fontWeight: 500,
                                                cursor: 'pointer',
                                                fontSize: '0.875rem',
                                            }}
                                            title="Editar"
                                        >
                                            Editar
                                        </button>
                                        {categoria.estado && (
                                            <button
                                                onClick={() => onDelete(categoria.id_categoria)}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    border: 'none',
                                                    borderRadius: 'var(--border-radius-sm)',
                                                    backgroundColor: '#fee2e2',
                                                    color: '#dc2626',
                                                    fontWeight: 500,
                                                    cursor: 'pointer',
                                                    fontSize: '0.875rem',
                                                }}
                                                title="Desactivar"
                                            >
                                                Desactivar
                                            </button>
                                        )}
                                        <button
                                            onClick={() => onHardDelete(categoria.id_categoria)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                border: 'none',
                                                borderRadius: 'var(--border-radius-sm)',
                                                backgroundColor: '#450a0a',
                                                color: '#fef2f2',
                                                fontWeight: 500,
                                                cursor: 'pointer',
                                                fontSize: '0.875rem',
                                            }}
                                            title="Eliminar permanentemente"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoriaTable;
