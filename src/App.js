// App.js
import "./App.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header/Header";
import logo from "../src/Components/Imgs/logobabystore.png";
import NavScrollExample from "./Components/NavBar/NavBar";
import ProductPage from "./Components/Screens/ProductPage/ProductPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetalleProducto from "./Components/Screens/DetalleProducto/DetalleProducto";
import Footer from "./Components/Footer/Footer";
import AcercaDe from "./Components/Screens/AcercaDe/AcercaDe";
import Login from "./Components/Screens/Login/Login";
import RegisterForm from "./Components/Screens/Registro/Register";
import Cloudinary from "./Components/Cloudinary/cloudinary";
import SubirProducto from "./Components/Screens/SubirProd/SubirProd";
import ProtectedRoute from "./Components/ProtectedRoute/protectedRoute";


function App() {
  return (
    <Router>
      <div className="App">
        <Header
          titulo="BabyStore"
          imagen={logo}
          subtitulo="Comodidad y comfort para tu bebe!!"
        />
        <NavScrollExample
          marca={{ etiqueta: "BabyStore", href: "#" }}
          enlaces={[
            { etiqueta: "Inicio", href: "/Inicio" },
            { etiqueta: "Productos", href: "/Productos" },
            { etiqueta: "Contacto", href: "/Contacto" },
          ]}
          desplegable={{
            titulo: "Categorias",
            elementos: [
              { etiqueta: "Ropa", href: "/Ropa" },
              { etiqueta: "Juguetes", href: "/Juguetes" },
              { etiqueta: "Accesorios", href: "/Accesorios" },
              { divisor: true },
              { etiqueta: "Ofertas", href: "/Ofertas" },
            ],
          }}
          mostrarBusqueda={true}
        />
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/Inicio" element={<ProductPage />} />
          <Route path="/Productos" element={<ProductPage />} />
          <Route path="/product/:id" element={<DetalleProducto />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<RegisterForm />} />
          <Route path="/subir" element={<Cloudinary />} />
          <Route
            path="/subirp"
            element={
              <ProtectedRoute role="admin">
                <SubirProducto />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;