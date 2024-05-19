const http = require('http'); // Módulo para crear el servidor HTTP
const fs = require('fs'); // Módulo para interactuar con el sistema de archivos
const path = require('path'); // Módulo para manejar rutas de archivos
const url = require('url'); // Módulo para manejar y parsear URLs

const PORT = 3000; // Puerto en el que el servidor escuchará
const MARKDOWN_DIR = path.join(__dirname, 'markdown'); // Directorio donde se almacenarán los archivos Markdown

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // Parsear la URL de la petición
    const pathname = parsedUrl.pathname; // Obtener la ruta de la URL
  