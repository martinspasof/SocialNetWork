var wrap = document.getElementById("wrapper"),
	canvas,
	canvasWidth = 300,
	canvasHeight = 300,
	ctx,
	snake,
	food,
	game,
	score;

//create and setup the canvas
canvas = document.createElement("canvas");
canvas.id = "canvas";
canvas.setAttribute('width', canvasWidth + "px");
canvas.setAttribute('height', canvasHeight + "px");
canvas.style.border = "3px solid black";

wrap.style.position = "relative";
wrap.appendChild(canvas);
ctx = canvas.getContext('2d');

createMenu();

function newGame() {
	if(game) {
		gameOver();
	}

	score = 0;
	food = createFood();
	snake = new Snake(canvasWidth / 2, canvasHeight / 2);
	game = setInterval(gameLoop, 1000 / 30);
}

function gameLoop() {
	clear();
	snake.move();
	snake.eat();
	snake.collision();
	draw();
}

function draw() {
	drawScore();
	drawSnake();
	drawFood();
}

function drawFood() {
	ctx.beginPath();
	ctx.fillStyle = "rgb(0, 200, 0)";
	ctx.arc(food.x, food.y, 5, 0, 2*Math.PI);
	ctx.fill();
}

function clear() {
	ctx.clearRect(0,0,canvasWidth, canvasHeight);
}

function createFood() {
	return {
		x: ~~(Math.random() * canvasWidth),
		y: ~~(Math.random() * canvasHeight)
	};
}

function drawSnake() {
	ctx.beginPath();
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.arc(snake.head.x, snake.head.y, 4, 0, 2*Math.PI);
	ctx.stroke();

	for(var i = 0; i < snake.body.length; i++) {
		ctx.fillRect(snake.body[i].x, snake.body[i].y, 4, 4);
	}
}

function drawScore() {
	ctx.save();
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.font="14px Arial";
	ctx.fillText("Score:" + score,5,15);
	ctx.restore();
}

function createMenu() {
	var newGameBtn = document.createElement("button"),
		highScoresBtn = document.createElement("button"),
		menu = document.createElement("aside"),
		highScoreList = document.createElement("ol"),
		closeBtn = document.createElement("button");

	menu.style.width = "100px";
	menu.style.float = "left";

	newGameBtn.onclick = newGame;
	newGameBtn.innerHTML = "New Game";
	newGameBtn.style.float = "left";
	menu.appendChild(newGameBtn);

	highScoreList.id = "scores";
	highScoreList.style.width = "200px";
	highScoreList.style.height = "150px";
	highScoreList.style.backgroundColor = "rgba(100, 100, 100, 0.3)";
	highScoreList.style.color = "white";
	highScoreList.style.position = "absolute";
	highScoreList.style.top = "20px";
	highScoreList.style.left = "130px";
	highScoreList.innerHTML = "High Scores:";
	highScoreList.style.display = "none";
	wrap.appendChild(highScoreList);

	for(var i = 0; i < 5; i++) {
		var listItem = document.createElement("li");
		highScoreList.appendChild(listItem);
	}

	closeBtn.onclick = hideHighScore;
	closeBtn.innerHTML = "Close";
	highScoreList.appendChild(closeBtn);

	highScoresBtn.onclick = displayHighScores;
	highScoresBtn.innerHTML = "High Scores";
	highScoresBtn.style.float = "left";
	menu.appendChild(highScoresBtn);

	wrap.appendChild(menu);
}

function hideHighScore() {
	var scoreList = document.getElementById("scores");
	scoreList.style.display = "none";
}

function displayHighScores() {
	var scoreList = document.getElementById("scores"),
		listItems = document.querySelectorAll("ol#scores li");
	scoreList.style.display = "block";

	for(var i = 0; i < 5; i++) {
		if(localStorage.getItem(i)) {
			var scoreItem = JSON.parse(localStorage.getItem(i));

			listItems[i].innerHTML = "name: " + scoreItem.name + ", score: " + scoreItem.score;
		}
		else {
			break;
		}
	}
}

function gameOver() {
	clearInterval(game);
	game = null;
	checkHighScores();
}


function checkHighScores() {
	var scoreItems = [];

	for(var i = 0; i < 5; i++) {
		if(localStorage.getItem(i)) {
			var scoreItem = JSON.parse(localStorage.getItem(i));

			scoreItems.push(scoreItem);
		}
		else {
			break;
		}
	}

	for(var j = 0; j < scoreItems.length; j++) {
		if(scoreItems[j].score < score) {
			saveScore(j);
			return;
		}
	}

	if(scoreItems.length < 5) {
		saveScore(scoreItems.length);
	}
}

function saveScore(position) {
	var name = prompt("Congatulations, your achievment is admirable! What is your name?");

	if(localStorage.getItem(position)) {
		var i;
		for(i = position; i < 4; i++) {
			if(!localStorage.getItem(i)) {
				break;
			}
		}

		for(var j = i; j > position; j--) {
			var jos = JSON.parse(localStorage.getItem(j-1));
			localStorage.setItem(j, JSON.stringify(jos));
		}

		localStorage.setItem(position, JSON.stringify( { name: name, score: score } ));
	}
	else {
		localStorage.setItem(position, JSON.stringify( { name: name, score: score } ));
	}

	displayHighScores();
}
//########################################### Classes ########################################################

function Snake(x, y) {
	this.body = [];
	this.head = { x: x, y: y };
	this.velocity = { x: 0, y: 5 };
	this.speed = 5;
	this.direction = "down";

	this.body.push({ x: this.head.x - 2, y: (this.head.y - 10) });
	this.body.push({ x: this.head.x - 2, y: (this.head.y - 15) });

	var self = this;

	this.move = function() {
		//the body follows the head
		for(var i = self.body.length - 1; i > 0; i--) {
			self.body[i].x = self.body[i - 1].x;
			self.body[i].y = self.body[i - 1].y;
		}

		if(self.direction == "down") {
			self.body[0].x = self.head.x - 2;
			self.body[0].y = self.head.y - 5;
		}
		
		if(self.direction == "up") {
			self.body[0].x = self.head.x - 2;
			self.body[0].y = self.head.y;
		}
		
		if(self.direction == "left") {
			self.body[0].x = self.head.x + 2;
			self.body[0].y = self.head.y - 2;
		}
		
		if(self.direction == "right") {
			self.body[0].x = self.head.x - 5;
			self.body[0].y = self.head.y - 2;
		}

		if(self.head.x + self.velocity.x < 0) {
			self.head.x = canvasWidth;
		}
		
		if(self.head.x + self.velocity.x > canvasWidth) {
			self.head.x = 0;
		}

		if(self.head.y + self.velocity.y < 0) {
			self.head.y = canvasHeight;
		}
		
		if(self.head.y + self.velocity.y > canvasHeight) {
			self.head.y = 0;
		}
		
		self.head.x += self.velocity.x;
		self.head.y += self.velocity.y;
	}

	this.moveLeft = function() {
		if(self.velocity.x == 0) {
			self.velocity.x = self.speed * (-1);
			self.velocity.y = 0;
			
			snake.head.x = snake.body[0].x - 3;
			self.direction = "left";
		}
	}

	this.moveRight = function() {
		if(self.velocity.x == 0) {
			self.velocity.x = self.speed;
			self.velocity.y = 0;

			//self.head.y = snake.body[0].y - 3;
			snake.head.x = snake.body[0].x + 5;
			self.direction = "right";
		}
	}

	this.moveUp = function() {
		if(self.velocity.y == 0) {
			self.velocity.x = 0;
			self.velocity.y = self.speed * (-1);
			
			self.head.y = snake.body[0].y;
			self.direction = "up";
		}
	}

	this.moveDown = function() {
		if(self.velocity.y == 0) {
			self.velocity.x = 0;
			self.velocity.y = self.speed;
			
			self.head.y = snake.body[0].y + 5;
			self.direction = "down";
		}
	}
	
	this.addBodyPart = function() {
		this.body.push({ x: 0, y: 0 })
	}

	this.eat = function() {
		var distance = ((snake.head.x - food.x)*(snake.head.x - food.x) + 
			(snake.head.y - food.y)*(snake.head.y - food.y));
		if(distance < 50) {
			food = createFood();
			self.addBodyPart();
			score += 10;
		}
	}

	this.collision = function() {
		var distance = 0;
		for(var i = 1; i < self.body.length; i++) {
			distance = (self.body[i].x - self.head.x)*(self.body[i].x - self.head.x) + (self.body[i].y - self.head.y)*(self.body[i].y - self.head.y);
			if(distance < 16) {
				gameOver();
				break;
			}
		}
	}
}

//############################################################################################################
//########################################### Events #########################################################

document.onkeydown = checkKey;

function checkKey(ev) {
	ev = ev || window.event;
	ev.preventDefault();

	if(ev.keyCode == '38') {
		//up arrow
		snake.moveUp();
	}
	
	if(ev.keyCode == '40') {
		//down arrow
		snake.moveDown();
	}
	
	if(ev.keyCode == '37') {
		//left arrow
		snake.moveLeft();
	}
	
	if(ev.keyCode == '39') {
		//right arrow
		snake.moveRight();
	}
}

//############################################################################################################

