/*###########################################################################
 # Code created by Adam Brookes for adambrookesprojects.co.uk - 06/10/2013 #
 #  It is unencumbered by copyrights and patents and we can use it freely, #
 # but we can only assert our own Intellectual Property rights on derived  #
 #  works: the original work remains free for public use                   #
 ###########################################################################

 #######################################################
 # Class used to manage Canvas Renderer and Simulation #
 #######################################################*/
if (window.addEventListener) window.addEventListener('load', onLoad, false);


function onLoad() {
    var canvas;
    var context;

    var renderer = new Renderer('#CAE1FF'); // takes colour for canvas.
    var simulation;
    var ballArray = new Array();

    // frameRate Variables.
    var frameRate = 60;
    var frameTimer = 1000 / frameRate;

    // DeltaTime variables.
    var lastTime = Date.now(); // inistalise lastTime.
    var thisTime;
    var deltaTime;


    function initialiseCanvas() {
        //find the canvas element using its id attribute.
        canvas = document.getElementById('canvas');
        redInel = document.getElementById('b1');
        redElas = document.getElementById('b2');
        blkInel = document.getElementById('b3');
        blkElas = document.getElementById('b4');
        btnReset = document.getElementById('reset');


        //once canvas is created, create the simulation passing the width and height of canvas
        simulation = new Simulation(canvas.width,canvas.height);

        /*########## Error checking to see if canvas is supported ############## */
        if (!canvas) {
            alert('Error: cannot find the canvas element!');
            return;
        }
        if (!canvas.getContext) {
            alert('Error: no canvas.getContent!');
            return;
        }
        context = canvas.getContext('2d');

        if (!context) {
            alert('Error: failed to getContent');
            return;
        }
        redInel.addEventListener("click", function(event)
        {
            ballArray.forEach(function(ball)
            {
                if(ball.getColour() == '#FF0000')
                {
                    ball.decScalar();
                    console.log(ball.getScalar());
                }
            })
        });
        redElas.addEventListener("click", function(event)
        {
            ballArray.forEach(function(ball)
            {
                if(ball.getColour() == '#FF0000')
                {
                    ball.incScalar();
                    console.log(ball.getScalar());
                }
            })
        });
        blkInel.addEventListener("click", function(event)
        {
            ballArray.forEach(function(ball)
            {
                if(ball.getColour() == '#FF0000')
                {
                    ball.decScalar();
                    console.log(ball.getScalar());
                }
            })
        });
        blkElas.addEventListener("click", function(event)
        {
            ballArray.forEach(function(ball)
            {
                if(ball.getColour() == '#FF0000')
                {
                    ball.incScalar();
                    console.log(ball.getScalar());
                }
            })
        });
        btnReset.addEventListener("click", function(event)
        {
            ballArray.forEach(function(ball)
            {
                ball.velocity.setX(2);
                ball.velocity.setY(1);
            })
        });

        canvas.addEventListener("click",function(event)
        {
            //console.log("click");
            var x = event.pageX + canvas.offsetLeft,
                y = event.pageY + canvas.offsetTop;


            ballArray.forEach(function(ball)
            {

                var ballX = ball.getX();
                var ballY = ball.getY();
                var ballR = ball.getRadius();
                //console.log("ballX: ", ballX);
                //console.log("ballY: ", ballY);
               // console.log("ballR: ", ballR);


               // ball.clickedOn = true;
                if(x>=ballX-ballR && x<=ballX+ballR && y >=ballY-ballR && y <=ballY+ ballR)
                {
                   if(ball.clickedOn == false) {
                       ball.clickedOn = true;
                       console.log(ball.clickedOn);
                   }
                    else if(ball.clickedOn == true)
                   {
                       ball.clickedOn = false;
                       ball.colorPos = 0;
                   }
                }
            })
        });



        createBalls();
        mainLoop(); // enter the main loop.
    }


    function createBalls() {
        /* Ball takes X | Y | radius | Mass| vX | vY | colour */

        ballArray.push(new ball(50, 100, 20, 20, 2, 0,  "#FF0000"));
        ballArray.push(new ball(200, 200, 20, 20, 2, 0,  "#FF0000"));
        ballArray.push(new ball(250, 50, 20, 20, 2, 0,  "#FF0000"));
        //ballArray.push(new ball(200, 100, 15, 15, -2, 0,  "#FF0000"));
        //ballArray.push(new ball(250, 50, 12, 12, 0, 5,  "#FF0000"));
        ballArray.push(new ball(500, 250, 20, 20, -2, -4,  "#000000"));
        ballArray.push(new ball(600, 50, 20, 20, -2, -4,  "#000000"));
        ballArray.push(new ball(700, 70, 20, 20, -2, -4,  "#000000"));
        //ballArray.push(new ball(600, 50, 18, 18, -2, 5,  "#000000"));
        //ballArray.push(new ball(700, 70, 18, 18, -1, 1,  "#000000"));



    }

    function mainLoop() {


        thisTime = Date.now();
        deltaTime = thisTime - lastTime;


        renderer.draw(context, ballArray);
        simulation.update(context, deltaTime, ballArray);

        lastTime = thisTime;

        setTimeout(mainLoop, frameTimer);
    }

    initialiseCanvas();
}/**
 * Created by William on 2/4/2015.
 */
