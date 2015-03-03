ig.module(
    'game.entities.sword'
)
.requires(
    'impact.entity'
)
.defines(function()
    {
        EntitySword = ig.Entity.extend({
            animSheet: new ig.AnimationSheet('media/sword.png', 60, 60),
            size: {x: 30, y:60},
            offset: {x: 18, y: 0},
            maxVel:{x: 200, y: 200},
            flip: false,
            friction: {x: 100, y: 0},
            speed: 50,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,
            health: 100,
            weapon: "EntitySwordProjectile",
            init: function(x,y,settings)
            {
                this.parent(x,y,settings);
                this.addAnim('idle',.4, [0,1]);
                this.addAnim('attack',.2, [2]);
            },
            update: function()
            {
                var player = ig.game.getEntitiesByType(EntityPlayer)[0];
                var rand = Math.random();
                if(rand > .95 && this.distanceTo(player) < 200)
                {
                    //this.currentAnim = this.anims.attack.rewind();
                    ig.game.spawnEntity(this.weapon, this.pos.x, this.pos.y + 20, {flip: this.flip});
                }
                if(this.currentAnim == this.anims.attack)
                {
                    if(this.currentAnim.loopCount)
                    {
                        this.currentAnim = this.anims.idle;
                    }
                }

                if(!ig.game.collisionMap.getTile(this.pos.x + (this.flip ? +4 : this.size.x -4), this.pos.y + this.size.y +1))
                {
                    this.flip = !this.flip;
                }
                var xdir = this.flip ? -1:1;
                this.vel.x = this.speed * xdir;
                this.currentAnim.flip.x = this.flip;
                this.parent();
            },
            handleMovementTrace: function(res)
            {
                this.parent(res);
                if(res.collision.x)
                {
                    this.flip = !this.flip;
                }
            },
            kill: function()
            {
                this.parent();
                ig.game.stats.kills++;
                ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {colorOffset: 1});
            },
            check: function(other)
            {
                other.receiveDamage(10, this);
            }

        });

        EntitySwordProjectile = ig.Entity.extend({
            size: {x: 20, y:20},
            animSheet: new ig.AnimationSheet('media/swordProjectile.png', 20, 20),
            maxVel: {x: 200, y: 0},
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,
            flip: true,
            init: function(x,y,settings)
            {
                this.parent(x + (settings.flip ? -10: 10), y +8, settings);
                this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
                this.addAnim('idle',.2, [0]);

            },
            update: function()
            {

                  this.flip = true;

                this.parent();
            },
            handleMovementTrace: function(res)
            {
                this.parent(res);
                if(res.collision.x || res.collision.y)
                {
                    this.kill();
                }
            },
            check: function(other)
            {
                other.receiveDamage(10, this);
                this.kill();

            }



        })
    });