const mongoose = require('mongoose');

const CounterSchema = mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, required: true }
});

module.exports = mongoose.model('Counter', CounterSchema);