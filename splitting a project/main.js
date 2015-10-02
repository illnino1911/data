var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();


function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();
	
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

//-------------------- Don't modify anything above here

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;


// some variables to calculate the Frames Per Second (FPS - this tells use
// how fast our game is running, and allows us to make the game run at a 
// constant speed)
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

function initialize(input_level) 
{
	var return_cells = [];
	
	for (var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) 
	{
		return_cells[layerIdx] = [];
		var idx = 0;
		for(var y = 0; y < input_level.layers[layerIdx].height; y++) 
		{
			return_cells[layerIdx][y] = [];
			for(var x = 0; x < input_level.layers[layerIdx].width; x++) 
			{
				if(input_level.layers[layerIdx].data[idx] !=0) 
				{
					return_cells[layerIdx][y][x] = 1;
					return_cells[layerIdx][y][x+1] = 1;		
					if (y != 0)
					{
						return_cells[layerIdx][y-1][x] = 1;
						return_cells[layerIdx][y-1][x+1] = 1;
					}
				} 
				else if (return_cells[layerIdx][y][x] != 1)
				{
					return_cells[layerIdx][y][x] = 0; // if we haven't set this cell's value, then set it to 0 now
				}
				idx++;

			}

		} 

	}
	return return_cells;
}
		
var cells = initialize(level);
		
// load an image to draw
var chuckNorris = document.createElement("img");
chuckNorris.src = "hero.png";

var keyboard = new keyboard();
var player = new player(); 


function runGameOver(deltaTime)
{
	context.fillStyle = "red";
	context.font="50px Andy";
	context.fillText("GAME OVER", canvas.width - 950,150);
	context.fillText("press Enter to play again", canvas.width - 1050,200);
	
	context.fillStyle = "#00ff00";
	context.font="32px Algerian";
	var scoreText = "highScore: " + score;
	context.fillText(scoreText, canvas.width - 1600, 35);
}

var cam_x
var cam_y

function run()
{
	context.fillStyle = "#ccc";		
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	cam_x = player.x - SCREEN_WIDTH/2;
	cam_y = player.y - SCREEN_HEIGHT/2;
	
	if (cam_x < 0)
		cam_x = 0;
	if (cam_y < 0)
		cam_y = 0;
		
	if (cam_x > MAP.tw * TILE - SCREEN_WIDTH)
		cam_x = MAP.tw * TILE - SCREEN_WIDTH;
	if	(cam_y > MAP.th * TILE - SCREEN_HEIGHT)
		cam_y = MAP.th * TILE - SCREEN_HEIGHT;
	
	drawMap(cam_x, cam_y);
	
	var deltaTime = getDeltaTime();
	
	//context.drawImage(chuckNorris, SCREEN_WIDTH/2 - chuckNorris.width/2, SCREEN_HEIGHT/2 - chuckNorris.height/2);
	player.update(deltaTime);
	player.draw(cam_x, cam_y);
		
	// update the frame counter 
	fpsTime += deltaTime;
	fpsCount++;
	if(fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}		
		
	// draw the FPS
	context.fillStyle = "#f00";
	context.font="14px Arial";
	context.fillText("FPS: " + fps, 5, 20, 100);
}


//-------------------- Don't modify anything below here


// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
