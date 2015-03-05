ig.module(
    'game.entities.topplayer'
)
    .requires(
    'impact.entity'
)
    .defines(function(){
        EntityTopplayer = ig.Entity.extend({
            animSheet: new ig.AnimationSheet('media/topPlayer.png', 20,20),
            size: {x:20, y: 20},
            offset: {x: 4, y:2},
            maxVel: {x: 100, y: 100},
            friction: {x: 400, y: 400},
            gravityFactor: 0,
            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.PASSIVE,
            accel: {x: 0, y: 0},
            flip: false,
            init: function(x,y,settings)
            {
                this.parent(x,y,settings);
                this.addAnim('idle', 1, [0]);
                this.addAnim('run',.2, [0,1]);
                this.addAnim('sideRun',.07, [2]);
                this.addAnim('dRun',.2, [3,6]);
            },
            update: function()
            {
                var accel = 300;
                if(ig.input.state('up'))
                {
                    console.log('up', this.accel.y);
                    this.accel.y = -accel;
                    this.flip = false;
                }else if(ig.input.state('down'))
                {
                    this.accel.y = accel;
                    this.flip = false;
                }else
                {
                    this.accel.y = 0;
                }
                if(ig.input.state('left'))
                {
                    this.accel.x = -accel;
                    this.flip = false;
                }else if(ig.input.state('right'))
                {
                    this.accel.x = accel;
                    this.flip = true;
                }else
                {
                    this.accel.x = 0;
                }

                if(this.vel.y < 0)
                {
                    this.currentAnim = this.anims.run;
                }else if(this.vel.y > 0)
                {
                    this.currentAnim = this.anims.dRun;
                }else if(this.vel.x != 0)
                {
                    this.currentAnim = this.anims.sideRun
                }else
                    this.currentAnim = this.anims.idle;
                this.currentAnim.flip.x = this.flip;
                this.parent();
            }
        });
    });