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
function mostrarGrafico(fechas, valores) {
    document.getElementById('chartContainer').style.display = 'block';

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: fechas,
            datasets: [{
                label: 'Valores para la Región de Arequipa',
                data: valores,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
