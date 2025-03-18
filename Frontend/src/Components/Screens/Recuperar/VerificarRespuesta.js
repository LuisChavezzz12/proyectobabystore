import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerificarRespuesta = () => {
  const [respuesta, setRespuesta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("emailRecuperacion");
  const preguntaSecreta = localStorage.getItem("preguntaSecreta");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://backend-xi-ashen-51.vercel.app/auth/verificar-respuesta", { email, secretAnswer: respuesta });
      localStorage.setItem("resetToken", response.data.resetToken);
      navigate("/restablecer");
    } catch (error) {
      setMensaje("Respuesta incorrecta.");
    }
  };

  return (
    <div className="recuperar-wrapper">
      <h2>Responder Pregunta Secreta</h2>
      <p>{preguntaSecreta}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={respuesta} onChange={(e) => setRespuesta(e.target.value)} required />
        <button type="submit">Verificar</button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default VerificarRespuesta;
