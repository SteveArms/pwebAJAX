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

function limpiarGrafico() {
    const ctx = document.getElementById('myChart').getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

