ig.module(
    'game.entities.bomb'
)
    .requires(
    'impact.entity'

)
    .defines(function()
    {
        EntityBomb = ig.Entity.extend({
            animSheet: new ig.AnimationSheet('media/bomb.png', 15,15),
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
                other.totalWeapons++;
                this.kill();
            },
            update: function() {
                this.currentAnim = this.anims.idle;
                this.currentAnim.alpha = 1;
                this.parent();
            }

        })
    })