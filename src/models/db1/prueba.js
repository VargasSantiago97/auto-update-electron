const mongoose = require('mongoose');

const PruebaSchema = new mongoose.Schema({
    dato: String
});
  
module.exports = mongoose.model('Pruebas', PruebaSchema);