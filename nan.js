var cameraA;

function setup() {
    createCanvas(windowWidth, windowHeight);

    // createCanvas(100, 100, WEBGL);

    cameraA = new CameraPlayer();
}

function draw() {
    background(100, 150, 100);

    // Move cameraA
    cameraA.update();

    translate(-cameraA.posTopLeft.x, -cameraA.posTopLeft.y );
    scale(cameraA.scale);

    // Game rendering

    rect(10, 1, 500, 500);

    strokeWeight(10);
    point(cameraA.posCenter.x, cameraA.posCenter.y);



    // // Menu //
    // push();
    // {
    //     let oppScale = 1 / cameraPlayer.scale;
    //     scale(oppScale);
    //     translate(cameraPlayer.pos.x / oppScale, cameraPlayer.pos.y / oppScale);

    //     var fps = frameRate();
    //     fill(255);
    //     stroke(0);
    //     text("FPS: " + fps.toFixed(2), 10, height - 10);

        
    //     // -- //
    // }
    // pop();

}








class CameraPlayer {
    constructor() {

        this.posCenter = createVector(0, 0);
        this.posTopLeft = createVector(0, 0);

        this.scale = 1;
        this.oppScale = 1;

        this.scrollsensitivity = 1;
        this.scrollvalue = 1;

    }

    update() {
        this.posTopLeft.x = this.posCenter.x - width / 2;
        this.posTopLeft.y = this.posCenter.y - height / 2;


        mouseWheelvalue = constrain(mouseWheelvalue, -1000, 1000);

        this.scale = map(mouseWheelvalue, -1000, 1000, 1, 0.1);

        console.log(this.scale);
        // this.scale =;

        this.movementControls();
    }

    movementControls() {
        // up: 87,
        // down: 83,
        // left: 65,
        // right: 68,

        if (keyIsDown(65)) { // LEFT_ARROW
            this.posCenter.x -= 10;
        }

        if (keyIsDown(68)) { // RIGHT_ARROW
            this.posCenter.x += 10;
        }

        if (keyIsDown(87)) { // UP_ARROW
            this.posCenter.y -= 10;
        }

        if (keyIsDown(83)) { // DOWN_ARROW
            this.posCenter.y += 10;
        }
    }
}

// mouseWheel
var mouseWheelvalue = 1;
function mouseWheel(event) {
    mouseWheelvalue += event.delta;


}


