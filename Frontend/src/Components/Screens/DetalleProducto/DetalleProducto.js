import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DetalleProducto.css";

function DetalleProducto() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    imagen,
    nombre,
    descripcion,
    precio,
    descripcionExtra,
    caracteristicas,
    imagenesAdicionales,
  } = location.state || {};

  // Asegurarse de que imagenesAdicionales sea un arreglo
  const imagenesAdicionalesArray = Array.isArray(imagenesAdicionales)
    ? imagenesAdicionales
    : [];

  if (!nombre) {
    return <div>Producto no encontrado.</div>;
  }

  const handleRegresar = () => {
    navigate("/inicio");
  };

  return (
    <div className="product-detail-page">
      {/* Imágenes del producto */}
      <div className="product-images">
        {/* Imagen principal */}
        <img
          className="main-image"
          src={imagen} // URL completa de la imagen principal
          alt={nombre}
        />

        {/* Imágenes adicionales */}
        <div className="additional-images">
          {imagenesAdicionalesArray.length > 0 ? (
            imagenesAdicionalesArray.map((img, index) => (
              <img
                key={index}
                src={img} // URL completa de la imagen adicional
                alt={`Imagen adicional ${index + 1}`}
                className="additional-image"
              />
            ))
          ) : (
            <p>No hay imágenes adicionales disponibles.</p>
          )}
        </div>
      </div>

      {/* Información del producto */}
      <div className="product-info">
        <h1>{nombre}</h1>
        <div className="price">Precio: ${precio}</div>
        <div className="description">{descripcion}</div>
        <div className="extended-description">{descripcionExtra}</div>

        <div className="features">
          <h3>Características:</h3>
          <ul>
            {caracteristicas && caracteristicas.length > 0 ? (
              caracteristicas.map((caracteristica, index) => (
                <li key={index}>{caracteristica}</li>
              ))
            ) : (
              <li>No hay características disponibles</li>
            )}
          </ul>
        </div>
        <button className="add-to-cart-button" onClick={handleRegresar}>
          Regresar
        </button>
      </div>
    </div>
  );
}

export default DetalleProducto;
