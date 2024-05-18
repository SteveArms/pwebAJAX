function onloadGraphic(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.status == 200 && xhttp.readyState == 4){
            var responseJSON = JSON.parse(xhttp.responseText);
            graficar(responseJSON);         
        }
    }
    xhttp.open("GET", "data.json", true);
    xhttp.send();
}
function graficar(regiones){
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(valoresTabla(regiones));

        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
                        { calc: "stringify",
                            sourceColumn: 1,
                            type: "string",
                            role: "annotation" },
                        2]);

        var options = {
            title: "Casos confirmados en todos menos Lima y Callao",
            width: 800,
            height: 600,
            bar: {groupWidth: "95%"},
            legend: { position: "none" },
        };
        var chart = new google.visualization.BarChart(document.getElementById("grafico"));
        chart.draw(view, options);
    }
}

function valoresTabla(regiones) {
    const valores = [];
    valores.push(["Region", "Confirmados", { role: "style" }]);
    
    const regionesFiltradas = regiones.filter(region => region.region != "Lima" && region.region != "Callao");
    
    for (let i = 0; i < regionesFiltradas.length; i++) {
        const nombreRegion = regionesFiltradas[i].region;
        const listaValores = regionesFiltradas[i].confirmed;
        let suma = 0;
        for (let j = 0; j < listaValores.length; j++) {
            suma += parseInt(listaValores[j].value); // Asumiendo que listaValores[j] es un número
        }
        console.log(`Región: ${regionesFiltradas[i].region}, Suma: ${suma}`);
        valores.push([regionesFiltradas[i].region, suma, colorRandom()]); // Utiliza regionesFiltradas[i] aquí      
    }
    return valores;
}


function colorRandom() {  
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
