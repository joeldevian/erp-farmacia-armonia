import type React from 'react';
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
                    <a href="#" className="nav-item active">
                        <HomeIcon className="nav-icon" />
                        <span>Inicio</span>
                    </a>
                    <a href="#" className="nav-item">
                        <DashboardIcon className="nav-icon" />
                        <span>Dashboard</span>
                    </a>
                </div>

                <div className="nav-section">
                    <div className="nav-section-title">Gestión</div>
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
