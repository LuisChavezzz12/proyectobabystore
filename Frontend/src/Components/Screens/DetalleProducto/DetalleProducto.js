import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DetalleProducto.css";

function DetalleProducto() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const {
    imagen,
    nombre,
    descripcion,
    precio,
    descripcionExtra,
    caracteristicas,
  } = location.state || {};

  if (!nombre) {
    return <div>Producto no encontrado.</div>;
  }

  const handleAgregarClick = async () => {
    if (!token || !userId) {
      navigate("/login"); // Si el usuario no está logeado, redirigirlo a /login
      return;
    }

    // Mostrar confirmación antes de agregar el dispositivo
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres agregar este dispositivo?"
    );
    if (!confirmar) return;

    try {
      await axios.post(
        "https://backend-xi-ashen-51.vercel.app/dispositivos",
        {
          usuario: userId,
          nombreProducto: nombre,
          nombreDispositivo: "Dispositivo IoT", // Valor por defecto
          ipDispositivo: "0.0.0.0", // Valor por defecto
          idProducto: Math.random().toString(36).substring(7),
          estado: "offline",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMensaje("✅ Dispositivo registrado correctamente.");
      navigate("/dispositivos");
    } catch (error) {
      setMensaje("❌ Error al registrar el dispositivo.");
    }
  };

  return (
    <div className="page-container">
      <nav className="breadcrumb">
        <Link to="/">Inicio</Link> {" > "}
        <Link to="/productos">Productos</Link> {" > "}
        <span>{nombre}</span>
      </nav>

      <div className="product-detail-page">
        {mensaje && <div className="message">{mensaje}</div>}

        <div className="product-content">
          <div className="product-images">
            <img className="main-image" src={imagen} alt={nombre} />
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

            {(nombre === "Cuna inteligente" || nombre === "Mini IoT Led") && (
              <button className="buy-now-button" onClick={handleAgregarClick}>
                Agregar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
