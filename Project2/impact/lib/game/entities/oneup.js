ig.module(
    'game.entities.oneup'
)
    .requires(
    'impact.entity'

)
    .defines(function()
    {
        EntityOneup = ig.Entity.extend({
            animSheet: new ig.AnimationSheet('media/life-sprite.png', 9, 9),
            size: {x: 10, y: 10},
            target: null,
            wait: -1,
            waitTimer: null,
            canFire: true,
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.NEVER,


            init: function(x,y,settings)
            {
                if(settings.checks)
                {
                    this.checkAgainst = ig.Entity.TYPE[settings.checks.toUpperCase()] || ig.Entity.TYPE.A;
                    delete settings.check;
                }
                this.addAnim('idle', 1, [0]);
                this.parent(x,y,settings);
            },
            check: function(other)
            {
                ig.game.lives++;
                ig.game.score+= 100;
                this.kill();
            },
            update: function() {
                this.currentAnim = this.anims.idle;
                this.currentAnim.alpha = 1;
                this.parent();
            }

        })
    })