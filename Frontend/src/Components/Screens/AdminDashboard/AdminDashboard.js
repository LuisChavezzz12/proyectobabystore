import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const CLOUDINARY_URL_BASE = "https://res.cloudinary.com/dop92wdwk/image/upload/v1741631709/";

const AdminDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const navigate = useNavigate();

  // Obtener productos y agregar la URL completa de Cloudinary
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get("https://backend-xi-ashen-51.vercel.app/productos");

        // Transformar la imagen almacenada en la BD en una URL completa de Cloudinary
        const productosConImagenes = response.data.map(producto => ({
          ...producto,
          imagen: `${CLOUDINARY_URL_BASE}${producto.imagen}`
        }));

        setProductos(productosConImagenes);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener productos", error);
      }
    };
    obtenerProductos();
  }, []);

  // Abrir el modal con los detalles del producto
  const handleView = (producto) => {
    setProductoSeleccionado(producto);
    setModalAbierto(true);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setModalAbierto(false);
    setProductoSeleccionado(null);
  };

  // Editar producto
  const handleEdit = (productoId) => {
    navigate(`/editar-producto/${productoId}`);
  };

  // Eliminar producto
  const handleDelete = async (productoId) => {
    try {
      const confirmar = window.confirm(
        "¿Estás seguro de que deseas eliminar este producto?"
      );
      if (!confirmar) return;

      await axios.delete(`https://backend-xi-ashen-51.vercel.app/productos/${productoId}`);
      setProductos(productos.filter((producto) => producto._id !== productoId));
      alert("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el producto", error);
      alert("Hubo un error al eliminar el producto");
    }
  };

  return (
    <div>
      <h2 className="dashboard-title">Dashboard de Administración de Productos</h2>

      <h3 className="form-title">Lista de Productos</h3>
      {loading ? (
        <p className="loading-text">Cargando productos...</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto._id}>
                <td>{producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>{producto.descripcion}</td>
                <td>
                  <button className="view-button" onClick={() => handleView(producto)}>
                    Ver
                  </button>
                  <button className="edit-button" onClick={() => handleEdit(producto._id)}>
                    Editar
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(producto._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal para ver detalles */}
      {modalAbierto && productoSeleccionado && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>X</button>
            <h2>{productoSeleccionado.nombre}</h2>
            <img src={productoSeleccionado.imagen} alt={productoSeleccionado.nombre} className="modal-image"/>
            <p><strong>Precio:</strong> ${productoSeleccionado.precio}</p>
            <p><strong>Descripción:</strong> {productoSeleccionado.descripcion}</p>
            <p><strong>Descripción Extra:</strong> {productoSeleccionado.descripcionExtra}</p>
            <h3>Características:</h3>
            <ul>
              {productoSeleccionado.caracteristicas.length > 0 ? (
                productoSeleccionado.caracteristicas.map((caracteristica, index) => (
                  <li key={index}>✅ {caracteristica}</li>
                ))
              ) : (
                <li>No hay características disponibles</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
