import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      decoded.role === "admin" ? navigate("/inicio") : navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor, introduce un correo electrónico válido.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://backend-xi-ashen-51.vercel.app/auth/iniciar-sesion",
        formData
      );

      localStorage.setItem("token", res.data.token);
      const decoded = JSON.parse(atob(res.data.token.split(".")[1]));
      localStorage.setItem("userId", decoded.userId);
      decoded.role === "admin" ? navigate("/inicio") : navigate("/");
    } catch (err) {
      if (err.response?.data?.message) setError(err.response.data.message);
      else if (err.request)
        setError("No se pudo conectar al servidor. Inténtalo de nuevo.");
      else setError("Credenciales inválidas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>🔐 Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="loginEmail">Correo Electrónico</label>
            <input
              id="loginEmail"
              type="email"
              name="email"
              placeholder="ejemplo@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="password-container">
            <label htmlFor="loginPassword">Contraseña</label>
            <input
              id="loginPassword"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : "Ingresar"}
          </button>
        </form>

        <p>
          ¿No tienes una cuenta?{" "}
          <span onClick={() => navigate("/registro")} className="register-link">
            Regístrate
          </span>
        </p>
        <p>
          <span
            onClick={() => navigate("/recuperar")}
            className="forgot-password-link"
          >
            ¿Olvidaste tu contraseña?
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
