import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function BarraNavegacion({ marca, enlaces, desplegable, mostrarBusqueda }) {
  // Función para decodificar el token y obtener el usuario
  const getUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decodificar el token
      return decoded; // Retorna el usuario con sus datos (incluido el role)
    }
    return null; // Si no hay token, no hay usuario
  };

  const user = getUserFromToken();
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');  // Redirige al login después de cerrar sesión
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to={marca.href}>{marca.etiqueta}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {enlaces.map((enlace, indice) => (
              <Nav.Link as={Link} to={enlace.href} key={indice} disabled={enlace.deshabilitado}>
                {enlace.etiqueta}
              </Nav.Link>
            ))}

            {/* Mostrar "Subir Producto" y otros enlaces solo para administradores */}
            {user && user.role === 'admin' && (
              <>
                <Nav.Link as={Link} to="/subirp">Subir Producto</Nav.Link>
                <Nav.Link as={Link} to="/gestionar-usuarios">Gestionar Usuarios</Nav.Link>
                <Nav.Link as={Link} to="/dashboard">AdminDashboard</Nav.Link>
                <Nav.Link as={Link} to="/subir">Subir Imagen</Nav.Link>
              </>
            )}
          </Nav>

          {mostrarBusqueda && (
            <Form className="d-flex">
              <Form.Control type="search" placeholder="Buscar" className="me-2" aria-label="Buscar" />
              <Button variant="outline-success">Buscar</Button>
            </Form>
          )}
          <Nav>
            {user ? (
              <Button variant="outline-danger" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            ) : (
              <Nav.Link as={Link} to="/login">
                Iniciar Sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

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
  desplegable: PropTypes.shape({
    titulo: PropTypes.string.isRequired,
    elementos: PropTypes.arrayOf(
      PropTypes.shape({
        etiqueta: PropTypes.string,
        href: PropTypes.string,
        divisor: PropTypes.bool,
      })
    ).isRequired,
  }),
  mostrarBusqueda: PropTypes.bool,
};

BarraNavegacion.defaultProps = {
  mostrarBusqueda: true,
};

export default BarraNavegacion;
