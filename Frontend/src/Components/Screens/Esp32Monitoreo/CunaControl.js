import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./CunaControl.css";

const API_URL = "https://backend-xi-ashen-51.vercel.app";

const CunaControl = () => {
  const [soundLevel, setSoundLevel] = useState(20);
  const [status, setStatus] = useState("Tranquilo");
  const [estado, setEstado] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const nombreDispositivo =
    location.state?.nombreDispositivo || "Tu dispositivo";

  const fetchEstado = async () => {
    try {
      const res = await axios.get(`${API_URL}/estado/cuna_unica`);
      setEstado(res.data);
      if (res.data && res.data.sonido) {
        const valorSonido = res.data.sonido;
        let nuevoEstado = "Tranquilo";
        if (valorSonido > 2800) nuevoEstado = "Llorando";
        else if (valorSonido > 1500) nuevoEstado = "Activo";
        else nuevoEstado = "Tranquilo";

        setSoundLevel(valorSonido / 100); // Normalizamos a escala 0-100
        setStatus(nuevoEstado);
      }
    } catch (err) {
      console.error("❌ Error al obtener estado:", err);
    } finally {
      setLoading(false);
    }
  };

  const enviarComando = async (topic, payload) => {
    try {
      await axios.post(`${API_URL}/mqtt/enviar`, {
        topic,
        ...payload,
      });
      fetchEstado();
    } catch (err) {
      console.error("❌ Error al enviar comando:", err);
    }
  };

  const toggleActuador = (actuador, estadoActual) => {
    enviarComando(`esp32/${actuador}/control`, {
      dispositivo: "cuna_unica",
      valor: estadoActual === "1" ? 0 : 1,
    });
  };

  const toggleReproductor = () => {
    if (!estado) return;
    const nuevoValor = estado.reproductor === "1" ? 0 : 1;
    enviarComando("esp32/reproductor/control", {
      dispositivo: "cuna_unica",
      valor: nuevoValor,
    });
  };

  const comandoReproductor = (accion) => {
    const mapeoAcciones = {
      subir: "volumen_up",
      bajar: "volumen_down",
      siguiente: "next",
    };
    const accionReal = mapeoAcciones[accion] || accion;

    enviarComando("esp32/reproductor/comando", {
      dispositivo: "cuna_unica",
      accion: accionReal,
    });
  };

  useEffect(() => {
    fetchEstado();
    const interval = setInterval(fetchEstado, 3000);
    return () => clearInterval(interval);
  }, []);

  const soundHeight = (soundLevel / 100) * 100;

  const getStatusColor = (status) => {
    if (status === "Tranquilo") return "#2ecc71";
    if (status === "Activo") return "#f39c12";
    return "#e74c3c";
  };

  const statusColor = getStatusColor(status);

  const getTempColor = (temp) => {
    if (!temp) return "#00BFFF";
    if (temp <= 20) return "#00BFFF";
    if (temp <= 26) return "#00FF7F";
    if (temp <= 40) return "#FFA500";
    return "#FF4500";
  };

  if (loading) return <div className="loading-message">Cargando...</div>;

  return (
    <div className="baby-monitor-container">
      <h1 className="main-title">Monitor de Bebé y Control de Cuna</h1>
      <p className="bienvenida-texto">
        👋 ¡Bienvenido al control del dispositivo{" "}
        <strong>{nombreDispositivo}</strong>!
      </p>

      <div className="monitor-grid">
        <div className="monitor-card">
          <h2 className="card-title">Monitor de Sonido del Bebé</h2>
          <div className="status-display">
            <span className="status-label">Estado: </span>
            <span className="status-value" style={{ color: statusColor }}>
              {status}
            </span>
          </div>

          <div className="sound-visualizer">
            <div className="sound-bars">
              {[...Array(20)].map((_, i) => {
                const barHeight = soundHeight - Math.abs(i - 10) * 5;
                const barActive = barHeight > 0;
                let barColor = "#222";

                if (barActive) {
                  if (soundLevel < 30) barColor = "#2ecc71";
                  else if (soundLevel < 60) barColor = "#f39c12";
                  else barColor = "#e74c3c";
                }

                return (
                  <div
                    key={i}
                    className="sound-bar"
                    style={{
                      height: `${Math.max(barHeight, 4)}%`,
                      backgroundColor: barColor,
                      opacity: barActive ? 1 : 0.3,
                    }}
                  ></div>
                );
              })}
            </div>
            <div className="state-indicators">
              <div className="indicator crying">Llorando</div>
              <div className="indicator active">Activo</div>
              <div className="indicator calm">Tranquilo</div>
              <div className="indicator silent">Silencio</div>
            </div>
            {status === "Llorando" && (
              <div className="cry-animation">
                <div className="pulse-outer"></div>
                <div className="pulse-inner"></div>
              </div>
            )}
          </div>

          <div className="sound-level">
            <div className="decibel-value" style={{ color: statusColor }}>
              {Math.round(soundLevel)} dB
            </div>
            <div className="status-description">
              {soundLevel < 30
                ? "El bebé está tranquilo"
                : soundLevel < 60
                ? "El bebé está haciendo algunos sonidos"
                : "El bebé está llorando"}
            </div>
          </div>

          <div className="emoji-status">
            {status === "Tranquilo" && <div className="emoji sleeping">😴</div>}
            {status === "Activo" && <div className="emoji active">🙂</div>}
            {status === "Llorando" && <div className="emoji crying">😢</div>}
          </div>
        </div>

        <div className="monitor-card">
          <h2 className="card-title">Control de la Cuna</h2>
          {estado ? (
            <>
              <div className="sensors-grid">
                <div className="sensor-box">
                  <div className="sensor-title">🌡 Temperatura</div>
                  <div className="thermometer">
                    <div
                      className="thermometer-fill"
                      style={{
                        height: `${Math.min(
                          (estado.temperatura / 40) * 100,
                          100
                        )}%`,
                        backgroundColor: getTempColor(estado.temperatura),
                      }}
                    ></div>
                    <div
                      className="thermometer-bulb"
                      style={{
                        backgroundColor: getTempColor(estado.temperatura),
                      }}
                    ></div>
                  </div>
                  <div className="sensor-value">
                    {estado.temperatura?.toFixed(1) || "--"}°C
                  </div>
                </div>

                <div className="sensor-box">
                  <div className="sensor-title">💧 Humedad</div>
                  <div className="humidity-display">
                    <div className="humidity-icon">💧</div>
                  </div>
                  <div className="sensor-value">{estado.humedad || "--"}%</div>
                </div>

                <div className="sensor-box sound-status">
                  <div className="sensor-title">🔊 Sonido</div>
                  <div className="sound-state">
                    {estado.sonido > 2700
                      ? "🍼 ¡Bebé despierto!"
                      : "😴 Bebé tranquilo"}
                  </div>
                </div>
              </div>

              <div className="actuators-grid">
                <button
                  className={`actuator-btn ${
                    estado.carrusel === "1" ? "active" : ""
                  }`}
                  onClick={() => toggleActuador("carrusel", estado.carrusel)}
                >
                  <div className="actuator-icon">🧸</div>
                  <div className="actuator-name">Carrusel</div>
                  <div className="actuator-state">
                    {estado.carrusel === "1" ? "Encendido" : "Apagado"}
                  </div>
                </button>

                <button
                  className={`actuator-btn ${
                    estado.nema === "1" ? "active" : ""
                  }`}
                  onClick={() => toggleActuador("nema", estado.nema)}
                >
                  <div className="actuator-icon">🛏</div>
                  <div className="actuator-name">Mecer Cuna</div>
                  <div className="actuator-state">
                    {estado.nema === "1" ? "En movimiento" : "Detenido"}
                  </div>
                </button>

                <button
                  className={`actuator-btn ${
                    estado.reproductor === "1" ? "active" : ""
                  }`}
                  onClick={toggleReproductor}
                >
                  <div className="actuator-icon">🎵</div>
                  <div className="actuator-name">Música</div>
                  <div className="actuator-state">
                    {estado.reproductor === "1" ? "Reproduciendo" : "Detenida"}
                  </div>
                </button>
              </div>

              <div className="music-player">
                <h3 className="player-title">🎵 Reproducir Música</h3>
                <div className="player-controls">
                  <button
                    className="control-btn"
                    onClick={() => comandoReproductor("bajar")}
                  >
                    🔉
                  </button>
                  <button
                    className="control-btn play"
                    onClick={toggleReproductor}
                  >
                    {estado.reproductor === "1" ? "⏸" : "▶"}
                  </button>
                  <button
                    className="control-btn"
                    onClick={() => comandoReproductor("siguiente")}
                  >
                    ⏭
                  </button>
                  <button
                    className="control-btn"
                    onClick={() => comandoReproductor("subir")}
                  >
                    🔊
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="error-message">
              Error al cargar datos de la cuna
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CunaControl;
