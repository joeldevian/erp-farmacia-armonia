import type React from 'react';
import { SearchIcon, BellIcon, SettingsIcon } from './Icons';

const Header: React.FC = () => {
    return (
        <header className="header">
            {/* Búsqueda */}
            <div className="header-left">
                <div className="search-box">
                    <SearchIcon className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Buscar medicamentos, clientes, ventas..."
                    />
                </div>
            </div>

            {/* Acciones del usuario */}
            <div className="header-right">
                {/* Notificaciones */}
                <button className="header-icon-btn" title="Notificaciones">
                    <BellIcon />
                    <span className="notification-badge"></span>
                </button>

                {/* Configuración rápida */}
                <button className="header-icon-btn" title="Configuración">
                    <SettingsIcon />
                </button>

                {/* Perfil del usuario */}
                <div className="user-profile">
                    <div className="user-avatar">JA</div>
                    <div className="user-info">
                        <div className="user-name">Joel Admin</div>
                        <div className="user-role">Administrador</div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
