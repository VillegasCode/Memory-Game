// Global config
var w = window.innerWidth;
var h = 575;  
var faceDownImage;
var canvas;
var faces = [];
var NUM_COLS = 5;
var NUM_ROWS = 6;
var sizeCard;
var fichaSize=80;
var timeLimit = 20;
var countdown0; //time limit - amount of time passed
function preload() {
    //Preload the image in faceDownImage variable
    faceDownImage = loadImage('tiles/pikachuVillegasCODE.png');

        // Declare an array of all possible faces
        for (var num = 0; num < 31; num++) {
            //The names of pictures are correlatives
            faces[num] = loadImage("faces/face" + num + ".png");
        }
    }

function setup() {
    frameRate(30);
    if(w < 550) {
        sizeCard = 63;
    } else {
        sizeCard = 80;
    }

    // Create a CANVAS with WIDTH and HEIGHT that you want
        canvas = createCanvas(w,h);
        canvas.position(0,132);

    //Create a CONSTRUCTOR FUNCTION named Tile
    var Tile = function(x, y, face) {
        this.x = x;
       this.y = y;
        this.size = sizeCard;
        fichaSize = this.size;
        this.face = face;
        this.isFaceUp = false;
        this.isMatch = false;
    };

    //Create a METHOD draw to Tile object
    Tile.prototype.draw = function() {
        fill(214, 247, 202);
        strokeWeight(7);
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
            var tileX = i * (fichaSize+10) + 5;
            var tileY = j * (fichaSize+10) + 40;
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
                            //Count the matches
                            numMatches++;
                            //Increase 10 seconds each time there is a match
                            timeLimit = timeLimit + 10;
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
            background(200, 0, 0);
        
            fill(0,0,0);
            textSize(20);
            var statistics = document.getElementById('statistics');
            statistics.innerHTML = `Tries: ${numTries} | Matches: ${numMatches} of ${(tiles.length/2)}`;

        if (delayStartFC && (frameCount - delayStartFC) > 30) {
            for (var i = 0; i < tiles.length; i++) {
                var tile = tiles[i];
                if (!tiles[i].isMatch) {
                    tile.isFaceUp = false;
                }
            }
            flippedTiles = [];
            delayStartFC = null;
            noLoop();
        }

        for (var i = 0; i < tiles.length; i++) {
            tiles[i].draw();
        }

        ganar = function() {
        if (numMatches === tiles.length/2) {
            fill(0,0,0);
            textSize(60);
            text("YOU WIN", width / 2 - 50, height /2);
            //if (secondsTime > countdown0) {
            //text("Good work! You found them all in " + numTries + " tries.\nBeat your Record doing it in fewer attempts", 0, 620);
            yourStatus.innerHTML = `YOU WIN, you're a champion`;
            //}
        }
    }
    var currentTime = int(millis()/1000); //Convert time to second as an integer (INT) - no decimals
    countdown0 = timeLimit - currentTime; //Countdown0 = 15 - amount of time passed
    var cuentaRegresiva = document.getElementById('countdown0');
    var yourStatus = document.getElementById('yourStatus');
    //if 15 seconds has passed, keep countdown at 0
    if (countdown0 < 0 && numMatches < tiles.length/2) {
        countdown0 = 0;
        textSize(60);
        yourStatus.innerHTML = "YOU LOST,\nREFRESH THIS PAGE TO TRY AGAIN!";
        text("GAME OVER", width / 2 - 100, height /2);
        textSize(32);
        cuentaRegresiva.innerHTML = `You have ${countdown0} seconds left`;
        // Now draw them face up all tiles because user lost game
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].isFaceUp = true;
        tiles[i].draw();
    }
    } else if (countdown0 > 0 && numMatches < tiles.length/2) {
        textSize(32);
        cuentaRegresiva.innerHTML = `You have ${countdown0} seconds left (Add 10 seconds for each match)`;
    }
    ganar();
    };
    
}
