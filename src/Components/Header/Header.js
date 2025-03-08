import React from 'react';
import './Header.css'; // Importamos el archivo CSS para los estilos

const Header = ({ titulo, imagen, subtitulo }) => {
    return (
        <div className="container">
            <div className="headerTop">
                <img src={imagen} alt="Logo" className="imagen" />
                <h1 className="titulo">{titulo}</h1>
            </div>
            <p className="subtitulo">{subtitulo}</p>
            
        </div>
    );
};

export default Header;