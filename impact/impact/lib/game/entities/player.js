/**
 * Created by William on 2/11/2015.
 */
ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function()
    {
        EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/playerhack.png',16,16),
            size: {x: 8, y:14},
            offset: {x: 4, y:2},
            flips: false,
            maxVel: {x: 100, y: 150},
            friction: {x: 600, y:0},
            accelGround: 400,
            accelAir: 200,
            jump: 200,
            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.PASSIVE,
            rightWall: false,
            ceiling: false,
            leftWall: false,
            floor: true,

            init: function(x,y,settings)
            {
                this.parent(x,y,settings);
                this.addAnim('idle', 1, [18]);
                this.addAnim('run',.07, [18,19,20,21,22,23]);
                this.addAnim('jump', 1, [20]);
                this.addAnim('fall',.4, [21,22]);
                this.addAnim('leftIdle',1, [0]);
                this.addAnim('leftRun',.07, [0,1,2,3,4,5]);
                this.addAnim('upperIdle', 1, [6]);
                this.addAnim('upperRun',.07, [6,7,8,9,10,11]);
                this.addAnim('rightIdle', 1, [12]);
                this.addAnim('rightRun',.07,[12,13,14,15,16,17]);
            },
            update: function()
            {
                var accel = this.standing ? this.accelGround : this.accelAir;
                if(this.floor) {
                    this.friction = {x: 600, y: 0};
                    if (ig.input.state('left')) {
                        this.accel.x = -accel;
                        this.flip = true;
                    } else if (ig.input.state('right')) {
                        this.accel.x = accel;
                        this.flip = false;
                    }
                    else {
                        this.accel.x = 0;
                    }
                    //jump
                    if (this.standing && ig.input.pressed('jump')) {
                        this.vel.y = -this.jump;
                    }
                    //set current animation, based on player speed
                    if (this.vel.y < 0) {
                        this.currentAnim = this.anims.jump;
                    } else if (this.vel.y > 0) {
                        this.currentAnim = this.anims.fall;
                    } else if (this.vel.x != 0) {
                        this.currentAnim = this.anims.run;
                    } else {
                        this.currentAnim = this.anims.idle;
                    }
                    this.currentAnim.flip.x = this.flip;
                }
                else if(this.rightWall)
                {
                    this.friction = {x: 0, y: 600};
                    if(ig.input.state('left'))
                    {
                        this.accel.y = accel;
                        this.flip = true;
                    }else if(ig.input.state('right'))
                    {
                        this.accel.y = -accel;
                        this.flip = false;
                    }
                    else{
                        this.accel.y = 0;
                    }
                    //jump
                    if( ig.input.pressed('jump'))
                    {
                        this.vel.x = -this.jump;
                    }
                    //set current animation, based on player speed
                    if(this.vel.x < 0)
                    {
                        this.currentAnim = this.anims.jump;
                    }else if(this.vel.x > 0)
                    {
                        this.currentAnim = this.anims.fall;
                    }else if(this.vel.y != 0)
                    {
                        this.currentAnim = this.anims.rightRun;
                    }else
                    {
                        this.currentAnim = this.anims.rightIdle;
                    }
                    this.currentAnim.flip.y = this.flip;
                }else if(this.ceiling) {
                    this.friction = {x: 600, y: 0};
                    if (ig.input.state('left')) {
                        this.accel.x = -accel;
                        this.flip = true;
                    } else if (ig.input.state('right')) {
                        this.accel.x = accel;
                        this.flip = false;
                    }
                    else {
                        this.accel.x = 0;
                    }
                    //jump
                    if (this.standing && ig.input.pressed('jump')) {
                        this.vel.y = -this.jump;
                    }
                    //set current animation, based on player speed
                    if (this.vel.y < 0) {
                        this.currentAnim = this.anims.jump;
                    } else if (this.vel.y > 0) {
                        this.currentAnim = this.anims.fall;
                    } else if (this.vel.x != 0) {
                        this.currentAnim = this.anims.run;
                    } else {
                        this.currentAnim = this.anims.idle;
                    }
                    this.currentAnim.flip.x = this.flip;
                }


                //move
                this.parent();
            },
            handleMovementTrace: function (res)
            {
                this.parent(res);
                //collission with wall? returnS

                if(res.collision.x && res.pos.x > 160)
                {
                    //this.currentAnim = this.anims.rightIdle;
                    this.rightWall = true;
                    this.floor = false;
                    this.gravityFactor = 0;


                }else if(res.collision.y && res.pos.y < 50)
                {
                    this.currentAnim = this.anims.upperIdle;
                    this.rightWall = false;
                    this.floor = false;
                    this.ceiling = true;
                    this.gravityFactor = -1;
                }
                else
                {
                    this.floor = true;
                    this.rightWall = false;
                    this.celing = false;
                    this.gravityFactor = 1;
                }
            }
        });
    });