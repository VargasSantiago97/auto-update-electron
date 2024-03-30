const mongoose = require('mongoose');

const PruebaSchema = new mongoose.Schema({
    nombre: String,
    email: String,
});
  
module.exports = mongoose.model('PruebaDB2', PruebaSchema, 'database2');