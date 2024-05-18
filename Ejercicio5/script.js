let chartVisible = false;
let myChart;

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
            mostrarGrafico(data);
        });
    } else {
        if (myChart) {
            myChart.destroy();
        }
    }
}

function cargarDatos(regiones) {
    return fetch('data.json').then(response => response.json())
                             .then(data => data.filter(region => regiones.includes(region.region)));
}

function mostrarGrafico(data) {
    const ctx = document.getElementById('myChart').getContext('2d');

    if (myChart) {
        myChart.destroy();
    }

    const labels = data[0].confirmed.map(entry => entry.date);
    const datasets = data.map((regionData, index) => ({
        label: `Valores para ${regionData.region}`,
        data: regionData.confirmed.map(entry => parseInt(entry.value)),
        borderColor: index === 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(192, 75, 75, 1)',
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

