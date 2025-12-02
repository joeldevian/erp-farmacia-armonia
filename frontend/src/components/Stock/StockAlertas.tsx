import type React from 'react';
import { useState, useEffect } from 'react';
import { stockService } from '../../services/stockService';
import type { Stock } from '../../types/stock';

const StockAlertas: React.FC = () => {
    const [stocksSinStock, setStocksSinStock] = useState<Stock[]>([]);
    const [stocksBajoStock, setStocksBajoStock] = useState<Stock[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAlertas = async () => {
            try {
                const [sinStock, bajoStock] = await Promise.all([
                    stockService.getStocksSinStock(),
                    stockService.getStocksBajoStock(),
                ]);
                setStocksSinStock(sinStock);
                setStocksBajoStock(bajoStock);
            } catch (error) {
                console.error('Error al cargar alertas de stock:', error);
            } finally {
                setLoading(false);
            }
        };

        loadAlertas();
    }, []);

    if (loading) {
        return (
            <div className="content-card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <p style={{ textAlign: 'center', padding: 'var(--spacing-md)' }}>
                    Cargando alertas...
                </p>
            </div>
        );
    }

    if (stocksSinStock.length === 0 && stocksBajoStock.length === 0) {
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
        <>
            {/* Alertas de productos sin stock (crítico) */}
            {stocksSinStock.length > 0 && (
                <div
                    className="content-card"
                    style={{
                        marginBottom: 'var(--spacing-lg)',
                        backgroundColor: '#fee2e2',
                        borderLeft: '4px solid #dc2626',
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
                            <span style={{ fontSize: '1.5rem' }}>🚨</span>
                            <strong style={{ color: '#991b1b' }}>
                                Productos Sin Stock ({stocksSinStock.length})
                            </strong>
                        </div>

                        <div
                            style={{
                                maxHeight: '200px',
                                overflowY: 'auto',
                                marginTop: 'var(--spacing-sm)',
                            }}
                        >
                            {stocksSinStock.map((stock) => (
                                <div
                                    key={stock.id_stock}
                                    style={{
                                        padding: 'var(--spacing-sm)',
                                        marginBottom: 'var(--spacing-xs)',
                                        backgroundColor: '#fecaca',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div>
                                        <strong style={{ color: '#991b1b' }}>
                                            {stock.producto?.nombre || 'N/A'}
                                        </strong>
                                        <div style={{ fontSize: '0.875rem', color: '#991b1b' }}>
                                            Total: {stock.cantidad_total} | Reservado:{' '}
                                            {stock.cantidad_reservada}
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            backgroundColor: '#991b1b',
                                            color: 'white',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                        }}
                                    >
                                        AGOTADO
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Alertas de productos con bajo stock */}
            {stocksBajoStock.length > 0 && (
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
                                Productos con Bajo Stock ({stocksBajoStock.length})
                            </strong>
                        </div>

                        <div
                            style={{
                                maxHeight: '200px',
                                overflowY: 'auto',
                                marginTop: 'var(--spacing-sm)',
                            }}
                        >
                            {stocksBajoStock.map((stock) => {
                                const stockMinimo = stock.producto?.stock_minimo || 0;
                                const diferencia = stockMinimo - stock.cantidad_disponible;

                                return (
                                    <div
                                        key={stock.id_stock}
                                        style={{
                                            padding: 'var(--spacing-sm)',
                                            marginBottom: 'var(--spacing-xs)',
                                            backgroundColor: '#fde68a',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div>
                                            <strong style={{ color: '#92400e' }}>
                                                {stock.producto?.nombre || 'N/A'}
                                            </strong>
                                            <div style={{ fontSize: '0.875rem', color: '#92400e' }}>
                                                Disponible: {stock.cantidad_disponible} | Mínimo:{' '}
                                                {stockMinimo}
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '4px',
                                                backgroundColor: '#92400e',
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
            )}
        </>
    );
};

export default StockAlertas;
