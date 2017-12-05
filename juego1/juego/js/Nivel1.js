Game.Nivel1 = function(game) {};

var player;
var platforms;
var cursors;
var back1;
var back2;
var stars;
var enemigos;
var score = 0;
var scoreText;
var meta, meta2;
var pasos =0;
var banderaMeta = false;
var energia = 100.0;
var corazones;
var reloj;
var cont_vidas = 2;
var timer = 0;
var text_timer;
var clocktimer;
var clockseconds;
var colision;
var a_enemigos = [150,200,310,395,550,800,850,925,1000,1029,1099,1400];
var avance_text;
var lugar_t = 'algo';
var personaje = '';
var btn_pause;
var t_pause;
var btn_siguiente;

Game.Nivel1.prototype = {
	
	create:function(game) {

	    //  Utilizar Arcade Physics system
	    this.physics.startSystem(Phaser.Physics.ARCADE);

	    //  BACKGROUND 
		    back1 = this.add.tileSprite(0, 0, 1024,600, 'desierto-back');
		    back2 = this.add.tileSprite(0,0, 1024, 600, 'desierto-back2');
		    this.world.setBounds(0, 0, 1024, 600);

	    personaje = 'donald';

	    //  SUELO
		    // Se crea un grupo de plataformas 
		    platforms = this.add.group();
		    //  Habilitar physics para cada objeto creado en el grupo.
		    platforms.enableBody = true;
		    // Se crea el suelo
		    var ground = platforms.create(0, this.world.height - 88, 'ground');
		    //  Escalar el suelo al ancho del juego (el sprite original mide 400x32)
		    ground.scale.setTo(2, 2);
		    //  Inmovilizar el suelo
		    ground.body.immovable = true;


	    //  JUGADOR
		    // Configuración del jugador
		    player = this.add.sprite(100, this.world.height - 174, 'donald');
		    //  Agregar physics al jugador
		    this.physics.arcade.enable(player);
		    //  Propiedades del jugador.
		    player.body.bounce.y = 0.2;
		    player.body.gravity.y = 200;
		    player.body.collideWorldBounds = true;
		    //player.anchor.setTo(50,0.5);
		    //  Animaciones izquierda y derecha
		    player.animations.add('left', [0, 1, 2, 3], 10, true);
		    player.animations.add('right', [5, 6, 7, 8], 10, true);


	    //  HERRAMIENTAS PARA GANAR PUNTOS
		    //  crear grupo de herramientas (*Despues cambiar variable agua por tool)
		    stars = this.add.group();
		    //  Habilitar physics para cada objeto creado en el grupo.
		    stars.enableBody = true;

		    //  Se crean 12 herramientas en el juego (se va creando una por una aleatoriamente)
		    for (var i = 1; i < 12; i++)
		    {
		        //  Crear una herramienta en el grupo de herramientas
		        var star = stars.create( (i * 500)+ Math.random()*100, 400+ Math.random()*100, 'agua');
		        star.events.onOutOfBounds.add(resetTool, this);
		        star.body.velocity.x = 0; //velocidad 
		    }

	    // ENEMIGOS
		    enemigos = this.add.group();
		    enemigos.enableBody = true;


	    //  PUNTAJE
	    	scoreText = this.add.text(250, 30, 'Puntaje: 0', { font: "20px Arial", fill: "#000" });

	    //  CONTROLES
	    	cursors = this.input.keyboard.createCursorKeys();
	    
	    //ENCABEZADO
	    	//var encabezado = this.add.text(20, 30, 'Rey Donald- Nivel 1/4', { font: "20px Arial", fill: "#000" });

	    // PUNTAJES
	    	// Avance contrario
			/*avance_text = this.add.text(680, 100, 'Kike:', { font: "20px Arial", fill: "#000" });
			lugar = this.add.text(730, 60, '1er', { font: "28px Arial", fill: "#1c0c62" });
			lugar.font = 'Arial';
			lugar.fontWeight = 'bold';*/

		    // Energia
		    var rayito = this.add.image(600, 30, 'rayo');
		    var barConfig = {x: 700, y: 40, width: 150, height: 20};
		    this.myHealthBar = new HealthBar(this.game, barConfig);
		    this.myHealthBar.setPercent(energia); 

		    // Vidas
		    	corazones = this.add.group();
		    	corazones.enableBody = true;
		    	var cont_cora = 0;

		    	for (var i = 1; i < 4; i++)
			    {
			        //  Crear cada corazón
			        var corazon = corazones.create(510+ cont_cora, 30, 'corazon');
			        cont_cora +=25; 
			    }
			// Tiempo
			reloj = this.add.image(420, 22, 'reloj');
			text_timer = this.add.text(450, 30, 'Timer', { font: "20px Arial", fill: "#000" });

			clocktimer = this.time.create(false);
			clocktimer.loop(Phaser.Timer.SECOND, updateDisplay,this);

			initClock();

		//BOTONES
		
		//Boton music
            btn_music = this.createButton(game, 'boton-musica', 50, this.world.height - 40, 0.8, function (){ 
                //this.state.start('MainPersonaje');
                if(b_music == false){
                    music.resume();
                    b_music = true;
                    btn_music.loadTexture('boton-musica',0);
                }else{
                    music.pause();
                    b_music = false;
                    btn_music.loadTexture('boton-nomusica',0);
                }
            });
            btn_music.onInputOver.add(fnt_btn_over, this);
            btn_music.onInputOut.add(fnt_btn_out, this);

         //Boton Pause
         	btn_pause = this.createButton(game, 'boton-pause', 110, this.world.height - 40, 0.8, function (){ 
               game.paused = true;
               t_pause = game.add.text(game.world.centerX-150, game.world.centerY-100, "PAUSE", { font: "50px Arial", fill: "#B51313" });
            });
            btn_pause.onInputOver.add(fnt_btn_over, this);
            btn_pause.onInputOut.add(fnt_btn_out, this);

            game.input.onDown.add(unpause, self);

            function unpause(event){
				if(game.paused){
				game.paused = false;
				t_pause.destroy();
				}
			}
	},

	update: function(game) {

        //  Coliciones
		    this.physics.arcade.collide(player, platforms);
		    this.physics.arcade.collide(stars, platforms);
		    this.physics.arcade.collide(enemigos, platforms);

		    //  Checar si el jugador coliciona con alguna herramienta y llamar a collectStar
		    this.physics.arcade.overlap(player, stars, collectStar, null, this);
		    this.physics.arcade.overlap(player, enemigos, collectEnemigo, null, this);

		    //  Reset the players velocity (movement)
		    //player.body.velocity.x = 0;

		    //Actualizar milugar y porcentaje contrario
		    //pedirLugar(personaje);
		    //porcentaje_kike();

		    if(a_enemigos.indexOf(pasos) >= 0 ){
		    	var enemigo = enemigos.create( 1000+this.rnd.integerInRange(1, 100) , this.world.height - 135, 'enemigo'+this.rnd.integerInRange(1, 3));
		    }

		    // Si los pasos son mayores a 3000 y bandera es diferente de verdadero
			    if( pasos > 1500 && banderaMeta!=true){
			        //Agregar la meta
			        meta2 = this.add.sprite(1000, this.world.height - 217, 'meta');
			        meta = this.add.sprite(1000, this.world.height - 217, 'meta');			         
			        this.physics.arcade.collide(player, meta);
			  
			        //agregarle propiedades a la meta
			        this.physics.arcade.enable(meta);
			        this.physics.arcade.enable(meta2);  
			        meta.body.velocity.x = 0;
			        meta2.body.velocity.x = 0; 
			        //cambiar valor de la banderameta
			        banderaMeta = true;
			        //Traer el jugador al frente
			        player.bringToTop();

			    }
		    //////////////

		    //Si no se presiona la tecla izquierda o derecha
			    if(!cursors.left.isDown){
			    	player.body.velocity.x = 0;
			        stars.forEach(function(star) {
			            star.body.velocity.x  = 0;
			        }, this);

			        enemigos.forEach(function(enemigo) {
			            enemigo.body.velocity.x  = 0;
			        }, this);

			        if(pasos > 1501 || banderaMeta == true){
			            meta.body.velocity.x = 0;
			            meta2.body.velocity.x = 0;
			        }
			    }
			     if(!cursors.right.isDown){
			       stars.forEach(function(star) {
			            star.body.velocity.x  = 0;
			        }, this);

			       enemigos.forEach(function(enemigo) {
			            enemigo.body.velocity.x  = 0;
			        }, this);

			        if(pasos > 1501 || banderaMeta == true){
			            meta.body.velocity.x = 0;
			            meta2.body.velocity.x = 0;
			        }
			    }
		    ///////////

		    //Si se presiona la tecla izquierda
		    if (cursors.left.isDown)
		    {
		    	player.body.velocity.x = 0;
		        player.animations.play('left');
		        back1.tilePosition.x +=3;
		        back2.tilePosition.x +=4;
		        pasos-=1;
		        socket.emit('actualizar_pasos','donald',pasos, score);

		        if(energia > 0)
		        	energia -= 0.050;

		        if(banderaMeta == true){
		            meta.body.velocity.x = 150;
		            meta2.body.velocity.x = 150; 
		        }
		        
		        stars.forEach(function(star) {
		            star.body.velocity.x  = 150;
		        }, this);

		        enemigos.forEach(function(enemigo) {
		            enemigo.body.velocity.x  = 150;
		        }, this);
		    }
		    else if (cursors.right.isDown)
		    {
		        //  Move to the right
		        player.body.velocity.x = 10;

		        player.animations.play('right');
		        back1.tilePosition.x -=3;
		        back2.tilePosition.x -=4;
		        pasos+=1;
		        socket.emit('actualizar_pasos','donald',pasos, score);

		        if(energia > 0)
		        energia -= 0.050;

		        if(banderaMeta == true){
		            meta.body.velocity.x = -150; 
		            meta2.body.velocity.x = -150;
		        }


		        stars.forEach(function(star) {
		            star.body.velocity.x  = -150;
		        }, this);

		        enemigos.forEach(function(enemigo) {
		            enemigo.body.velocity.x  = -150;
		        }, this);

		    }
		    else
		    {
		        // Jugador parado
		        player.animations.stop();
		        player.frame = 4;
		    }
		    
		    //  BRINCAR si está tocando el piso
		    if (cursors.up.isDown && player.body.touching.down)
		    {
		    	var jump = game.add.audio('jump');
		    	jump.play();        
		        player.body.velocity.y = -250;
		    }

		    if(banderaMeta == true){
		        this.physics.arcade.overlap(player, meta, collectMeta, null, this);
		    }

		    //Actualizar barra de energia
		    this.myHealthBar.setPercent(energia); 
		
			if(energia <= 0){
				perderVida(game);
			}
		
	},
	createButton: function (game, name, x, y, s, callback){
		var button1 = game.add.button(x,y,name, callback, this,2,1,0);
        button1.scale.set(s,s);

		button1.anchor.setTo(0.5, 0.5);
        
        return button1;

	}
}

function collectStar (player, star) {
    
    // Eliminar la herramienta de la pantalla
    star.kill();

    var energy = this.add.audio('energy');
	energy.play();  

    //  Actualizar score
    score += 10;

    if(energia < 100)
    energia += 10;

    scoreText.text = 'Puntaje: ' + score;

}

function collectEnemigo (player, enemigo) {

	var collision = this.add.audio('collision');
	collision.play();  

    //  Actualizar score y energia 
    player.alpha = 0.1;

    this.time.events.add(Phaser.Timer.SECOND * 0.01, regresarJugador, this);

    if(energia > 0) energia -= 1;

     if(score > 0){
      score -= 1;
      scoreText.text = 'Puntaje: ' + score;
  	}

}

function regresarJugador(){
	player.alpha = 1;
}


function collectMeta (player, meta) {
		
        stars.forEach(function(star) {
            star.kill();
        }, this); 
        
        meta.destroy();

        this.time.events.add(Phaser.Timer.SECOND * 2, finalanimation, this);

      var levelwin = this.add.audio('levelwin');
	  levelwin.play(); 
	  stopClock();
}

function finalanimation(){

      scoreText.text = 'FINISH';
      var background = this.add.sprite(0, 0, 'finnivel');

      var t_nivelsup = this.add.text(this.world.centerX-200, 50, 'Nivel 1', { font: "50px Arial", fill: "#FFF" });
      var t_sup = this.add.text(this.world.centerX-225, 120, '¡Superado!', { font: "40px Arial", fill: "#FFF" });

      var t_energia = this.add.text(200, 200, 'Energia:', { font: "22px Arial", fill: "#FFF" });
      var barConfig = {x: 400 , y: 215, width: 150, height: 20};
      var rayito2 = this.add.image(300, 205, 'rayo');
	  this.myHealthBar = new HealthBar(this.game, barConfig);
	  this.myHealthBar.setPercent(energia);

	  var t_cora = this.add.text(200, 280, 'Vidas:', { font: "22px Arial", fill: "#FFF" });
	  var corazones2 = this.add.group();
	   corazones2.enableBody = true;

	  var cont_cora =0;

	  for (var i = 0; i <= cont_vidas; i++)
	  {
	       //  Crear cada corazón
	       var corazon = corazones2.create(280+ cont_cora, 285, 'corazon');
	       cont_cora +=25; 
	  }

	  var t_tiempo = this.add.text(200, 350, 'Tiempo:', { font: "22px Arial", fill: "#FFF" });
	  reloj.x = 300; reloj.y = 350;
	  reloj.bringToTop();
	  text_timer = this.add.text(345, 358, 'Timer', { font: "20px Arial", fill: "#FFF" });
	  var minutes = Math.floor(clockseconds / 60);
	  var seconds = (clockseconds - minutes * 60);
	  text_timer.text = (("0"+minutes).substr(-2) + ":" + ("0"+seconds).substr(-2));

	  var t_puntaje = this.add.text(200, 400, 'Puntaje: '+ score, { font: "22px Arial", fill: "#FFF" });
	  pedirLugar(personaje);
	  var t_lugar = this.add.text(300,450, lugar_t, { font: "35px Arial", fill: "#FFF" });

         //Boton siguiente
         	btn_siguiente = this.createButton(this, 'boton-siguiente', 700, 500, 0.8, function (){ 
             	this.state.start('MainMenu');
             	socket.emit('desconectar',personaje);
            });
            btn_siguiente.onInputOver.add(fnt_btn_over, this);
            btn_siguiente.onInputOut.add(fnt_btn_out, this);
}

function resetTool(tool){
    tool.reset(0,tool.y);
    tool.body.velocity.x = 50-Math.random()*200;
}

function perderVida(game){
	if(cont_vidas < 0){
		//HA PERDIDO
	}
	if(cont_vidas >= 0){
		corazones.children[cont_vidas].destroy();
		cont_vidas -= 1;
		energia = 100;

		player.alpha = 0;
    	game.time.events.add(Phaser.Timer.SECOND * 3, regresarJugador, this);
	}
}

function initClock(){
	clockseconds = 0;

	updateDisplay();

	clocktimer.start();
}

function stopClock(){
	clocktimer.stop();
}

function updateDisplay(){
	clockseconds = clockseconds +1;

	var minutes = Math.floor(clockseconds / 60);

	var seconds = (clockseconds - minutes * 60);

	text_timer.text = (("0"+minutes).substr(-2) + ":" + ("0"+seconds).substr(-2)); 

}

function porcentaje_kike(){
   socket.emit('pedirPorcentajeKike',function(data){
 		avance_text.text = 'Kike: '+ data+ "%";
   });
}

function pedirLugar(personaje){
 socket.emit('pedirLugar',personaje);
}

/*socket.on('decirLugar', function(data){
	if(data == 1){
 			lugar.text = '1er';
 			lugar_t = '¡GANADOR!';
 	}else{
 		if(data == 2){
 			lugar.text = '2do';
 			lugar_t = '¡2do LUGAR!';
 		}else{
 			lugar.text = '2do';
 			lugar_t = '¡EMPATE! Vuelvan a jugar';
 		} 			
 	}
})*/;






