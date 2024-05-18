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
