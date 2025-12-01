import type React from 'react';
import type { Lote } from '../../types/lote';

interface LoteTableProps {
    lotes: Lote[];
    onEdit: (lote: Lote) => void;
    onDelete: (id: string) => void;
    onHardDelete: (id: string) => void;
}

const LoteTable: React.FC<LoteTableProps> = ({
    lotes,
    onEdit,
    onDelete,
    onHardDelete,
}) => {
    const calcularDiasParaVencer = (fechaVencimiento: Date | string): number => {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaVenc = new Date(fechaVencimiento);
        fechaVenc.setHours(0, 0, 0, 0);
        const diff = fechaVenc.getTime() - hoy.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const getEstadoBadge = (estado: string) => {
        const colores: Record<string, { bg: string; text: string }> = {
            activo: { bg: '#d1fae5', text: '#065f46' },
            expirado: { bg: '#fee2e2', text: '#991b1b' },
            agotado: { bg: '#e5e7eb', text: '#374151' },
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

    const getDiasVencimientoBadge = (dias: number) => {
        let bg = '#d1fae5';
        let text = '#065f46';

        if (dias < 0) {
            bg = '#fee2e2';
            text = '#991b1b';
        } else if (dias <= 7) {
            bg = '#fef3c7';
            text = '#92400e';
        } else if (dias <= 30) {
            bg = '#fed7aa';
            text = '#9a3412';
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
                {dias < 0 ? 'Vencido' : `${dias}d`}
            </span>
        );
    };

    if (lotes.length === 0) {
        return (
            <div className="content-card">
                <p
                    style={{
                        textAlign: 'center',
                        color: 'var(--text-secondary)',
                        padding: 'var(--spacing-xl)',
                    }}
                >
                    No se encontraron lotes
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
                                Código Lote
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'left' }}>
                                Producto
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                Fabricación
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                Vencimiento
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                Días
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                Cant. Inicial
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                Cant. Actual
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
                        {lotes.map((lote) => {
                            const dias = calcularDiasParaVencer(lote.fecha_vencimiento);

                            return (
                                <tr
                                    key={lote.id_lote}
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
                                            fontFamily: 'monospace',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {lote.codigo_lote}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-sm)' }}>
                                        {lote.producto?.nombre || '-'}
                                    </td>
                                    <td
                                        style={{
                                            padding: 'var(--spacing-sm)',
                                            textAlign: 'center',
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        {new Date(lote.fecha_fabricacion).toLocaleDateString(
                                            'es-ES',
                                        )}
                                    </td>
                                    <td
                                        style={{
                                            padding: 'var(--spacing-sm)',
                                            textAlign: 'center',
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        {new Date(lote.fecha_vencimiento).toLocaleDateString(
                                            'es-ES',
                                        )}
                                    </td>
                                    <td
                                        style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}
                                    >
                                        {getDiasVencimientoBadge(dias)}
                                    </td>
                                    <td
                                        style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}
                                    >
                                        {lote.cantidad_inicial}
                                    </td>
                                    <td
                                        style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}
                                    >
                                        {lote.cantidad_actual}
                                    </td>
                                    <td
                                        style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}
                                    >
                                        {getEstadoBadge(lote.estado)}
                                    </td>
                                    <td
                                        style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: '0.5rem',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <button
                                                onClick={() => onEdit(lote)}
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
                                            {lote.estado !== 'agotado' ? (
                                                <button
                                                    onClick={() => onDelete(lote.id_lote)}
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
                                                    onClick={() => onHardDelete(lote.id_lote)}
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
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LoteTable;
