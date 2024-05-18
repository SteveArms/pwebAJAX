document.getElementById('mostrarGraficoBtn').addEventListener('click', function() {
    cargarDatos().then(data => {
        const arequipaData = data.find(region => region.region === 'Arequipa');
        if (!arequipaData) {
            console.error('No se encontraron datos para la región de Arequipa.');
            return;
        }

        const fechas = arequipaData.confirmed.map(entry => entry.date);
        const valores = arequipaData.confirmed.map(entry => parseInt(entry.value));

        mostrarGrafico(fechas, valores);
    }).catch(error => console.error('Error al cargar los datos:', error));
});

function cargarDatos() {
    return fetch('data.json')
        .then(response => response.json());
	console.log("SI funciona");
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

