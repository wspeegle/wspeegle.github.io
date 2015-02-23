ig.module(
    'game.entities.zombie'
)
.requires(
    'impact.entity'
)
.defines(function()
    {
        EntityZombie = ig.Entity.extend({
            animSheet: new ig.AnimationSheet('media/enemy.png', 30,30),
            size:{x:25, y: 28},
            offset: {x:4, y:2},
            maxVel: {x: 100, y: 100},
            flip: false,
            friction: {x: 150, y: 0},
            speed: 25,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,
            weapon: "EntityBullet1",
            init: function(x,y,settings)
            {
                this.parent(x,y,settings);
                this.addAnim('walk',.4, [0,1]);
                this.addAnim('shoot',.2, [0]);
            },
            update: function(){

                //near an edge? return
                var rand = Math.random();
                var player = ig.game.getEntitiesByType(EntityPlayer)[0];
                if(rand > .95 && this.distanceTo(player) < 150) {
                    this.currentAnim = this.anims.shoot.rewind();
                    ig.game.spawnEntity(this.weapon, this.pos.x, this.pos.y +7, {flip: this.flip});
                }
                if(this.currentAnim == this.anims.shoot)
                {
                    if(this.currentAnim.loopCount)
                    {
                        this.currentAnim = this.anims.walk;
                    }
                }
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
            kill: function()
            {
                this.parent();

                ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {colorOffset: 1});
            }


        });


        EntityBullet1 = ig.Entity.extend({
            size: {x: 5, y: 3},
            animSheet: new ig.AnimationSheet( 'media/bullet.png', 5, 3 ),
            maxVel: {x: 200, y: 0},
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,
            init: function( x, y, settings ) {
                this.parent( x + (settings.flip ? -4 : 8) , y+8, settings );
                this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
                this.addAnim( 'idle', 0.2, [0] );
            },
            handleMovementTrace: function( res ) {
                this.parent( res );
                if( res.collision.x || res.collision.y ){
                    this.kill();
                }
            },
            check: function( other ) {
                other.receiveDamage( 10, this );
                this.kill();
            }
        });





    });
