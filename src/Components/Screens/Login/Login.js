import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "./Login.css"; // Archivo de estilos

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setError(""); // Limpiar errores antes de intentar iniciar sesión
    console.log("Iniciando sesión con:", formData);
    onLogin(); // Simulación de inicio de sesión exitoso
  };

  const handleSwitchToRegister = () => {
    navigate("/registro"); // Redirige a la página de registro
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Bienvenido</h2>
        <p>Inicia sesión para continuar</p>
        <form onSubmit={handleSubmit}>
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
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-btn">Iniciar Sesión</button>
        </form>
        <p className="register-link">
          ¿No tienes cuenta? <span onClick={handleSwitchToRegister}>Regístrate</span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
