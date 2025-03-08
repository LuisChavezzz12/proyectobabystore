import React from "react";
import { useNavigate } from "react-router-dom";
import imgLuis from "../../Imgs/luischavez.jpg";
import "./AcercaDe.css";

const AcercaDe = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <header className="about-header">
        <h1>Quiénes somos</h1>
        <p>
          Conoce nuestra historia y lo que nos motiva a ofrecer los mejores
          productos para tu bebé.
        </p>
      </header>
      <section className="about-description">
        <h2>Nuestra Historia</h2>
        <p>
          BabyStore nació con la misión de proporcionar a los padres productos
          innovadores, seguros y cómodos para sus bebés. Nos esforzamos por
          hacer la vida más fácil para las familias con soluciones prácticas y
          de calidad.
        </p>
      </section>
      <section className="about-team">
        <h2>Conoce al equipo</h2>
        <p>
          Somos un equipo apasionado que trabaja incansablemente para ofrecerte
          lo mejor.
        </p>
        <div className="team-members">
          <div className="team-member">
            <img
              src={imgLuis}
              alt="Miembro del equipo 1"
              className="team-member-img"
            />
            <h3>Luis Jesus Chavez Vargas</h3>
            <p>Puesto: CEO</p>
            <p>Luis es....................</p>
          </div>

          <div className="team-member">
            <img
              src="url-de-imagen-miembro"
              alt="Miembro del equipo 2"
              className="team-member-img"
            />
            <h3>Karla Sofia</h3>
            <p>Puesto: </p>
            <p>Sofia es....................</p>
          </div>

          <div className="team-member">
            <img
              src="url-de-imagen-miembro"
              alt="Miembro del equipo 3"
              className="team-member-img"
            />
            <h3>Karla Yoselin</h3>
            <p>Puesto: </p>
            <p>Yoselin es....................</p>
          </div>
          <div className="team-member">
            <img
              src="url-de-imagen-miembro"
              alt="Miembro del equipo 3"
              className="team-member-img"
            />
            <h3>Jose Antonio</h3>
            <p>Puesto: </p>
            <p>Antonio es....................</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcercaDe;
