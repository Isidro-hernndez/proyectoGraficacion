Game.MainPersonaje = function (game) {};

var btn_donald;
var btn_kike;
var text;
var btn_music;
var btn_volumen;
var btn_ayuda;
var btn_info;
var btn_regresar;



function fnt_btnDonald_over() {
    btn_donald.scale.set(1,1);
}

function fnt_btnDonald_out() {
    btn_donald.scale.set(0.8,0.8);
}

function fnt_btnKike_over() {
    btn_kike.scale.set(1,1);
}

function fnt_btnKike_out() {
    btn_kike.scale.set(0.8,0.8);
}


Game.MainPersonaje.prototype = {

	create: function (game) {

		var fondo = game.add.sprite(0, 0, 'fondopersonaje');

        socket.emit('conexion');

        //Boton play
		btn_donald = this.createButton(game, 'btn_donald', 200, game.world.centerY, 0.8, function (){ 
            //this.state.start('Nivel1');
            pedirPersonaje('donald', game);
        });
        
        btn_donald.onInputOver.add(fnt_btnDonald_over, this);
        btn_donald.onInputOut.add(fnt_btnDonald_out, this);


        btn_kike = this.createButton(game, 'btn_kike', 600, game.world.centerY, 0.8, function (){ 
            //this.state.start('Nivel1');
            pedirPersonaje('kike', game);
        });
        
        btn_kike.onInputOver.add(fnt_btnKike_over, this);
        btn_kike.onInputOut.add(fnt_btnKike_out, this);

        //Boton regresar
        btn_regresar = this.createButton(game, 'boton-regresar', 50, 50, 0.8, function (){ 
                this.state.start('MainMenu');
            });
            btn_regresar.onInputOver.add(fnt_btn_over, this);
            btn_regresar.onInputOut.add(fnt_btn_out, this);

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


function pedirPersonaje(personaje, game){
    socket.emit('pedirPersonaje', personaje ,function(data){
        console.log(data);
        data == 'donald';
        if(data == 'donald'){      
            //music.resume();              
            game.state.start('Nivel1');
        }else{
            if(data == 'kike'){
                game.state.start('Nivel1_kike');
            }else{
                if(data == 'yaseeligio'){
                    text = game.add.text(game.world.centerX-150, game.world.centerY+150, "Alguien más eligió este personaje", { font: "25px Arial", fill: "#FFF" });
                    game.time.events.add(Phaser.Timer.SECOND * 2, desaparecerTexto, this);
                }
                else{
                    text = game.add.text(game.world.centerX-150, game.world.centerY+150, "Sólo pueden jugar dos personas", { font: "25px Arial", fill: "#FFF" });
                    game.time.events.add(Phaser.Timer.SECOND * 2, desaparecerTexto, this);
                }            
            }
        }
    });
}

function desaparecerTexto(){
    text.destroy();
}
