import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditarProducto = () => {
  const { id } = useParams(); // Obtener el ID del producto de la URL
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    imagen: "",
    nombre: "",
    descripcion: "",
    precio: "",
    descripcionExtra: "",
    caracteristicas: [],
    imagenesAdicionales: [],
  });

  // Obtener los datos del producto al cargar el componente
  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/productos/${id}`
        );
        const data = response.data;
        setProducto(data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        alert("❌ Error al cargar el producto");
      }
    };

    obtenerProducto();
  }, [id]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value,
    });
  };

  // Manejar cambios en las características
  const handleCaracteristicasChange = (e) => {
    const { value } = e.target;
    setProducto({
      ...producto,
      caracteristicas: value.split(", "), // Convertir el texto en un array
    });
  };

  // Manejar cambios en las imágenes adicionales
  const handleImagenesAdicionalesChange = (e) => {
    const { value } = e.target;
    setProducto({
      ...producto,
      imagenesAdicionales: value.split(", "), // Convertir el texto en un array
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/productos/${id}`, producto);
      alert("✅ Producto actualizado correctamente");
      navigate("/dashboard"); // Redirigir al dashboard después de guardar
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("❌ Error al actualizar el producto");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        {/* Campo: Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            required
          />
        </div>

        {/* Campo: Descripción */}
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            className="form-control"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        {/* Campo: Precio */}
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            required
          />
        </div>

        {/* Campo: Descripción Extra */}
        <div className="mb-3">
          <label className="form-label">Descripción Extra</label>
          <input
            type="text"
            className="form-control"
            name="descripcionExtra"
            value={producto.descripcionExtra}
            onChange={handleChange}
            required
          />
        </div>

        {/* Campo: Características */}
        <div className="mb-3">
          <label className="form-label">Características</label>
          <input
            type="text"
            className="form-control"
            value={producto.caracteristicas.join(", ")}
            onChange={handleCaracteristicasChange}
          />
        </div>

        {/* Campo: Imagen del Producto */}
        <div className="mb-3">
          <label className="form-label">Imagen del Producto</label>
          <input
            type="text"
            className="form-control"
            name="imagen"
            value={producto.imagen}
            onChange={handleChange}
            required
          />
        </div>

        {/* Campo: Imágenes Adicionales */}
        <div className="mb-3">
          <label className="form-label">Imágenes Adicionales</label>
          <input
            type="text"
            className="form-control"
            value={producto.imagenesAdicionales.join(", ")}
            onChange={handleImagenesAdicionalesChange}
          />
        </div>

        {/* Botón: Guardar Cambios */}
        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarProducto;
