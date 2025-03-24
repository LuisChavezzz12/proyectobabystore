import { useState } from "react";
import axios from "axios";
import "./SubirProd.css";
import Cloudinary from "../../Cloudinary/cloudinary";

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

  const [mostrarCloudinary, setMostrarCloudinary] = useState(false);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(producto.precio) < 0) {
      alert("❌ El precio no puede ser negativo");
      return;
    }

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
        {/* Columna 1 */}
        <div>
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

          <button
            type="button"
            className="toggle-cloudinary-button"
            onClick={() => setMostrarCloudinary(!mostrarCloudinary)}
          >
            {mostrarCloudinary
              ? "Ocultar subir imagen"
              : "Subir imagen con Cloudinary"}
          </button>

          {mostrarCloudinary && (
            <Cloudinary
              onImageUpload={(publicId) =>
                setProducto({ ...producto, imagen: publicId })
              }
            />
          )}

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
        </div>

        {/* Columna 2 */}
        <div>
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            placeholder="Precio"
            value={producto.precio}
            onChange={handleChange}
            required
            min="0"
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
            placeholder="Ej: Liviana, Compacta, Inteligente"
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
            placeholder="URLs separadas por coma"
            value={producto.imagenesAdicionales}
            onChange={handleChange}
          />
        </div>

        {/* Botón enviar */}
        <div className="boton-submit">
          <button type="submit">Agregar Producto</button>
        </div>
      </form>
    </div>
  );
}

export default SubirProducto;
