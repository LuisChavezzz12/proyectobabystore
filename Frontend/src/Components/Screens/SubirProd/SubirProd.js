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
        "https://backend-xi-ashen-51.vercel.app/productos",
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
        <label htmlFor="imagen">URL de la imagen:</label>
        <input
          type="text"
          id="imagen"
          name="imagen"
          placeholder="URL de la imagen"
          value={producto.imagen}
          onChange={handleChange}
          required
        />

        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={handleChange}
          required
        />

        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          placeholder="Descripción"
          value={producto.descripcion}
          onChange={handleChange}
          required
        />

        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          id="precio"
          name="precio"
          placeholder="Precio"
          value={producto.precio}
          onChange={handleChange}
          required
        />

        <label htmlFor="descripcionExtra">Descripción extra:</label>
        <textarea
          id="descripcionExtra"
          name="descripcionExtra"
          placeholder="Descripción extra"
          value={producto.descripcionExtra}
          onChange={handleChange}
          required
        />

        <label htmlFor="caracteristicas">
          Características (separadas por comas):
        </label>
        <input
          type="text"
          id="caracteristicas"
          name="caracteristicas"
          placeholder="Características"
          value={producto.caracteristicas}
          onChange={handleChange}
        />

        <label htmlFor="imagenesAdicionales">
          Imágenes adicionales (separadas por comas):
        </label>
        <input
          type="text"
          id="imagenesAdicionales"
          name="imagenesAdicionales"
          placeholder="Imágenes adicionales"
          value={producto.imagenesAdicionales}
          onChange={handleChange}
        />

        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}

export default SubirProducto;
