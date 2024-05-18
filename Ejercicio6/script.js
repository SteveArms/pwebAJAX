let chartVisible = false;
let myChart;

document.getElementById('toggleChartBtn').addEventListener('click', toggleChartVisibility);

function toggleChartVisibility() {
    chartVisible = !chartVisible;
    const chartContainer = document.getElementById('chartContainer');
    chartContainer.style.display = chartVisible ? 'block' : 'none';

    if (chartVisible) {
        cargarDatos().then(data => {
            mostrarGrafico(data);
        });
    } else {
        if (myChart) {
            myChart.destroy();
        }
    }
}function cargarDatos() {
    return fetch('data.json').then(response => response.json())
                             .then(data => data.filter(region => region.region !== 'Lima' && region.region !== 'Callao'));
}

function mostrarGrafico(data) {
    const ctx = document.getElementById('myChart').getContext('2d');

    if (myChart) {
        myChart.destroy();
    }

    const labels = data[0].confirmed.map(entry => entry.date);
    const datasets = data.map(regionData => ({
        label: `Valores para ${regionData.region}`,
        data: regionData.confirmed.map(entry => parseInt(entry.value)),
        borderColor: getRandomColor(),
        borderWidth: 1
    }));

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
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
