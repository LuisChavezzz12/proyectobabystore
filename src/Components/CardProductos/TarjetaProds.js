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
          to={`/product/${id}`}
          state={{
            imagen,
            nombre,
            descripcion,
            precio,
            descripcionExtra,
            caracteristicas: caracteristicas || [],  // Asegurarse de que sea un arreglo
            comentarios: comentarios || [],  // Asegurarse de que sea un arreglo
            imagenesAdicionales: imagenesAdicionales || [], // Asegurarse de que sea un arreglo
          }}
        >
          <Button
            variant="primary"
            style={{
              marginTop: "20px", // Separar el botón 20px de la descripción
              marginBottom: "10px", // Puedes ajustar este margen según el diseño
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
