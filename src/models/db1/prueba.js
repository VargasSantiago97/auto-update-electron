const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    alias: String,
    permisos: Array
});
  
module.exports = mongoose.model('Users', UsersSchema, 'users');