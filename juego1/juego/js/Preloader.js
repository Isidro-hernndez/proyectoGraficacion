Game.Preloader = function (game) {
	this.preloadBar = null;
};

var music;

Game.Preloader.prototype = {
	preload: function () {

		//Progress_bar de inicio
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');

		this.preloadBar.anchor.setTo(0.5,0.5);

		this.time.advancedTiming = true;

		this.load.setPreloadSprite(this.preloadBar);

		//Carga imagenes de fondo
		this.load.image('background', 'assets/menu/fondo-muralla.png');
		//this.load.image('spacefield', 'assets/backgrounds/spacebackground.png');
		this.load.image('sky', 'assets/sky.png');
		this.load.image('bgmodal', 'assets/menu/bgmodal.png'); //menumodal
		this.load.image('controles', 'assets/menu/controles.png'); //menumodal
   		this.load.image('desierto-back', 'assets/desierto/desierto-back.png'); //desierto1
    	this.load.image('desierto-back2', 'assets/desierto/desierto-back2.png'); //desierto2
   		this.load.image('town-back', 'assets/town/back1town.png'); //town1
    	this.load.image('town-back2', 'assets/town/back2town.png'); //town2

    	this.load.image('finnivel','assets/fin_nivel/fondo_finnivel.png');
    	this.load.image('fondopersonaje','assets/menu_personaje/fondopersonaje.png');

		//Carga botones de la ui
		this.load.image('btn_play', 'assets/menu/boton-jugar.png');
		this.load.image('btn_donald', 'assets/menu_personaje/btn_donald.png');
		this.load.image('btn_kike', 'assets/menu_personaje/btn_kike.png');
		this.load.image('boton-ayuda', 'assets/menu/boton-ayuda.png');
		this.load.image('boton-info', 'assets/menu/boton-info.png');
		this.load.image('boton-musica', 'assets/menu/boton-musica.png');
		this.load.image('boton-nomusica', 'assets/menu/boton-nomusica.png');
		this.load.image('boton-pause', 'assets/menu/boton-pause.png');
		this.load.image('boton-regresar', 'assets/menu_personaje/boton-regresar.png');
		this.load.image('boton-siguiente', 'assets/fin_nivel/boton_siguiente.png');
       
        
        //Carga jugador y obstaculos
    	this.load.image('ground', 'assets/desierto/platform.png');
    	this.load.image('ground2', 'assets/town/platform.png');
    	this.load.image('agua', 'assets/agua.png');
	    	//Donald
	    	this.load.image('enemigo1', 'assets/desierto/enemigo1.png');
	    	this.load.image('enemigo2', 'assets/desierto/enemigo2.png');
	    	this.load.image('enemigo3', 'assets/desierto/enemigo3.png');
	    	//Kike
	    	this.load.image('enemigo1_kike', 'assets/town/enemigo1.png');
	    	this.load.image('enemigo2_kike', 'assets/town/enemigo2.png');
	    	this.load.image('enemigo3_kike', 'assets/town/enemigo3.png');

    	this.load.spritesheet('donald', 'assets/donald.png', 32, 48);
    	this.load.spritesheet('kike', 'assets/kike.png', 32, 48);
    	this.load.image('meta', 'assets/desierto/meta.png');


    	//PUNTAJES
    	this.load.image('rayo', 'assets/rayo.png');
    	this.load.image('corazon', 'assets/corazon.png');
    	this.load.image('reloj', 'assets/reloj.png');

    	//AUDIO
    	this.load.audio('musica', ['assets/audio/musicafondo.mp3', 'assets/audio/musicafondo.ogg']);
    	this.load.audio('jump', ['assets/audio/jump.mp3', 'assets/audio/jump.ogg']);
    	this.load.audio('energy', ['assets/audio/energy.ogg']);
    	this.load.audio('collision', ['assets/audio/collision.mp3', 'assets/audio/collision.ogg']);
    	this.load.audio('levelwin', ['assets/audio/levelwin.mp3', 'assets/audio/levelwin.ogg']);

	},

	create: function (game) {
		music = game.add.audio('musica');
        //music.play();

        this.state.start('MainMenu');
	}
};