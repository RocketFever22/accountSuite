var title = document.getElementById("sectionTitle");

var titulos = {
	"ingresar" : "Nuevo Ingreso",
	"listar" : "Movimientos",
	"estadisticas" : "Estadisticas"
}

var movimientos = [];

function activarSeccion(seccion){

  var secciones = document.getElementsByTagName("section");
  
  for(var i = 0; i < secciones.length; i++){
  	var name = secciones[i].getAttribute("name");
  	if(name === seccion){
  		secciones[i].className = "";
  	} else {
  		secciones[i].className = "hidden";
  	}
  }

  title.innerHTML = titulos[seccion];
}

function popularTabla(movimientos){
	var tablaListado = document.getElementsByName("listadoMovimientos")[0];
	var montoTotal = document.getElementById("montoTotal");
	var signo = {
		"ingreso" : "color:blue;",
		"egreso" : "color:red;"
	}
	tablaListado.innerHTML = "";

	if(movimientos.length > 0){
		for(var i = 0; i < movimientos.length; i++){
			tablaListado.innerHTML += "<tr style="+signo[movimientos[i].tipo]+"><td> "+movimientos[i].monto+"</td><td>"+movimientos[i].concepto+"</td></tr>";	
		}
	}

	montoTotal.innerHTML = "Balance: " + obtenerTotal(movimientos);
	
}

function obtenerTotal(movimientos){
	var total = 0;
	for(var i = 0; i < movimientos.length; i++){
		if(movimientos[i].tipo === "ingreso"){
			total = parseFloat(total) + parseFloat(movimientos[i].monto);
		} else {
			total = parseFloat(total) - parseFloat(movimientos[i].monto);
		}
	}
	return total.toFixed(2);
}

function crearMovimiento(event){
	event.preventDefault();
	var formulario = event.target;
	var movimiento = {
		"monto" : 0,
		"tipo" : "ingreso",
		"concepto" : ""
	}

	for(var i = 0; i < formulario.length - 1 ; i++){
		let nombreCampo = formulario[i].getAttribute("name");

		if(nombreCampo === "monto"){
			formulario[i].value = parseFloat(formulario[i].value).toFixed(2);
		}

		if(nombreCampo === "tipo"){
			if(formulario[i].checked){
				movimiento[nombreCampo] = formulario[i].value;
			}
		} else {
			movimiento[nombreCampo] = formulario[i].value;	
		}

	
	}

	movimientos.push(movimiento);
	popularTabla(movimientos);
	console.log(movimientos);

	//console.log(transaccion);
}
