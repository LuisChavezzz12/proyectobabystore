import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./VerProducto.css";

const VerProducto = () => {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(
          `https://backend-xi-ashen-51.vercel.app/productos/${id}`
        );
        setProducto(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error al obtener el producto");
        setLoading(false);
      }
    };

    obtenerProducto();
  }, [id]);

  if (loading) return <div>Cargando detalles del producto...</div>;
  if (error) return <div>{error}</div>;
  if (!producto) return <div>Producto no encontrado.</div>;

  return (
    <div className="ver-producto-container">
      <div className="producto-card">
        <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
        <h2>{producto.nombre}</h2>
        <p className="precio">💰 Precio: ${producto.precio}</p>
        <p className="descripcion">{producto.descripcion}</p>
        <p className="descripcion-extra">{producto.descripcionExtra}</p>
        <h3>Características:</h3>
        <ul>
          {producto.caracteristicas.length > 0 ? (
            producto.caracteristicas.map((caracteristica, index) => (
              <li key={index}>✅ {caracteristica}</li>
            ))
          ) : (
            <li>No hay características disponibles</li>
          )}
        </ul>
        <button className="boton-volver" onClick={() => navigate("/dashboard")}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default VerProducto;
