var faceDownImage;
var canvas;
var faces = [];

function preload() {
    //Preload the image in faceDownImage variable
    faceDownImage = loadImage('tiles/pikachuYcharmander.png');

        // Declare an array of all possible faces
        for (var num = 1; num < 16; num++) {
            //The names of pictures are correlatives
            faces[num-1] = loadImage("faces/face" + num + ".png");
        }
    }

function setup() {
        // Create a CANVAS with WIDTH and HEIGHT that you want
        canvas = createCanvas(500,500);
        canvas.position(100,100);
    //Create a CONSTRUCTOR FUNCTION named Tile
    var Tile = function(x, y, face) {
        this.x = x;
        this.y = y;
        this.size = 70;
        this.face = face;
        this.isFaceUp = false;
    };

    //Create a METHOD draw to Tile object
    Tile.prototype.draw = function() {
        fill(214, 247, 202);
        strokeWeight(2);
        rect(this.x, this.y, this.size, this.size, 10);
        if (this.isFaceUp) {
            image(this.face, this.x, this.y, this.size, this.size);
        } else {
            image(faceDownImage, this.x, this.y, this.size, this.size);
        }
    };

    //It's a method verify if mouse x and y are into a tile
    Tile.prototype.isUnderMouse = function(x, y) {
        return x >= this.x && x <= this.x + this.size  &&
            y >= this.y && y <= this.y + this.size;
    };

// Make an array which has 2 of each, then randomize it
var selected = [];
for (var i = 0; i < 15; i++) {
    // Randomly pick one from the array of remaining faces
    var randomInd = floor(random(faces.length));
    var face = faces[randomInd];
    // Push 2 copies onto array
    selected.push(face);
    selected.push(face);
    // Remove from array
    faces.splice(randomInd, 1);
}

// Now shuffle the elements of that array
var shuffleArray = function(array) {
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var ind = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[ind];
        array[ind] = temp;
    }
};
shuffleArray(selected);



    // Create the array of tiles at appropriate positions
    var tiles = [];
    var NUM_COLS = 6;
    var NUM_ROWS = 5;
    for (var i = 0; i < NUM_COLS; i++) {
        for (var j = 0; j < NUM_ROWS; j++) {
            var tileX = i * 74 + 5;
            var tileY = j * 74 + 40;
            var tileFace = selected.pop();
            var tile = new Tile(tileX, tileY, tileFace);
            tiles.push(tile);
        }
    }
    

    var numFlipped = 0;
    var delayStartFC = null;

    mouseClicked = function() {
        // check if mouse was inside a tile
        for (var i = 0; i < tiles.length; i++) {
            tile = tiles[i];
            if (tile.isUnderMouse(mouseX, mouseY)) {
                if (numFlipped < 2 && !tile.isFaceUp) {
                    tile.isFaceUp = true;
                    numFlipped++;
                    if (numFlipped === 2) {
                        delayStartFC = frameCount;
                    }
                    loop();
                }
            }
        }
    };

    //Draw tiles
    draw = function() {
        if (delayStartFC && (frameCount - delayStartFC) > 30) {
            for (var i = 0; i < tiles.length; i++) {
                tiles[i].isFaceUp = false;
            }
            numFlipped = 0;
            delayStartFC = null;
            noLoop();
        }
        background(255, 255, 255);
        for (var i = 0; i < tiles.length; i++) {
            tiles[i].draw();
        }
    };
}