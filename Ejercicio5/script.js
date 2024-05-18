let chartVisible = false;

document.getElementById('toggleChartBtn').addEventListener('click', toggleChartVisibility);

function toggleChartVisibility() {
    chartVisible = !chartVisible;
    const chartContainer = document.getElementById('chartContainer');
    chartContainer.style.display = chartVisible ? 'block' : 'none';

    if (chartVisible) {
        const region1 = document.getElementById('region1Input').value.trim();
        const region2 = document.getElementById('region2Input').value.trim();

        if (!region1 || !region2) {
            alert('Por favor, ingrese ambas regiones.');
            return;
        }

        cargarDatos([region1, region2]).then(data => {
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
    const chartIds = ['chart1', 'chart2'];
    data.forEach((regionData, index) => {
        const ctx = document.getElementById(chartIds[index]).getContext('2d');
        if (ctx.chart) {
            ctx.chart.destroy();  // Limpiar gráfico existente si lo hay
        }
        ctx.chart = new Chart(ctx, {
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
    const chartIds = ['chart1', 'chart2'];
    chartIds.forEach(chartId => {
        const chartCanvas = document.getElementById(chartId);
        if (chartCanvas.chart) {
            chartCanvas.chart.destroy();
        }
    });
}

