import type React from 'react';
import type { Laboratorio } from '../../types/laboratorio';

interface LaboratorioTableProps {
    laboratorios: Laboratorio[];
    onEdit: (laboratorio: Laboratorio) => void;
    onDelete: (id: number) => void;
    onHardDelete: (id: number) => void;
}

const LaboratorioTable: React.FC<LaboratorioTableProps> = ({
    laboratorios,
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

    if (laboratorios.length === 0) {
        return (
            <div className="content-card" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                    No se encontraron laboratorios
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
                                Dirección
                            </th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }}>
                                Teléfono
                            </th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }}>
                                Correo
                            </th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }}>
                                RUC
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
                        {laboratorios.map((laboratorio) => (
                            <tr
                                key={laboratorio.id_laboratorio}
                                style={{
                                    borderBottom: '1px solid var(--border-color)',
                                    transition: 'background-color var(--transition-fast)',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
                                    {laboratorio.id_laboratorio}
                                </td>
                                <td style={{ padding: 'var(--spacing-md)', fontWeight: 600, color: 'var(--text-primary)' }}>
                                    {laboratorio.nombre}
                                </td>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
                                    {laboratorio.direccion || (
                                        <span style={{ fontStyle: 'italic', color: 'var(--text-light)' }}>Sin dirección</span>
                                    )}
                                </td>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
                                    {laboratorio.telefono || (
                                        <span style={{ fontStyle: 'italic', color: 'var(--text-light)' }}>-</span>
                                    )}
                                </td>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
                                    {laboratorio.correo || (
                                        <span style={{ fontStyle: 'italic', color: 'var(--text-light)' }}>-</span>
                                    )}
                                </td>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
                                    {laboratorio.ruc || (
                                        <span style={{ fontStyle: 'italic', color: 'var(--text-light)' }}>-</span>
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
                                            backgroundColor: laboratorio.estado ? 'var(--primary-light)' : '#f1f5f9',
                                            color: laboratorio.estado ? 'var(--primary-dark)' : '#64748b',
                                        }}
                                    >
                                        {laboratorio.estado ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                    {formatDate(laboratorio.fecha_creacion)}
                                </td>
                                <td style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'center', flexWrap: 'wrap' }}>
                                        <button
                                            onClick={() => onEdit(laboratorio)}
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
                                        {laboratorio.estado && (
                                            <button
                                                onClick={() => onDelete(laboratorio.id_laboratorio)}
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
                                            onClick={() => onHardDelete(laboratorio.id_laboratorio)}
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

export default LaboratorioTable;
