import React from 'react';
import './Header.css'; // Importamos el archivo CSS para los estilos
import { Link } from 'react-router-dom';

const Header = ({ titulo, imagen, subtitulo }) => {
    return (
        <div className="container">
            <div className="headerTop">
                <img src={imagen} alt="Logo" className="imagen" />
                <h1 className="titulo">{titulo}</h1>
            </div>
            <p className="subtitulo">{subtitulo}</p>
            <div className="auth-buttons">
                <Link to="/login" className="auth-link">Iniciar Sesión</Link>
            </div>
        </div>
    );
};

export default Header;