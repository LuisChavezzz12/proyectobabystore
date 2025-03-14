import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditarUsuario = () => {
  const { id } = useParams(); // Obtener el ID del usuario desde la URL
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    username: "",
    email: "",
    phone: "",
    role: "user",
  });

  // Obtener los datos del usuario al cargar el componente
  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/usuarios/${id}`
        );
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario", error);
        alert("Hubo un error al cargar los datos del usuario.");
      }
    };

    obtenerUsuario();
  }, [id]);

  // Manejar cambios en el campo "role"
  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/usuarios/${id}`, {
        role: usuario.role,
      });
      alert("✅ Rol actualizado correctamente");
      navigate("/gestionar-usuarios");
    } catch (error) {
      console.error("Error al actualizar el rol", error);
      alert(
        "Hubo un error al actualizar el rol. Por favor, inténtalo de nuevo."
      );
    }
  };
  return (
    <div>
      <h2>Editar Rol del Usuario</h2>
      <form onSubmit={handleSubmit}>
        {/* Mostrar información del usuario (solo lectura) */}
        <div>
          <label>Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            value={usuario.username}
            readOnly // Campo de solo lectura
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={usuario.email}
            readOnly // Campo de solo lectura
          />
        </div>
        <div>
          <label>Teléfono</label>
          <input
            type="text"
            name="phone"
            value={usuario.phone}
            readOnly // Campo de solo lectura
          />
        </div>

        {/* Campo editable: Rol */}
        <div>
          <label>Rol</label>
          <select name="role" value={usuario.role} onChange={handleChange}>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarUsuario;
