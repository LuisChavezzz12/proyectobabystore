const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  imagen: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcionExtra: { type: String, required: true },
  caracteristicas: [{ type: String }],
  comentarios: [
    {
      usuario: { type: String },
      texto: { type: String },
    },
  ],
  imagenesAdicionales: [{ type: String }],
});

const Producto = mongoose.model('Producto', productoSchema);
module.exports = Producto;
