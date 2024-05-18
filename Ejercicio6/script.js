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
}
