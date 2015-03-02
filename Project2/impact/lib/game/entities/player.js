ig.module(
    'game.entities.player'
)
    .requires(
    'impact.entity',
    'impact.sound',
    'game.entities.debris'
)
    .defines(function(){
        EntityPlayer = ig.Entity.extend({
            animSheet: new ig.AnimationSheet( 'media/mmplayer.png', 30, 30 ),
            size: {x:20, y:27},
            offset: {x: 4, y: 2},
            flip: false,
            maxVel: {x: 150, y: 250},
            friction: {x: 400, y: 0},
            accelGround: 400,
            accelAir: 200,
            jump: 250,
            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.PASSIVE,
            weapon: 0,
            totalWeapons: 2,
            activeWeapon: "EntityBullet",
            startPosition: null,
            invincible: true,
            invincibleDelay: 2,
            invincibleTimer: null,
            jumpSFX: new ig.Sound('media/sounds/jump.*'),
            shootSFX: new ig.Sound('media/sounds/shoot.*'),
            deathSFX: new ig.Sound('media/sounds/death.*'),
            lives: 3,
            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.startPosition = {x:x , y:y};
                this.addAnim('idle',1, [2,3]);
                this.addAnim('run', .07, [5,6,7]);
                this.addAnim('jump', 1, [0]);
                this.addAnim('fall', 0.4, [0]);
                this.addAnim('shot',.2, [1]);
                this.addAnim('jumpShot',.2, [8]);
                this.addAnim('runGun',.07, [9,10,11]);
                this.addAnim('ladder',.1, [12,13]);
                this.addAnim('ladderShoot',.2, [14]);
                this.addAnim('ladderIdle', 1, [12]);
                this.invincibleTimer = new ig.Timer();
                this.makeInvincible();
                ig.game.player = this;
            },
            update: function() {
                // move left or right
                var accel = this.standing ? this.accelGround : this.accelAir;
                if( ig.input.state('left') ) {
                    this.accel.x = -accel;
                    this.flip = true;
                }else if( ig.input.state('right') ) {
                    this.accel.x = accel;
                    this.flip = false;
                }else{
                    this.accel.x = 0;
                }
                // jump
                if( this.standing && ig.input.pressed('jump') ) {
                    this.vel.y = -this.jump;
                    this.jumpSFX.play();
                }

                if( ig.input.pressed('shoot') ) {
                    if(this.activeWeapon == "EntityBullet") {
                        if (this.vel.y == 0 && this.flip == true) {
                            ig.game.spawnEntity(this.activeWeapon, this.pos.x, this.pos.y + 5, {flip: this.flip});
                            this.shootSFX.play();
                        } else if (this.vel.y == 0 && this.flip == false) {
                            ig.game.spawnEntity(this.activeWeapon, this.pos.x + 15, this.pos.y + 5, {flip: this.flip});
                            this.shootSFX.play();
                        } else if (this.vel.y != 0 && this.flip == true) {
                            ig.game.spawnEntity(this.activeWeapon, this.pos.x, this.pos.y - 2, {flip: this.flip});
                            this.shootSFX.play();
                        } else if (this.vel.y != 0 && this.flip == false) {
                            ig.game.spawnEntity(this.activeWeapon, this.pos.x + 15, this.pos.y - 2, {flip: this.flip});
                            this.shootSFX.play();
                        }
                    }
                    if(this.activeWeapon == "EntityGrenade")
                    {
                        if (this.vel.y == 0 && this.flip == true) {
                            ig.game.spawnEntity(this.activeWeapon, this.pos.x, this.pos.y+13, {flip: this.flip});
                        } else if (this.vel.y == 0 && this.flip == false) {
                            ig.game.spawnEntity(this.activeWeapon, this.pos.x + 15, this.pos.y+13, {flip: this.flip});
                        } else if (this.vel.y != 0 && this.flip == true) {
                            ig.game.spawnEntity(this.activeWeapon, this.pos.x, this.pos.y+7, {flip: this.flip});
                        } else if (this.vel.y != 0 && this.flip == false) {
                            ig.game.spawnEntity(this.activeWeapon, this.pos.x + 15, this.pos.y+7, {flip: this.flip});
                        }
                    }

                }
                if( ig.input.pressed('switch') ) {
                    this.weapon ++;
                    if(this.weapon >= this.totalWeapons)
                        this.weapon = 0;
                    switch(this.weapon){
                        case(0):
                            this.activeWeapon = "EntityBullet";
                            break;
                        case(1):
                            this.activeWeapon = "EntityGrenade";
                            break;

                    }

                }
                // set the current animation
               if(ig.input.pressed('shoot'))
               {
                   if(this.vel.y != 0 && !this.isClimbing)
                   {
                       this.currentAnim = this.anims.jumpShot.rewind();
                   }else if(this.vel.x !=0)
                   {
                       this.currentAnim = this.anims.runGun.rewind();
                   }else if(this.isClimbing)
                   {
                       this.currentAnim = this.anims.ladderShoot.rewind();
                   }else
                   {
                       this.currentAnim = this.anims.shot.rewind();
                   }
               }
                if(this.currentAnim == this.anims.shot || this.currentAnim == this.anims.jumpShot || this.currentAnim == this.anims.runGun)
                {
                    if(this.currentAnim.loopCount)
                    {
                        this.currentAnim = this.anims.idle;
                    }
                }else //if(this.ladderTouchedTimer.delta() > 0)
                {
                    if(this.vel.y < 0 && this.ladderTouchedTimer.delta() >0)
                    {
                        this.currentAnim = this.anims.jump;
                    }else if(this.vel.y > 0 && this.ladderTouchedTimer.delta() >0)
                    {
                        this.currentAnim = this.anims.fall;
                    }else if(this.vel.x != 0)
                    {
                        this.currentAnim = this.anims.run;
                    }else if(this.isClimbing) {

                        this.currentAnim = this.anims.ladder;
                    } else
                    {
                            this.currentAnim = this.anims.idle;
                        }

                }
                this.currentAnim.flip.x = this.flip;
                if(this.invincibleTimer.delta() > this.invincibleDelay)
                {
                    this.invincible = false;
                    this.currentAnim.alpha = 1;
                }
                this.zIndex = 99;
                // ------------------ begin ladder code ------------------
                if (this.isConfiguredForClimbing){      // this will only be true if level contains a ladder
                    this.checkForLadder(this);
                    if (this.ladderTouchedTimer.delta() > 0) this.isTouchingLadder = false;
                    // reset in case player leaves ladder. This allows to walk across/atop ladder
                }else{
                    var ladders = ig.game.getEntitiesByType("EntityLadder");
                    if (ladders != undefined) {
                        for (var i = 0 ; i < ladders.length; i ++){
                            ladders[i].makeEntitiesEligibleClimbers();
                        }
                    }
                }
                // ------------------  end  ladder code ------------------
                this.parent();
            },
            makeInvincible: function()
            {
                this.invincible = true;
                this.invincibleTimer.reset();
            },
            receiveDamage: function(amount, from)
            {
                if(this.invincible)
                {
                    return;
                }
                this.parent(amount, from);
            },
            draw: function()
            {
                if(this.invincible)
                {
                    this.currentAnim.alpha = this.invincibleTimer.delta() / this.invincibleDelay*1;
                }
                this.parent();
            },
            kill: function()
            {
                this.parent();

                this.deathSFX.play();
                ig.game.respawnPosition = this.startPosition;
                ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {callBack: this.onDeath});
            },
            onDeath: function()
            {
                ig.game.stats.deaths++;
                ig.game.lives--;
                if(ig.game.lives < 0 )
                {
                    ig.game.gameOver();
                }else{
                    ig.game.spawnEntity(EntityPlayer, ig.game.respawnPosition.x, ig.game.respawnPosition.y);
                }
            }

        });
        EntityBullet = ig.Entity.extend({
            size: {x: 5, y: 3},
            animSheet: new ig.AnimationSheet( 'media/bullet.png', 5, 3 ),
            maxVel: {x: 300, y: 0},
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.B,
            collides: ig.Entity.COLLIDES.PASSIVE,
            init: function( x, y, settings ) {
                this.parent( x + (settings.flip ? -4 : 8) , y+8, settings );
                this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
                this.addAnim( 'idle', 0.2, [0] );
            },
            //update: function()
            //{
            //    if(!this.flip) {
            //        if (ig.game.getMapByName('Destructable').getTile(this.pos.x + this.size.x * 2, this.pos.y)) {
            //            console.log(this.flip);
            //            ig.game.getMapByName('Destructable').setTile(this.pos.x + this.size.x * 2, this.pos.y , 0);
            //            ig.game.collisionMap.setTile(this.pos.x + this.size.x * 2, this.pos.y, 0);
            //            for (var i = 0; i < 5; i++) {
            //                var x = Math.random().map(0, 1, this.pos.x, this.pos.x + this.size.x);
            //                var y = Math.random().map(0, 1, this.pos.y, this.pos.y + this.size.y);
            //                ig.game.spawnEntity(EntityDebrisParticle, x, y);
            //            }
            //        }
            //    }else
            //    {
            //        if (ig.game.getMapByName('Destructable').getTile(this.pos.x -this.size.x * 2, this.pos.y)) {
            //            console.log(this.flip);
            //            ig.game.getMapByName('Destructable').setTile(this.pos.x - this.size.x * 2, this.pos.y, 0);
            //            ig.game.collisionMap.setTile(this.pos.x - this.size.x * 2, this.pos.y, 0);
            //            for (var i = 0; i < 5; i++) {
            //                var x = Math.random().map(0, 1, this.pos.x, this.pos.x + this.size.x);
            //                var y = Math.random().map(0, 1, this.pos.y, this.pos.y + this.size.y);
            //                ig.game.spawnEntity(EntityDebrisParticle, x, y);
            //            }
            //        }
            //    }
            //    this.parent();
            //},
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
        EntityGrenade = ig.Entity.extend({
            size: {x: 4, y: 4},
            offset: {x: 2, y: 2},
            animSheet: new ig.AnimationSheet( 'media/grenade.png', 8, 8 ),
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.BOTH,
            collides: ig.Entity.COLLIDES.PASSIVE,
            maxVel: {x: 200, y: 200},
            bounciness: 0.6,
            bounceCounter: 3,
            init: function( x, y, settings ) {
                this.parent( x + (settings.flip ? -4 : 7), y, settings );
                this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
                this.vel.y = -(50 + (Math.random()*100));
                this.addAnim( 'idle', 0.2, [1,0] );
            },
            update: function()
            {
                this.parent();
                if(ig.game.getMapByName('Destructable').getTile(this.pos.x + this.size.x /2, this.pos.y + this.size.y/2))
                {
                    console.log("true");
                    ig.game.getMapByName('Destructable').setTile(this.pos.x + this.size.x /2, this.pos.y + this.size.y /2, 0);
                    ig.game.collisionMap.setTile(this.pos.x + this.size.x /2, this.pos.y + this.size.y /2, 0);
                    for(var i=0; i<5; i++)
                    {
                        var x = Math.random().map(0,1,this.pos.x, this.pos.x+this.size.x);
                        var y = Math.random().map(0,1,this.pos.y, this.pos.y+this.size.y);
                        ig.game.spawnEntity(EntityDebrisParticle,x,y);
                    }
                }
            },
            handleMovementTrace: function( res ) {
                this.parent( res );
                if( res.collision.x || res.collision.y ) {
                    // only bounce 3 times
                    this.bounceCounter++;
                    if( this.bounceCounter > 3 ) {
                        this.kill();
                    }

                }
            },
            check: function( other ) {
                other.receiveDamage( 10, this );
                this.kill();
            },
            update: function()
            {
                if(!this.flip) {
                    if (ig.game.getMapByName('Destructable').getTile(this.pos.x + this.size.x * 2, this.pos.y)) {
                        console.log(this.flip);
                        ig.game.getMapByName('Destructable').setTile(this.pos.x + this.size.x * 2, this.pos.y , 0);
                        ig.game.collisionMap.setTile(this.pos.x + this.size.x * 2, this.pos.y, 0);
                        for (var i = 0; i < 5; i++) {
                            var x = Math.random().map(0, 1, this.pos.x, this.pos.x + this.size.x);
                            var y = Math.random().map(0, 1, this.pos.y, this.pos.y + this.size.y);
                            ig.game.spawnEntity(EntityDebrisParticle, x, y);
                        }
                    }
                }else
                {
                    if (ig.game.getMapByName('Destructable').getTile(this.pos.x -this.size.x * 2, this.pos.y)) {
                        console.log(this.flip);
                        ig.game.getMapByName('Destructable').setTile(this.pos.x - this.size.x * 2, this.pos.y, 0);
                        ig.game.collisionMap.setTile(this.pos.x - this.size.x * 2, this.pos.y, 0);
                        for (var i = 0; i < 5; i++) {
                            var x = Math.random().map(0, 1, this.pos.x, this.pos.x + this.size.x);
                            var y = Math.random().map(0, 1, this.pos.y, this.pos.y + this.size.y);
                            ig.game.spawnEntity(EntityDebrisParticle, x, y);
                        }
                    }
                }
                this.parent();
            },
            kill:function()
            {
                for(var i = 0; i< 20; i++)
                {
                    ig.game.spawnEntity(EntityGrenadeParticle, this.pos.x, this.pos.y);

                }
                this.parent();
            }

        });

        EntityWMD = ig.Entity.extend({
            size:{x: 4, y:4},
            offset: {x: 2, y:2},
            animSheet: new ig.AnimationSheet('media/blood.png', 4,4),
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.BOTH,
            collides: ig.Entity.COLLIDES.PASSIVE,
            maxVel: {x: 200, y: 200},
            bounciness:.5,
            bounceCounter: 0,
            init: function( x, y, settings ) {
                this.parent( x + (settings.flip ? -4 : 7), y, settings );
                this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
                this.vel.y = -(50 + (Math.random()*100));
                this.addAnim( 'idle', 0.2, [0,1] );
            },
            handleMovementTrace: function( res ) {
                this.parent( res );
                if( res.collision.x || res.collision.y ) {
                    // only bounce 3 times
                    this.bounceCounter++;
                    if( this.bounceCounter > 3 ) {
                        this.kill();
                        ig.game.backgroundMaps[0].setTile(this.pos.x, this.pos.y+10 , 0);
                        ig.game.collisionMap.setTile(this.pos.x, this.pos.y+10, 0);
                    }
                }
            },
            check: function( other ) {
                other.receiveDamage( 10, this );
                this.kill();
            },
            kill:function()
            {
                for(var i = 0; i< 300; i++)
                {
                    ig.game.spawnEntity(EntityGrenadeParticle, this.pos.x, this.pos.y);

                }
                this.parent();
            }
        });

        EntityGrenadeParticle = ig.Entity.extend({
            size:{x:1, y:1},
            maxVel:{x:160, y:200},
            lifetime: 1,
            fadetime: 1,
            bounciness:.3,
            vel: {x: 40, y:50},
            friction:{x:20, y:20},
            checkAgainst: ig.Entity.TYPE.B,
            collides: ig.Entity.COLLIDES.LITE,
            animSheet: new ig.AnimationSheet('media/explosion.png', 1,1),
            init: function(x,y,settings)
            {
                this.parent(x,y,settings);
                this.vel.x = (Math.random() * 4 - 1) * this.vel.x;
                this.vel.y = (Math.random() * 10 - 1) * this.vel.y;
                this.idleTimer = new ig.Timer();
                var frameID = Math.round(Math.random()*7);
                this.addAnim('idle',.2, [frameID]);
            },
            update:function()
            {
                if(this.idleTimer.delta() > this.lifetime)
                {
                    this.kill();
                    return;
                }
                this.currentAnim.alpha = this.idleTimer.delta().map(this.lifetime - this.fadetime, this.lifetime, 1,0);


                this.parent();
            }


        });

        EntityDeathExplosion = ig.Entity.extend({
            lifetime:1,
            callBack: null,
            particles: 25,
            init: function(x,y,settings)
            {
                this.parent(x,y,settings);
                for(var i = 0; i<this.particles; i++)
                {
                    ig.game.spawnEntity(EntityDeathExplosionParticle, x, y, {colorOffset: settings.colorOffset ? settings.colorOffset : 0});
                    this.idleTimer = new ig.Timer();
                }
            },
            update: function()
            {
                if(this.idleTimer.delta() > this.lifetime)
                {
                    this.kill();
                    if(this.callBack)
                        this.callBack();
                    return;
                }
            }
        });

        EntityDeathExplosionParticle = ig.Entity.extend({
            size: {x:2, y: 2},
            maxVel: {x: 160, y:200},
            lifetime: 2,
            fadetime: 1,
            bounciness: 0,
            vel: {x:100, y: 30},
            friction: {x:100, y: 0},
            collides: ig.Entity.COLLIDES.LITE,
            colorOffset: 0,
            totalColors: 7,
            animSheet: new ig.AnimationSheet('media/blood2.png', 2,2),
            init: function(x,y,settings)
            {
                this.parent(x,y,settings);
                var frameID = Math.round(Math.random() * this.totalColors) + (this.colorOffset * (this.totalColors + 1));
                this.addAnim('idle',.2, [frameID]);
                this.vel.x = (Math.random()*2 -1) * this.vel.x;
                this.vel.y = (Math.random()*2 -1) * this.vel.y;
                this.idleTimer = new ig.Timer();
            },
            update: function()
            {

                if(this.idleTimer.delta() > this.lifetime)
                {
                    this.kill();
                    return;
                }
               // this.currentAnim = this.anims.idle;
                //this.currentAnim.alpha = 1;
                this.currentAnim.alpha = this.idleTimer.delta().map(this.lifetime - this.fadetime, this.lifetime, 1,0);
                this.parent();
            }
        });

    });
