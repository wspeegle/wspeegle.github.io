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
        context.fillStyle = "#FF0000";
        context.moveTo(canvas.width/2, 0);
        context.lineTo(canvas.width/2, canvas.height);
        context.strokeStyle = "FF0000";
        context.stroke();
        context.closePath();
    }
    function drawBalls(context,ballArray) {
        for (var i = 0; i < ballArray.length; i++) {
            context.beginPath();
            // draw ball using ball objects data.
            context.arc(ballArray[i].getX(), ballArray[i].getY(),ballArray[i].getRadius(), 0, Math.PI * 2, false);
            context.strokeStyle = canvasColour;
            context.stroke();
            context.fillStyle = ballArray[i].getColour();
            context.fill();
            context.closePath();
        }
    }



    return Renderer;
})();