import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Asegúrate de instalar axios
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Imgs/logobabystore.png";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  // Usamos useEffect para obtener los datos del usuario logueado
  useEffect(() => {
    // Aquí debes reemplazar la URL con la ruta de tu backend que retorne los datos del usuario
    axios
      .get("/auth/user")  // Asumiendo que tienes una ruta que devuelve los datos del usuario
      .then((response) => {
        setUserName(response.data.nombre);  // Suponiendo que el nombre del usuario está en 'response.data.nombre'
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Cargando...</div>;  // Opcional: Puedes mostrar un cargando mientras se obtiene el nombre
  }

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f3e5d8, #d2b48c)",
      }}
    >
      <Row className="w-100 justify-content-center">
        <Col
          md={8}
          lg={6}
          className="text-center p-4"
          style={{
            backgroundColor: "#fff",
            borderRadius: "15px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Logo o imagen de bebé */}
          <div className="mb-4">
            <img
              src={logo}
              alt="Logo de bebé"
              style={{ width: "150px", height: "150px" }}
              className="mb-3"
            />
          </div>

          {/* Título de bienvenida */}
          <h1
            style={{
              color: "#8B5E3B",
              fontFamily: "Georgia, serif",
              fontSize: "3rem",
            }}
          >
            ¡Bienvenido a BabyStore, {userName}!
          </h1>

          {/* Mensaje de bienvenida */}
          <p
            style={{
              color: "#6D4C41",
              fontFamily: "Georgia, serif",
              fontSize: "1.2rem",
            }}
          >
            Un lugar lleno de amor, ternura y momentos inolvidables para ti y tu
            bebé.
          </p>

          <div className="mt-5">
            <button
              onClick={() => navigate("/productos")}
              style={{
                backgroundColor: "#A67B5B",
                color: "#fff",
                border: "none",
                borderRadius: "20px",
                padding: "10px 30px",
                fontFamily: "Georgia, serif",
                fontSize: "1.2rem",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#8B5E3B")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#A67B5B")}
            >
              Explora Ahora
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomePage;
