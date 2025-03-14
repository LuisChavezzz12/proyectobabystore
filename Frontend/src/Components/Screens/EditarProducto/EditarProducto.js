import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditarProducto.css";

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
    <div className="editar-producto-container">
      <h2 className="titulo">Editar Producto</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <table className="tabla-editar">
          <tbody>
            {/* Fila: Nombre */}
            <tr>
              <td>
                <label className="label">Nombre</label>
              </td>
              <td>
                <input
                  type="text"
                  className="input"
                  name="nombre"
                  value={producto.nombre}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            {/* Fila: Descripción */}
            <tr>
              <td>
                <label className="label">Descripción</label>
              </td>
              <td>
                <input
                  type="text"
                  className="input input-grande" // Aplicamos la clase input-grande
                  name="descripcion"
                  value={producto.descripcion}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            {/* Fila: Precio */}
            <tr>
              <td>
                <label className="label">Precio</label>
              </td>
              <td>
                <input
                  type="number"
                  className="input"
                  name="precio"
                  value={producto.precio}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            {/* Fila: Descripción Extra */}
            <tr>
              <td>
                <label className="label">Descripción Extra</label>
              </td>
              <td>
                <input
                  type="text"
                  className="input input-grande" // Aplicamos la clase input-grande
                  name="descripcionExtra"
                  value={producto.descripcionExtra}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            {/* Fila: Características */}
            <tr>
              <td>
                <label className="label">Características</label>
              </td>
              <td>
                <input
                  type="text"
                  className="input input-grande" // Aplicamos la clase input-grande
                  value={producto.caracteristicas.join(", ")}
                  onChange={handleCaracteristicasChange}
                />
              </td>
            </tr>

            {/* Fila: Imagen del Producto */}
            <tr>
              <td>
                <label className="label">Imagen del Producto</label>
              </td>
              <td>
                <input
                  type="text"
                  className="input"
                  name="imagen"
                  value={producto.imagen}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            {/* Fila: Imágenes Adicionales */}
            <tr>
              <td>
                <label className="label">Imágenes Adicionales</label>
              </td>
              <td>
                <input
                  type="text"
                  className="input input-grande" // Aplicamos la clase input-grande
                  value={producto.imagenesAdicionales.join(", ")}
                  onChange={handleImagenesAdicionalesChange}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Botón: Guardar Cambios */}
        <button type="submit" className="boton-guardar">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarProducto;
