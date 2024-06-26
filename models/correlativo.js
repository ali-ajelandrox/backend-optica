const mongoose = require('mongoose');

const contadorSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  secuencia: { type: Number, default: 1 }
});

module.exports = mongoose.model('Contador', contadorSchema);