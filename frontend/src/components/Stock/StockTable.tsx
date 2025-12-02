import type React from 'react';
import type { Stock } from '../../types/stock';

interface StockTableProps {
    stocks: Stock[];
    onEdit: (stock: Stock) => void;
    onDelete: (id: string) => void;
}

const StockTable: React.FC<StockTableProps> = ({ stocks, onEdit, onDelete }) => {
    const getEstadoBadge = (estado: string) => {
        const colores: Record<string, { bg: string; text: string }> = {
            normal: { bg: '#d1fae5', text: '#065f46' },
            bajo_stock: { bg: '#fef3c7', text: '#92400e' },
            sin_stock: { bg: '#fee2e2', text: '#991b1b' },
        };

        const color = colores[estado] || colores.normal;

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
                {estado.replace('_', ' ')}
            </span>
        );
    };

    const formatFecha = (fecha: Date | string) => {
        return new Date(fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (stocks.length === 0) {
        return (
            <div className="content-card">
                <p
                    style={{
                        textAlign: 'center',
                        color: 'var(--text-secondary)',
                        padding: 'var(--spacing-xl)',
                    }}
                >
                    No se encontraron stocks
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
                                Producto
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                Cant. Total
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                Cant. Reservada
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                <strong>Cant. Disponible</strong>
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                Estado
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                Última actualización
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((stock) => (
                            <tr
                                key={stock.id_stock}
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
                                    {stock.producto?.nombre || 'N/A'}
                                </td>
                                <td
                                    style={{
                                        padding: 'var(--spacing-sm)',
                                        textAlign: 'center',
                                    }}
                                >
                                    {stock.cantidad_total}
                                </td>
                                <td
                                    style={{
                                        padding: 'var(--spacing-sm)',
                                        textAlign: 'center',
                                        color: 'var(--text-secondary)',
                                    }}
                                >
                                    {stock.cantidad_reservada}
                                </td>
                                <td
                                    style={{
                                        padding: 'var(--spacing-sm)',
                                        textAlign: 'center',
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        color: stock.cantidad_disponible === 0 ? '#dc2626' : '#059669',
                                    }}
                                >
                                    {stock.cantidad_disponible}
                                </td>
                                <td
                                    style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}
                                >
                                    {getEstadoBadge(stock.estado)}
                                </td>
                                <td
                                    style={{
                                        padding: 'var(--spacing-sm)',
                                        textAlign: 'center',
                                        fontSize: '0.875rem',
                                        color: 'var(--text-secondary)',
                                    }}
                                >
                                    {formatFecha(stock.updated_at)}
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
                                            onClick={() => onEdit(stock)}
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
                                        <button
                                            onClick={() => onDelete(stock.id_stock)}
                                            style={{
                                                padding: '0.25rem 0.75rem',
                                                border: 'none',
                                                borderRadius: '4px',
                                                backgroundColor: '#dc2626',
                                                color: 'white',
                                                cursor: 'pointer',
                                                fontSize: '0.875rem',
                                            }}
                                            title="Eliminar"
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

export default StockTable;
