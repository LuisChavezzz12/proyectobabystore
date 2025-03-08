const Producto = require("../models/Producto");

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "❌ Error al obtener productos", error: error.message });
  }
};

exports.agregarProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json({
      message: "✅ Producto agregado correctamente",
      producto: nuevoProducto,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Error al agregar el producto", error: error.message });
  }
};