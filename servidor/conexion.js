// server.js o app.js
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");
const productoRoutes = require("./routes/productoRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");  // Asegúrate de incluir las rutas de usuario

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB Atlas
conectarDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/productos", productoRoutes);
app.use("/auth", authRoutes);
app.use("/usuarios", userRoutes);  // Rutas para usuarios

// Ruta raíz de prueba
app.get("/", (req, res) => {
  res.send("Servidor en funcionamiento 🚀");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
