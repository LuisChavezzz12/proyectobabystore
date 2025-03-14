import React, { useEffect, useState } from "react";
import "./AcercaDe.css";

const AcercaDe = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("http://localhost:5000/nosotros"); // Cambia la URL si es necesario
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

      {/* Historia */}
      <section className="about-description">
        <h2>Nuestra Historia</h2>
        <p>{aboutData.historia}</p>
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

      {/* Equipo */}
      <section className="about-team">
        <h2>Conoce al equipo</h2>
        <p>
          Somos un equipo apasionado que trabaja incansablemente para ofrecerte
          lo mejor.
        </p>
        <div className="team-members">
          {aboutData.equipo.map((miembro) => (
            <div className="team-member" key={miembro._id}>
              <img
                src={miembro.imagen || "https://via.placeholder.com/150"} // Enlace a la imagen por defecto
                alt={`Miembro del equipo ${miembro.nombre}`}
                className="team-member-img"
              />
              <h3>{miembro.nombre}</h3>
              <p>Puesto: {miembro.cargo}</p>
              <p>{miembro.descripcion}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AcercaDe;
