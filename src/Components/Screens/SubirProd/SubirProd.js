import { useState } from "react";
import axios from "axios";
import "../SubirProd/SubirProd.css";

function SubirProducto() {
  const [producto, setProducto] = useState({
    imagen: "",
    nombre: "",
    descripcion: "",
    precio: "",
    descripcionExtra: "",
    caracteristicas: "",
    imagenesAdicionales: "",
  });

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoProducto = {
      ...producto,
      precio: Number(producto.precio),
      caracteristicas: producto.caracteristicas
        .split(",")
        .map((item) => item.trim()),
      imagenesAdicionales: producto.imagenesAdicionales
        .split(",")
        .map((item) => item.trim()),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/productos",
        nuevoProducto
      );
      alert("✅ Producto agregado correctamente");
      console.log(response.data);
      // Limpiar el formulario después de agregar el producto
      setProducto({
        imagen: "",
        nombre: "",
        descripcion: "",
        precio: "",
        descripcionExtra: "",
        caracteristicas: "",
        imagenesAdicionales: "",
      });
    } catch (error) {
      alert("❌ Error al agregar el producto");
      console.error(error);
    }
  };

  return (
    <div className="subir-producto-container">
      <h2>Subir Producto</h2>
      <form onSubmit={handleSubmit} className="subir-producto-form">
        <input
          type="text"
          name="imagen"
          placeholder="URL de la imagen"
          value={producto.imagen}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={producto.descripcion}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={producto.precio}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcionExtra"
          placeholder="Descripción extra"
          value={producto.descripcionExtra}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="caracteristicas"
          placeholder="Características (separadas por comas)"
          value={producto.caracteristicas}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imagenesAdicionales"
          placeholder="Imágenes adicionales (separadas por comas)"
          value={producto.imagenesAdicionales}
          onChange={handleChange}
        />
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}

export default SubirProducto;
