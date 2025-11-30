import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CategoriasPage from './pages/Categorias/CategoriasPage';
import LaboratoriosPage from './pages/Laboratorios/LaboratoriosPage';
import ProductosPage from './pages/Productos/ProductosPage';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app-layout">
                <Sidebar />
                <div className="main-wrapper">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/categorias" element={<CategoriasPage />} />
                        <Route path="/laboratorios" element={<LaboratoriosPage />} />
                        <Route path="/productos" element={<ProductosPage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
