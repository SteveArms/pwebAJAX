
function onloadGraphic(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.status == 200 && xhttp.readyState == 4){
            var responseJSON = JSON.parse(xhttp.responseText);
            var region1 = parseInt(document.getElementById('region1').value);
            var region2 = parseInt(document.getElementById('region2').value);
            
            graficar1(responseJSON, region1, region2);
            graficar2(responseJSON, region1, region2);
            graficar3(responseJSON, region1, region2);
            graficar4(responseJSON, region1, region2);
        }
    }
    xhttp.open(GET, data.json, true);
    xhttp.send();
}
function graficar1(response, region1, region2){
    var datosRegion1 = response[region1];
    var datosRegion2 = response[region2];
    var suma1 = suma(datosRegion1.confirmed);
    var suma2 = suma(datosRegion2.confirmed);
    google.charts.load('current', {'packages'['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart(){
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'R egiones ');
        data.addColumn('number', 'Casos Confirmados ');
        data.addRows([
            [datosRegion1.region , suma1],
            [datosRegion2.region , suma2]
        ]);
        var options = {'title''Comparacion de Confirmados',
                        'width'400,
                        'height'300};
        
        var chart = new google.visualization.PieChart(document.getElementById('confirmados'));
        chart.draw(data, options);
    }
}
function graficar2(response, region1, region2){
    var datosRegion1 = response[region1];
    var datosRegion2 = response[region2];
    var suma1 = suma(datosRegion1.confirmed);
    var suma2 = suma(datosRegion2.confirmed);
    google.charts.load(current, {packages[corechart]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
            [Regiones, Recover, { role style } ],
            [datosRegion1.region, suma1, #b87333],
            [datosRegion2.region, suma2, silver]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc stringify,
                         sourceColumn 1,
                         type string,
                         role annotation },
                       2]);

      var options = {
            title Cantidad de confirmados,
            width 600,
            height 400,
            bar {groupWidth 95%},
            legend { position none },
      };
      var chart = new google.visualization.BarChart(document.getElementById(confirmados_2));
      chart.draw(view, options);
  }
}
function graficar3(response, region1, region2){
    var datosRegion1 = response[region1];
    var datosRegion2 = response[region2];
    var suma1 = suma(datosRegion1.confirmed);
    var suma2 = suma(datosRegion2.confirmed);
    google.charts.load(current, {packages['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            [Region, Death, { role style } ],
            [datosRegion1.region, suma1, #b87333],
            [datosRegion2.region, suma2, silver]
        ]);
      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc stringify,
                         sourceColumn 1,
                         type string,
                         role annotation },
                       2]);

      var options = {
            title Cantidad de confirmados ,
            width 600,
            height 400,
            bar {groupWidth 95%},
            legend { position none },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById(confirmados_3));
      chart.draw(view, options);
  }
}
function suma(valores){
    var res = 0;
    for(var i = 0; i  valores.length; i++){
        res += parseInt(valores[i].value);
    }
    return res;
}
