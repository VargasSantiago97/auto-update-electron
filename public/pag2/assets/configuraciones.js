var vars = {

    ///API_URI_DATABASE: 'http://api.moliendas.norteyagua.online',

    API_URI: 'http://localhost/api_astyl',
    API_URI_NUBE: '',
    API_URI_UPLOAD: 'http://localhost/api_astyl/cpe', //para ver archivos de CPE

    tipoPersonaOptions: ["FISICA", "JURIDICA", "OTRA"],

    FACTURA_URL: 'http://localhost/api_astyl/factura/factura.php',
    CTAVTA_URL: 'http://localhost/api_astyl/factura/ctavta.php',

    API_URI_AFIP: 'http://localhost/api_astyl/afip',
    API_URI_PADRON: 'http://localhost/api_astyl/afip',

    API_CPE: 'http://norteyagua.online/cpe',
    API_CPE_ARCHIVOS: 'http://localhost/api_astyl/cpe',


    condicion_iva: [
        {
            id:"1",
            alias: 'RI',
            descripcion: 'RESPONSABLE INSCRIPTO',
            iva: 1
        },
        {
            id:"2",
            alias: 'MT',
            descripcion: 'MONOTRIBUTISTA',
            iva: 0
        },
        {
            id:"10",
            alias: 'OTRO',
            descripcion: 'OTRO',
            iva: 0
        }
    ],

    puntos: [
        {
            id: "3",
            punto: 3,
            alias: "Punto 3",
            descripcion: 'Punto 3'
        },
        {
            id: "4",
            punto: 4,
            alias: "Punto 4",
            descripcion: 'Punto 4'
        }
    ],
    puntoActivo: 3, //o false si no hay
    productoActivo: 1,
    camapanaActivo: 2,
    formaPagoActivo: 2,
    intermediarioActivo: 1,


    tiposContacto: [
        {
            id: "correo",
            alias: "Correo",
        },
        {
            id: "whatsapp",
            alias: "WhatsApp",
        },
        {
            id: "telefono",
            alias: "Telefono",
        }
    ],

    codProvincias: [
        {
            id: 0,
            alias: "CAPITAL FEDERAL"
        },
        {
            id: 1,
            alias: "BUENOS AIRES"
        },
        {
            id: 2,
            alias: "CATAMARCA"
        },
        {
            id: 3,
            alias: "CORDOBA"
        },
        {
            id: 4,
            alias: "CORRIENTES"
        },
        {
            id: 5,
            alias: "ENTRE RIOS"
        },
        {
            id: 6,
            alias: "JUJUY"
        },
        {
            id: 7,
            alias: "MENDOZA"
        },
        {
            id: 8,
            alias: "LA RIOJA"
        },
        {
            id: 9,
            alias: "SALTA"
        },
        {
            id: 10,
            alias: "SAN JUAN"
        },
        {
            id: 11,
            alias: "SAN LUIS"
        },
        {
            id: 12,
            alias: "SANTA FE"
        },
        {
            id: 13,
            alias: "SANTIAGO DEL ESTERO"
        },
        {
            id: 14,
            alias: "TUCUMAN"
        },
        {
            id: 16,
            alias: "CHACO"
        },
        {
            id: 17,
            alias: "CHUBUT"
        },
        {
            id: 18,
            alias: "FORMOSA"
        },
        {
            id: 19,
            alias: "MISIONES"
        },
        {
            id: 20,
            alias: "NEUQUEN"
        },
        {
            id: 21,
            alias: "LA PAMPA"
        },
        {
            id: 22,
            alias: "RIO NEGRO"
        },
        {
            id: 23,
            alias: "SANTA CRUZ"
        },
        {
            id: 24,
            alias: "TIERA DEL FUEGO"
        },
    ]

}