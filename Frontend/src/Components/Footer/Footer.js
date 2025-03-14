import React from "react";
import "./Footer.css"; // Asegúrate de que el CSS esté correctamente importado

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-12 mb-3">
            <p>
              La comodidad y el confort para tu bebé son nuestra prioridad.
              Encuentra los mejores productos con calidad garantizada.
            </p>
          </div>

          <div className="col-md-3 col-sm-12 mb-3">
            <h5>Recursos</h5>
            <ul>
              <li>
                <a href="/productos">Productos</a>
              </li>
              <li>
                <a href="/acerca-de">Acerca De</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 col-sm-12 mb-3">
            <h5>Síguenos</h5>
            <ul>
              <li>
                <a href="https://facebook.com/">Facebook</a>
              </li>
              <li>
                <a href="https://instagram.com">Instagram</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 col-sm-12 mb-3">
            <h5>Información de contacto</h5>
            <ul>
              <li>
                <a href="tel:+1234567890">Llamanos: +52 773 385 5315</a>
              </li>
              <li>
                <a href="mailto:info@babystore.com">
                  Email: info@babystore.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 text-center">
            <p>
              &copy; {new Date().getFullYear()} BabyStore. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
