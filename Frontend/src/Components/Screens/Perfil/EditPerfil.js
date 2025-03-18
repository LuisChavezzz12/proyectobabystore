// src/Components/Screens/Profile/EditProfile.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditPerfil.css";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return navigate("/login");
      }

      try {
        const response = await axios.get(
          "https://backend-xi-ashen-51.vercel.app/auth/perfil",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFormData({
          username: response.data.username,
          email: response.data.email,
          phone: response.data.phone,
        });
      } catch (err) {
        setError("No se pudo obtener los datos del perfil.");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      // Realizar la actualización del perfil
      await axios.put(
        "https://backend-xi-ashen-51.vercel.app/auth/perfil",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/perfil"); // Redirigir al perfil después de la actualización
    } catch (err) {
      setError("No se pudo actualizar el perfil.");
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
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Actualizar Perfil"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
