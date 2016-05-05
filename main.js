(function(){
	//Definiendo el modelo del tablero
	self.Tablero = function(ancho,alto){
		this.ancho = ancho;//traer el valor del ancho del tablero
		this.alto = alto;//traer el valor del alto del tablero
		this.playing = false; //Instrucción Inicia juego
		this.game_over = false; //intrucción Termina juego
		this.barras = []; //Array con las barras del juego
		this.bola = null; //Array de la posición de la bola
	};

	self.Tablero.prototype = { //Padre del las instrucciones del tablero
		get elementos(){ //Tomando en un json los elementos que estarán en el juego
			var elementos = this.barras; //definiendo las barras
			//elementos.push(this.bola); //cambiando la posición de la bola
			return elementos //Retomando los elemento para cuando sea llamado por el objeto hijo
		}
	};
})();

(function(){
	//Definiendo el modelo de las barras o raquetas
	self.Barras = function(x,y,ancho,alto,tablero){
		this.x = x;
		this.y = y;
		this.ancho = ancho;
		this.alto = alto;
		this.tablero = tablero;
		this.tablero.barras.push(this);
		this.tipo = "rectangulo";
		this.velocidad = 10;
	};

	//Definiendo las funciones del movimiento de las raquetas en un prototype
	self.Barras.prototype = {
		abajo: function(){
			this.y += this.velocidad;
		},
		arriba: function(){
			this.y -= this.velocidad;
		},
		toString: function(){
			return "x " + this.x + " y: " + this.y;
 		}
	};

})();

(function(){
	//Esta es la vista
	self.TableroVista = function(canvas,tablero){
		this.canvas = canvas; //Asinando el argumento de que espera dibujar el elemnto en el dom
		this.canvas.width = tablero.ancho; //definiendo ancho traido desde el main
		this.canvas.height = tablero.alto; //definiendo alto traido desde el main
		this.tablero = tablero //Invocando a satán, digo, digo, trayendo el constructor del main
		this.contexto = canvas.getContext("2d") //Dandole el contexto al canvas del dom
	};

	self.TableroVista.prototype = {
		dibujar: function(){
			for (var i = this.tablero.elementos.length - 1; i >= 0; i--) {
				var elem = this.tablero.elementos[i];
				dibujar(this.contexto,elem);
			}
		}
	};

	function dibujar(contexto, elementos){
		switch(elementos.tipo){
			case "rectangulo":{
				contexto.fillRect(elementos.x, elementos.y, elementos.ancho, elementos.alto);
				break;
			}
		}
	}
})();

//window.addEventListener("load",controlador); //Empezando el programa

window.requestAnimationFrame(controlador);

function controlador(){ //Programa y controlador principal

	var tablero = new Tablero(900,500); //mandando los valores al contructor del tablero
	var barra = new Barras(20, 100, 30, 150, tablero);
	var barra_2 = new Barras(850, 100, 30, 150, tablero)
	var canvas = document.getElementById("canvas");//creando el canvas en el dom
	var tableroVista = new TableroVista(canvas,tablero); //Mandando el dibujo y el tamaño de canvas

	document.addEventListener("keydown", function(eve) {
		eve.preventDefault();

		if(eve.keyCode == 87){
			barra.arriba();
		}
		else if(eve.keyCode == 83){
			barra.abajo();
		}

		else if(eve.keyCode == 38){
			barra_2.arriba();
		}
		else if(eve.keyCode == 40){
			barra_2.abajo();
		}

		console.log(""+barra);
		console.log(""+barra_2);

	});

	tableroVista.dibujar();
	//window.requestAnimationFrame(controlador)
}
