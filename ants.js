




window.onload = (function(){

	var width = 600,
		height = 600,
		scale = 2,
		numOfAnts = 10,
		blackSquares = [],  // list of position objects
		context;


	// N E S W
	var headings = [
		{x : 0,  y : -1},
		{x : 1,  y : 0},
		{x : 0,  y : 1},
		{x : -1, y : 0}
	];

	var makeCanvas = function(width, height){
		var canvas = document.createElement("canvas");

		canvas.width = width;
		canvas.height = height;

		return canvas;

	};

	var makeAnt = function(x, y, heading){

		x = x || 0;
		y = y || 0;
		heading = heading || headings[0];

		return {
			x : x,
			y : y,
			heading : heading
		};

	};

	var moveForwards = function(ant){
		ant.x += ant.heading.x;
		ant.y += ant.heading.y;

		if (ant.x < 0)
			ant.x = width -1;

		if (ant.x >= width)
			ant.x = 0;

		if (ant.y < 0)
			ant.y = height -1;

		if (ant.y >= height)
			ant.y = 0;

	};

	var antIsOnBlackSpace = function(ant){
		var result = false;

		blackSquares.forEach(function(point){
			if (ant.x == point.x && ant.y == point.y){
				result = true;
			}
		});

		return result;
	};

	var makePoint = function(x, y){

		x = x || 0;
		y = y || 0;

		return { x : x,
                 y : y};
	};

	var paintSquareForAnt = function(ant, color){
		context.fillStyle = color;

		context.fillRect(ant.x * scale,
                         ant.y * scale,
                         scale,
                         scale);
	};

	var removeBlackSquareForAnt = function(ant){
		var index = -1;

		blackSquares.forEach(function(point, listIndex){
			if (ant.x == point.x && ant.y == point.y){
				index = listIndex;
			}
		});

		if (index != -1)
			blackSquares.splice(index, 1);
	};

	var addBlackSquareForAnt = function(ant){
		blackSquares.push(makePoint(ant.x, ant.y));
	};

	var rotateRight = function(ant){
		var index = headings.indexOf(ant.heading);

		ant.heading = headings[(index + 1) % 4];

	};

	var rotateLeft = function(ant){
		var index = headings.indexOf(ant.heading);

		index = index -1;

		index = index < 0 ? 3 : index;

		ant.heading = headings[index];
	};

	var solveNextStepForAnt = function(ant){
		moveForwards(ant);

		if (antIsOnBlackSpace(ant)){
			removeBlackSquareForAnt(ant);
			paintSquareForAnt(ant, "white");
			rotateLeft(ant);

		}else{
			addBlackSquareForAnt(ant);
			paintSquareForAnt(ant, "black");
			rotateRight(ant);
		}

	};


	var main = function(){

		var	ants = [],
			canvas = makeCanvas(width * scale, height * scale);

		context = canvas.getContext("2d");
		document.getElementsByTagName("body")[0].appendChild(canvas);

		for (var i = 0; i < numOfAnts; i++) {
			ants.push(makeAnt(Math.floor(Math.random() * width),
                              Math.floor(Math.random() * height)));
		}


		var step = function(timestamp){

			ants.forEach(function(ant, index){
				solveNextStepForAnt(ant);
			});

			window.requestAnimationFrame(step);
		};

		window.requestAnimationFrame(step);
	};

	return main;

})();