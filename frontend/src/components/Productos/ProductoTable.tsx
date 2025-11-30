import type React from 'react';
import type { Producto } from '../../types/producto';

interface ProductoTableProps {
    productos: Producto[];
    onEdit: (producto: Producto) => void;
    onDelete: (id: number) => void;
    onHardDelete: (id: number) => void;
}

const ProductoTable: React.FC<ProductoTableProps> = ({
    productos,
    onEdit,
    onDelete,
    onHardDelete,
}) => {
    if (productos.length === 0) {
        return (
            <div className="content-card">
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: 'var(--spacing-xl)' }}>
                    No se encontraron productos
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
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'left' }}>Nombre</th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'left' }}>Código</th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'left' }}>Tipo</th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'left' }}>Categoría</th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'left' }}>Laboratorio</th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>Stock Min</th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>Stock Max</th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>Receta</th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>Estado</th>
                            <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr
                                key={producto.id_producto}
                                style={{
                                    borderBottom: '1px solid var(--border-color)',
                                    transition: 'background-color 0.2s',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                                <td style={{ padding: 'var(--spacing-sm)' }}>{producto.id_producto}</td>
                                <td style={{ padding: 'var(--spacing-sm)', fontWeight: 500 }}>{producto.nombre}</td>
                                <td style={{ padding: 'var(--spacing-sm)', fontFamily: 'monospace' }}>
                                    {producto.codigo_interno}
                                </td>
                                <td style={{ padding: 'var(--spacing-sm)' }}>
                                    <span
                                        style={{
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            fontSize: '0.875rem',
                                            backgroundColor:
                                                producto.tipo_producto === 'medicamento'
                                                    ? '#dbeafe'
                                                    : producto.tipo_producto === 'insumo'
                                                        ? '#fef3c7'
                                                        : producto.tipo_producto === 'higiene'
                                                            ? '#d1fae5'
                                                            : '#e0e7ff',
                                            color:
                                                producto.tipo_producto === 'medicamento'
                                                    ? '#1e40af'
                                                    : producto.tipo_producto === 'insumo'
                                                        ? '#92400e'
                                                        : producto.tipo_producto === 'higiene'
                                                            ? '#065f46'
                                                            : '#3730a3',
                                        }}
                                    >
                                        {producto.tipo_producto}
                                    </span>
                                </td>
                                <td style={{ padding: 'var(--spacing-sm)' }}>
                                    {producto.categoria?.nombre || '-'}
                                </td>
                                <td style={{ padding: 'var(--spacing-sm)' }}>
                                    {producto.laboratorio?.nombre || '-'}
                                </td>
                                <td style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                    {producto.stock_minimo}
                                </td>
                                <td style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                    {producto.stock_maximo}
                                </td>
                                <td style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                    {producto.requiere_receta ? '✓' : '✗'}
                                </td>
                                <td style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                    <span
                                        style={{
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            fontSize: '0.875rem',
                                            backgroundColor: producto.estado ? '#d1fae5' : '#fee2e2',
                                            color: producto.estado ? '#065f46' : '#991b1b',
                                        }}
                                    >
                                        {producto.estado ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                        <button
                                            onClick={() => onEdit(producto)}
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
                                        {producto.estado ? (
                                            <button
                                                onClick={() => onDelete(producto.id_producto)}
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
                                                onClick={() => onHardDelete(producto.id_producto)}
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

export default ProductoTable;
