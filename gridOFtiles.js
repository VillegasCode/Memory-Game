var faceDownImage;
var canvas;

function preload() {
    //Preload the image in faceDownImage variable
    faceDownImage = loadImage('tiles/pikachu.png');
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

// Declare an array of all possible faces
var faces = [
    getImage("avatars/leafers-seed"),
    getImage("avatars/leafers-seedling"),
    getImage("avatars/leafers-sapling"),
    getImage("avatars/leafers-tree"),
    getImage("avatars/leafers-ultimate"),
    getImage("avatars/marcimus"),
    getImage("avatars/mr-pants"),
    getImage("avatars/mr-pink"),
    getImage("avatars/old-spice-man"),
    getImage("avatars/robot_female_1"),
    getImage("avatars/piceratops-tree"),
    getImage("avatars/orange-juice-squid")
];

// Make an array which has 2 of each, then randomize it
var selected = [];
for (var i = 0; i < 10; i++) {
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

    // Start by drawing them all face down
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].isFaceUp = true;
        tiles[i].draw();
    }
}