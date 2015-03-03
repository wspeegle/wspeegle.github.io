/*
 This entity gives damage (through ig.Entity's receiveDamage() method) to
 the entity that is passed as the first argument to the triggeredBy() method.

 I.e. you can connect an EntityTrigger to an EntityHurt to give damage to the
 entity that activated the trigger.


 Keys for Weltmeister:

 damage
 Damage to give to the entity that triggered this entity.
 Default: 10
 */

ig.module(
    'game.entities.spike'
)
    .requires(
    'impact.entity'
)
    .defines(function(){

        EntitySpike = ig.Entity.extend({
            _wmDrawBox: true,
            _wmScalable: true,
            _wmBoxColor: 'rgba(255, 0, 0, 0.7)',
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.B,
            collides: ig.Entity.COLLIDES.PASSIVE,

            size: {x: 8, y: 8},
            damage: 4,

            triggeredBy: function( entity, trigger ) {
               // if(ig.game.hits == 0) {
                    entity.receiveDamage(this.damage, this);
                //}
                ig.game.hits--;
            },

            update: function(){}
        });

    });