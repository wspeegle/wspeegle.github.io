/**
 * Created by William on 3/4/2015.
 */
ig.module(
    'game.entities.gameover'
)
    .requires(
    'impact.entity'

)
    .defines(function()
    {
        EntityGameover = ig.Entity.extend({
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(0,0,255,.7)',
            _wmScalable: true,
            size: {x:15,y:15},
            level: null,
            checkAgainst: ig.Entity.TYPE.A,


            check: function(other)
            {
                ig.game.gameOver();
                this.kill();
            },
            update: function() {

            }

        })
    })