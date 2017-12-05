Game.MainMenu = function (game) {};

var titlescreen;
var btn_play;
var btn_music;
var btn_volumen;
var btn_ayuda;
var btn_info;
var b_music = true;
var reg = {}

var text;

function fnt_btnPlay_over() {
    btn_play.scale.set(1,1);
}

function fnt_btnPlay_out() {
    btn_play.scale.set(0.8,0.8);
}

function fnt_btn_over(e) {
    e.scale.set(1,1);
}

function fnt_btn_out(e) {
    e.scale.set(0.8,0.8);
}

Game.MainMenu.prototype = {
	create: function (game) {

        // FONDO
		var background = game.add.sprite(0, 0, 'background');

        //MUSICA

        
        //Boton play
    		btn_play = this.createButton(game, 'btn_play', 400, 400, 0.8, function (){ 
                this.state.start('Nivel1');
            });        
            btn_play.onInputOver.add(fnt_btnPlay_over, this);
            btn_play.onInputOut.add(fnt_btnPlay_out, this);


        //Boton volume
        /*
            btn_volumen = this.createButton(game, 'boton-volumen', 50, this.world.height - 40, 0.8, function (){ 
                //this.state.start('MainPersonaje');
            });
            btn_volumen.onInputOver.add(fnt_btn_over, this);
            btn_volumen.onInputOut.add(fnt_btn_out, this);
        */

        //Boton music
            /*btn_music = this.createButton(game, 'boton-musica', 50, this.world.height - 40, 0.8, function (){ 
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
            */

         //Boton ayuda
            btn_ayuda = this.createButton(game, 'boton-ayuda', 680, this.world.height - 40, 0.8, function (){ 
                           showModal2();
            });
            btn_ayuda.onInputOver.add(fnt_btn_over, this);
            btn_ayuda.onInputOut.add(fnt_btn_out, this);

         //Boton info
         /*
            btn_info = this.createButton(game, 'boton-info', 750, this.world.height - 40, 0.8, function (){ 
                showModal1();
            });
            btn_info.onInputOver.add(fnt_btn_over, this);
            btn_info.onInputOut.add(fnt_btn_out, this);
            */

            reg.modal = new gameModal(game);
            crearModal();


        
	},

	update: function (game) {

	},

	createButton: function (game, name, x, y, s, callback){
		var button1 = game.add.button(x,y,name, callback, this,2,1,0);
        button1.scale.set(s,s);

		button1.anchor.setTo(0.5, 0.5);
        
        return button1;

	}
};

function crearModal(){
    reg.modal.createModal({
            type:"modal1",
            includeBackground: false,
            modalCloseOnInput: true,
  itemsArr: [
            {
                type: "image",
                content: "bgmodal",
                offsetY: -20,
                contentScale: 1
            },
            {
            type: "text",
            content: "INFORMACIÓN",
            fontFamily: "Arial",
            fontSize: 22,
            color: "0xffffff",
            offsetY: -200
            },    
            {
            type: "text",
            content: "Desarrollador:",
            fontFamily: "Arial",
            fontSize: 18,
            color: "0xffffff",
            offsetX: 0,
            offsetY: -130
            },
            {
            type: "text",
            
            fontFamily: "Arial",
            fontSize: 18,
            color: "0xffffff",
            offsetX:0,
            offsetY: -100
            }, 
            {
            type: "text",
            content: "Fecha de realización: Noviembre 2017",
            fontFamily: "Arial",
            fontSize: 18,
            color: "0xffffff",
            offsetX: 0,
            offsetY: -20
            },
            {
            type: "text",
            content: "Todos los derechos reservados",
            fontFamily: "Arial",
            fontSize: 18,
            color: "0xffffff",
            offsetX: 0,
            offsetY: 10
            },             
            {
                type : "text",
                content: "X",
                fontSize: 40,
                color: "#FFF",
                offsetY: -220,
                offsetX: 320,
                callback: function(){
                reg.modal.hideModal("modal1");
                }
            }
                
            ]
   });
    reg.modal.createModal({
            type:"modal2",
            includeBackground: false,
            modalCloseOnInput: true,
  itemsArr: [
            {
                type: "image",
                content: "bgmodal",
                offsetY: -20,
                contentScale: 1
            },
            {
            type: "text",
            content: "INSTRUCCIONES",
            fontFamily: "Arial",
            fontSize: 22,
            color: "0xffffff",
            offsetY: -200
            },        
            {
            type: "text",
            content: "Los controles de desplazamiento son:",
            fontFamily: "Arial",
            fontSize: 18,
            color: "0xffffff",
            offsetX: -165,
            offsetY: -40
            },
            {
                type: "image",
                content: "controles",
                offsetX: 0,
                offsetY: 30,
                contentScale: 0.9
            },             
            {
                type : "text",
                content: "X",
                fontSize: 40,
                color: "#FFF",
                offsetY: -220,
                offsetX: 320,
                callback: function(){
                reg.modal.hideModal("modal2");
                }
            }
                
            ]
   });
}

function showModal1() {
  reg.modal.showModal("modal1");
}

function showModal2() {
  reg.modal.showModal("modal2");
}