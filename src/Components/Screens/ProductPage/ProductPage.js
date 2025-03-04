import React, { useState, useEffect } from "react";
import axios from "axios";  
import TarjetaProds from "../../CardProductos/TarjetaProds";
import "../ProductPage/ProductPage.css";

function ProductPage() {
  const [productos, setProductos] = useState([]);  
  const [loading, setLoading] = useState(true);     
  const [error, setError] = useState(null);         

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/productos"); 
        setProductos(response.data);  
        setLoading(false);            
      } catch (error) {
        setError("Error al cargar los productos");
        setLoading(false);  
      }
    };

    fetchProductos();
  }, []);  

  if (loading) {
    return <div>Cargando productos...</div>;  
  }

  if (error) {
    return <div>{error}</div>;  
  }

  return (
    <div className="product-container">
      {productos.map((producto) => (
        <TarjetaProds
          key={producto._id}  
          id={producto._id}    
          nombre={producto.nombre}
          descripcion={producto.descripcion}
          precio={producto.precio}
          descripcionExtra={producto.descripcionExtra}
          caracteristicas={producto.caracteristicas}
          comentarios={producto.comentarios}
          //<img src="http://localhost:5000/images/ejemplo.jpg" alt="Producto de prueba" />
          imagen={`http://localhost:5000/images/cunadeviaje.png`}           
          imagenesAdicionales={producto.imagenesAdicionales}
        />
      ))}
    </div>
  );
}

export default ProductPage;