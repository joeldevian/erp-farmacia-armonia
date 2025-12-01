import type React from 'react';
import { useState, useEffect } from 'react';
import { productoAlmacenService } from '../../services/productoAlmacenService';
import type { ProductoAlmacen } from '../../types/producto-almacen';

interface StockAlertasProps {
    almacenId?: string;
}

const StockAlertas: React.FC<StockAlertasProps> = ({ almacenId }) => {
    const [productosBajoStock, setProductosBajoStock] = useState<ProductoAlmacen[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProductosBajoStock = async () => {
            try {
                const productos = await productoAlmacenService.getProductosBajoStock(almacenId);
                setProductosBajoStock(productos);
            } catch (error) {
                console.error('Error al cargar productos con bajo stock:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProductosBajoStock();
    }, [almacenId]);

    if (loading) {
        return (
            <div className="content-card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <p style={{ textAlign: 'center', padding: 'var(--spacing-md)' }}>
                    Cargando alertas...
                </p>
            </div>
        );
    }

    if (productosBajoStock.length === 0) {
        return (
            <div
                className="content-card"
                style={{
                    marginBottom: 'var(--spacing-lg)',
                    backgroundColor: '#d1fae5',
                    borderLeft: '4px solid #059669',
                }}
            >
                <div style={{ padding: 'var(--spacing-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>✓</span>
                        <strong style={{ color: '#065f46' }}>
                            Todos los productos tienen stock adecuado
                        </strong>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="content-card"
            style={{
                marginBottom: 'var(--spacing-lg)',
                backgroundColor: '#fef3c7',
                borderLeft: '4px solid #f59e0b',
            }}
        >
            <div style={{ padding: 'var(--spacing-md)' }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: 'var(--spacing-sm)',
                    }}
                >
                    <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                    <strong style={{ color: '#92400e' }}>
                        Productos con Bajo Stock ({productosBajoStock.length})
                    </strong>
                </div>

                <div
                    style={{
                        maxHeight: '200px',
                        overflowY: 'auto',
                        marginTop: 'var(--spacing-sm)',
                    }}
                >
                    {productosBajoStock.map((pa) => {
                        const diferencia = pa.stock_minimo - pa.stock;
                        const porcentaje = (pa.stock / pa.stock_minimo) * 100;

                        let bgColor = '#fef3c7';
                        let textColor = '#92400e';

                        if (porcentaje < 25) {
                            bgColor = '#fee2e2';
                            textColor = '#991b1b';
                        }

                        return (
                            <div
                                key={pa.id_producto_almacen}
                                style={{
                                    padding: 'var(--spacing-sm)',
                                    marginBottom: 'var(--spacing-xs)',
                                    backgroundColor: bgColor,
                                    borderRadius: '4px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <div>
                                    <strong style={{ color: textColor }}>
                                        {pa.producto?.nombre || 'N/A'}
                                    </strong>
                                    {pa.almacen && (
                                        <span
                                            style={{
                                                marginLeft: '0.5rem',
                                                fontSize: '0.875rem',
                                                color: 'var(--text-secondary)',
                                            }}
                                        >
                                            ({pa.almacen.nombre})
                                        </span>
                                    )}
                                    <div style={{ fontSize: '0.875rem', color: textColor }}>
                                        Stock actual: {pa.stock} | Mínimo: {pa.stock_minimo}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        backgroundColor: textColor,
                                        color: 'white',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    Faltan {diferencia}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default StockAlertas;
