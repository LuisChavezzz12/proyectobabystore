import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'; // Importamos Link

function BarraNavegacion({ marca, enlaces, desplegable, mostrarBusqueda }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to={marca.href}>{marca.etiqueta}</Navbar.Brand> {/* Usamos Link para navegación */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {enlaces.map((enlace, indice) => (
              <Nav.Link as={Link} to={enlace.href} key={indice} disabled={enlace.deshabilitado}>
                {enlace.etiqueta}
              </Nav.Link> /* Usamos Link en lugar de href */
            ))}
            
          </Nav>
          {mostrarBusqueda && (
            <Form className="d-flex">
              <Form.Control type="search" placeholder="Buscar" className="me-2" aria-label="Buscar" />
              <Button variant="outline-success">Buscar</Button>
            </Form>
          )}
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
