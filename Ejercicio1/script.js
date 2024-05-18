//Implementaremos la funcion loadTable para hacer una solicitud al JSON en el cual analizara si es exitosa
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
//Empleamos una funcion la cual retornara los datos respectivos de una tabla 
function myFunction(xhttp){
    var responseJSON = JSON.parse(xhttp.responseText);
    var table = "<tr><th> Region </th><th> Fallecidos </th></tr>"
    for(var i = 0; i < responseJSON.length; i++){
        var regiones = responseJSON[i];
        var region = regiones.region;
        var dateRegion = regiones.confirmed;
        table += "<tr><td>" + region + "</td></td>";
        for(var j = 0; j < dateRegion.length; j++){
            var date = dateRegion[j].date ;
            table += date + "<br>";
        }
        table += "</td></tr>";
    }
    document.getElementById("demo").innerHTML = table;
}