const express = require('express');
const router = express.Router();

const UsersModelo = require('../models/db1/prueba');

var contador = 0

router.get('/display', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/sync', 'index.html'));
});

router.get('/status', (req, res) => {/* 
    res.json({
        usuario: 'Vargas, Santiago Manuel',
        terminal: 'PC_SANTY',
        version: '1.02.2',
        local_ok: 'OK',
        local_status: 'Online',
        vps_ok: 'OK',
        vps_status: 'Online',
        estado: 'SINCRONIZADO',
        fecha_hora: new Date()
    }) */

    /* res.json({
        usuario: 'Vargas, Santiago Manuel',
        terminal: 'PC_SANTY',
        version: '1.02.2',
        local_ok: 'OK',
        local_status: 'Online',
        vps_ok: '🔑',
        vps_status: 'Error token',
        estado: 'SINCRONIZANDO',
        fecha_hora: new Date()
    }) */
    contador++;
    console.log('recibido');

    datt = {
        usuario: 'Vargas, Santiago Manuel',
        terminal: 'PC_SANTY',
        version: '1.02.' + contador,
        local_ok: 'OK',
        local_status: 'Online',
        vps_ok: 'OK',
        vps_status: 'Online',
        estado: 'SINCRONIZADO',
        fecha_hora: new Date()
    }

    setTimeout(() => {
        console.log('enviado')
        res.json(datt)
    }, 700)
});

module.exports = router;
