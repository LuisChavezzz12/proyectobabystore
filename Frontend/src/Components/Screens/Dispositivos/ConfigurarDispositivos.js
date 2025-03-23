import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ConfigurarDispositivo.css";

const API_URL = "https://backend-xi-ashen-51.vercel.app";

function ConfigurarDispositivo() {
  const { id } = useParams(); // ID del dispositivo
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [ip, setIp] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🆔 ID del dispositivo recibido:", id); // Verificar si el ID es correcto

    const fetchDispositivo = async () => {
      try {
        // 🔹 Usa la URL correcta
        const response = await axios.get(`${API_URL}/dispositivos/dispositivo/${id}`);
        console.log("🔍 Respuesta de la API:", response.data);
        setNombre(response.data.nombreDispositivo || ""); 
        setIp(response.data.ipDispositivo || "");
      } catch (err) {
        console.error("❌ Error al obtener el dispositivo:", err);
        setMensaje("❌ Error al obtener datos del dispositivo.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDispositivo();
  }, [id]);

  const handleGuardar = async () => {
    try {
      await axios.put(`${API_URL}/dispositivos/dispositivo/${id}`, {
        nombreDispositivo: nombre,
        ipDispositivo: ip,
      });
      setMensaje("✅ Dispositivo actualizado correctamente.");
      setTimeout(() => navigate("/dispositivos"), 2000);
    } catch (error) {
      console.error("❌ Error al actualizar el dispositivo:", error);
      setMensaje("❌ Error al actualizar el dispositivo.");
    }
  };

  if (loading) {
    return <p id="configurar-cargando">Cargando datos del dispositivo...</p>;
  }

  return (
    <div id="configurar-container">
      <h2 id="configurar-titulo">Configurar Dispositivo</h2>
      {mensaje && <p id="configurar-mensaje">{mensaje}</p>}

      <label className="configurar-label">Nombre del Dispositivo:</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="configurar-input"
      />

      <button id="btn-guardar" onClick={handleGuardar}>Guardar</button>
    </div>
  );
}

export default ConfigurarDispositivo;
