document.getElementById('loadDataBtn').addEventListener('click', function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json', true); // Cambia la URL según tu necesidad
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('data').innerText = xhr.responseText;
        } else {
            console.error('Error al cargar los datos');
        }
    };
    xhr.send();
});
