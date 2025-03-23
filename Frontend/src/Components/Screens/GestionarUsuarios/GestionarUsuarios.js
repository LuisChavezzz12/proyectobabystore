import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./GesUsuarios.css";

const GestionarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get(
          "https://backend-xi-ashen-51.vercel.app/usuarios"
        );
        setUsuarios(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los usuarios", error);
      }
    };

    obtenerUsuarios();
  }, []);

  // Índice de inicio y fin de los usuarios que se mostrarán en la página actual
  const startIndex = (paginaActual - 1) * usuariosPorPagina;
  const endIndex = startIndex + usuariosPorPagina;
  const usuariosPaginados = usuarios.slice(startIndex, endIndex);

  // Total de páginas
  const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);

  // Función para cambiar de página
  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  const handleEdit = (userId) => {
    navigate(`/editar-usuario/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      const confirmar = window.confirm(
        "¿Estás seguro de que deseas eliminar este usuario?"
      );
      if (!confirmar) return;

      await axios.delete(
        `https://backend-xi-ashen-51.vercel.app/usuarios/${userId}`
      );
      setUsuarios(usuarios.filter((user) => user._id !== userId));
      alert("Usuario eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
      alert("Hubo un error al eliminar el usuario");
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(
        `https://backend-xi-ashen-51.vercel.app/usuarios/${userId}`,
        { role: newRole }
      );
      alert("Rol actualizado correctamente");
      setUsuarios(
        usuarios.map((usuario) =>
          usuario._id === userId ? { ...usuario, role: newRole } : usuario
        )
      );
    } catch (error) {
      console.error("Error al actualizar el rol", error);
      alert("Hubo un error al actualizar el rol");
    }
  };

  return (
    <div className="usuarios-container">
      <h2>Listado de Usuarios</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className="tabla-contenedor">
            {" "}
            {/* 🟢 Nuevo contenedor para separar la tabla */}
            <table className="usuarios-table">
              <thead>
                <tr>
                  <th>Nombre de Usuario</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosPaginados.map((usuario) => (
                  <tr key={usuario._id}>
                    <td>{usuario.username}</td>
                    <td>{usuario.email}</td>
                    
                    <td>
                      <select
                        value={usuario.role}
                        onChange={(e) =>
                          handleRoleChange(usuario._id, e.target.value)
                        }
                      >
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(usuario._id)}
                      >
                        Editar
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(usuario._id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>{" "}
          {/* 🔴 Cierra el nuevo contenedor */}
          {/* 🔽 Paginación (ahora fuera de la tabla) */}
          <div className="paginacion">
            <button
              onClick={() => cambiarPagina(paginaActual - 1)}
              disabled={paginaActual === 1}
              className="pagination-button"
            >
              ⬅ Anterior
            </button>
            <span className="pagina-info">
              Página {paginaActual} de {totalPaginas}
            </span>
            <button
              onClick={() => cambiarPagina(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
              className="pagination-button"
            >
              Siguiente ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GestionarUsuarios;
