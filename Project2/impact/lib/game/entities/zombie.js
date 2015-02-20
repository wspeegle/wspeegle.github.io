/**
 * Created by William on 2/12/2015.
 */
ig.module(
    'game.entities.zombie'
)
.requires(
    'impact.entity'
)
.defines(function()
    {
        EntityZombie = ig.Entity.extend({
            animSheet: new ig.AnimationSheet('media/zombie.png', 16,16),
            size:{x:8, y: 14},
            offset: {x:4, y:2},
            maxVel: {x: 100, y: 100},
            flip: false,
            friction: {x: 150, y: 0},
            speed: 14,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,
            init: function(x,y,settings)
            {
                this.parent(x,y,settings);
                this.addAnim('walk',.7, [0,1,2,3,4,5]);
            },
            update: function(){
                //near an edge? return
                var rand = Math.random();
                if(rand > .9){
                if(!ig.game.collisionMap.getTile(
                        this.pos.x + (this.flip ? +4 : this.size.x -4),
                        this.pos.y + this.size.y+1
                    )){
                    this.flip = !this.flip;
                }}
                var xdir = this.flip ? -1:1;
                this.vel.x = this.speed * xdir;
                this.currentAnim.flip.x = this.flip;
                this.parent();
                },
                handleMovementTrace: function (res)
                {
                    this.parent(res);
                    //collission with wall? returnS
                    if(res.collision.x)
                    {
                        this.flip = !this.flip;
                    }
                },
            check: function(other)
            {
                this.receiveDamage(10, other);
            }

        });
    });