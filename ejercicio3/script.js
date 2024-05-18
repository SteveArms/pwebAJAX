function cargarDatos() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => mostrarTop10Regiones(data))
        .catch(error => console.error('Error al cargar los datos:', error));
}

