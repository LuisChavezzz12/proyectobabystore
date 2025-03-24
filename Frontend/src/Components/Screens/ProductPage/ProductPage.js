import React, { useState, useEffect } from "react";
import axios from "axios";
import TarjetaProds from "../../CardProductos/TarjetaProds";
import "../ProductPage/ProductPage.css";

function ProductPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 12;

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

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const productosPaginados = productos.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  );

  const irPaginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const irPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-page-wrapper">
      <div className="tarjeta-prods-grid">
        {productosPaginados.map((producto) => {
          const imagenPrincipal = `https://res.cloudinary.com/dop92wdwk/image/upload/v1741356121/${producto.imagen}`;

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
              imagen={imagenPrincipal}
              imagenesAdicionales={imagenesAdicionalesFormateadas}
            />
          );
        })}
      </div>

      <div className="pagination-container">
        <div className="pagination">
          <button onClick={irPaginaAnterior} disabled={paginaActual === 1}>
            ⬅ Anterior
          </button>
          <span>
            Página {paginaActual} de {totalPaginas}
          </span>
          <button onClick={irPaginaSiguiente} disabled={paginaActual === totalPaginas}>
            Siguiente ➡
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;