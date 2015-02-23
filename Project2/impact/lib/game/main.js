ig.module( 
	'game.main' 
)
.requires(
	'impact.game',

	'game.levels.dorm1',
	'game.levels.dorm2'
)
.defines(function(){

MyGame = ig.Game.extend({


	gravity: 300,

	init: function() {
		// Initialize your game here; bind keys etc.
        this.loadLevel(LevelDorm1);
		ig.music.add('media/sounds/theme.*');
		ig.music.volume = .7;
		//ig.music.play();
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.X, 'jump');
		ig.input.bind(ig.KEY.C, 'shoot');
        ig.input.bind(ig.KEY.TAB, 'switch');

	},

	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		var player = this.getEntitiesByType(EntityPlayer)[0];
		if(player)
		{
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
		}


		// Add your own, additional update code here
	},

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();


		// Add your own drawing code here

	}
});
		StartScreen = ig.Game.extend({
			instructText: new ig.Font('media/04b03.font.png'),
			background: new ig.Image('media/screen-bg.png'),
			init: function()
			{
				ig.input.bind(ig.KEY.SPACE, 'start');
			},
			update: function()
			{
				if(ig.input.pressed('start'))
				{
					ig.system.setGame(MyGame);
				}
				this.parent();
			},
			draw: function()
			{
				this.parent();
				this.background.draw(0,0);
				var x = ig.system.width/ 2,
					y = ig.system.height -10;
				this.instructText.draw('Press Spacebar to Start', x+40, y, ig.Font.ALIGN.CENTER);
			}

		})


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', StartScreen, 60, 320, 240, 2 );

});
