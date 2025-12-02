import type React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Home as HomeIcon,
    Pill as PillIcon,
    BarChart3 as ChartIcon,
    FileText as FileTextIcon,
    Settings as SettingsIcon,
    User as UserIcon,
} from 'lucide-react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="sidebar-logo">
                <div className="logo-icon">A</div>
                <div className="logo-text">
                    <div className="logo-title">ARMONÍA</div>
                    <div className="logo-subtitle">Sistema ERP</div>
                </div>
            </div>

            {/* Navegación */}
            <nav className="sidebar-nav">
                <div className="nav-section">
                    <div className="nav-section-title">Principal</div>
                    <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                        <HomeIcon className="nav-icon" />
                        <span>Inicio</span>
                    </Link>
                </div>

                <div className="nav-section">
                    <div className="nav-section-title">Gestión</div>
                    <Link to="/categorias" className={`nav-item ${isActive('/categorias') ? 'active' : ''}`}>
                        <PillIcon className="nav-icon" />
                        <span>Categorías</span>
                    </Link>
                    <Link to="/laboratorios" className={`nav-item ${isActive('/laboratorios') ? 'active' : ''}`}>
                        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 008 10.172V5L7 4z" />
                        </svg>
                        <span>Laboratorios</span>
                    </Link>
                    <Link to="/proveedores" className={`nav-item ${isActive('/proveedores') ? 'active' : ''}`}>
                        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>Proveedores</span>
                    </Link>
                    <Link to="/productos" className={`nav-item ${isActive('/productos') ? 'active' : ''}`}>
                        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span>Productos</span>
                    </Link>
                    <Link to="/lotes" className={`nav-item ${isActive('/lotes') ? 'active' : ''}`}>
                        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Lotes</span>
                    </Link>
                    <Link to="/almacenes" className={`nav-item ${isActive('/almacenes') ? 'active' : ''}`}>
                        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Almacenes</span>
                    </Link>
                    <Link to="/stock" className={`nav-item ${isActive('/stock') ? 'active' : ''}`}>
                        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span>Stock</span>
                    </Link>
                </div>

                <div className="nav-section">
                    <div className="nav-section-title">Reportes</div>
                    <a href="#" className="nav-item">
                        <ChartIcon className="nav-icon" />
                        <span>Estadísticas</span>
                    </a>
                    <a href="#" className="nav-item">
                        <FileTextIcon className="nav-icon" />
                        <span>Informes</span>
                    </a>
                </div>

                <div className="nav-section">
                    <div className="nav-section-title">Configuración</div>
                    <a href="#" className="nav-item">
                        <SettingsIcon className="nav-icon" />
                        <span>Ajustes</span>
                    </a>
                    <a href="#" className="nav-item">
                        <UserIcon className="nav-icon" />
                        <span>Usuarios</span>
                    </a>
                </div>
            </nav>

            {/* Footer - Cerrar sesión */}
            <div className="sidebar-footer">
                <button className="logout-btn">
                    <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Cerrar sesión</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
