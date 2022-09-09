let faceDownImage;

function preload() {
    faceDownImage = loadImage('assets/pikachu.png');
}
function setup() {
    // Create a CANVAS with WIDTH and HEIGHT of size BROWSER
    createCanvas(windowWidth,windowHeight);
}

//Create a CONSTRUCTOR FUNCTION named Tile
var Tile = function(x, y) {
    this.x = x;
    this.y = y;
    this.size = 120;
};

//Create a METHOD draw to Tile object
Tile.prototype.draw = function() {
    fill(214, 247, 202);
    strokeWeight(2);
    rect(this.x, this.y, this.size, this.size, 10);
    image(faceDownImage, this.x, this.y, this.size, this.size);
};

// Create the array of tiles at appropriate positions
var tiles = [];
var NUM_COLS = 5;
var NUM_ROWS = 4;
for (var i = 0; i < NUM_COLS; i++) {
    for (var j = 0; j < NUM_ROWS; j++) {
        var tileX = i * 150 + 50;
        var tileY = j * 150 + 40;
        tiles.push(new Tile(tileX, tileY));
    }
}

// Start by drawing them all face down
for (var i = 0; i < tiles.length; i++) {
    tiles[i].draw();
}