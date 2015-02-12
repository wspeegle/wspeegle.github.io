ig.module( 'game.levels.hackathon4' )
.requires( 'impact.image','game.entities.player','game.entities.zombie' )
.defines(function(){
LevelHackathon4=/*JSON[*/{
	"entities": [
		{
			"type": "EntityPlayer",
			"x": 20,
			"y": 162
		},
		{
			"type": "EntityZombie",
			"x": 76,
			"y": 98
		}
	],
	"layer": [
		{
			"name": "collision",
			"width": 12,
			"height": 12,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "",
			"repeat": false,
			"preRender": false,
			"distance": 1,
			"tilesize": 16,
			"foreground": false,
			"data": [
				[1,1,1,1,1,1,1,1,1,1,1,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,1,1,1,1,0,0,0,0,1],
				[1,0,0,1,0,0,0,0,0,0,0,1],
				[1,0,0,1,0,0,0,0,0,0,0,1],
				[1,0,0,1,0,1,1,1,1,0,0,1],
				[1,0,0,1,0,0,0,0,1,0,0,1],
				[1,0,0,1,1,1,1,1,1,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,1,1,1,1,1,1,1,1,1,1,1]
			]
		},
		{
			"name": "main_G",
			"width": 12,
			"height": 12,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/dorm-tiles.png",
			"repeat": false,
			"preRender": false,
			"distance": "1",
			"tilesize": 16,
			"foreground": false,
			"data": [
				[5,5,5,5,5,5,5,5,5,5,5,5],
				[5,7,7,7,7,7,7,7,7,7,7,5],
				[5,7,7,30,30,30,30,30,30,7,7,5],
				[5,7,7,30,7,7,7,7,30,7,7,5],
				[5,7,7,30,7,7,7,7,7,7,7,5],
				[5,7,7,30,7,13,13,13,13,7,7,5],
				[5,7,7,30,7,7,7,7,30,7,7,5],
				[5,7,7,30,14,14,14,14,30,7,7,5],
				[5,7,7,7,7,7,7,7,7,7,7,5],
				[5,7,7,7,7,7,7,7,7,7,7,5],
				[5,7,7,7,7,7,7,7,7,7,7,5],
				[5,5,5,5,5,5,5,5,5,5,5,5]
			]
		}
	]
}/*]JSON*/;
LevelHackathon4Resources=[new ig.Image('media/dorm-tiles.png')];
});