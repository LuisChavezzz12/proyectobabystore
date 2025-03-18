import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importar iconos

const RestablecerPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const resetToken = localStorage.getItem("resetToken");

  // 📌 Validación en tiempo real
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!password) return "La contraseña es obligatoria.";
    if (!passwordRegex.test(password))
      return "Mínimo 6 caracteres, 1 mayúscula y 1 especial.";
    return "";
  };

  const validateConfirmPassword = (confirmPass) => {
    if (!confirmPass) return "Debes confirmar tu contraseña.";
    if (confirmPass !== newPassword) return "Las contraseñas no coinciden.";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "newPassword") {
      setNewPassword(value);
      setErrors((prev) => ({
        ...prev,
        newPassword: validatePassword(value),
      }));
    }

    if (name === "confirmPassword") {
      setConfirmPassword(value);
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      newPassword: validatePassword(newPassword),
      confirmPassword: validateConfirmPassword(confirmPassword),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://backend-xi-ashen-51.vercel.app/auth/restablecer-contrasena", {
        resetToken,
        newPassword,
      });
      setMensaje("✅ Contraseña actualizada correctamente.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMensaje("❌ Error al restablecer la contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recuperar-wrapper">
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nueva Contraseña:</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              required
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.newPassword && <p className="error">{errors.newPassword}</p>}
        </div>

        <div>
          <label>Confirmar Contraseña:</label>
          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
            <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Actualizando..." : "Actualizar Contraseña"}
        </button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default RestablecerPassword;
