import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // Importamos el ícono de usuario

function BarraNavegacion({ marca, enlaces }) {
  // Función para obtener el usuario desde el token almacenado
  const getUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decodificar el token
      return decoded; // Retorna el usuario con su información
    }
    return null; // Si no hay token, el usuario no está autenticado
  };

  const user = getUserFromToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="navbar-dark shadow-sm bg-dark">
      <Container fluid>
        <Navbar.Brand as={Link} to={marca.href} className="fw-bold text-light">
          {marca.etiqueta}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            {enlaces.map((enlace, indice) => (
              <Nav.Link
                as={Link}
                to={enlace.href}
                key={indice}
                disabled={enlace.deshabilitado}
                className="text-light mx-2"
              >
                {enlace.etiqueta}
              </Nav.Link>
            ))}

            {/* 🔹 Opciones visibles solo para Administradores */}
            {user && user.role === "admin" && (
              <NavDropdown
                title={<span className="text-danger">Admin</span>}
                id="admin-dropdown"
                className="text-danger mx-2"
              >
                <NavDropdown.Item
                  as={Link}
                  to="/gestionar-usuarios"
                  className="text-danger"
                >
                  Gestionar Usuarios
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/admin-preguntas"
                  className="text-danger"
                >
                  Administrar Preguntas
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/editar-acerca-de"
                  className="text-danger"
                >
                  Editar Acerca De
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as={Link}
                  to="/subirp"
                  className="text-danger"
                >
                  Subir Producto
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/dashboard"
                  className="text-danger"
                >
                  Administrar Productos
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          {/* 🔹 Opciones de usuario */}
          <Nav>
            {user ? (
              <NavDropdown
                title={<FaUser style={{ fontSize: "2em" }} />}
                id="navbarScrollingDropdown"
                align="end"
                className="text-light"
              >
                <NavDropdown.Item as={Link} to="/perfil" className="text-dark">
                  Ver Perfil
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/editar-perfil"
                  className="text-dark"
                >
                  Modificar Perfil
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={handleLogout}
                  className="text-danger"
                >
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login" className="btn btn-outline-light">
                Iniciar Sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// Definir los tipos de datos esperados en las props
BarraNavegacion.propTypes = {
  marca: PropTypes.shape({
    etiqueta: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
  enlaces: PropTypes.arrayOf(
    PropTypes.shape({
      etiqueta: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      deshabilitado: PropTypes.bool,
    })
  ).isRequired,
};

export default BarraNavegacion;
