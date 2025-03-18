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
            <label htmlFor="username">Nombre de Usuario:</label>
            <p id="username">{userData.username}</p>
          </div>
          <div className="profile-field">
            <label htmlFor="email">Correo Electrónico:</label>
            <p id="email">{userData.email}</p>
          </div>
          <div className="profile-field">
            <label htmlFor="phone">Teléfono:</label>
            <p id="phone">{userData.phone}</p>
          </div>
          <div className="profile-field">
            <label htmlFor="secret-question">Pregunta Secreta:</label>
            <p id="secret-question">{userData.secretQuestion}</p>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ViewProfile;
