/*###########################################################################
 # Code created by Adam Brookes for adambrookesprojects.co.uk - 06/10/2013 #
 #  It is unencumbered by copyrights and patents and we can use it freely, #
 # but we can only assert our own Intellectual Property rights on derived  #
 #  works: the original work remains free for public use                   #
 ###########################################################################

 #######################################################
 # Class used to manage canvas2 Renderer and Simulation #
 #######################################################*/
if (window.addEventListener) window.addEventListener('load', onLoad, false);

function onLoad() {
    var canvas2;
    var context2;

    var renderer2 = new Renderer('#CAE1FF'); // takes colour for canvas2.
    var simulation2;
    var ballArray2 = new Array();

    // frameRate Variables.
    var frameRate = 60;
    var frameTimer = 1000 / frameRate;

    // DeltaTime variables.
    var lastTime = Date.now(); // inistalise lastTime.
    var thisTime;
    var deltaTime;

    function initialiseCanvas() {
        //find the canvas2 element using its id attribute.
        canvas2 = document.getElementById('canvas2');

        //once canvas2 is created, create the simulation passing the width and height of canvas2
        simulation2 = new Simulation(canvas2.width,canvas2.height);

        /*########## Error checking to see if canvas2 is supported ############## */
        if (!canvas2) {
            alert('Error: cannot find the canvas2 element!');
            return;
        }
        if (!canvas2.getcontext2) {
            alert('Error: no canvas2.getContent!');
            return;
        }
        context2 = canvas2.getcontext('2d');

        if (!context2) {
            alert('Error: failed to getContent');
            return;
        }

        canvas2.addEventListener("click",function(event)
        {
            //console.log("click");
            var x = event.pageX + canvas2.offsetLeft,
                y = event.pageY + canvas2.offsetTop;


            ballArray2.forEach(function(ball)
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


        ballArray2.push(new ball(500, 250, 17, 17, -2, -4,  "#000000"));
        ballArray2.push(new ball(500, 20, 18, 18, -2, 5,  "#000000"));

        ballArray2.push(new ball(600, 70, 18, 18, -1, 1,  "#000000"));



    }

    function mainLoop() {


        thisTime = Date.now();
        deltaTime = thisTime - lastTime;


        renderer2.draw(context2, ballArray);
        simulation2.update(context2, deltaTime, ballArray);

        lastTime = thisTime;

        setTimeout(mainLoop, frameTimer);
    }

    initialiseCanvas();
}/**
 * Created by William on 2/4/2015.
 */
