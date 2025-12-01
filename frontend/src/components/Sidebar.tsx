import type React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    DashboardIcon,
    PillIcon,
    ShoppingCartIcon,
    UsersIcon,
    BuildingIcon,
    ChartIcon,
    FileTextIcon,
    SettingsIcon,
    UserIcon,
    LogOutIcon,
} from './Icons';

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
                    <Link to="/" className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
                        <DashboardIcon className="nav-icon" />
                        <span>Dashboard</span>
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
                    <a href="#" className="nav-item">
                        <PillIcon className="nav-icon" />
                        <span>Inventario</span>
                    </a>
                    <a href="#" className="nav-item">
                        <ShoppingCartIcon className="nav-icon" />
                        <span>Ventas</span>
                    </a>
                    <a href="#" className="nav-item">
                        <UsersIcon className="nav-icon" />
                        <span>Clientes</span>
                    </a>
                    <a href="#" className="nav-item">
                        <BuildingIcon className="nav-icon" />
                        <span>Proveedores</span>
                    </a>
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
                    <LogOutIcon className="nav-icon" />
                    <span>Cerrar sesión</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
