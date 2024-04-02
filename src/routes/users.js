const express = require('express');
const router = express.Router();

const UsersModelo = require('../models/db1/prueba');

router.get('/1', (req, res) => {
    UsersModelo
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error, status: 'error' }))
});

module.exports = router;
