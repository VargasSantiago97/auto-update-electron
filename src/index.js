const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const { app, BrowserWindow, Tray, screen } = require('electron');
const { autoUpdater } = require('electron-updater');

const log = require('electron-log');
log.transports.file.resolvePathFn = () => path.join('C:/Program Files/back_norte', 'logs/main.log');
log.log('Version actual: ', app.getVersion());

const users = require('./routes/users');
const intranet = require('./routes/intranet');
const login = require('./validations/login');

const verifyToken = require('./validations/validation');


require('dotenv').config();

const api = express();
const PORT = process.env.PORT || 3000;

const DB1_URI = 'mongodb://127.0.0.1:27017/database1';

let win;
let bandeja;

// Middleware para manejar solicitudes JSON
api.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))
api.use(express.json());
api.use(express.static(path.join(__dirname, '../public')));

//api.use('/login', login);
//api.use('/users', verifyToken, users);
api.use('/intranet', intranet);

// Usar las rutas definidas
api.get('/', (req, res) => {
    res.send('API V1.1.2' + __dirname);
})

// Cualquier
/* api.get('*', (req, res) => {
    res.send('API V1.1.2');
}) */

// Conexión a la base de datos de usuarios
const database1 = mongoose.connect(DB1_URI);

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    win = new BrowserWindow({
        //alwaysOnTop: true,
        //movable: false,
        //kiosk: true,
        show: false,
        width: 300,
        height: 500,
        x: width - 300,
        y: height - 500,
        webPreferences: {
            nodeIntegration: true
        },
        title: 'NORTE SEMILLAS - SYNC',
        //icon: 3,
        //titleBarStyle: "hidden"
    })

    win.loadURL(`http://localhost:${PORT}`)
}

app.whenReady().then(() => {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();

    bandeja = new Tray(path.join(__dirname, 'icono.ico'));

    bandeja.on('click', () => {
        if (win) {
            win.show();
        } else {
            console.error("La ventana no está definida aún.");
        }
    });
    bandeja.setToolTip('Abrir Sync');

    win.on('close', (evento) => {
        if (!app.isQuiting) {
            evento.preventDefault();
            win.hide();
        }
        return false
    })
    win.on('minimize', (evento) => {
        evento.preventDefault();
        win.hide();

        return false
    })
})
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
})
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
})

autoUpdater.on('update-available', () => {
    log.info('Update-available');
})
autoUpdater.on('checking-for-update', () => {
    log.info('checking-for-update');
})
autoUpdater.on('download-progress', (progressTrack) => {
    log.info('\n\ndownload-progress');
    log.info(progressTrack)
})
autoUpdater.on('update-downloaded', () => {
    log.info('update-downloaded');
})
autoUpdater.on('error', (err) => {
    log.info('Error en auto-updater. ' + err);
})

api.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
