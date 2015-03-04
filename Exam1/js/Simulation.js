/*####################################################################
 # Class used to manage collision responce and movement of the balls #
 #####################################################################*/






var Simulation = (function (Context) {
    var canvas_Width;
    var canvas_Height;

    function Simulation(inWidth,inHeight) {
        // set simulations canvas width and height.
        canvas_Width = inWidth;
        canvas_Height = inHeight;
    }
    Simulation.prototype.update = function (context, deltaTime, ballArray) {
        /*#### Move balls ####### */
        updateBallPos(deltaTime, ballArray);
        /*##### Wall collision ####### */
        checkWallCollision(ballArray);
        /*###### ball ball collision ######## */
        for (var i = 0; i < ballArray.length; i++) {
            for (var j = 0; j < ballArray.length; j++) {
                if (ballArray[i] != ballArray[j]) {
                    if (checkBallCollision(ballArray[i], ballArray[j])) {
                        ballCollisionResponce(context, ballArray[i], ballArray[j]);
                    }
                }
            }
        }
    }


    function updateBallPos(deltaTime, ballArray) {
        for (var i = 0; i < ballArray.length; i++) {
            ballArray[i].lastGoodPosition = ballArray[i].position; // save the balls last good position.
            ballArray[i].position = ballArray[i].position.add((ballArray[i].velocity.multiply(deltaTime/10))); // add the balls (velocity * deltaTime) to position. 
        }
    }
    function checkWallCollision(ballArray) {
        for (var i = 0; i < ballArray.length; i++) {
            if(ballArray[i].getColour() == '#FF0000') {
                //console.log("red");
                /*##### Collisions on the X axis ##### */
                if (ballArray[i].getX() + (ballArray[i].getRadius()) >= 395 || ballArray[i].getX() - (ballArray[i].getRadius()) <= 0) {

                    ballArray[i].velocity.setX(-ballArray[i].velocity.getX()); // if collided with a wall on x Axis, reflect Velocity.X.
                    ballArray[i].position = ballArray[i].lastGoodPosition; // reset ball to the last good position (Avoid objects getting stuck in each other).
                }
            }
            if(ballArray[i].getColour() == '#000000')
            {
                //console.log("black");
                if (ballArray[i].getX() + (ballArray[i].getRadius()) >= canvas_Width || ballArray[i].getX() - (ballArray[i].getRadius()) <= 405) {
                    ballArray[i].velocity.setX(-ballArray[i].velocity.getX()); // if collided with a wall on x Axis, reflect Velocity.X.
                    ballArray[i].position = ballArray[i].lastGoodPosition; // reset ball to the last good position (Avoid objects getting stuck in each other).
                }
            }
            /*##### Collisions on the Y axis ##### */
            if (ballArray[i].getY() - (ballArray[i].getRadius()) <= 0 || ballArray[i].getY() + (ballArray[i].getRadius()) >= canvas_Height) { // check for y collisions.
                ballArray[i].velocity.setY(-ballArray[i].velocity.getY()); // if collided with a wall on x Axis, reflect Velocity.X. 
                ballArray[i].position = ballArray[i].lastGoodPosition;
            }
        }
    }
    function checkBallCollision(ball1, ball2) {
        var xDistance = (ball2.getX() - ball1.getX()); // subtract the X distances from each other. 
        var yDistance = (ball2.getY() - ball1.getY()); // subtract the Y distances from each other. 
        var distanceBetween = Math.sqrt((xDistance * xDistance) + (yDistance *yDistance)); // the distance between the balls is the sqrt of X squard + Ysquared. 

        var sumOfRadius = ((ball1.getRadius()) + (ball2.getRadius())); // add the balls radius together

        if (distanceBetween < sumOfRadius) { // if the distance between them is less than the sum of radius they have collided. 
            return true;
        }
        else {
            return false;
        }
    }
    function ballCollisionResponce(context, ball1, ball2) {

        ball1.position = ball1.lastGoodPosition;
        ball2.position = ball2.lastGoodPosition;

        var xDistance = (ball2.getX() - ball1.getX());
        var yDistance = (ball2.getY() - ball1.getY());

        var normalVector = new vector(xDistance, yDistance); // normalise this vector store the return value in normal vector.
        normalVector = normalVector.normalise();

        var tangentVector = new vector((normalVector.getY() * -1), normalVector.getX());

        // create scalar velocity in the tagential direction.
        var ball1scalarTangential = tangentVector.dot(ball1.velocity);
        var ball2scalarTangential = tangentVector.dot(ball2.velocity);
        var ball1scalar = ball1.getScalar();
        var ball2scalar = ball2.getScalar();

        var ball2ScalarNormalAfter = (ball2scalar* (ball1.getMass() - ball2.getMass()) + 2 * ball2.getMass() * ball2scalarTangential) / (ball1.getMass() + ball2.getMass());
        var ball1ScalarNormalAfter = (ball1scalar * (ball2.getMass() - ball1.getMass()) + 2 * ball1.getMass() * ball1scalarTangential) / (ball1.getMass() + ball2.getMass());

        var ball1scalarNormalAfter_vector = normalVector.multiply(ball1ScalarNormalAfter); // ball1Scalar normal doesnt have multiply not a vector.
        var ball2scalarNormalAfter_vector = normalVector.multiply(ball2ScalarNormalAfter);

        var ball1ScalarNormalVector = (tangentVector.multiply(ball1scalarTangential));
        var ball2ScalarNormalVector = (tangentVector.multiply(ball2scalarTangential));

        ball1.velocity = ball1ScalarNormalVector.add(ball1scalarNormalAfter_vector);
        ball2.velocity = ball2ScalarNormalVector.add(ball2scalarNormalAfter_vector);

       // drawCollission(context, ball1, ball2);

    }

    //function drawCollission(context, ball1, ball2) {
    //    if(ball1.clickedOn == true) {
    //        ball1.collissionThreshold += 1;
    //    }
    //    if(ball2.clickedOn == true) {
    //        ball2.collissionThreshold += 1;
    //    }
    //
    //    if(ball1.collissionThreshold %4 == 0 &&ball1.collissionThreshold >0 && ball1.collissionThreshold <17 ) {
    //        ball1.colorPos += 1;
    //    }
    //    if(ball2.collissionThreshold %4 ==0 && ball2.collissionThreshold >0 && ball2.collissionThreshold <17) {
    //        ball2.colorPos += 1;
    //    }
    //
    //
    //    var x1 = ball1.getX();
    //    var x2 = ball2.getX();
    //    var y1 = ball1.getY();
    //    var y2 = ball2.getY();
    //    var r1 = ball1.getRadius();
    //    var r2 = ball2.getRadius();
    //
    //    var xPoint = (x1 * r2 + x2 * r1) / (r1 + r2);
    //    var yPoint = (y1 * r2 + y2 * r1) / (r1 + r2);
    //    //context.beginPath();
    //    //context.fillStyle = "blue";
    //    //context.arc(xPoint, yPoint, r1, 0, Math.PI * 2, false);
    //    //context.fill();
    //    //context.drawImage(explosion, xPoint -120, yPoint-115);
    //    //context.closePath();
    //    var c1 =colorArray[ball1.colorPos];
    //    var c2 = colorArray[ball2.colorPos];
    //    ball1.setColour(c1);
    //    ball2.setColour(c2);
    //}

    //function randomColor() {
    //    var letters = "0123456789ABCDEF".split("");
    //    var color = "#";
    //    for (var i = 0; i < 6; i++)
    //    {
    //        color += letters[Math.floor(Math.random()*16)];
    //    }
    //    return color;
    //}


    return Simulation;
})();

