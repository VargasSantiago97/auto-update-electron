const time_sincronizar = 20 //sengundos
const url_status = 'http://localhost:3000/sync/status';

var barra = document.getElementById('progress-bar');
var carga = 100;

var usuario = document.getElementById('usuario');
var terminal = document.getElementById('terminal');
var version = document.getElementById('version');
var local_ok = document.getElementById("local_ok");
var local_status = document.getElementById("local_status");
var vps_ok = document.getElementById("vps_ok");
var vps_status = document.getElementById("vps_status");
var estado = document.getElementById("status");
var fecha_hora = document.getElementById("fecha_hora");

var visible_progressbar = document.getElementById('visible_progressbar')
var visible_spinner = document.getElementById('visible_spinner')

function actualizarEstado() {
    estado.innerHTML = 'ACTUALIZANDO...'
    visible_progressbar.style.display = 'none'
    visible_spinner.style.display = ''

    // Hacer la solicitud GET utilizando fetch()
    fetch(url_status)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then(data => {
            usuario.innerHTML = data.usuario;
            terminal.innerHTML = data.terminal;
            version.innerHTML = data.version;
            estado.innerHTML = data.estado;

            fecha_server = new Date(data.fecha_hora);
            fecha_hora.innerHTML = fecha_server.toLocaleString();

            setLocalStatus(data.local_ok, data.local_status);
            setVpsStatus(data.vps_ok, data.vps_status);

            visible_progressbar.style.display = ''
            visible_spinner.style.display = 'none'
            cuentaRegresiva()
        })
        .catch(error => {
            setLocalStatus('NO', 'Offline');
            setVpsStatus('-', '-');

            estado.innerHTML = "NO CONECTADO A SERVIDOR LOCAL";

            console.error('Error:', error);

            visible_progressbar.style.display = ''
            visible_spinner.style.display = 'none'
            cuentaRegresiva()
        });
}

function cuentaRegresiva() {
    setTimeout(() => {
        carga = carga - 1;

        barra.style.width = carga + '%';

        if (carga < 1) {
            carga = 100;
            actualizarEstado()
        } else {
            cuentaRegresiva()
        }
    }, time_sincronizar * 10)
}
actualizarEstado()

function setLocalStatus(status, descripcion){
    local_ok.innerHTML = status;
    local_status.innerHTML = descripcion

    local_ok.classList.remove('text-bg-danger');
    local_ok.classList.remove('text-bg-success');

    var nuevaClase = status=='OK' ? 'text-bg-success' : 'text-bg-danger';
    var nuevoColor = descripcion=='Online' ? 'rgb(13, 87, 0)' : 'rgb(87, 0, 0)';

    local_ok.classList.add(nuevaClase);
    local_status.style.color = nuevoColor;
}
function setVpsStatus(status, descripcion){
    vps_ok.innerHTML = status;
    vps_status.innerHTML = descripcion

    vps_ok.classList.remove('text-bg-danger');
    vps_ok.classList.remove('text-bg-success');

    var nuevaClase = status=='OK' ? 'text-bg-success' : 'text-bg-danger';
    var nuevoColor = descripcion=='Online' ? 'rgb(13, 87, 0)' : 'rgb(87, 0, 0)';

    vps_ok.classList.add(nuevaClase);
    vps_status.style.color = nuevoColor;
}