import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function TarjetaProds({
  imagen,
  nombre,
  descripcion,
  precio,
  id,
  descripcionExtra,
  caracteristicas,
  comentarios,
  imagenesAdicionales,
}) {
  return (
    <Card
      style={{
        width: "100%",
        height: "450px",
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px",
        border: "1px solid #e1d4c8",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.07)",
        backgroundColor: "#fffdfb",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.07)";
      }}
    >
      <Card.Img
        variant="top"
        src={imagen}
        alt={nombre}
        style={{
          marginTop: "10px",
          height: "180px",
          objectFit: "contain",
          width: "100%",
        }}
      />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
          paddingBottom: "0",
        }}
      >
        <div>
          <Card.Title
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              color: "#4e2e1c",
              textAlign: "center",
            }}
          >
            {nombre}
          </Card.Title>
          <Card.Text
            style={{
              fontSize: "1rem",
              fontWeight: "500",
              textAlign: "center",
              color: "#7a4e2b",
              marginBottom: "0.4rem",
            }}
          >
            Precio: ${precio}
          </Card.Text>
          <Card.Text
            style={{
              fontSize: "0.95rem",
              textAlign: "center",
              color: "#4d4d4d",
            }}
          >
            {descripcion}
          </Card.Text>
        </div>

        <Link
          to={`/detalle-producto/${id}`}
          state={{
            imagen,
            nombre,
            descripcion,
            precio,
            descripcionExtra,
            caracteristicas: caracteristicas || [],
            comentarios: comentarios || [],
            imagenesAdicionales: Array.isArray(imagenesAdicionales)
              ? imagenesAdicionales
              : [],
          }}
        >
          <Button
            style={{
              marginTop: "20px",
              marginBottom: "10px",
              alignSelf: "center",
              backgroundColor: "#8b4e1f",
              color: "#fff8f0",
              fontWeight: "600",
              border: "none",
              borderRadius: "8px",
              padding: "10px 24px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#6c3b14";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#8b4e1f";
            }}
          >
            Ver Detalles
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default TarjetaProds;
