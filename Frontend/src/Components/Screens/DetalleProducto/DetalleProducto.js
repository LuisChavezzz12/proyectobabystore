import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DetalleProducto.css";

function DetalleProducto() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const {
    imagen,
    nombre,
    descripcion,
    precio,
    descripcionExtra,
    caracteristicas,
    imagenesAdicionales,
  } = location.state || {};

 
  const imagenesAdicionalesArray = Array.isArray(imagenesAdicionales)
    ? imagenesAdicionales
    : [];

  if (!nombre) {
    return <div>Producto no encontrado.</div>;
  }

  const handleRegresar = () => {
    navigate("/productos");
  };

  const handleComprar = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/formulario-compra", { state: { producto: nombre, precio } });
    } else {
      setShowMessage(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <div className="product-detail-page">
      {showMessage && (
        <div className="login-message">
          <p>¡Por favor, inicie sesión!</p>
        </div>
      )}
      <div className="product-images">
        <img
          className="main-image"
          src={imagen}
          alt={nombre}
        />

        <div className="additional-images">
          {imagenesAdicionalesArray.length > 0 ? (
            imagenesAdicionalesArray.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Imagen adicional ${index + 1}`}
                className="additional-image"
              />
            ))
          ) : (
            <p>No hay imágenes adicionales disponibles.</p>
          )}
        </div>
      </div>

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
        
        <button className="buy-now-button" onClick={handleComprar}>
          Comprar
        </button>
      </div>
    </div>
  );
}

export default DetalleProducto;
