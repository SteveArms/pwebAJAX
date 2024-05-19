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