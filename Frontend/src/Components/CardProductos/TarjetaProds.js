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
        height: "450px", // Altura fija para la tarjeta
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px", // Añadir separación entre las tarjetas
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
          flexGrow: 1, // Esto asegura que el contenido ocupe el espacio disponible
        }}
      >
        <div>
          <Card.Title>{nombre}</Card.Title>
          <Card.Text>Precio: ${precio}</Card.Text>
          <Card.Text>{descripcion}</Card.Text>
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
            variant="primary"
            style={{
              marginTop: "20px",
              marginBottom: "10px",
              alignSelf: "center",
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
