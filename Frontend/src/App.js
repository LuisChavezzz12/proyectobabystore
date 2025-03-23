import "./App.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header/Header";
import logo from "../src/Components/Imgs/logobabystore.png";
import NavScrollExample from "./Components/NavBar/NavBar";
import ProductPage from "./Components/Screens/ProductPage/ProductPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import AcercaDe from "./Components/Screens/AcercaDe/AcercaDe";
import Login from "./Components/Screens/Login/Login";
import RegisterForm from "./Components/Screens/Registro/Register";
import Cloudinary from "./Components/Cloudinary/cloudinary";
import SubirProducto from "./Components/Screens/SubirProd/SubirProd";
import ProtectedRoute from "./Components/ProtectedRoute/protectedRoute";
import AdminDashboard from "./Components/Screens/AdminDashboard/AdminDashboard";
import GestionarUsuarios from "./Components/Screens/GestionarUsuarios/GestionarUsuarios";
import ContactForm from "./Components/Screens/Contacto/ContactoEmpresa";
import WelcomePage from "./Components/Screens/Inicio/Inicio";
import DetalleProducto from "./Components/Screens/DetalleProducto/DetalleProducto";
import EditarProducto from "./Components/Screens/EditarProducto/EditarProducto";
import VerProducto from "./Components/Screens/VerProducto/VerProducto";
import FormularioPreguntas from "./Components/Screens/FormularioPreguntas/FormularioPreguntas";
import AdminPreguntas from "./Components/Screens/AdminPreguntas/AdminPreguntas";
import RecuperarPassword from "./Components/Screens/Recuperar/RecuperarPassword";
import VerificarRespuesta from "./Components/Screens/Recuperar/VerificarRespuesta";
import RestablecerPassword from "./Components/Screens/Recuperar/RestablecerPassword";
import ViewPerfil from "./Components/Screens/Perfil/ViewPerfil";
import EditPerfil from "./Components/Screens/Perfil/EditPerfil";
import EditAbout from "./Components/Screens/AcercaDe/EditAbout";
import DispositivosUsuario from "./Components/Screens/Dispositivos/DispositivoUsuario";
import ConfigurarDispositivo from "./Components/Screens/Dispositivos/ConfigurarDispositivos";
import ESP32Control from "./Components/Screens/Esp32Monitoreo/ESP32Control";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header
          titulo="BabyStore"
          imagen={logo}
          subtitulo="Comodidad y comfort para tu bebé!!"
        />
        <NavScrollExample
          marca={{ etiqueta: "", href: "#" }}
          enlaces={[
            { etiqueta: "Inicio", href: "/Inicio" },
            { etiqueta: "Productos", href: "/Productos" },
            { etiqueta: "Ubicanos", href: "/Contacto" },
            { etiqueta: "Acerca De", href: "/acerca-de" },
            { etiqueta: "FAQ", href: "/preguntar" },
            { etiqueta: "Dispositivos", href: "/dispositivos" },
          ]}
          mostrarBusqueda={true}
        />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/inicio" element={<WelcomePage />} />
            <Route path="/Productos" element={<ProductPage />} />
            <Route path="/acerca-de" element={<AcercaDe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<RegisterForm />} />
            <Route path="/contacto" element={<ContactForm />} />
            <Route path="/detalle-producto/:id" element={<DetalleProducto />} />
            <Route path="/preguntar" element={<FormularioPreguntas />} />
            <Route path="/dispositivos" element={<DispositivosUsuario />} />
            <Route
              path="/configurar-dispositivo/:id"
              element={<ConfigurarDispositivo />}
            />
            <Route path="/administrar-dispositivo" element={<ESP32Control />} />{" "}
            {/* ✅ Agregado */}
            <Route path="/recuperar" element={<RecuperarPassword />} />
            <Route
              path="/verificar-respuesta"
              element={<VerificarRespuesta />}
            />
            <Route path="/restablecer" element={<RestablecerPassword />} />
            {/* 🔹 Rutas de perfil */}
            <Route path="/perfil" element={<ViewPerfil />} />
            <Route path="/editar-perfil" element={<EditPerfil />} />
            {/* 🔹 Rutas protegidas (solo admin) */}
            <Route
              path="/subir"
              element={
                <ProtectedRoute role="admin">
                  <Cloudinary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subirp"
              element={
                <ProtectedRoute role="admin">
                  <SubirProducto />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gestionar-usuarios"
              element={
                <ProtectedRoute role="admin">
                  <GestionarUsuarios />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editar-producto/:id"
              element={
                <ProtectedRoute role="admin">
                  <EditarProducto />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ver-producto/:id"
              element={
                <ProtectedRoute role="admin">
                  <VerProducto />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-preguntas"
              element={
                <ProtectedRoute role="admin">
                  <AdminPreguntas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editar-acerca-de"
              element={
                <ProtectedRoute role="admin">
                  <EditAbout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
