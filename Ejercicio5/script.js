let chartVisible = false;

document.getElementById('toggleChartBtn').addEventListener('click', toggleChartVisibility);

function toggleChartVisibility() {
    chartVisible = !chartVisible;
    const chartCanvas = document.getElementById('myChart');
    chartCanvas.style.display = chartVisible ? 'block' : 'none';

    if (chartVisible) {
        cargarDatos().then(data => mostrarGrafico(data));
    } else {
        limpiarGrafico();
    }
}
function cargarDatos() {
    return fetch('data.json').then(response => response.json());
}
function mostrarGrafico(data) {
    const regiones = data.map(region => region.region);
    const fechas = data[0].confirmed.map(entry => entry.date);
    const valoresPorRegion = {};
    regiones.forEach(region => {
        const valores = data.find(r => r.region === region).confirmed.map(entry => parseInt(entry.value));
        valoresPorRegion[region] = valores;
    });
    
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: fechas,
            datasets: regiones.map(region => ({
                label: region,
                data: valoresPorRegion[region],
                borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
                borderWidth: 1
            }))
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
function limpiarGrafico() {
    const ctx = document.getElementById('myChart').getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

