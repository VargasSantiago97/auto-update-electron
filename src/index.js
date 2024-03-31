const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');

const log = require('electron-log');
log.transports.file.resolvePathFn = () => path.join(__dirname, 'logs/main.log');
log.log('Version actual: ', app.getVersion());

const users = require('./routes/users');
const login = require('./validations/login');

const verifyToken = require('./validations/validation');


require('dotenv').config();

const api = express();
const PORT = process.env.PORT || 3000;

const DB1_URI = 'mongodb://127.0.0.1:27017/database1';

let win;

// Middleware para manejar solicitudes JSON
api.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))
api.use(express.json());


api.use('/login', login);
api.use('/users', verifyToken, users);

// Usar las rutas definidas
api.get('/', (req, res) => {
    res.send('API V1.1.1');
})

// Cualquier
api.get('*', (req, res) => {
    res.send('API V1.1.1');
})

// Conexión a la base de datos de usuarios
const database1 = mongoose.connect(DB1_URI);
//database1.on('error', console.error.bind(console, 'Error de conexión a la base de datos 1:'));
//database1.once('open', () => console.log('Conexión a la base de datos 1 establecida'));

// Conexión a la base de datos de productos
//const productosDB = mongoose.createConnection(DB2_URI);
//productosDB.on('error', console.error.bind(console, 'Error de conexión a la base de datos 2:'));
//productosDB.once('open', () => console.log('Conexión a la base de datos 2 establecida'));

function createWindow() {
    win = new BrowserWindow()
    win.loadURL(`http://localhost:${PORT}`)
}

app.whenReady().then(() => {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();
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
