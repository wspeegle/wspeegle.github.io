ig.module(
    'game.entities.levelexit'
)
.requires(
    'impact.entity'
)
.defines(function(){
        EntityLevelexit = ig.Entity.extend({
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(0,0,255,.7)',
            size: {x:15,y:15},
            level: null,
            checkAgainst: ig.Entity.TYPE.A,
            update: function()
            {
            },
            check: function(other)
            {
                if(other instanceof EntityPlayer)
                {
                    ig.game.toggleStats(this);
                }
                //if(other instanceof EntityPlayer)
                //{
                //    if(this.level)
                //    {
                //        var levelName = this.level.replace(/^(level)?(\w)(\w*)/, function(m,l,a,b){
                //            return a.toUpperCase() + b;
                //        });
                //        ig.game.loadLevelDeferred(ig.global['Level' + levelName]);
                //    }
                //}
            },
            nextLevel: function()
            {
                if(this.level)
                {
                    var levelName = this.level.replace(/^(level)?(\w)(\w*)/, function(m,l,a,b){
                        return a.toUpperCase() + b;});
                    ig.game.loadLevelDeferred(ig.global['Level' + levelName]);
                }
            }


        });
    });
