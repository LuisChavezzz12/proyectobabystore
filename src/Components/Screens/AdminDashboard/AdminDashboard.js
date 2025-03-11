import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    imagen: '',
    nombre: '',
    descripcion: '',
    precio: '',
    descripcionExtra: '',
    caracteristicas: [],
    imagenesAdicionales: []
  });
  const navigate = useNavigate();

  // Obtener productos al cargar el componente
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/productos');
        setProductos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener productos", error);
      }
    };
    obtenerProductos();
  }, []);

  // Función para manejar el cambio de estado en el formulario de agregar producto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Agregar un nuevo producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/productos', newProduct);
      alert(response.data.message);
      setProductos([...productos, response.data.producto]);
      setNewProduct({
        imagen: '',
        nombre: '',
        descripcion: '',
        precio: '',
        descripcionExtra: '',
        caracteristicas: [],
        imagenesAdicionales: []
      });
    } catch (error) {
      console.error("Error al agregar el producto", error);
      alert("Hubo un error al agregar el producto");
    }
  };

  // Editar producto
  const handleEdit = (productoId) => {
    navigate(`/editar-producto/${productoId}`);
  };

  // Eliminar producto
  const handleDelete = async (productoId) => {
    try {
      const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
      if (!confirmar) return;

      await axios.delete(`http://localhost:5000/productos/${productoId}`);
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

      <h3 className="form-title">Agregar Producto</h3>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          className="input"
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={newProduct.nombre}
          onChange={handleInputChange}
          required
        />
        <textarea
          className="textarea"
          name="descripcion"
          placeholder="Descripción"
          value={newProduct.descripcion}
          onChange={handleInputChange}
          required
        />
        <input
          className="input"
          type="number"
          name="precio"
          placeholder="Precio"
          value={newProduct.precio}
          onChange={handleInputChange}
          required
        />
        <textarea
          className="textarea"
          name="descripcionExtra"
          placeholder="Descripción Extra"
          value={newProduct.descripcionExtra}
          onChange={handleInputChange}
          required
        />
        <input
          className="input"
          type="text"
          name="imagen"
          placeholder="URL de Imagen"
          value={newProduct.imagen}
          onChange={handleInputChange}
          required
        />
        <button className="submit-button" type="submit">Agregar Producto</button>
      </form>

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
                <td>{producto.precio}</td>
                <td>{producto.descripcion}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(producto._id)}>Editar</button>
                  <button className="delete-button" onClick={() => handleDelete(producto._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
