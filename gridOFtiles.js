// Global config
var faceDownImage;
var canvas;
var faces = [];
var h1;
var NUM_COLS = 5;
var NUM_ROWS = 6;

function preload() {
    //Preload the image in faceDownImage variable
    faceDownImage = loadImage('tiles/pikachuYcharmander.png');

        // Declare an array of all possible faces
        for (var num = 0; num < 30; num++) {
            //The names of pictures are correlatives
            faces[num] = loadImage("faces/face" + num + ".png");
        }
    }

function setup() {
    //Create H1 ELEMENT
    h1 = createElement("h1","POKEMON MEMORY GAME");
    // Create a CANVAS with WIDTH and HEIGHT that you want
        canvas = createCanvas(800,800);
        canvas.position(20,20);
    //Create a CONSTRUCTOR FUNCTION named Tile
    var Tile = function(x, y, face) {
        this.x = x;
        this.y = y;
        this.size = 70;
        this.face = face;
        this.isFaceUp = false;
        this.isMatch = false;
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
for (var i = 0; i < (NUM_COLS * NUM_ROWS)/2; i++) {
    // Randomly pick one from the array of remaining faces
    var randomInd = floor(random(0,faces.length-1));
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
    for (var i = 0; i < NUM_COLS; i++) {
        for (var j = 0; j < NUM_ROWS; j++) {
            var tileX = i * 74 + 5;
            var tileY = j * 74 + 40;
            var tileFace = selected.pop();
            tiles.push(new Tile(tileX, tileY, tileFace));
        }
    }

    background(255, 255, 255);
    var numTries = 0;
    var numMatches = 0;
    var flippedTiles = [];
    var delayStartFC = null;

    mouseClicked = function() {
        // check if mouse was inside a tile
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            if (tile.isUnderMouse(mouseX, mouseY)) {
                if (flippedTiles.length < 2 && !tile.isFaceUp) {
                    tile.isFaceUp = true;
                    flippedTiles.push(tile);
                    if (flippedTiles.length === 2) {
                        numTries++;
                        if (flippedTiles[0].face === flippedTiles[1].face) {
                            flippedTiles[0].isMatch = true;
                            flippedTiles[1].isMatch = true;
                            flippedTiles.length = 0;
                            numMatches++;
                        }
                        delayStartFC = frameCount;
                    }
                }
                loop();
            }
        }
    };

    //Draw tiles
    draw = function() {
        background(255, 255, 255);
        h1.position(0,0);
        if (delayStartFC && (frameCount - delayStartFC) > 30) {
            for (var i = 0; i < tiles.length; i++) {
                var tile = tiles[i];
                if (!tiles[i].isMatch) {
                    tile.isFaceUp = false;
                }
            }
            flippedTiles = [];
            delayStartFC = null;
            fill(0,0,0);
            textSize(20);
            text("Tries: " + numTries, 0, 530);
            noLoop();
        }

        for (var i = 0; i < tiles.length; i++) {
            tiles[i].draw();
        }

        if (numMatches === tiles.length/2) {
            fill(0,0,0);
            textSize(20);
            text("Good work! You found them all in " + numTries + " tries", 0, 500);
        }
    };
    noLoop();
}