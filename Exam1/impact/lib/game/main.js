ig.module( 
	'game.main' 
)
.requires(
	'impact.game',

	'game.levels.exam1'
)
.defines(function(){

MyGame = ig.Game.extend({
	statText: new ig.Font('media/04b03.font.png'),
	pscore: 0,
	hits: 3,
	gravity: 300,


	init: function() {
		// Initialize your game here; bind keys etc.
        this.loadLevel(LevelExam1);
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
	this.statText.draw('Score: '+ this.pscore, 5,5);
		this.statText.draw('Spike hits left: '+ this.hits, 10,10);

		// Add your own drawing code here

	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
