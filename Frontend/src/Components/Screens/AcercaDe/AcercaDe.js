import React, { useEffect, useState } from "react";
import "./AcercaDe.css";

const AcercaDe = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("https://backend-xi-ashen-51.vercel.app/nosotros"); // Cambia la URL si es necesario
        const data = await response.json();
        setAboutData(data); // Guardar los datos en el estado
      } catch (error) {
        console.error("Error obteniendo los datos:", error);
      }
    };

    fetchAboutData();
  }, []);

  if (!aboutData) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="about-container">
      <header className="about-header">
        <h1>Quiénes somos</h1>
        <p>
          Conoce nuestra historia y lo que nos motiva a ofrecer los mejores
          productos para tu bebé.
        </p>
      </header>

      {/* Misión */}
      <section className="about-description">
        <h2>Misión</h2>
        <p>{aboutData.mision}</p>
      </section>

      {/* Visión */}
      <section className="about-description">
        <h2>Visión</h2>
        <p>{aboutData.vision}</p>
      </section>
            
      {/* Valores */}
      <section className="about-description">
        <h2>Nuestros Valores</h2>
        <ul>
          {aboutData.valores.map((valor, index) => (
            <li key={index}>{valor}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AcercaDe;
