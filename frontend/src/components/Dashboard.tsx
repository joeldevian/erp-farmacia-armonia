import type React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className="main-content">
            {/* Bienvenida */}
            <div className="welcome-section">
                <h1 className="welcome-title">Bienvenido al Sistema ERP</h1>
                <p className="welcome-subtitle">
                    Farmacia ARMONÍA - Panel de control y gestión
                </p>
            </div>

            {/* Mensaje de sistema limpio */}
            <div className="content-card">
                <h2 className="card-title">Sistema Configurado</h2>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9375rem',
                    lineHeight: '1.6'
                }}>
                    El sistema ERP está correctamente configurado y listo para usar.
                    Los módulos de gestión estarán disponibles próximamente.
                </p>

                <div style={{
                    marginTop: 'var(--spacing-lg)',
                    padding: 'var(--spacing-lg)',
                    backgroundColor: 'var(--primary-light)',
                    borderRadius: 'var(--border-radius-md)',
                    borderLeft: '4px solid var(--primary-color)'
                }}>
                    <p style={{
                        color: 'var(--primary-dark)',
                        fontWeight: 600,
                        marginBottom: '0.5rem',
                        fontSize: '0.9375rem'
                    }}>
                        ✓ Conexión establecida
                    </p>
                    <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        margin: 0
                    }}>
                        Backend y base de datos funcionando correctamente
                    </p>
                </div>
            </div>

            {/* Próximos módulos */}
            <div className="content-card">
                <h2 className="card-title">Módulos del Sistema</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'var(--spacing-md)'
                }}>
                    {[
                        { name: 'Inventario', desc: 'Gestión de productos' },
                        { name: 'Ventas', desc: 'Registro de ventas' },
                        { name: 'Clientes', desc: 'Base de datos' },
                        { name: 'Proveedores', desc: 'Gestión de proveedores' },
                        { name: 'Reportes', desc: 'Estadísticas y análisis' },
                        { name: 'Configuración', desc: 'Ajustes del sistema' },
                    ].map((module) => (
                        <div
                            key={module.name}
                            style={{
                                padding: 'var(--spacing-md)',
                                backgroundColor: 'var(--bg-main)',
                                borderRadius: 'var(--border-radius-sm)',
                                border: '1px solid var(--border-color)',
                            }}
                        >
                            <p style={{
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                marginBottom: '0.25rem',
                                fontSize: '0.9375rem'
                            }}>
                                {module.name}
                            </p>
                            <p style={{
                                fontSize: '0.8125rem',
                                color: 'var(--text-secondary)',
                                margin: 0
                            }}>
                                {module.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
