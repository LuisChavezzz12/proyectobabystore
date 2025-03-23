import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewPerfil.css";

const ViewProfile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
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
        setUserData(response.data);
      } catch (err) {
        setError("No se pudo obtener los datos del perfil.");
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="profile-container">
      <h2 id="profile-heading">Perfil de Usuario</h2>
      {error && <p className="error">{error}</p>}
      {userData ? (
        <div id="profile-details">
          <div className="profile-field">
            <label>👤 Nombre de Usuario:</label>
            <p>{userData.username}</p>
          </div>
          <div className="profile-field">
            <label>📧 Correo Electrónico:</label>
            <p>{userData.email}</p>
          </div>
          <div className="profile-field">
            <label>📱 Teléfono:</label>
            <p>{userData.phone}</p>
          </div>
          <div className="profile-field">
            <label>🔐 Rol:</label>
            <p>{userData.role}</p>
          </div>
          <div className="profile-field">
            <label>❓ Pregunta Secreta:</label>
            <p>{userData.secretQuestion}</p>
          </div>
          <div className="profile-field">
            <label>🗝️ Respuesta Secreta:</label>
            <p>{userData.secretAnswer}</p>
          </div>
          <div className="profile-field">
            <label>🔑 Contraseña (encriptada):</label>
            <p>{userData.password}</p>
          </div>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

export default ViewProfile;
