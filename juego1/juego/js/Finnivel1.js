Game.Finnivel1 = function (game) {};


Game.Finnivel1.prototype = {
	create: function (game) {

		var background = game.add.sprite(0, 0, 'finnivel');
        
        //Boton play
		//btn_play = this.createButton(game, 'btn_play', game.world.centerX, game.world.centerY + 100, 0.8, function (){ 
            //this.state.start('Nivel1');
        //});
        
        //btn_play.onInputOver.add(fnt_btnPlay_over, this);
        //btn_play.onInputOut.add(fnt_btnPlay_out, this);
        
        //Boton trofeos
        /*btn_trophy = this.createButton(game, "btn_trophy", game.world.centerX - 250, game.world.centerY + 192, 0.5,
		function(){
			console.log('About');
		});
        
        btn_trophy.onInputOver.add(fnt_btn_over, this);
        btn_trophy.onInputOut.add(fnt_btn_out, this);
        */
        
        //Boton configuracion
        /*
		btn_settings = this.createButton(game, "btn_settings", game.world.centerX + 250, game.world.centerY + 192, 0.5,
		function(){
			console.log('Trophy');
		});
        
        btn_settings.onInputOver.add(fnt_btn_over, this);
        btn_settings.onInputOut.add(fnt_btn_out, this);
       
        
        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        

        //  The Text is positioned at 0, 100
        text = game.add.text(0, 0, "Cowboy Bebop v00", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
        text.setTextBounds(0, 100, 800, 100); */

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