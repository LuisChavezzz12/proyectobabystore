import React from "react";
import "./ContactoEmpresa.css";

const ContactoEmpresa = () => {
  const lat = 21.156331; // Coordenada de latitud
  const lng = -98.386653; // Coordenada de longitud

  const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div className="contacto-empresa-container">
      <h2>📞 Contacto</h2>

      <div className="info-contacto">
        <p>
          🏢 <strong>Nombre de la empresa:</strong> BabyCare Store
        </p>
        <p>
          📍 <strong>Dirección:</strong> Todos Por Hidalgo, Cachapala 77B, Huejutla de reyes. Hidalgo
        </p>
        <p>
          🌍 <strong>Ubicación en Google Maps:</strong>
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link-maps"
          >
            Ver en el mapa
          </a>
        </p>
        <p>
          📲 <strong>Teléfono:</strong> +52 773 385 5315
        </p>
        <p>
          📧 <strong>Correo electrónico:</strong>{" "}
          chavezvargasluisjesus@gmail.com
        </p>
        <p>
          🕒 <strong>Horario de atención:</strong> Lunes a Viernes de 9:00 AM a
          6:00 PM
        </p>
      </div>
      <h3>🗺️ Ubicación</h3>
      <div className="mapa-container">
        <iframe
          title="Ubicación de la empresa"
          src={`https://maps.google.com/maps?q=${lat},${lng}&z=17&output=embed`} // Mapa embebido
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactoEmpresa;
