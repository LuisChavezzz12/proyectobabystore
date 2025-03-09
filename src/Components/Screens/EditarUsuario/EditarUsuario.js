import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditarUsuario = () => {
  const { id } = useParams(); // Obtener el ID del usuario desde la URL
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    username: '',
    email: '',
    phone: '',
    role: 'user',
  });

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/usuarios/${id}`);
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario", error);
      }
    };

    obtenerUsuario();
  }, [id]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/usuarios/${id}`, usuario);
      alert('✅ Usuario actualizado correctamente');
      navigate('/gestionar-usuarios'); // Redirigir al listado de usuarios
    } catch (error) {
      console.error("Error al actualizar el usuario", error);
    }
  };

  return (
    <div>
      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            value={usuario.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Teléfono</label>
          <input
            type="text"
            name="phone"
            value={usuario.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rol</label>
          <select
            name="role"
            value={usuario.role}
            onChange={handleChange}
          >
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
