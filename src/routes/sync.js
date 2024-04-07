const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { app } = require('electron');
const log = require('electron-log');

verificarYCrearCarpeta(path.join(__dirname, `../../../logs`));
log.transports.file.resolvePathFn = () => path.join(__dirname, `../../../logs/db ${fechaHoy()}.txt`);


const UsersModelo = require('../models/db1/prueba');

var contador = 0
var sincronizando = false

router.get('/display', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/sync', 'index.html'));
});

router.get('/status', (req, res) => {

    comenzarSincronizacion()
    log.info("CONSULTA");

    datt = {
        usuario: 'Vargas, Santiago Manuel',
        terminal: 'PC_SANTY',
        version: app.getVersion(),
        local_ok: 'OK',
        local_status: 'Online',
        vps_ok: 'OK',
        vps_status: 'Online',
        estado: 'SINCRONIZADO',
        fecha_hora: new Date()
    }

    res.json(datt)
});

function comenzarSincronizacion(){
    if(!sincronizando){
        sincronizar()
    }
}

function sincronizar(){
    sincronizando=true

    //contador++;
    //log.log(contador);

    setTimeout(() => {
        sincronizar()
    },20000)
}

function fechaHoy() {
    const fecha = new Date();
    
    const anio = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;
    mes = mes < 10 ? '0' + mes : mes;
    let dia = fecha.getDate();
    dia = dia < 10 ? '0' + dia : dia;
    
    return `${anio}-${mes}-${dia}`;
}
function verificarYCrearCarpeta(rutaCarpeta) {
    // Verificar si la carpeta existe
    fs.access(rutaCarpeta, fs.constants.F_OK, (err) => {
        if (err) {
            // La carpeta no existe, crearla
            fs.mkdir(rutaCarpeta, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error al crear la carpeta:', err);
                }
            });
        }
    });
}

module.exports = router;