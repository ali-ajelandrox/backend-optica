const mongoose = require('mongoose');

// Definición del esquema para cada tabla en el producto
const TablaSchema = new mongoose.Schema({
  odEsferico: String,
  odCilindro: String,
  odEje: String,
  odAdicion: String,
  odDp: String,
  osEsferico: String,
  osCilindro: String,
  osEje: String,
  osAdicion: String,
  osDp: String
});

// Definición del esquema para el producto
const ProductoSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  vendedor: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  rut: {
    type: String,
    required: true
  },
  telefono: {
    type: Number,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  abono: {
    type: Number,
    required: true
  },
  saldo: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  observacion: String,
  tipoPago: String,
  numeroSecuencial: {
    type: Number,
    unique: false,  // Asegura que este campo no sea único
    default: 0
  },
  tablas: [TablaSchema]  // Define tablas como un array de TablaSchema
});

module.exports = mongoose.model('Producto', ProductoSchema);