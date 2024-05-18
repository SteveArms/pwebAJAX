function loadTable(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.status == 200 && this.readyState == 4){
            // Ejecutar una función cuando la solicitud esté completa y sea exitosa
            myFunction(this);
        }
    }
    xhttp.open("GET" , "data.json", true);
    xhttp.send();
}
//Utilizaremos el mismo script del Ejercicio 1 pero modificaremos la entrada de datos por Nro Fallecidos
function myFunction(xhttp){
    var responseJSON = JSON.parse(xhttp.responseText);
    var table = "<tr><th> Region </th><th> Nro Fallecidos </th></tr>"
    for(var i = 0; i < responseJSON.length; i++){
        var regiones = responseJSON[i];
        var region = regiones.region;
        var dateRegion = regiones.confirmed;
        table += "<tr><td>" + region + "</td><td>";
        table += dateRegion.length + "</td></tr>";
    }
    document.getElementById("demo").innerHTML = table;
}
