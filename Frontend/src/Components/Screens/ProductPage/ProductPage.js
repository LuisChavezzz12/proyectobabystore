import React, { useState, useEffect } from "react";
import axios from "axios";
import TarjetaProds from "../../CardProductos/TarjetaProds";
import "../ProductPage/ProductPage.css";

function ProductPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("https://backend-xi-ashen-51.vercel.app/productos");
        setProductos(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error al cargar los productos");
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-container">
      {productos.map((producto) => {
        // Formatear la URL de la imagen principal
        const imagenPrincipal = `https://res.cloudinary.com/dop92wdwk/image/upload/v1741356121/${producto.imagen}`;

        // Formatear las URLs de las imágenes adicionalesx
        const imagenesAdicionalesFormateadas = producto.imagenesAdicionales
          ? producto.imagenesAdicionales.map(
              (img) => `https://res.cloudinary.com/dop92wdwk/image/upload/v1741356121/${img}`
            )
          : [];

        return (
          <TarjetaProds
            key={producto._id}
            id={producto._id}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            precio={producto.precio}
            descripcionExtra={producto.descripcionExtra}
            caracteristicas={producto.caracteristicas}
            comentarios={producto.comentarios}
            imagen={imagenPrincipal} // URL formateada de la imagen principal
            imagenesAdicionales={imagenesAdicionalesFormateadas} // URLs formateadas de las imágenes adicionales
          />
        );
      })}
    </div>
  );
}

export default ProductPage;