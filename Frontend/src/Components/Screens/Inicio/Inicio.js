import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Imgs/logobabystore.png";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  // Usamos useEffect para obtener los datos del usuario logueado
  useEffect(() => {
    // Obtener el token desde localStorage
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decodificar el token
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        console.log("Decoded Token: ", decodedToken); // Verifica el contenido del token

        // Asignar el nombre del usuario si está en el token
        setUserName(decodedToken.username || "Usuario");  // El nombre ahora estará en decodedToken.nombre
        setLoading(false);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setLoading(false);
      }
    } else {
      setLoading(false); // Si no hay token, simplemente termina la carga
    }
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
            ¡Bienvenido a BabyStore, {userName ? userName : "Visitante"}!

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
