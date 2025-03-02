import React from "react";
import "./AcercaDe.css"; // Importa el archivo CSS para darle estilo a esta página.

const AcercaDe = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>Quiénes somos</h1>
        <p>Conoce nuestra historia y lo que nos motiva a ofrecer los mejores productos para tu bebé.</p>
      </header>
      <section className="about-description">
        <h2>Nuestra Historia</h2>
        <p>
          BabyStore nació con la misión de proporcionar a los padres productos innovadores, seguros y cómodos para sus bebés.
          Nos esforzamos por hacer la vida más fácil para las familias con soluciones prácticas y de calidad.
        </p>
      </section>
      <section className="about-mission">
        <h2>Misión</h2>
        <p>
          Ofrecer productos de alta calidad para el bienestar y confort de los bebés, brindando un excelente servicio al cliente.
        </p>
      </section>
      <section className="about-vision">
        <h2>Visión</h2>
        <p>
          Ser la tienda líder en productos para bebés, expandiendo nuestra presencia a nivel internacional y manteniendo los
          estándares más altos de calidad y servicio.
        </p>
      </section>
      <section className="about-values">
        <h2>Nuestros Valores</h2>
        <ul>
          <li>Innovación</li>
          <li>Calidad</li>
          <li>Compromiso con la seguridad</li>
          <li>Servicio al cliente</li>
        </ul>
      </section>
      <section className="about-team">
        <h2>Conoce al equipo</h2>
        <p>Somos un equipo apasionado que trabaja incansablemente para ofrecerte lo mejor.</p>
        <div className="team-members">
          {/* Aquí podrías agregar fotos y descripciones del equipo */}
        </div>
      </section>
      <section className="about-contact">
        <h2>¿Tienes preguntas?</h2>
        <p>No dudes en contactarnos. Estamos aquí para ayudarte en lo que necesites.</p>
        <button>Contáctanos</button>
      </section>
    </div>
  );
};

export default AcercaDe;
