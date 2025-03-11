import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // Asegúrate de importar el archivo CSS

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6; // La contraseña debe tener al menos 6 caracteres
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.phone || !formData.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("El correo electrónico no es válido.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/auth/registro", formData);

      // Guardar el token en localStorage (si el backend lo devuelve)
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      // Redirigir al usuario con un mensaje de éxito
      navigate("/login", { state: { successMessage: "Registro exitoso. Inicia sesión." } });
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Error al registrar el usuario. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2>Regístrate</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre de Usuario:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
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
            <label>Teléfono:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
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
              "Registrarse"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;