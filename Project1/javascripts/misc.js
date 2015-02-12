/**
 * Created by William on 1/26/2015.
 */

//Bullet Class
function Bullet(x,y,velY, w, h, color)
{
    this.x = x;
    this.y = y;
    this.velY = velY;
    this.width = w;
    this.height = h;
    this.color = color;
}

//Update bullet pos
Bullet.prototype.update = function()
{
    this.y += this.velY;
};

//Abstracted canvas
function Screen(width,height)
{
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
}

//Clear the canvas
Screen.prototype.clear = function()
{
    this.ctx.clearRect(0,0,this.width,this.height);
};

//Draw sprite to the canvas

Screen.prototype.drawSprite = function(sp, x, y)
{
    this.ctx.drawImage(sp.img, sp.x, sp.y, sp.w, sp.h, x, y, sp.w, sp.h);
};

//Draw bullet to the canvas
Screen.prototype.drawBullet = function(bullet)
{
    this.ctx.fillStyle = bullet.color;
    this.ctx.fillRect(bullet.x,bullet.y,bullet.width,bullet.height);
};

//Create the sprite obj
function Sprite(img, x, y, w, h)
{
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

//Input Handler for key presses

function InputHandler()
{
    this.down = {};
    this.pressed = {};
    var _this = this;
    document.addEventListener("keydown", function(event)
    {
        _this.down[event.keyCode] = true;
    });

    document.addEventListener("keyup", function(event)
    {
        delete _this.down[event.keyCode];
        delete _this.pressed[event.keyCode];
    })
}

//Return whether or not a key is pressed down
InputHandler.prototype.isDown = function(code)
{
    return this.down[code];
};


//Return whether or not a key has been pressed
InputHandler.prototype.isPressed = function(code) {
    if (this.pressed[code])
        return false;
    else if(this.down[code])
        return this.pressed[code] = true;

    return false;
};

//Check if there is an intersection
//This function is used for the collision detection between pixels
function Collision(ax, ay, aw, ah, bx, by, bw, bh)
{

    if( ax < bx+bw && bx < ax+aw && ay < by+bh && by < ay+ah)
        return true;
    return false;
}