const express = require("express");
const router = express.Router();
const { obtenerProductos, agregarProducto } = require("../controllers/productoController");

// Ruta para obtener todos los productos
router.get("/", obtenerProductos);

// Ruta para agregar un producto
router.post("/", agregarProducto);

module.exports = router;