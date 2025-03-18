import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecuperarPassword = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://backend-xi-ashen-51.vercel.app/auth/recuperar-pregunta", { email });
      localStorage.setItem("emailRecuperacion", email);
      localStorage.setItem("preguntaSecreta", response.data.secretQuestion);
      navigate("/verificar-respuesta");
    } catch (error) {
      setMensaje(error.response?.data?.message || "Error al buscar la cuenta.");
    }
  };

  return (
    <div className="recuperar-wrapper">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label>Ingresa tu correo:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Continuar</button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default RecuperarPassword;
