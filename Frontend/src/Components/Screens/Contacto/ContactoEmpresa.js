import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ContactoEmpresa.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const ContactoEmpresa = () => {
  const [contacto, setContacto] = useState(null);
  const [loading, setLoading] = useState(true);

  // Coordenadas fijas de la empresa
  const empresaCoords = [21.15643826033455, -98.38639354668986];

  // Ícono personalizado
  const iconoPersonalizado = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [32, 32],
  });

  useEffect(() => {
    axios
      .get("https://backend-xi-ashen-51.vercel.app/contacto")
      .then((response) => {
        setContacto(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando datos de contacto...</p>;
  if (!contacto) return <p>No se encontraron datos de contacto.</p>;

  return (
    <div className="contacto-empresa-container">
      <h2>📞 Información de Contacto</h2>

      <div className="info-contacto">
        <p>
          🏢 <strong>Nombre de la empresa:</strong> {contacto.nombreEmpresa}
        </p>
        <p>
          📍 <strong>Dirección:</strong> {contacto.direccion}
        </p>
        <p>
          📲 <strong>Teléfono:</strong> {contacto.telefono}
        </p>
        <p>
          📧 <strong>Correo electrónico:</strong> {contacto.correo}
        </p>

        <h3>🕒 Horarios de Atención</h3>
        <ul>
          <li>
            <strong>Lunes a Viernes:</strong>{" "}
            {contacto.horarios_atencion.lunes_viernes}
          </li>
          <li>
            <strong>Sábado:</strong> {contacto.horarios_atencion.sabado}
          </li>
          <li>
            <strong>Domingo:</strong> {contacto.horarios_atencion.domingo}
          </li>
        </ul>

        <h3>🌍 Redes Sociales</h3>
        <ul>
          <li>
            📘{" "}
            <a
              href={contacto.redes_sociales.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            📸{" "}
            <a
              href={contacto.redes_sociales.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>

      <div className="mapa-preview">
        <h3>🗺️ Ubicación</h3>
        <MapContainer
          center={empresaCoords}
          zoom={26}
          style={{ height: "300px", width: "100%", borderRadius: "10px" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={empresaCoords} icon={iconoPersonalizado}>
            <Popup>📍 Aquí se encuentra la empresa</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default ContactoEmpresa;
