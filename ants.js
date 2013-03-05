




window.onload = (function(){

	var width = 600,
		height = 600,
		scale = 2,
		numOfAnts = 10,
		squares,  // bitmap array, white = 0, black = 1
		context;

	// N E S W
	var headings = [
		{x : 0,  y : -1},
		{x : 1,  y : 0},
		{x : 0,  y : 1},
		{x : -1, y : 0}
	];

	var randomHeading = function(){
		return headings[randInt(4)];
	};

	var generateWhiteSquares = function(w, h){
		var result = [];

		for(var i = 0; i < width * height; i++){
			result.push(0);
		}

		return result;
	};

	var squareAtCoordinate = function(x, y){
		return squares[x + (y * width)];
	};

	var setSquareAtCoordinate = function(x, y, value){
		squares[x + (y * width)] = value;
	};

	var antIsOnBlackSpace = function(ant){
		return squareAtCoordinate(ant.x, ant.y) == 1;
	};

	var removeBlackSquareForAnt = function(ant){
		setSquareAtCoordinate(ant.x, ant.y, 0);
	};

	var addBlackSquareForAnt = function(ant){
		setSquareAtCoordinate(ant.x, ant.y, 1);
	};

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

	// returns rand "int" between [0,max) 
	var randInt = function(max){
		return Math.floor(Math.random() * max);
	};

	var main = function(){

		var	ants = [],
			canvas = makeCanvas(width * scale, height * scale);

		squares = generateWhiteSquares(width, height);

		context = canvas.getContext("2d");
		document.getElementsByTagName("body")[0].appendChild(canvas);

		// generate ants
		for (var i = 0; i < numOfAnts; i++) {
			ants.push(makeAnt(randInt(width), randInt(height), randomHeading()));

		}

		console.log(ants);


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