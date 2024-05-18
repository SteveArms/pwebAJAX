let chartVisible = false;

document.getElementById('toggleChartBtn').addEventListener('click', toggleChartVisibility);

function toggleChartVisibility() {
    chartVisible = !chartVisible;
    const chartCanvas = document.getElementById('myChart');
    chartCanvas.style.display = chartVisible ? 'block' : 'none';

    if (chartVisible) {
        const regionesInput = document.getElementById('regionesInput').value;
        const regiones = regionesInput.split(',').map(region => region.trim());
        
        if (regiones.length !== 4) {
            alert('Por favor, ingrese exactamente cuatro regiones separadas por comas.');
            return;
        }

        cargarDatos(regiones).then(data => {
            limpiarGraficos();
            mostrarGraficos(data);
        });
    } else {
        limpiarGraficos();
    }
}

function cargarDatos(regiones) {
    return fetch('data.json').then(response => response.json())
                             .then(data => data.filter(region => regiones.includes(region.region)));
}

function mostrarGraficos(data) {
    data.forEach((regionData, index) => {
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
                labels: regionData.confirmed.map(entry => entry.date),
                datasets: [{
                    label: `Valores para ${regionData.region}`,
                    data: regionData.confirmed.map(entry => parseInt(entry.value)),
                    borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    });
}

function limpiarGraficos() {
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => container.remove());
}

