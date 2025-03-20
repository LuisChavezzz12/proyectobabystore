import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTemperatureHigh, FaWater, FaVolumeUp, FaWalking, FaPlay, FaStop, FaSyncAlt } from "react-icons/fa";
import { MdToys, MdRotateRight } from "react-icons/md";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./ESP32Control.css"

// 🔹 Configuración del WebSocket con IP estática del ESP32
const ESP32_IP = "192.168.149.207"; // 🔹 Asegúrate de poner la IP correcta del ESP32
const WS_URL = `ws://${ESP32_IP}:81/`;

const ESP32Control = () => {
  const [ws, setWs] = useState(null);
  const [data, setData] = useState({
    temperatura: 0,
    humedad: 0,
    sonido: 0,
    presencia: 0,
    player: 0,
  });

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    setWs(socket);

    socket.onopen = () => {
      console.log("✅ Conectado al WebSocket del ESP32");
    };

    socket.onmessage = (event) => {
      try {
        const receivedData = JSON.parse(event.data);
        console.log("📡 Datos recibidos:", receivedData);
        setData(receivedData);
      } catch (error) {
        console.error("⚠ Error al procesar datos WebSocket:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("❌ Error WebSocket:", error);
    };

    socket.onclose = () => {
      console.warn("🔌 WebSocket desconectado");
    };

    return () => socket.close();
  }, []);

  const sendCommand = (command) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(command);
      console.log(`📡 Enviado: ${command}`);
    } else {
      console.error("⚠ WebSocket no conectado");
    }
  };

  return (
    <div className="container-fluid p-4">
      <h2 className="text-center mb-4">📡 Control del ESP32</h2>

      <div className="row">
        {/* Widget de Temperatura */}
        <div className="col-md-4 p-3">
          <div className="card shadow-lg border-0 rounded-lg h-100">
            <h5 className="card-header text-center bg-primary text-white">
              <FaTemperatureHigh size={24} /> Temperatura
            </h5>
            <div className="card-body text-center">
              <CircularProgressbar value={data.temperatura} text={`${data.temperatura}°C`} />
            </div>
          </div>
        </div>

        {/* Widget de Humedad */}
        <div className="col-md-4 p-3">
          <div className="card shadow-lg border-0 rounded-lg h-100">
            <h5 className="card-header text-center bg-info text-white">
              <FaWater size={24} /> Humedad
            </h5>
            <div className="card-body text-center">
              <CircularProgressbar value={data.humedad} text={`${data.humedad}%`} />
            </div>
          </div>
        </div>

        {/* Widget de Sonido */}
        <div className="col-md-4 p-3">
          <div className="card shadow-lg border-0 rounded-lg h-100">
            <h5 className="card-header text-center bg-warning text-dark">
              <FaVolumeUp size={24} /> Nivel de Sonido
            </h5>
            <div className="card-body text-center">
              <CircularProgressbar value={data.sonido} maxValue={3000} text={`${data.sonido}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Widget de Presencia */}
      <div className="row">
        <div className="col-md-6 p-3">
          <div className="card shadow-lg border-0 rounded-lg h-100">
            <h5 className="card-header text-center bg-success text-white">
              <FaWalking size={24} /> Presencia
            </h5>
            <div className="card-body text-center">
              <h4>{data.presencia ? "👤 Detectado" : "🚫 No Detectado"}</h4>
            </div>
          </div>
        </div>

        {/* Widget de Reproductor de Audio */}
        <div className="col-md-6 p-3">
          <div className="card shadow-lg border-0 rounded-lg h-100">
            <h5 className="card-header text-center bg-danger text-white">
              <FaPlay size={24} /> Reproductor de Audio
            </h5>
            <div className="card-body text-center">
              <h4>{data.player ? "🎵 Reproduciendo" : "⏹ Detenido"}</h4>
              <button className="btn btn-success me-2" onClick={() => sendCommand('{"player":"1"}')}>
                <FaPlay /> Play
              </button>
              <button className="btn btn-danger" onClick={() => sendCommand('{"player":"0"}')}>
                <FaStop /> Stop
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controles de Motores */}
      <div className="row mt-4">
        <div className="col-md-6 p-3">
          <div className="card shadow-lg border-0 rounded-lg h-100">
            <h5 className="card-header text-center bg-dark text-white">
              <MdToys size={24} /> Control Carrusel
            </h5>
            <div className="card-body text-center">
              <button className="btn btn-primary me-2" onClick={() => sendCommand('{"carrusel":"1"}')}>
                <MdRotateRight /> Encender
              </button>
              <button className="btn btn-secondary" onClick={() => sendCommand('{"carrusel":"0"}')}>
                <FaSyncAlt /> Apagar
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 p-3">
          <div className="card shadow-lg border-0 rounded-lg h-100">
            <h5 className="card-header text-center bg-secondary text-white">
              <MdToys size={24} /> Control Motor NEMA
            </h5>
            <div className="card-body text-center">
              <button className="btn btn-primary me-2" onClick={() => sendCommand('{"nema":"1"}')}>
                <MdRotateRight /> Encender
              </button>
              <button className="btn btn-secondary" onClick={() => sendCommand('{"nema":"0"}')}>
                <FaSyncAlt /> Apagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESP32Control;
