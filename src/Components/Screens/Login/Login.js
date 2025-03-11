import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Login/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      if (decodedToken.role === "admin") {
        navigate("/inicio");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor, introduce un correo electrónico válido.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/auth/iniciar-sesion", formData);

      // Guardar el token en localStorage
      localStorage.setItem("token", response.data.token);

      // Decodificar el token para obtener el rol del usuario
      const decodedToken = JSON.parse(atob(response.data.token.split(".")[1]));

      // Redirigir según el rol
      if (decodedToken.role === "admin") {
        navigate("/inicio"); // Ruta para administradores
      } else {
        navigate("/"); // Ruta para usuarios normales
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("No se pudo conectar al servidor. Inténtalo de nuevo más tarde.");
      } else {
        setError("Credenciales inválidas. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRedirectToRegister = () => {
    navigate("/registro"); // Redirige a la página de registro
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Correo electrónico:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span> Cargando...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>
        <p>
          ¿No tienes una cuenta?{" "}
          <span onClick={handleRedirectToRegister} className="register-link">
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;