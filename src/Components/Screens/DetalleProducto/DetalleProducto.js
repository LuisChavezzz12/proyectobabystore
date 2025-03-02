import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Importa useNavigate

import "./DetalleProducto.css"; // Asegúrate de importar el CSS aquí

function DetalleProducto() {
  const location = useLocation();
  const navigate = useNavigate(); // Hook para la navegación
  const {
    imagen,
    nombre,
    descripcion,
    precio,
    descripcionExtra,
    caracteristicas,
    comentarios,
    imagenesAdicionales,
  } = location.state || {};

  if (!nombre) {
    return <div>Producto no encontrado.</div>;
  }

  const handleRegresar = () => {
    navigate("/inicio"); // Redirige a /inicio
  };

  return (
    <div className="product-detail-page">
      {/* Imágenes del producto */}
      <div className="product-images">
        <img
          className="main-image"
          src={imagen}
          alt={nombre}
        />
        <div className="additional-images">
          {imagenesAdicionales && imagenesAdicionales.map((img, index) => (
            <img key={index} src={img} alt={`Imagen adicional ${index}`} />
          ))}
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

        <div className="comments">
          <h3>Comentarios:</h3>
          <ul>
            {comentarios && comentarios.length > 0 ? (
              comentarios.map((comentario, index) => (
                <li key={index}>
                  {comentario.texto} - {comentario.usuario}
                </li>
              ))
            ) : (
              <li>No hay comentarios disponibles</li>
            )}
          </ul>
        </div>
        
        <button className="add-to-cart-button" onClick={handleRegresar}>Regresar</button>
      </div>
    </div>
  );
}

export default DetalleProducto;
