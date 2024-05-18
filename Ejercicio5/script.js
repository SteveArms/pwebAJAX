let chartVisible = false;

document.getElementById('toggleChartBtn').addEventListener('click', toggleChartVisibility);

function toggleChartVisibility() {
    chartVisible = !chartVisible;
    const chartCanvas = document.getElementById('myChart');
    chartCanvas.style.display = chartVisible ? 'block' : 'none';

    if (chartVisible) {
        const regionesInput = document.getElementById('regionesInput').value;
        const regiones = regionesInput.split(',').map(region => region.trim());
        cargarDatos().then(data => mostrarGraficos(data, regiones));
    } else {
        limpiarGraficos();
    }
}

function cargarDatos() {
    return fetch('data.json').then(response => response.json());
}

function mostrarGraficos(data, regiones) {
    regiones.forEach(region => {
        const regionData = data.find(r => r.region === region);
        if (regionData) {
            const fechas = regionData.confirmed.map(entry => entry.date);
            const valores = regionData.confirmed.map(entry => parseInt(entry.value));
            mostrarGrafico(region, fechas, valores);
        } else {
            console.error(`No se encontraron datos para la región de ${region}.`);
        }
    });
}

function mostrarGrafico(region, fechas, valores) {
    const chartContainer = document.createElement('div');
    chartContainer.classList.add('chart-container');
    document.body.appendChild(chartContainer);

    const chartCanvas = document.createElement('canvas');
    chartCanvas.classList.add('chart-canvas');
    chartContainer.appendChild(chartCanvas);

    const ctx = chartCanvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: fechas,
            datasets: [{
                label: `Valores para ${region}`,
                data: valores,
                borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
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

function limpiarGraficos() {
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => container.remove());
}

