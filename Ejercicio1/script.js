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
function myFunction(xhttp){

}