import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaTemperatureHigh,
  FaWater,
  FaVolumeUp,
  FaWalking,
  FaForward,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./ESP32Control.css";

const ESP32_IP = "192.168.1.67";
const WS_URL = `ws://${ESP32_IP}:81/`;

const ESP32Control = () => {
  const [ws, setWs] = useState(null);
  const [data, setData] = useState({ temperatura: 0, humedad: 0, sonido: 0, presencia: 0, player: 0 });
  const [carrusel, setCarrusel] = useState(false);
  const [nema, setNema] = useState(false);
  const [playerOn, setPlayerOn] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    setWs(socket);
    socket.onopen = () => console.log("✅ Conectado al WebSocket del ESP32");
    socket.onmessage = (event) => {
      try {
        const receivedData = JSON.parse(event.data);
        console.log("📡 Datos recibidos:", receivedData);
        setData(receivedData);
      } catch (error) {
        console.error("⚠ Error al procesar datos WebSocket:", error);
      }
    };
    socket.onerror = (error) => console.error("❌ Error WebSocket:", error);
    socket.onclose = () => console.warn("🔌 WebSocket desconectado");
    return () => socket.close();
  }, []);

  const updateESP32 = (newStates = {}) => {
    const updated = {
      carrusel: newStates.carrusel !== undefined ? newStates.carrusel : carrusel,
      nema: newStates.nema !== undefined ? newStates.nema : nema,
      player: newStates.player !== undefined ? newStates.player : playerOn,
    };
    setCarrusel(updated.carrusel);
    setNema(updated.nema);
    setPlayerOn(updated.player);
    const command = JSON.stringify({
      carrusel: updated.carrusel ? "1" : "0",
      nema: updated.nema ? "1" : "0",
      player: updated.player ? "1" : "0",
    });
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(command);
      console.log("📡 Enviado:", command);
    }
  };

  const sendPlayerCommand = (command) => {
    const fullCommand = {
      carrusel: carrusel ? "1" : "0",
      nema: nema ? "1" : "0",
      player: playerOn ? "1" : "0",
      ...command,
    };
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(fullCommand));
      console.log("🎵 Enviado comando:", fullCommand);
    }
  };

  return (
    <div className="esp32-container">
      <h2 className="title">📡 Panel de Control Inteligente</h2>

      <div className="widgets">
        <div className="widget temperature">
          <h5><FaTemperatureHigh /> Temperatura</h5>
          <CircularProgressbar
            value={data.temperatura}
            text={`${data.temperatura}°C`}
            styles={buildStyles({ textColor: '#fff', pathColor: '#ff4b4b', trailColor: '#222' })}
          />
        </div>
        <div className="widget humidity">
          <h5><FaWater /> Humedad</h5>
          <CircularProgressbar
            value={data.humedad}
            text={`${data.humedad}%`}
            styles={buildStyles({ textColor: '#fff', pathColor: '#4bc0ff', trailColor: '#222' })}
          />
        </div>
        <div className="widget sound">
          <h5><FaVolumeUp /> Sonido</h5>
          <CircularProgressbar
            value={data.sonido}
            maxValue={3000}
            text={`${data.sonido}`}
            styles={buildStyles({ textColor: '#fff', pathColor: '#ffc107', trailColor: '#222' })}
          />
        </div>
      </div>

      <div className="status-section">
        <h4><FaWalking /> Presencia: {data.presencia ? "👤 Detectado" : "🚫 No Detectado"}</h4>
      </div>

      <div className="control-buttons">
        <button className={playerOn ? "btn-toggle active" : "btn-toggle"} onClick={() => updateESP32({ player: !playerOn })}>
          {playerOn ? "🔴 Detener Música" : "▶️ Reproducir Música"}
        </button>
        <button className="btn-action" onClick={() => sendPlayerCommand({ vol_up: "1" })}><FaPlus /> Vol +</button>
        <button className="btn-action" onClick={() => sendPlayerCommand({ vol_down: "1" })}><FaMinus /> Vol -</button>
        <button className="btn-action" onClick={() => sendPlayerCommand({ next: "1" })}><FaForward /> Siguiente</button>
      </div>

      <div className="motor-buttons">
        <button className={carrusel ? "btn-toggle active" : "btn-toggle"} onClick={() => updateESP32({ carrusel: !carrusel })}>
          {carrusel ? "🌀 Detener Carrusel" : "🌀 Iniciar Carrusel"}
        </button>
        <button className={nema ? "btn-toggle active" : "btn-toggle"} onClick={() => updateESP32({ nema: !nema })}>
          {nema ? "⚙️ Detener NEMA" : "⚙️ Iniciar NEMA"}
        </button>
      </div>
    </div>
  );
};

export default ESP32Control;
