//game vars
var display, input, frame, spriteFrame, moveSpeed;
var alienSprite, playerSprite, archSprite;
var aliens, direction, player, bullets, arches, score;
var loadImg = new Image();
loadImg.src = "images/invaderLoad.jpg";

function main()
{
    display = new Screen(504,600);
    input = new InputHandler();

    var img = new Image();
    img.addEventListener("load", function()
    {
        //Create all the sprites
        alienSprite =
            [
                [new Sprite(this,0,0,22,16), new Sprite(this,0,16,22,16)],
                [new Sprite(this,22,0,16,16), new Sprite(this,22,16,16,16)],
                [new Sprite(this,38,0,24,16), new Sprite(this,38,16,24,16)]
            ];

        playerSprite = new Sprite(this, 62, 0, 22, 16);
        archSprite = new Sprite(this, 84, 8, 36, 24);

        init();
        run();
    });
    img.src = "images/invaders.png";
}

//init
function init()
{
    frame = 0;
    spriteFrame = 0;
    moveSpeed = 60;
    score = 0;

    direction = 1;

    //create player
    player = {
        sprite: playerSprite, x: (display.width - playerSprite.w) /2, y: display.height - (30 + playerSprite.h)
    };

    //create bullet array...obviously empty at start
    bullets = [];

    //create the arches and canvas
    arches = {
        //canvas: null, ctx: null,
        y: player.y - (30 + archSprite.h),
        h: archSprite.h,
        //create canvas on load
        init: function()
        {
            this.canvas = document.createElement("canvas");
            this.canvas.width = display.width;
            this.canvas.height = this.h;
            this.ctx = this.canvas.getContext("2d");
            for(var i = 0; i < 4 ; i++)
            {
                //draw all the sprites to the canvas
                this.ctx.drawImage(archSprite.img, archSprite.x, archSprite.y, archSprite.w, archSprite.h, 68+111*i, 0, archSprite.w, archSprite.h);
            }
        },
        //function or erasing pixels on the arches
        generateDamage: function(x,y)
        {
            x = Math.floor(x/2) *2;
            y = Math.floor(y/2) *2;
            this.ctx.clearRect(x-2,y-2,4,4);
            this.ctx.clearRect(x+2, y-4, 2, 4);
            this.ctx.clearRect(x+4, y, 2, 2);
            this.ctx.clearRect(x+2, y+2, 2, 2);
            this.ctx.clearRect(x-4, y+2, 2, 2);
            this.ctx.clearRect(x-6, y, 2, 2);
            this.ctx.clearRect(x-4, y-4, 2, 2);
            this.ctx.clearRect(x-2, y-6, 2, 2);
        },

        //check if pixel is hit
        hits: function(x,y)
        {
            y -= this.y;
            var data = this.ctx.getImageData(x,y,1,1);
            if(data.data[3] !== 0)
            {
                this.generateDamage(x,y);
                return true;
            }
            return false;
        }
    };
    //initiate the arches
    arches.init();

    //create the alien array
    aliens = [];
    var rows = [1,0,0,2,2];
    for(var i =0; i < rows.length; i++)
    {
        for(var j = 0; j<10;j++)
        {
            var a = rows[i];
            aliens.push({
                sprite:alienSprite[a],
                x: 30 + j*30 + [0,4,0][a],
                y: 30 + i*30,
                w: alienSprite[a][0].w,
                h: alienSprite[a][0].h
            })
        }
    }
}

//loop function for drawing and updating
function run()
{
    var load = function()
    {
        if(!input.isPressed(32))
        {
            loading();
            window.requestAnimationFrame(load);
        }
        else
        window.requestAnimationFrame(loop);
    };
    var loop = function()
    {
        update();
        draw();
        if(!end())
        window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(load);
}

function loading()
{


    display.ctx.drawImage(loadImg, 96,10);
    console.log("loading");
    display.ctx.fillStyle = "white";
    display.ctx.font = "20px Courier New";
    display.ctx.fillText("Press Space to start!", 125, 250);
    display.ctx.fillText("Controls:", 50, 300);
    display.ctx.fillText("Press spacebar to shoot", 50, 320);
    display.ctx.fillText("Press the left and right", 50, 340);
    display.ctx.fillText("arrow keys to move", 50, 360);
    display.ctx.fillText("Kill all the aliens before", 50, 400);
    display.ctx.fillText("they reach you to win!", 50, 420);

}

//update function
function update()
{
    frame++;
    //update position using inputs, left arrow, right arrow, space= shoot
    if(input.isDown(37))
        player.x -=4;
    if(input.isDown(39))
        player.x +=4;
    if(input.isPressed(32))
        bullets.push(new Bullet(player.x +10, player.y, -8, 2, 6, "#FF0000"));
    //make sure player can't leave the canvas area
    player.x = Math.max(Math.min(player.x, display.width - (30+playerSprite.w)),30);

    //update all bullets, will check for collisions
    for(var i3 = 0, len = bullets.length; i3 < len; i3++) {
        var temp2 = bullets[i3];
        temp2.update();
        //destroy bullets outside of canvas area to not waste memory
        if (temp2.y + temp2.height < 0 || temp2.y > display.height) {
            bullets.splice(i3, 1);
            i3--;
            len--;
            continue;
        }

        //check if bullet hits an arch, if so delete the bullet, generate damage on the arch
        var ah = temp2.height * .5;
        if (arches.y < temp2.y + ah && temp2.y + ah < arches.y + arches.h) {
            if (arches.hits(temp2.x, temp2.y + ah)) {
                bullets.splice(i3, 1);
                i3--;
                len--;
                continue;
            }
        }
        //check if bullet hit player, if so you lose..display score, delete bullet
        if(Collision(temp2.x, temp2.y, temp2.width, temp2.height, player.x, player.y, 22,16))
        {
            display.ctx.fillStyle = "white";
            display.ctx.font = "95px Courier New";
            display.ctx.fillText("You lose!", 25, 250);
            display.ctx.font = "60px Courier New";
            display.ctx.fillText("Score: ", 60, 400);
            display.ctx.fillText(score,350, 400);
            bullets.splice(i3,1);
            i3--;
        }

        //check if bullet hit an alien, if so destory the alien, increase the score
        for (var j = 0, l2 = aliens.length; j < l2; j++)
        {
            var a = aliens[j];
            if(Collision(temp2.x, temp2.y, temp2.width, temp2.height, a.x, a.y, a.w, a.h))
            {
                aliens.splice(j,1);
                j--;
                l2--;
                bullets.splice(i3,1);
                i3--;
                len--;
                score += 10; //I increment score by 10....max score = 500

                //if we lose aliens, speed them up
                //make the game more difficult
                switch(l2)
                {
                    case 30:
                    {
                        //20 dead
                        moveSpeed = 40;
                        break;
                    }
                    case 10:
                    {
                        //40 dead
                        moveSpeed = 20;
                        break;
                    }
                    case 5:
                    {
                        //45 dead
                        moveSpeed = 15;
                        break;
                    }
                    case 1:
                    {
                        //last one left, moves very fast
                        moveSpeed = 5;
                        break;
                    }

                }

            }

        }
    }

    //make aliens randomly shoot
    if(Math.random() < 0.03 && aliens.length >0)
    {
        var al = aliens[Math.round(Math.random() * (aliens.length -1))]; //randomly pick an alien to shoot from
        //be sure this alien is in the front line so no friendly fire
        for(var i2=0; i2 < aliens.length; i2++)
        {
            var temp3 = aliens[i2];
            if(Collision(al.x,al.y,al.w,al.h+100, temp3.x, temp3.y, temp3.w, temp3.h)) {
                al = temp3;
            }
        }
        //create the bullet - shoots from in front of alien to insure no clipping when aliens are moving down
        //after they hit the edge
        //These bullets are white
        bullets.push(new Bullet(al.x, al.y +al.h +15, 4,2,4, "#FFFFFF"));
    }
    //update aliens based on current movement variable
    //default move right, until they hit side of canvas then change direction
    if(frame%moveSpeed == 0) {
        spriteFrame = (spriteFrame + 1) % 2;
        var max = 0, min = display.width;
        for (var i4 = 0; i4 < aliens.length; i4++) {
            var temp = aliens[i4];
            temp.x += 30 * direction;
            max = Math.max(max, temp.x + temp.w);
            min = Math.min(min, temp.x);
        }
        //check if the aliens have hit the edge and should move down towards the player
        if (max > display.width - 15 || min < 15) {
            direction *= -1;
            for (var i5 = 0; i5 < aliens.length; i5++) {
                aliens[i5].x += 30 * direction;
                aliens[i5].y += 30;


            }
        }

        //Check to see if aliens have reached the arches
        //If so, you lose
        for (var t = 0; t < aliens.length; t++) {
            var tempAl = aliens[t];
            if (Collision(tempAl.x, tempAl.y, tempAl.w, tempAl.h, arches.x, arches.y, 36, 24)) {
                display.ctx.fillStyle = "white";
                display.ctx.font = "95px Courier New";
                display.ctx.fillText("You lose!", 25, 250);
                display.ctx.font = "60px Courier New";
                display.ctx.fillText("Score: ", 60, 400);
                display.ctx.fillText(score, 350, 400);
            }
        }
    }
    this.end();
}


//draw to canvas
function draw()
{
    display.clear();
    for(var i6=0; i6<aliens.length; i6++)
    {
        var temp = aliens[i6];
        display.drawSprite(temp.sprite[spriteFrame], temp.x, temp.y);
    }
    display.ctx.save();
    for(var i7=0; i7 < bullets.length; i7++)
    {
        display.drawBullet(bullets[i7]);
    }
    display.ctx.restore();

    display.ctx.drawImage(arches.canvas, 0, arches.y);
    display.drawSprite(player.sprite, player.x, player.y);
    display.ctx.fillStyle = "white";
    display.ctx.font = "20px Courier New";
    display.ctx.fillText("Score: ", 10,25);
    display.ctx.fillText(score,100,25);
}

//This function checks 2 of the 3 win conditions
//Bullet collision is checked in the update function
function end()
{
    //Check to see if aliens have reached the arches
    //If so, you lose
    for (var t = 0; t < aliens.length; t++) {
        var tempAl = aliens[t];
        if (tempAl.y >= arches.y) {
            display.ctx.fillStyle = "white";
            display.ctx.font = "95px Courier New";
            display.ctx.fillText("You lose!", 25, 250);
            display.ctx.font = "60px Courier New";
            display.ctx.fillText("Score: ", 60, 400);
            display.ctx.fillText(score, 350, 400);
            return true;
        }
    }
    //Check to see if you have won
    //Either you got the max score (500)
    //Or somehow the aliens have died to friendly fire
    //If FF is the case we must check to see if the array of aliens is empty
    if (aliens.length == 0 || score == 500) {
        display.ctx.fillStyle = "white";
        display.ctx.font = "95px Courier New";
        display.ctx.fillText("You win!", 25, 250);
        display.ctx.font = "60px Courier New";
        display.ctx.fillText("Score: ", 60, 400);
        display.ctx.fillText(score, 350, 400);
        return true;
    }
    return false;
}

main();
