const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    alias: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('user', userSchema);