import type React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Almacen } from '../../types/almacen';

interface AlmacenTableProps {
    almacenes: Almacen[];
    onEdit: (almacen: Almacen) => void;
    onDelete: (id: string) => void;
    onHardDelete: (id: string) => void;
}

const AlmacenTable: React.FC<AlmacenTableProps> = ({
    almacenes,
    onEdit,
    onDelete,
    onHardDelete,
}) => {
    const navigate = useNavigate();

    const getTipoBadge = (tipo: string) => {
        const colores: Record<string, { bg: string; text: string }> = {
            principal: { bg: '#dbeafe', text: '#1e40af' },
            secundario: { bg: '#fef3c7', text: '#92400e' },
            transitorio: { bg: '#e0e7ff', text: '#4338ca' },
        };

        const color = colores[tipo] || colores.principal;

        return (
            <span
                style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    backgroundColor: color.bg,
                    color: color.text,
                    textTransform: 'capitalize',
                }}
            >
                {tipo}
            </span>
        );
    };

    const getEstadoBadge = (estado: string) => {
        const colores: Record<string, { bg: string; text: string }> = {
            activo: { bg: '#d1fae5', text: '#065f46' },
            inactivo: { bg: '#fee2e2', text: '#991b1b' },
        };

        const color = colores[estado] || colores.activo;

        return (
            <span
                style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    backgroundColor: color.bg,
                    color: color.text,
                    textTransform: 'capitalize',
                }}
            >
                {estado}
            </span>
        );
    };

    const getCapacidadBadge = (ocupada: number, total: number) => {
        const porcentaje = (ocupada / total) * 100;
        let bg = '#d1fae5';
        let text = '#065f46';

        if (porcentaje >= 90) {
            bg = '#fee2e2';
            text = '#991b1b';
        } else if (porcentaje >= 70) {
            bg = '#fef3c7';
            text = '#92400e';
        }

        return (
            <span
                style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    backgroundColor: bg,
                    color: text,
                    fontWeight: 600,
                }}
            >
                {ocupada}/{total} ({porcentaje.toFixed(0)}%)
            </span>
        );
    };

    const handleVerDetalle = (id: string) => {
        navigate(`/almacenes/${id}`);
    };

    if (almacenes.length === 0) {
        return (
            <div className="content-card">
                <p
                    style={{
                        textAlign: 'center',
                        color: 'var(--text-secondary)',
                        padding: 'var(--spacing-xl)',
                    }}
                >
                    No se encontraron almacenes
                </p>
            </div>
        );
    }

    return (
        <div className="content-card">
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'left' }}>
                                Nombre
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'left' }}>
                                Ubicación
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                Tipo
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                Capacidad
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                Estado
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {almacenes.map((almacen) => (
                            <tr
                                key={almacen.id_almacen}
                                style={{
                                    borderBottom: '1px solid var(--border-color)',
                                    transition: 'background-color 0.2s',
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor = 'transparent')
                                }
                            >
                                <td
                                    style={{
                                        padding: 'var(--spacing-sm)',
                                        fontWeight: 500,
                                    }}
                                >
                                    {almacen.nombre}
                                </td>
                                <td style={{ padding: 'var(--spacing-sm)' }}>
                                    {almacen.ubicacion}
                                </td>
                                <td
                                    style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}
                                >
                                    {getTipoBadge(almacen.tipo)}
                                </td>
                                <td
                                    style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}
                                >
                                    {getCapacidadBadge(
                                        almacen.capacidad_ocupada,
                                        almacen.capacidad_total,
                                    )}
                                </td>
                                <td
                                    style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}
                                >
                                    {getEstadoBadge(almacen.estado)}
                                </td>
                                <td
                                    style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '0.5rem',
                                            justifyContent: 'center',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        <button
                                            onClick={() => handleVerDetalle(almacen.id_almacen)}
                                            style={{
                                                padding: '0.25rem 0.75rem',
                                                border: 'none',
                                                borderRadius: '4px',
                                                backgroundColor: '#059669',
                                                color: 'white',
                                                cursor: 'pointer',
                                                fontSize: '0.875rem',
                                            }}
                                            title="Ver detalle"
                                        >
                                            Ver
                                        </button>
                                        <button
                                            onClick={() => onEdit(almacen)}
                                            style={{
                                                padding: '0.25rem 0.75rem',
                                                border: 'none',
                                                borderRadius: '4px',
                                                backgroundColor: '#3b82f6',
                                                color: 'white',
                                                cursor: 'pointer',
                                                fontSize: '0.875rem',
                                            }}
                                            title="Editar"
                                        >
                                            Editar
                                        </button>
                                        {almacen.estado !== 'inactivo' ? (
                                            <button
                                                onClick={() => onDelete(almacen.id_almacen)}
                                                style={{
                                                    padding: '0.25rem 0.75rem',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    backgroundColor: '#f59e0b',
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                    fontSize: '0.875rem',
                                                }}
                                                title="Desactivar"
                                            >
                                                Desactivar
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => onHardDelete(almacen.id_almacen)}
                                                style={{
                                                    padding: '0.25rem 0.75rem',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    backgroundColor: '#dc2626',
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                    fontSize: '0.875rem',
                                                }}
                                                title="Eliminar permanentemente"
                                            >
                                                Eliminar
                                            </button>
                                        )}
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

export default AlmacenTable;
