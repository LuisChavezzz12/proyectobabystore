import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GesUsuarios.css'; // Archivo CSS para la tabla

const GestionarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook para navegar a otro formulario

  // Obtener la lista de usuarios al cargar el componente
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/usuarios');
        setUsuarios(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los usuarios", error);
      }
    };

    obtenerUsuarios();
  }, []);

  // Función para redirigir al formulario de edición
  const handleEdit = (userId) => {
    navigate(`/editar-usuario/${userId}`);
  };

  // Función para eliminar un usuario
  const handleDelete = async (userId) => {
    try {
      // Confirmar antes de eliminar
      const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
      if (!confirmar) return; // Si el usuario cancela, no hacer nada

      // Eliminar el usuario
      await axios.delete(`http://localhost:5000/usuarios/${userId}`);

      // Actualizar la lista de usuarios eliminando el usuario borrado
      setUsuarios(usuarios.filter((user) => user._id !== userId));
      alert("Usuario eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
      alert("Hubo un error al eliminar el usuario");
    }
  };

  // Función para actualizar el rol del usuario
  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:5000/usuarios/${userId}`, { role: newRole });
      alert("Rol actualizado correctamente");
      setUsuarios(usuarios.map((usuario) => 
        usuario._id === userId ? { ...usuario, role: newRole } : usuario
      ));
    } catch (error) {
      console.error("Error al actualizar el rol", error);
      alert("Hubo un error al actualizar el rol");
    }
  };

  return (
    <div>
      <h2>Listado de Usuarios</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Nombre de Usuario</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td><span>{usuario.username}</span></td> {/* Mostrar el valor como texto estático */}
                <td><span>{usuario.email}</span></td> {/* Mostrar el valor como texto estático */}
                <td><span>{usuario.phone}</span></td> {/* Mostrar el valor como texto estático */}
                <td>
                  <select
                    value={usuario.role}
                    onChange={(e) => handleRoleChange(usuario._id, e.target.value)}
                  >
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario</option>
                  </select>
                </td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(usuario._id)}>Editar</button>
                  <button className="delete-button" onClick={() => handleDelete(usuario._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GestionarUsuarios;
