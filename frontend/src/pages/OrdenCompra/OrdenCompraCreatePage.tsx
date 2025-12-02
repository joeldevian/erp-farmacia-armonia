import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordenCompraService } from '../../services/ordenCompraService';
import { ordenCompraDetalleService } from '../../services/ordenCompraDetalleService';
import { proveedorService } from '../../services/proveedorService';
import { productoService } from '../../services/productoService';
import { almacenService } from '../../services/almacenService';
import type { Proveedor } from '../../types/proveedor';
import type { Producto } from '../../types/producto';
import type { Almacen } from '../../types/almacen';
import './OrdenCompraCreatePage.css';

interface DetalleTemp {
    id_temp: string;
    id_producto: number;
    producto?: Producto;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
}

const OrdenCompraCreatePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [proveedores, setProveedores] = useState<Proveedor[]>([]);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [almacenes, setAlmacenes] = useState<Almacen[]>([]);

    // Datos de la orden
    const [idProveedor, setIdProveedor] = useState('');
    const [idAlmacen, setIdAlmacen] = useState('');
    const [fechaEmision, setFechaEmision] = useState(
        new Date().toISOString().split('T')[0]
    );
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [impuestos, setImpuestos] = useState(0);

    // Detalles
    const [detalles, setDetalles] = useState<DetalleTemp[]>([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState('');
    const [cantidad, setCantidad] = useState(1);
    const [precioUnitario, setPrecioUnitario] = useState(0);

    useEffect(() => {
        loadProveedores();
        loadProductos();
        loadAlmacenes();
    }, []);

    const loadProveedores = async () => {
        try {
            const data = await proveedorService.getProveedores();
            setProveedores(data.filter(p => p.estado === 'activo'));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const loadProductos = async () => {
        try {
            const data = await productoService.getProductos();
            setProductos(data.filter(p => p.estado));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const loadAlmacenes = async () => {
        try {
            const data = await almacenService.getAlmacenes();
            setAlmacenes(data.filter(a => a.estado === 'activo'));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleAgregarProducto = () => {
        if (!productoSeleccionado || cantidad <= 0 || precioUnitario <= 0) {
            setError('Completa todos los campos del producto');
            return;
        }

        const producto = productos.find(p => p.id_producto === Number(productoSeleccionado));
        if (!producto) return;

        // Verificar si ya existe
        if (detalles.some(d => d.id_producto === producto.id_producto)) {
            setError('El producto ya está en la lista');
            return;
        }

        const subtotal = cantidad * precioUnitario;
        const nuevoDetalle: DetalleTemp = {
            id_temp: Date.now().toString(),
            id_producto: producto.id_producto,
            producto,
            cantidad,
            precio_unitario: precioUnitario,
            subtotal,
        };

        setDetalles([...detalles, nuevoDetalle]);
        setProductoSeleccionado('');
        setCantidad(1);
        setPrecioUnitario(0);
        setError(null);
    };

    const handleEliminarDetalle = (id_temp: string) => {
        setDetalles(detalles.filter(d => d.id_temp !== id_temp));
    };

    const calcularSubtotal = () => {
        return detalles.reduce((sum, d) => sum + d.subtotal, 0);
    };

    const calcularTotal = () => {
        return calcularSubtotal() + impuestos;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!idProveedor) {
            setError('Selecciona un proveedor');
            return;
        }

        if (!idAlmacen) {
            setError('Selecciona un almacén de destino');
            return;
        }

        if (detalles.length === 0) {
            setError('Agrega al menos un producto');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Crear la orden
            const ordenData = {
                fecha_emision: fechaEmision,
                fecha_entrega_estimada: fechaEntrega,
                id_proveedor: idProveedor,
                id_almacen: idAlmacen,
                subtotal: calcularSubtotal(),
                impuestos,
                total: calcularTotal(),
                observaciones: observaciones || undefined,
            };

            const ordenCreada = await ordenCompraService.createOrdenCompra(ordenData);

            // Agregar los detalles
            for (const detalle of detalles) {
                await ordenCompraDetalleService.createDetalle({
                    id_orden_compra: ordenCreada.id_orden_compra,
                    id_producto: detalle.id_producto,
                    cantidad: detalle.cantidad,
                    precio_unitario: detalle.precio_unitario,
                });
            }

            // Redirigir al listado
            navigate('/ordenes-compra');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Nueva Orden de Compra</h1>
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => navigate('/ordenes-compra')}
                >
                    Cancelar
                </button>
            </div>

            {error && <div className="alert alert-error">✕ {error}</div>}

            <form onSubmit={handleSubmit}>
                {/* Datos Generales */}
                <div className="content-card">
                    <h2>Datos Generales</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>
                                Proveedor <span className="required">*</span>
                            </label>
                            <select
                                value={idProveedor}
                                onChange={(e) => setIdProveedor(e.target.value)}
                                required
                            >
                                <option value="">Seleccionar proveedor</option>
                                {proveedores.map((p) => (
                                    <option key={p.id_proveedor} value={p.id_proveedor}>
                                        {p.razon_social} - {p.ruc}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>
                                Almacén de Destino <span className="required">*</span>
                            </label>
                            <select
                                value={idAlmacen}
                                onChange={(e) => setIdAlmacen(e.target.value)}
                                required
                            >
                                <option value="">Seleccionar almacén</option>
                                {almacenes.map((a) => (
                                    <option key={a.id_almacen} value={a.id_almacen}>
                                        {a.nombre} ({a.tipo})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>
                                Fecha de Emisión <span className="required">*</span>
                            </label>
                            <input
                                type="date"
                                value={fechaEmision}
                                onChange={(e) => setFechaEmision(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Fecha de Entrega Estimada <span className="required">*</span>
                            </label>
                            <input
                                type="date"
                                value={fechaEntrega}
                                onChange={(e) => setFechaEntrega(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Impuestos (IGV)</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={impuestos}
                                onChange={(e) => setImpuestos(Number(e.target.value))}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Observaciones</label>
                            <textarea
                                value={observaciones}
                                onChange={(e) => setObservaciones(e.target.value)}
                                rows={3}
                            />
                        </div>
                    </div>
                </div>

                {/* Agregar Productos */}
                <div className="content-card">
                    <h2>Agregar Productos</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Producto</label>
                            <select
                                value={productoSeleccionado}
                                onChange={(e) => setProductoSeleccionado(e.target.value)}
                            >
                                <option value="">Seleccionar producto</option>
                                {productos.map((p) => (
                                    <option key={p.id_producto} value={p.id_producto}>
                                        {p.nombre} - {p.codigo_barra}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Cantidad</label>
                            <input
                                type="number"
                                min="1"
                                value={cantidad}
                                onChange={(e) => setCantidad(Number(e.target.value))}
                            />
                        </div>

                        <div className="form-group">
                            <label>Precio Unitario</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0.01"
                                value={precioUnitario}
                                onChange={(e) => setPrecioUnitario(Number(e.target.value))}
                            />
                        </div>

                        <div className="form-group">
                            <label>&nbsp;</label>
                            <button
                                type="button"
                                className="btn-primary"
                                onClick={handleAgregarProducto}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>

                    {/* Lista de Productos */}
                    {detalles.length > 0 && (
                        <div className="detalles-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio Unit.</th>
                                        <th>Subtotal</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detalles.map((detalle) => (
                                        <tr key={detalle.id_temp}>
                                            <td>{detalle.producto?.nombre}</td>
                                            <td>{detalle.cantidad}</td>
                                            <td>S/ {detalle.precio_unitario.toFixed(2)}</td>
                                            <td>S/ {detalle.subtotal.toFixed(2)}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn-sm btn-danger"
                                                    onClick={() => handleEliminarDetalle(detalle.id_temp)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Totales */}
                <div className="content-card totales-card">
                    <div className="totales">
                        <div className="total-row">
                            <span>Subtotal:</span>
                            <span>S/ {calcularSubtotal().toFixed(2)}</span>
                        </div>
                        <div className="total-row">
                            <span>Impuestos:</span>
                            <span>S/ {impuestos.toFixed(2)}</span>
                        </div>
                        <div className="total-row total-final">
                            <span>Total:</span>
                            <span>S/ {calcularTotal().toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Botones */}
                <div className="form-actions">
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => navigate('/ordenes-compra')}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : 'Crear Orden de Compra'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrdenCompraCreatePage;
