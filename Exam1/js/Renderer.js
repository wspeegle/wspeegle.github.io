/*#######################################################
 # Class used Render simulation onto HTML5 canvas       #
 ########################################################*/
var Renderer = (function (Context) {
    var canvasColour;
    function Renderer(inCanvasColour) {
        canvasColour = inCanvasColour;
    };

    Renderer.prototype.draw = function(context, ballArray) {
        // draw Canvas Background.
        drawCanvasBackground(context);
        // draw Balls.
        drawBalls(context, ballArray);
    }

    function drawCanvasBackground(context) {
        context.beginPath();
        context.fillStyle = canvasColour;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.closePath();
        context.beginPath();
        context.strokeStyle = "#FF0000";
        context.lineWidth = 10;
        context.moveTo(400,0);
        context.lineTo(800,0);
        context.lineTo(800,300);
        context.lineTo(400,300);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.strokeStyle = "#000000";
        context.lineWidth = 10;
        context.moveTo(0,0);
        context.lineTo(400,0);
        context.stroke();
        context.lineTo(400,300);
        context.lineTo(0,300);
        context.lineTo(0,0);
        context.stroke();
        context.closePath();


    }
    function drawBalls(context,ballArray) {
        for (var i = 0; i < ballArray.length; i++) {
            context.beginPath();
            // draw ball using ball objects data.
            context.arc(ballArray[i].getX(), ballArray[i].getY(),ballArray[i].getRadius(), 0, Math.PI * 2, false);
            context.strokeStyle = canvasColour;
            //context.stroke();
            context.fillStyle = ballArray[i].getColour();
            context.fill();
            context.closePath();
        }
    }



    return Renderer;
})();