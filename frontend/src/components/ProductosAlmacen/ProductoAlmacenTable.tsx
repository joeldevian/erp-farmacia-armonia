import type React from 'react';
import type { ProductoAlmacen } from '../../types/producto-almacen';

interface ProductoAlmacenTableProps {
    productosAlmacen: ProductoAlmacen[];
    onEdit: (productoAlmacen: ProductoAlmacen) => void;
    onDelete: (id: string) => void;
}

const ProductoAlmacenTable: React.FC<ProductoAlmacenTableProps> = ({
    productosAlmacen,
    onEdit,
    onDelete,
}) => {
    const getEstadoBadge = (estado: string) => {
        const colores: Record<string, { bg: string; text: string }> = {
            normal: { bg: '#d1fae5', text: '#065f46' },
            bajo_stock: { bg: '#fef3c7', text: '#92400e' },
            sobre_stock: { bg: '#fee2e2', text: '#991b1b' },
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

    if (productosAlmacen.length === 0) {
        return (
            <div className="content-card">
                <p
                    style={{
                        textAlign: 'center',
                        color: 'var(--text-secondary)',
                        padding: 'var(--spacing-xl)',
                    }}
                >
                    No hay productos asignados a este almacén
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
                                Stock Actual
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                Stock Mínimo
                            </th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                Stock Máximo
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
                        {productosAlmacen.map((pa) => (
                            <tr
                                key={pa.id_producto_almacen}
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
                                    {pa.producto?.nombre || 'N/A'}
                                </td>
                                <td
                                    style={{
                                        padding: 'var(--spacing-sm)',
                                        textAlign: 'center',
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    {pa.stock}
                                </td>
                                <td
                                    style={{
                                        padding: 'var(--spacing-sm)',
                                        textAlign: 'center',
                                        color: 'var(--text-secondary)',
                                    }}
                                >
                                    {pa.stock_minimo}
                                </td>
                                <td
                                    style={{
                                        padding: 'var(--spacing-sm)',
                                        textAlign: 'center',
                                        color: 'var(--text-secondary)',
                                    }}
                                >
                                    {pa.stock_maximo}
                                </td>
                                <td
                                    style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}
                                >
                                    {getEstadoBadge(pa.estado)}
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
                                            onClick={() => onEdit(pa)}
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
                                            onClick={() => onDelete(pa.id_producto_almacen)}
                                            style={{
                                                padding: '0.25rem 0.75rem',
                                                border: 'none',
                                                borderRadius: '4px',
                                                backgroundColor: '#dc2626',
                                                color: 'white',
                                                cursor: 'pointer',
                                                fontSize: '0.875rem',
                                            }}
                                            title="Eliminar asignación"
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

export default ProductoAlmacenTable;
