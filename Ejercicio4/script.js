document.getElementById('mostrarGraficoBtn').addEventListener('click', cargarDatos);

function cargarDatos() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const arequipaData = data.find(region => region.region === 'Arequipa');
            if (!arequipaData) throw new Error('No se encontraron datos para la región de Arequipa.');

            const fechas = arequipaData.confirmed.map(entry => entry.date);
            const valores = arequipaData.confirmed.map(entry => parseInt(entry.value));

            mostrarGrafico(fechas, valores);
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}
