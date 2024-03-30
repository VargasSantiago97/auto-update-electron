const express = require('express');
const router = express.Router();

const PruebaSchema = require('../models/db1/prueba');
const PruebaDB2 = require('../models/db2/prueba');

router.get('/1', (req, res) => {
    PruebaSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error, status: 'error' }))
});

module.exports = router;
