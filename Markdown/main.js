document.addEventListener('DOMContentLoaded', () => {
    const fileList = document.getElementById('fileList');
    const fileContent = document.getElementById('fileContent');
    const createFileForm = document.getElementById('createFileForm');
    const filenameInput = document.getElementById('filename');
    const fileContentInput = document.getElementById('fileContentInput');
    
  // Función para obtener la lista de archivos Markdown
  function fetchFiles() {
    fetch('/api/files')
      .then(response => response.json()) // Parsear la respuesta como JSON
      .then(files => {
        fileList.innerHTML = ''; // Limpiar la lista de archivos
        files.forEach(file => {
          const li = document.createElement('li');
          li.textContent = file;
          // Crear botón para ver el contenido del archivo
          const viewButton = document.createElement('button');
          viewButton.textContent = 'Ver contenido';
          viewButton.addEventListener('click', () => {
            fetchFileContent(file); // Añadir evento para cargar el contenido del archivo
          });
          li.appendChild(viewButton); // Añadir el botón al lado del nombre del archivo
          fileList.appendChild(li);
        });
      });
    }
    // Evento para crear un nuevo archivo Markdown
  createFileForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir el envío del formulario por defecto
    const filename = filenameInput.value;
    const content = fileContentInput.value;

    fetch('/api/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ filename, content }) // Enviar los datos como JSON
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message); // Mostrar mensaje de éxito
        fetchFiles(); // Actualizar la lista de archivos
      });
  });