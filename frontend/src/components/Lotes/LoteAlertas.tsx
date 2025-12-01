import type React from 'react';
import { useState, useEffect } from 'react';
import { loteService } from '../../services/loteService';
import type { Lote } from '../../types/lote';

const LoteAlertas: React.FC = () => {
    const [lotesProximos, setLotesProximos] = useState<Lote[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLotesProximos();
    }, []);

    const loadLotesProximos = async () => {
        try {
            setLoading(true);
            const lotes = await loteService.getLotesProximosAVencer(30);
            setLotesProximos(lotes);
        } catch (error) {
            console.error('Error al cargar lotes próximos a vencer:', error);
        } finally {
            setLoading(false);
        }
    };

    const calcularDiasParaVencer = (fechaVencimiento: Date | string): number => {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaVenc = new Date(fechaVencimiento);
        fechaVenc.setHours(0, 0, 0, 0);
        const diff = fechaVenc.getTime() - hoy.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const getColorAlerta = (dias: number): { bg: string; text: string } => {
        if (dias < 0) return { bg: '#fee2e2', text: '#991b1b' }; // Rojo - Vencido
        if (dias <= 7) return { bg: '#fef3c7', text: '#92400e' }; // Amarillo - Crítico
        return { bg: '#fed7aa', text: '#9a3412' }; // Naranja - Advertencia
    };

    if (loading) {
        return null;
    }

    if (lotesProximos.length === 0) {
        return null;
    }

    return (
        <div
            style={{
                marginBottom: 'var(--spacing-lg)',
                padding: 'var(--spacing-md)',
                backgroundColor: '#fffbeb',
                border: '1px solid #fbbf24',
                borderRadius: 'var(--border-radius-md)',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--spacing-sm)' }}>
                <svg
                    style={{ width: '24px', height: '24px', color: '#f59e0b' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
                <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: '#92400e' }}>
                    Alertas de Vencimiento
                </h3>
            </div>

            <p style={{ marginBottom: 'var(--spacing-md)', color: '#78350f', fontSize: '0.875rem' }}>
                {lotesProximos.length} lote{lotesProximos.length !== 1 ? 's' : ''} próximo
                {lotesProximos.length !== 1 ? 's' : ''} a vencer
            </p>

            <div style={{ display: 'grid', gap: 'var(--spacing-sm)', maxHeight: '200px', overflowY: 'auto' }}>
                {lotesProximos.map((lote) => {
                    const dias = calcularDiasParaVencer(lote.fecha_vencimiento);
                    const colores = getColorAlerta(dias);

                    return (
                        <div
                            key={lote.id_lote}
                            style={{
                                padding: 'var(--spacing-sm)',
                                backgroundColor: colores.bg,
                                borderRadius: 'var(--border-radius-sm)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div>
                                <p style={{ margin: 0, fontWeight: 500, color: colores.text }}>
                                    {lote.producto?.nombre || 'Producto desconocido'}
                                </p>
                                <p style={{ margin: 0, fontSize: '0.875rem', color: colores.text, opacity: 0.8 }}>
                                    Lote: {lote.codigo_lote} | Cantidad: {lote.cantidad_actual}
                                </p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ margin: 0, fontWeight: 600, color: colores.text }}>
                                    {dias < 0
                                        ? 'VENCIDO'
                                        : dias === 0
                                            ? 'Vence hoy'
                                            : `${dias} día${dias !== 1 ? 's' : ''}`}
                                </p>
                                <p style={{ margin: 0, fontSize: '0.75rem', color: colores.text, opacity: 0.8 }}>
                                    {new Date(lote.fecha_vencimiento).toLocaleDateString('es-ES')}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LoteAlertas;
