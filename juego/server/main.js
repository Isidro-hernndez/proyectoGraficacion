var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);

server.listen(3000,function(){
	console.log('Servidor corriendo en http://localhost:3000');
}); 

var clientes = 0;
var kike = false;
var donald = false;

var pasos_kike = 0;
var pasos_donald = 0;
var puntaje_kike = 0;
var puntaje_donald = 0;
var porcentaje_kike = 0;
var porcentaje_donald = 0;

io.on('connection', function(socket){

	socket.on('conexion',function(){
		clientes +=1;
		console.log('Un cliente se ha conectado_'+ clientes);
	});

	socket.on('pedirPersonaje',function(personaje, callback){
		console.log(personaje);
		if((donald != true)&&(personaje=='donald')){
			donald = true;
			callback('donald');   
		}else{
			if((kike != true)&&(personaje == 'kike')){
				kike = true;
				callback('kike');   
			}else{
				if((donald == true)&&(kike == true)){
					callback('nohaymas'); 
				}else{
					callback('yaseeligio');   
				}
			}
		}
	});

	socket.on('actualizar_pasos',function(personaje, pasos, puntaje){
		if(personaje == 'donald'){
			pasos_donald = pasos; 
			puntaje_donald = puntaje;
		}else{
			pasos_kike = pasos;
			puntaje_kike = puntaje;
		}
	});

	socket.on('pedirPorcentajeDonald',function(callback){
			porcentaje_donald = Math.floor((pasos_donald * 100)/1600);
			if(porcentaje_donald > 100){
				callback(100); 
			}else{
				callback(porcentaje_donald); 
			}
			
	});

	socket.on('pedirPorcentajeKike',function(callback){
			porcentaje_kike = Math.floor((pasos_kike * 100)/1600);
			if(porcentaje_kike > 100){
				callback(100); 
			}else{
				callback(porcentaje_kike); 
			}
	});

	socket.on('pedirGanador',function(callback){
		var total_kike = Math.floor((porcentaje_kike + puntaje_kike)/2);
		var total_donald = Math.floor((porcentaje_donald + puntaje_donald)/2);

		if(total_kike > total_donald){
			callback('kike'); 
		}else{
			if(total_donald > total_kike){
				callback('donald'); 
			}else{
				if(total_donald == total_kike){
					callback('empate');
				}
			}
		}

	});

	socket.on('pedirLugar',function(personaje){
		var total_kike = Math.floor((porcentaje_kike + puntaje_kike)/2);
		var total_donald = Math.floor((porcentaje_donald + puntaje_donald)/2);
		var lugar = 0;

		if(personaje == 'donald'){
			if(total_donald > total_kike){
				lugar = 1;
			}else{
				if(total_donald < total_kike){
					lugar = 2;
				}
			}
		}
		if(personaje == 'kike'){
			if(total_kike > total_donald){
				lugar = 1;
			}else{
				if(total_kike < total_donald){
					lugar = 2;
				}
			}
		}
	    socket.emit('decirLugar',lugar);
	});

	socket.on('desconectar',function(personaje){
		if(personaje = 'donald'){
			donald = false;
			pasos_donald =0;
			porcentaje_donald = 0;
			puntaje_donald = 0;
		}else{
			kike = false;
			pasos_kike =0;
			porcentaje_kike = 0;
			puntaje_kike = 0;
		}	
	});

	
});



