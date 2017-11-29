var URLactual = window.location.hostname;

URLactual = URLactual+':3000';

console.log(URLactual);

var socket = io.connect(URLactual, {'forceNew': true });

//var socket = io.connect('http://localhost:8080', { 'forceNew': true });

socket.on('conexion', function(data) {  
    console.log(data);
});
