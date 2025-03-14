import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    secretQuestion: "",
    secretAnswer: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const navigate = useNavigate();

  const secretQuestions = [
    "¿Cuál es el nombre de tu primera mascota?",
    "¿Cuál es el nombre de tu ciudad natal?",
    "¿Cuál es el nombre de tu mejor amigo de la infancia?",
    "¿Cuál es tu comida favorita?",
    "¿Cuál es el nombre de tu profesor favorito?",
  ];

  // Función de validación en tiempo real
  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "username":
        if (!value) error = "El nombre de usuario es obligatorio";
        else if (value.length < 3) error = "Mínimo 3 caracteres";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) error = "El email es obligatorio";
        else if (!emailRegex.test(value)) error = "Email no válido";
        break;
      case "phone":
        const phoneRegex = /^\d{10}$/;
        if (!value) error = "El teléfono es obligatorio";
        else if (!/^\d*$/.test(value)) error = "Solo números";
        else if (!phoneRegex.test(value)) error = "Debe tener 10 dígitos";
        break;
      case "password":
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        if (!value) error = "La contraseña es obligatoria";
        else if (!passwordRegex.test(value))
          error = "Mínimo 6 caracteres, 1 mayúscula y 1 especial";
        break;
      case "secretQuestion":
        if (!value) error = "Selecciona una pregunta";
        break;
      case "secretAnswer":
        if (!value) error = "La respuesta es obligatoria";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación específica para el teléfono
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData({ ...formData, [name]: value });
    
    // Validación en tiempo real
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Validación completa antes de enviar
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      console.log('Datos enviados desde el frontend:', formData);
      const response = await axios.post("http://localhost:5000/usuarios/", formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      navigate("/login", { state: { successMessage: "Registro exitoso. Inicia sesión." } });
    } catch (error) {
      setErrors({
        submit: error.response?.data.message || "Error al registrar el usuario",
      });
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
            {errors.username && <p className="error">{errors.username}</p>}
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
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              maxLength="10"
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
          <div>
            <label>Contraseña:</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div>
            <label>Pregunta Secreta:</label>
            <select
              name="secretQuestion"
              value={formData.secretQuestion}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una pregunta</option>
              {secretQuestions.map((question, index) => (
                <option key={index} value={question}>
                  {question}
                </option>
              ))}
            </select>
            {errors.secretQuestion && <p className="error">{errors.secretQuestion}</p>}
          </div>
          <div>
            <label>Respuesta Secreta:</label>
            <input
              type="text"
              name="secretAnswer"
              value={formData.secretAnswer}
              onChange={handleChange}
              required
            />
            {errors.secretAnswer && <p className="error">{errors.secretAnswer}</p>}
          </div>
          {errors.submit && <p className="error">{errors.submit}</p>}
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