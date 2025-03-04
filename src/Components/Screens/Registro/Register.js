import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import "./Register.css"; // Archivo de estilos

const RegisterForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Inicializa el hook useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.phone || !formData.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setError(""); // Limpiar errores antes de intentar registrar
    console.log("Registrando usuario con:", formData);
    onRegister(formData); // Simulación de registro exitoso
    onLogin(); // Llama a onLogin después de registrar
  };

  const onLogin = () => {
    // Redirige al usuario a la página de login
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Regístrate</h2>
        <p>Crea una cuenta para continuar</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Nombre de Usuario"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="register-btn">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
