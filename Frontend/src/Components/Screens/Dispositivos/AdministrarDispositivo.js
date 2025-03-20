import React from "react";
import { useParams } from "react-router-dom";

function AdministrarDispositivo() {
  const { id } = useParams();

  return (
    <div className="container">
      <h2>Administrar Dispositivo</h2>
      <p>En esta sección podrás gestionar el dispositivo con ID: {id}</p>
      <p>📌 **Aquí agregaremos MQTT más adelante**</p>
    </div>
  );
}

export default AdministrarDispositivo;
