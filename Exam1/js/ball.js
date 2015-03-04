
/*############################################################
 # Class is a ball object, only contains getters and setters #
 #############################################################*/
var colorArray= ["#000000","#FF0000", "#00FF00", "#0000FF", "#CAE1FF"];

var ball = (function (context) {

    var position;
    var lastGoodPosition
    var velocity;
    var radius;
    var mass;
    var colour;
    var x;
    var y;
    var colorPos;
    var collissionThreshold;
    var clickedOn;
    var scalar;

    function ball(inX,inY,inRadius,inMass,inVelX,inVelY, inColour) { // constructor
        this.position = new vector();
        this.position.setX(inX);        this.position.setY(inY);

        this.velocity = new vector();
        this.velocity.setX(inVelX);     this.velocity.setY(inVelY);
       // this.velocity.setX(0);     this.velocity.setY(0);

        this.setRadius(inRadius);
        this.setMass(inMass);
        this.setColour(inColour);
        this.colorPos = 0;
        this.collissionThreshold = 0;
        this.clickedOn = false;
        if(inColour == "#FF0000") {
            this.scalar = 1;
        }
        if(inColour == "#000000")
        {
            this.scalar = .1;
        }
    }

    /* #######################
     # Getters and Setters #
     ####################### */

    ball.prototype.setX = function (inX) { this.position.setX(inX);}
    ball.prototype.setY = function (inY) { this.position.setY(inY);}

    ball.prototype.getX = function () {return this.position.getX();}
    ball.prototype.getY = function () {return this.position.getY();}

    ball.prototype.setRadius = function (inRadius) { this.radius = inRadius;}
    ball.prototype.getRadius = function () { return this.radius;}

    ball.prototype.setMass = function (inMass) { this.mass = inMass;}
    ball.prototype.getMass = function () { return this.mass;}
    ball.prototype.setColour = function (inColour) { this.colour = inColour;}
    ball.prototype.getColour = function () { return this.colour;}
    ball.prototype.incScalar = function()
    {
        if(this.scalar <1) {
            this.scalar = this.scalar + .1;
        }
    }
    ball.prototype.decScalar = function()
    {
        if(this.scalar>.1) {
            this.scalar = this.scalar - .1;
        }
    }
    ball.prototype.getScalar = function()
    {
        return this.scalar;
    }
    return ball;
})();