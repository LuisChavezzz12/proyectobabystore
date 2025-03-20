import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DispositivoUsuario.css";

const API_URL = "https://backend-xi-ashen-51.vercel.app"; // URL base de la API

function DispositivosUsuario() {
  const [dispositivos, setDispositivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDispositivos = async () => {
      const userId = localStorage.getItem("userId"); // Obtener userId del almacenamiento local
      if (!userId) {
        setError("No hay usuario autenticado.");
        setLoading(false);
        return;
      }

      try {
        // Obtener dispositivos del usuario
        const response = await axios.get(`${API_URL}/dispositivos/${userId}`);
        setDispositivos(response.data);
      } catch (err) {
        setError("Error al obtener dispositivos.");
      } finally {
        setLoading(false);
      }
    };

    fetchDispositivos();
  }, []);

  const handleConfigurar = (id) => {
    navigate(`/configurar-dispositivo/${id}`);
  };

  const handleAdministrar = (id) => {
    navigate(`/administrar-dispositivo/${id}`);
  };

  return (
    <div id="dispositivos-container">
      <h2 id="dispositivos-titulo">Mis Dispositivos</h2>

      {loading ? (
        <p id="dispositivos-cargando">Cargando dispositivos...</p>
      ) : error ? (
        <p id="dispositivos-error">{error}</p>
      ) : dispositivos.length === 0 ? (
        <p>No tienes dispositivos registrados.</p>
      ) : (
        <table id="dispositivos-tabla">
          <thead>
            <tr>
              <th>Nombre del Producto</th>
              <th>Nombre del Dispositivo</th>
              <th>IP</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dispositivos.map((dispositivo) => (
              <tr key={dispositivo._id}>
                <td>{dispositivo.nombreProducto}</td>
                <td>{dispositivo.nombreDispositivo}</td>
                <td>{dispositivo.ipDispositivo}</td>
                <td>{dispositivo.estado}</td>
                <td>
                  <button
                    id="btn-configurar"
                    className="btn-dispositivo"
                    onClick={() => handleConfigurar(dispositivo._id)}
                  >
                    Configurar
                  </button>
                  <button
                    id="btn-administrar"
                    className="btn-dispositivo"
                    onClick={() => handleAdministrar(dispositivo._id)}
                  >
                    Administrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DispositivosUsuario;
