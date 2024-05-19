const http = require('http'); // Módulo para crear el servidor HTTP
const fs = require('fs'); // Módulo para interactuar con el sistema de archivos
const path = require('path'); // Módulo para manejar rutas de archivos
const url = require('url'); // Módulo para manejar y parsear URLs

const PORT = 3000; // Puerto en el que el servidor escuchará
const MARKDOWN_DIR = path.join(__dirname, 'markdown'); // Directorio donde se almacenarán los archivos Markdown

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // Parsear la URL de la petición
    const pathname = parsedUrl.pathname; // Obtener la ruta de la URL
    if (pathname === '/' && req.method === 'GET') {
        // Servir el archivo index.html en la ruta raíz
        serveFile(res, path.join(__dirname, 'public', 'index.html'), 'text/html');
    } else if (pathname.startsWith('/api/files') && req.method === 'GET') {
        if (pathname === '/api/files') {
            // Listar archivos Markdown
            listMarkdownFiles(res);
        } else {
            // Obtener el contenido de un archivo Markdown específico
            const filename = pathname.split('/').pop(); // Obtener el nombre del archivo desde la URL
            readMarkdownFile(res, filename);
        }
    } else if (pathname === '/api/files' && req.method === 'POST') {
        // Crear un nuevo archivo Markdown
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString(); // Recibir datos del cuerpo de la petición
        });
        req.on('end', () => {
          const { filename, content } = JSON.parse(body); // Parsear el cuerpo de la petición como JSON
          createMarkdownFile(res, filename, content);
        });
      } else if (pathname.startsWith('/public') && req.method === 'GET') {
        // Servir archivos estáticos (CSS, JS)
        serveStaticFile(res, pathname);
      } else {
        res.statusCode = 404; // Ruta no encontrada
        res.end('Not Found');
      }
    });

    function serveFile(res, filePath, contentType) {
        // Función para servir archivos
        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.statusCode = 500; // Error al leer el archivo
            res.end('Internal Server Error');
          } else {
            res.setHeader('Content-Type', contentType); // Establecer el tipo de contenido
            res.end(data); // Enviar el contenido del archivo
          }
        });
    }

    function listMarkdownFiles(res) {
        // Función para listar archivos Markdown
        fs.readdir(MARKDOWN_DIR, (err, files) => {
          if (err) {
            res.statusCode = 500; // Error al leer el directorio
            res.end('Internal Server Error');
          } else {
            res.setHeader('Content-Type', 'application/json'); // Establecer el tipo de contenido como JSON
            res.end(JSON.stringify(files.filter(file => file.endsWith('.md')))); // Filtrar y enviar solo los archivos .md
          }
        });
    }

    function readMarkdownFile(res, filename) {
        // Función para leer un archivo Markdown específico
        const filePath = path.join(MARKDOWN_DIR, filename);
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            res.statusCode = 500; // Error al leer el archivo
            res.end('Internal Server Error');
          } else {
            res.setHeader('Content-Type', 'application/json'); // Establecer el tipo de contenido como JSON
            const htmlContent = markdownToHTML(data); // Convertir el contenido Markdown a HTML
            res.end(JSON.stringify({ content: htmlContent })); // Enviar el contenido convertido
          }
        });
    }
    
    function createMarkdownFile(res, filename, content) {
        // Función para crear un nuevo archivo Markdown
        if (!filename || !content) {
          res.statusCode = 400; // Faltan datos en la petición
          res.end('Bad Request');
          return;
        }
        const filePath = path.join(MARKDOWN_DIR, filename);
        fs.writeFile(filePath, content, err => {
          if (err) {
            res.statusCode = 500; // Error al escribir el archivo
            res.end('Internal Server Error');
          } else {
            res.setHeader('Content-Type', 'application/json'); // Establecer el tipo de contenido como JSON
            res.end(JSON.stringify({ message: 'File created successfully' })); // Enviar mensaje de éxito
          }
        });
      }