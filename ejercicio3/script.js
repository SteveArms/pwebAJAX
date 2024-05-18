function cargarDatos() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => mostrarTop10Regiones(data))
        .catch(error => console.error('Error al cargar los datos:', error));
}
function mostrarTop10Regiones(data) {
    // Calcular la suma total para cada región
    const regionSum = {};
    data.forEach(region => {
        const totalConfirmed = region.confirmed.reduce((sum, entry) => sum + parseInt(entry.value), 0);
        regionSum[region.region] = totalConfirmed;
    });

    // Ordenar las regiones por su suma total en orden descendente
    const sortedRegions = Object.entries(regionSum).sort((a, b) => b[1] - a[1]);

    // Mostrar las 10 regiones con la suma total más alta
    const top10List = document.getElementById('topRegionsList');
    sortedRegions.slice(0, 10).forEach(([region, total]) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${region}: ${total}`;
        top10List.appendChild(listItem);
    });
}

