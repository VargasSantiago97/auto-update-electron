const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, Tray, screen } = require('electron');
const { autoUpdater } = require('electron-updater');

const log = require('electron-log');

verificarYCrearCarpeta(path.join(__dirname, `../../logs`));
log.transports.file.resolvePathFn = () => path.join(__dirname, `../../logs/logs ${fechaHoy()}.txt`);
log.log('Version actual: ', app.getVersion());

const users = require('./routes/users');
const intranet = require('./routes/intranet');
const login = require('./validations/login');

const verifyToken = require('./validations/validation');

require('dotenv').config();

const api = express();
const PORT = process.env.PORT || 3000;

const DB_URI = 'mongodb://localhost:27017/nortesemillas';
createConnectionMongoDB()

let win;
let bandeja;

// Middleware para manejar solicitudes JSON
api.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))
api.use(express.json());


// Usar las rutas definidas
api.get('/', (req, res) => {
    res.send('API V1.1.2' + __dirname);
})

api.get('/version', (req, res) => {
    res.json({
        estado: 'OK',
        version: app.getVersion(),
        ruta: __dirname,
        logs: path.join(__dirname, `../../logs`)
    });
})

api.use(express.static(path.join(__dirname, '../public')));
api.use('/login', login);
api.use('/users', verifyToken, users);
api.use('/intranet', intranet);


api.get('/pag2/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pag2', 'index.html'));
})

// Cualquier
api.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
})

// Conexión a la base de datos
async function createConnectionMongoDB(){
    log.log('')
    await mongoose.connect(DB_URI, {
        authSource: "admin",
        user: "usuario",
        pass: "NoSeUs1!"
    });
}

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    win = new BrowserWindow({
        //alwaysOnTop: true,
        //movable: false,
        //kiosk: true,
        show: true,
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

    win.loadURL(`http://localhost:${PORT}/`)
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
    win.on('maximize', (evento) => {
        evento.preventDefault();
        app.exit();
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
