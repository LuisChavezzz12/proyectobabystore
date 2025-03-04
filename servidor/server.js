const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Producto = require("./models/Producto"); // Importa el modelo de Producto
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
  
// Conectar a MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/bd_proyecto") // Conéctate a la base de datos
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log("Error al conectar a MongoDB:", err));

// Ruta para obtener todos los productos
app.get("/productos", async (req, res) => {
  try {
    const productos = await Producto.find(); // Busca todos los productos en la colección Producto
    res.json(productos); // Devuelve los productos como respuesta en formato JSON
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los productos",
      error: error.message,
    });
  }
});

// Ruta de prueba para verificar la conexión
app.get("/test", async (req, res) => {
  try {
    const result = await mongoose.connection.db.listCollections().toArray();
    res.json({
      message: "Conexión exitosa",
      collections: result, // Devuelve las colecciones de la base de datos
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en la conexión", error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Servidor en funcionamiento");
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
