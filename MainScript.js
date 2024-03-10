
////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//           Camera Movement                                                   //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

var cam;

var type = 0;

var cols = 20;
var rows = 20;
var scaleGrid = 50;
var grid = [];


// function preload() {
// }

function setup() {
    // console.log(data);
    createCanvas(windowWidth, windowHeight);
    cam = new Camera();

    grid = make2DArray(cols, rows);

    for (var x = 0; x < cols; x++) {
        for (var y = 0; y < rows; y++) {
            grid[x][y] = new Cell(x * scaleGrid, y * scaleGrid);
        }
    }

    grid[1][1] = new Wall(1 * scaleGrid, 1 * scaleGrid);

}

function draw() {
    background(100, 150, 100);

    // DrawGrid();



    mouseG = createVector(
        round((cam.mouseX) / scaleGrid) * scaleGrid,
        round((cam.mouseY) / scaleGrid) * scaleGrid
    );

    var selected = false;
    for (var x = 0; x < cols; x++) {
        for (var y = 0; y < rows; y++) {
            grid[x][y].render();
            grid[x][y].update();
            if (mouseG.x == grid[x][y].pos.x && mouseG.y == grid[x][y].pos.y) {
                selected = createVector(x, y);
            }


        }
    }

    if (keyIsDown(49)) { // 1
        type = 1;
    }

    if (keyIsDown(50)) { // 2
        type = 2;
    }

    if (keyIsDown(51)) { // 2
        type = 3;
    }

    if (keyIsDown(52)) { // 2
        type = 4;
    }

    if (keyIsDown(53)) { // 2
        type = 5;
    }

    if (mouseIsPressed && selected) {
        if (type == 1) { // 1
            grid[selected.x][selected.y] = new Cell(selected.x * scaleGrid, selected.y * scaleGrid);
        }

        if (type == 2) { // 2
            grid[selected.x][selected.y] = new Wall(selected.x * scaleGrid, selected.y * scaleGrid);
        }

        if (type == 3) { // 2
            grid[selected.x][selected.y] = new Turret(selected.x * scaleGrid, selected.y * scaleGrid);
        }
    }



    stroke(0);
    strokeWeight(5);
    point(0, 0);

    strokeWeight(5);
    point(cam.mouseX, cam.mouseY);

    stroke(0, 255, 0);
    point(cam.pmouseX, cam.pmouseY);

    stroke(0, 0, 255);
    point(cameraX, cameraY);

    stroke(255, 0, 0);
    point(mouseG.x, mouseG.y);

    cameraWASDmove();



    push(); // Menu //
    {
        // translate(cam.mouseX , cam.mouseY);
        var fps = frameRate();
        fill(255);
        stroke(0);
        text("FPS: " + fps.toFixed(2), cameraX, cameraY + (windowHeight / 2 - 10));
    }
    pop(); // -- //



}

var world_Width = 20000;
var world_Height = 20000;

function DrawGrid() {
    push();
    fill(0);
    stroke(0);
    strokeWeight(2);
    for (var i = -world_Height / 2; i <= world_Height / 2; i += 100) {
        line(-world_Width / 2, i, world_Width / 2, i);
    }
    for (var i = -world_Width / 2; i <= world_Width / 2; i += 100) {
        line(i, -world_Height / 2, i, world_Height / 2);
    }
    pop();
}

////////////////////////////////////////////////////////////////////////////////

// function mouseMoved() {
//     if (graph) {
//         graph.touch(cam.mouseX, cam.mouseY);
//     }
// }


function cameraWASDmove() {
    if (keyIsDown(65)) { // LEFT_ARROW
        cam.mouseX = cam.mouseX - 10;
        cam.translate(-10, 0);
    }

    if (keyIsDown(68)) { // RIGHT_ARROW
        cam.mouseX = cam.mouseX + 10;
        cam.translate(10, 0);
    }

    if (keyIsDown(87)) { // UP_ARROW
        cam.mouseY = cam.mouseY - 10;
        cam.translate(0, -10);
    }

    if (keyIsDown(83)) { // DOWN_ARROW
        cam.mouseY = cam.mouseY + 10;
        cam.translate(0, 10);
    }
}

function mouseDragged() {
    // var dx = cam.mouseX - cam.pmouseX;
    // var dy = cam.mouseY - cam.pmouseY;

    // cam.translate(-dx, -dy);
}

function mouseWheel(e) {
    var factor = Math.pow(1.001, -e.delta);
    cam.scale(factor, mouseX, mouseY);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyTyped() {
    switch (key) {
        case 'r':
            cam.reset();
            break;
        // case ' ':
        //     level = (level + 1) % 22;
        //     graph = new Graph(data[level]);
        //     break;
        // case 'd':
        //     debug = !debug;
        //     break;
    }
}

////////////////////////////////////////////////////////////////////////////////



function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

class Cell {
    constructor(x, y) {
        this.name = "Cell";

        this.pos = createVector(x, y);
        this.gridpos = createVector(x / scaleGrid, y / scaleGrid)
    }

    render() {
        push();
        // translate(this.pos.x, this.pos.y);
        // fill(255);
        // stroke(255);
        // strokeWeight(0.1);

        // text(this.instruction, 0 , 0);

        strokeWeight(3);
        fill(0, 255, 0);
        stroke(0, 255, 0);
        point(this.pos.x, this.pos.y);

        // noFill();
        // rectMode(CENTER);
        // rect(this.pos.x, this.pos.y, scaleGrid, scaleGrid);

        pop();
    }

    update() {

    }
}

class Turret {
    constructor(x, y) {
        this.name = "Turret";

        this.pos = createVector(x, y);
        this.gridpos = createVector(x / scaleGrid, y / scaleGrid);

        this.gunAngel = 90;
    }

    render() {
        push();
        // translate(this.pos.x, thxs.pos.y);
        // fill(255);
        // stroke(255);
        // strokeWeight(0.1);

        // text(this.instruction, 0 , 0);

        strokeWeight(3);
        fill(0, 255, 0);
        stroke(0, 255, 0);
        point(this.pos.x, this.pos.y);

        stroke(0);
        noFill();
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, scaleGrid / 2, scaleGrid / 2);

        rotate();
        rect(this.pos.x, this.pos.y, 10, 10);




        this.top = false;
        this.bottom = false;
        this.right = false;
        this.left = false;

        if (  !(this.gridpos.y == 0 || this.gridpos.x == 0 || this.gridpos.y == cols - 1 || this.gridpos.x == rows - 1) ) {

            if (grid[this.gridpos.x][this.gridpos.y - 1].name == "Wall") {
                this.top = true;
                rect(this.pos.x, this.pos.y - (scaleGrid / 4) * 2, scaleGrid / 2, scaleGrid / 4);
            }

            if (grid[this.gridpos.x][this.gridpos.y + 1].name == "Wall") {
                this.bottom = true;
                rect(this.pos.x, this.pos.y + (scaleGrid / 4) * 2, scaleGrid / 2, scaleGrid / 4);
            }

            if (grid[this.gridpos.x + 1][this.gridpos.y].name == "Wall") {
                this.right = true;
                rect(this.pos.x + (scaleGrid / 4) * 2, this.pos.y, scaleGrid / 4, scaleGrid / 2);
            }

            if (grid[this.gridpos.x - 1][this.gridpos.y].name == "Wall") {
                this.left = true;
                rect(this.pos.x - (scaleGrid / 4) * 2, this.pos.y, scaleGrid / 4, scaleGrid / 2);
            }

        }


        pop();
    }

    update() {

    }

}


class Wall {
    constructor(x, y) {
        this.name = "Wall";

        this.pos = createVector(x, y);
        this.gridpos = createVector(x / scaleGrid, y / scaleGrid)
    }

    render() {
        push();
        // translate(this.pos.x, this.pos.y);
        // fill(255);
        // stroke(255);
        // strokeWeight(0.1);

        // text(this.instruction, 0 , 0);

        strokeWeight(3);
        fill(0, 255, 0);
        stroke(0, 255, 0);
        point(this.pos.x, this.pos.y);

        stroke(0);
        noFill();
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, scaleGrid / 2, scaleGrid / 2);

        this.top = false;
        this.bottom = false;
        this.right = false;
        this.left = false;

        if (  !(this.gridpos.y == 0 || this.gridpos.x == 0 || this.gridpos.y == cols - 1 || this.gridpos.x == rows - 1) ) {

            if (grid[this.gridpos.x][this.gridpos.y - 1].name == "Wall") {
                this.top = true;
                rect(this.pos.x, this.pos.y - (scaleGrid / 4) * 2, scaleGrid / 2, scaleGrid / 4);
            }

            if (grid[this.gridpos.x][this.gridpos.y + 1].name == "Wall") {
                this.bottom = true;
                rect(this.pos.x, this.pos.y + (scaleGrid / 4) * 2, scaleGrid / 2, scaleGrid / 4);
            }

            if (grid[this.gridpos.x + 1][this.gridpos.y].name == "Wall") {
                this.right = true;
                rect(this.pos.x + (scaleGrid / 4) * 2, this.pos.y, scaleGrid / 4, scaleGrid / 2);
            }

            if (grid[this.gridpos.x - 1][this.gridpos.y].name == "Wall") {
                this.left = true;
                rect(this.pos.x - (scaleGrid / 4) * 2, this.pos.y, scaleGrid / 4, scaleGrid / 2);
            }

        }

        pop();
    }

    update() {

    }
}