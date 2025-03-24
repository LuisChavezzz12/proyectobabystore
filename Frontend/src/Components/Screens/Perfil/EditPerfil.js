import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditPerfil.css";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    secretQuestion: "",
    secretAnswer: "",
    password: "", // campo para nueva contraseña (opcional)
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const response = await axios.get(
          "https://backend-xi-ashen-51.vercel.app/auth/perfil",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const {
          username,
          email,
          phone,
          secretQuestion,
          secretAnswer,
        } = response.data;

        setFormData({
          username,
          email,
          phone,
          secretQuestion,
          secretAnswer,
          password: "", // vacío por defecto
        });
      } catch (err) {
        setError("❌ No se pudo obtener los datos del perfil.");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    const { username, email, phone, secretQuestion, secretAnswer, password } = formData;
  
    // Validaciones
    if (!username || username.length < 3) {
      setLoading(false);
      return setError("❌ El nombre de usuario debe tener al menos 3 caracteres.");
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setLoading(false);
      return setError("❌ Ingresa un correo electrónico válido.");
    }
  
    if (!/^\d{10}$/.test(phone)) {
      setLoading(false);
      return setError("❌ El teléfono debe tener exactamente 10 dígitos.");
    }
  
    if (!secretQuestion) {
      setLoading(false);
      return setError("❌ Debes seleccionar una pregunta secreta.");
    }
  
    if (!secretAnswer || secretAnswer.length < 3) {
      setLoading(false);
      return setError("❌ La respuesta secreta debe tener al menos 3 caracteres.");
    }
  
    if (password && password.length < 6) {
      setLoading(false);
      return setError("❌ La nueva contraseña debe tener al menos 6 caracteres.");
    }
  
    const token = localStorage.getItem("token");
  
    try {
      await axios.put(
        "https://backend-xi-ashen-51.vercel.app/auth/perfil",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Perfil actualizado correctamente");
      navigate("/perfil");
    } catch (err) {
      setError(
        err?.response?.data?.message || "❌ No se pudo actualizar el perfil."
      );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="profile-container">
      <h2>Modificar Perfil</h2>
      {error && <p className="error">{error}</p>}

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
          <label>Pregunta secreta:</label>
          <select
            name="secretQuestion"
            value={formData.secretQuestion}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una pregunta</option>
            <option>¿Cuál es el nombre de tu primera mascota?</option>
            <option>¿Cuál es el nombre de tu ciudad natal?</option>
            <option>¿Cuál es el nombre de tu mejor amigo de la infancia?</option>
            <option>¿Cuál es tu comida favorita?</option>
            <option>¿Cuál es el nombre de tu profesor favorito?</option>
          </select>
        </div>

        <div>
          <label>Respuesta secreta:</label>
          <input
            type="text"
            name="secretAnswer"
            value={formData.secretAnswer}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Nueva contraseña (opcional):</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Dejar en blanco si no deseas cambiarla"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Actualizar Perfil"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
