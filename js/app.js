var context;
var board;
var shape = new Object();

var introAudio;
var pacmanEats;
var pacmanEatsBonus;
var pacmanDies;

var blueImage;
var pinkImage;
var orangeImage;
var redImage;
var giftImage;
var pillImage;
var clockImage;
var pinkM = new Object();
var blueM = new Object();
var orangeM = new Object();
var redM = new Object();
var gift = new Object();
var pill = new Object();
var clock = new Object();

var giftCount = -8;
var pillCount = 0;
var clockCount = 0;
var monstercount = 0;

var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

var upKey;
var downKey;
var leftKey;
var rightKey;
var firstColor;
var secondColor;
var thirdColor;
var numOfBalls;
var numOfMonsters;
var setTime;
var uName;
var nameOfuser = document.getElementById("nameOfuser");

var beforeX = 1;
var lives = 5;
var init = true;
var strike = false;
var newgame = false;
var gameover = false;

$(document).ready(function () {

	window.scrollTo(0, 30);

	initObjects();

	/* 	$('body').css({'overflow':'hidden'});
	  $(document).bind('scroll',function () { 
		   window.scrollTo(0,0); 
	  });
	 */
	context = canvas.getContext("2d");

	$('#loginForm').submit(function () {

		uName = $('#loginForm').find('input[name="username"]').val();
		let pwd = $('#loginForm').find('input[name="password"]').val();

		if (localStorage.getItem(uName) == pwd) {
			// changeTab('initialGame');
			//	changeTab('Settings');
			$('#Login').css('display', 'none');
			$('#Settings').css('display', 'block');
			window.scrollTo(0,160);

			return false;
		}
		//changeTab('Login');
		$('#wrongpwd').css('display', 'block');
		return false;
	});



	$.validator.addMethod("numOfBallsInRange", function (value) {
		return (value >= 50 && value <= 90);
	});

	$.validator.addMethod("timeInRange", function (value) {
		return (value >= 60);
	});

	$.validator.addMethod("numOfMonstersinRange", function (value) {
		return (value >= 1 && value <= 4);
	});

	$("form[name='settings']").validate({
		rules: {

			numOfBalls: {
				required: true,
				numOfBallsInRange: true

			},

			setTime: {
				required: true,
				timeInRange: true

			},
			numOfMonsters: {
				required: true,
				numOfMonstersinRange: true
			}
		},

		messages: {

			numOfBalls: {
				required: "Please Enter Number Of Balls",
				numOfBallsInRange: "Number Of Balls Must Be Between 50-90"
			},
			setTime: {
				required: "Please Enter Time",
				timeInRange: "Time Must Be At Least 60 Seconds"
			},
			numOfMonsters: {
				required: "Please Enter Number Of Monsters",
				numOfMonstersinRange: "Number Of Monsters Must Be Between 1-4"
			}
		},
		submitHandler: function (form) {

			firstColor = $('#settings').find('input[name="firstColor"]').val();
			secondColor = $('#settings').find('input[name="secondColor"]').val();
			thirdColor = $('#settings').find('input[name="thirdColor"]').val();
			if (firstColor == secondColor || firstColor == thirdColor || secondColor == thirdColor) {
				document.getElementById("sameColors").innerHTML = "Please Choose 3 Different Colors";
				return false;
			}

			if (upKey == downKey || upKey == leftKey || upKey == rightKey || downKey == leftKey
				|| downKey == rightKey || leftKey == rightKey) {
				document.getElementById("sameKeyCodes").innerHTML = "Please Choose 4 Different Keys";
				return false;
			}

			numOfBalls = $('#settings').find('input[name="numOfBalls"]').val();
			setTime = $('#settings').find('input[name="setTime"]').val();
			numOfMonsters = $('#settings').find('input[name="numOfMonsters"]').val();

			document.getElementById("food").innerHTML = numOfBalls;
			document.getElementById("totalTime").innerHTML = setTime;
			document.getElementById("numOfMonstersDisplay").innerHTML = numOfMonsters;
			document.getElementById("fiveBall").value = firstColor;
			document.getElementById("fifteenBall").value = secondColor;
			document.getElementById("twentyfiveBall").value = thirdColor;


			$('#Settings').css('display', 'none');
			Start();
			$('#initialGame').css('display', 'block');

			//	return false;
		}
	});
});

function DefSe() {
	document.getElementById("upKey").value = "ArrowUp";
	document.getElementById("downKey").value = "ArrowDown";
	document.getElementById("leftKey").value = "ArrowLeft";
	document.getElementById("rightKey").value = "ArrowRight";
	document.getElementById("upKeydisplay").innerHTML = " ArrowUp";
	document.getElementById("downKeydisplay").innerHTML = " ArrowDown";
	document.getElementById("leftKeydisplay").innerHTML = " ArrowLeft";
	document.getElementById("rightKeydisplay").innerHTML = " ArrowRight";
	upKey = "38";
	downKey = "40";
	leftKey = "37";
	rightKey = "39";
	document.getElementById("numOfBalls").value = "50";
	document.getElementById("firstColor").value = "#00ffff";
	document.getElementById("secondColor").value = "#ffff00";
	document.getElementById("thirdColor").value = "#ff0080";
	document.getElementById("setTime").value = "60";
	document.getElementById("numOfMonsters").value = "2";
	return false;
}

function randSe() {
	document.getElementById("upKey").value = "ArrowUp";
	document.getElementById("downKey").value = "ArrowDown";
	document.getElementById("leftKey").value = "ArrowLeft";
	document.getElementById("rightKey").value = "ArrowRight";
	document.getElementById("upKeydisplay").innerHTML = " ArrowUp";
	document.getElementById("downKeydisplay").innerHTML = " ArrowDown";
	document.getElementById("leftKeydisplay").innerHTML = " ArrowLeft";
	document.getElementById("rightKeydisplay").innerHTML = " ArrowRight";
	upKey = "38";
	downKey = "40";
	leftKey = "37";
	rightKey = "39";
	var colors = ["#00FFFF", "#7FFFD4", "#5F9EA0", "#0000FF", "#8A2BE2", "#DC143C", "#FF8C00", "#7FFF00"
		, "#FF00FF", "#2E8B57", "#8B4513", "#708090", "#DA70D6", "#FFFF00", "#40E0D0", "#FFFFFF"];
	var rfc = Math.floor(Math.random() * 16);
	var rsc = Math.floor(Math.random() * 16);
	var rtc = Math.floor(Math.random() * 16);
	document.getElementById("firstColor").value = colors[rfc];
	document.getElementById("secondColor").value = colors[rsc];
	document.getElementById("thirdColor").value = colors[rtc];

	var rB = Math.floor(Math.random() * (90 - 60)) + 60;
	document.getElementById("numOfBalls").value = rB;
	var rT = Math.floor(Math.random() * 300) + 60;
	document.getElementById("setTime").value = rT;
	var rM = Math.floor(Math.random() * 4) + 1;
	document.getElementById("numOfMonsters").value = rM;
}

function setUpKey(e) {
	upKey = e.keyCode;
	document.getElementById("upKey").value = e.key;
	document.getElementById("upKeydisplay").innerHTML = e.key;
}
function setDownKey(e) {
	downKey = e.keyCode;
	document.getElementById("downKey").value = e.key;
	document.getElementById("downKeydisplay").innerHTML = e.key;
}
function setLeftKey(e) {
	leftKey = e.keyCode;
	document.getElementById("leftKey").value = e.key;
	document.getElementById("leftKeydisplay").innerHTML = e.key;
}
function setRightKey(e) {
	rightKey = e.keyCode;
	document.getElementById("rightKey").value = e.key;
	document.getElementById("rightKeydisplay").innerHTML = e.key;
}

function newGame() {

	gameover = false;
	newgame = true;
	giftCount = -8;
	pillCount = 0;
	clockCount = 0;
	monstercount = 0;
	beforeX = 1;
	init = true;
	strike = false;
	pill.counter = 0;
	gift.eaten = false;
	//shape = new Object();
	lives = 5;
	updateLife();
	introAudio.pause();
	introAudio.currentTime = 0;

	$('#initialGame').css('display', 'none');
	$('#Settings').css('display', 'block');

	window.clearInterval(interval);

	//	$("#Messege").modal({close: true});
	$.modal.close();
}

function Mute() {
	if (introAudio.paused) {
		introAudio.play();
	}
	else {
		introAudio.pause();
		introAudio.currentTime = 0;
	}
}
function PauseAudio(){
	introAudio.pause();
    introAudio.currentTime = 0;
    pacmanEats.pause();
  	pacmanEatsBonus.pause();
	pacmanDies.pause();
}
function initObjects() {
	//monsters
	blueImage = new Image();
	blueImage.src = "imgs/blueM.png";

	pinkImage = new Image();
	pinkImage.src = "imgs/pinkM.png";

	orangeImage = new Image();
	orangeImage.src = "imgs/orangeM.png";

	redImage = new Image();
	redImage.src = "imgs/redM.png";

	giftImage = new Image();
	giftImage.src = "imgs/gift.png";

	pillImage = new Image();
	pillImage.src = "imgs/pill.png";

	clockImage = new Image();
	clockImage.src = "imgs/clock.png";

	introAudio = new Audio('audio/mazeStart.mp3');
	introAudio.loop = true;
	pacmanEats = new Audio('audio/pacman_chomp.wav');
	pacmanEatsBonus = new Audio('audio/pacman_eatfruit.wav');
	pacmanDies = new Audio('audio/pacman_death.wav');

}

function Start() {

	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 200;
	var food_remain = numOfBalls;
	var pacman_remain = 1;
	start_time = new Date();
	setTime = setTime * 1000;
	timer = new Date(setTime);
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	introAudio.play();
	for (var i = 0; i < 16; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 6 && j == 1) ||
				(i == 6 && j == 2) ||
				(i == 6 && j == 1) ||
				(i == 5 && j == 1) ||
				(i == 7 && j == 1) ||
				/* 	(i == 4 && j == 3) ||
					(i == 6 && j == 1) ||
					(i == 6 && j == 2) || */
				(i == 11 && j == 5) || (i == 11 && j == 6) || (i == 11 && j == 7) ||
				(i == 10 && j == 6) ||
				(i == 3 && j == 8) ||
				(i == 5 && j == 8) ||
				(i == 4 && j == 8) ||
				(i == 4 && j == 7) ||
				(i == 4 && j == 6)
			) {
				board[i][j] = 4; // wall
			}
			else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
					var randomColor = Math.random() * 5;
					if (randomColor < 0.6) {
						board[i][j] = 1; // ball
					}
					else if (randomColor >= 0.6 && randomColor <= 0.9) {
						board[i][j] = 5; //ball 
					}
					else {
						board[i][j] = 6; // ball
					}
				} else if ((randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) &&
					nearMonsters(i, j) == false) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		if (emptyCell !== undefined) {
			board[emptyCell[0]][emptyCell[1]] = 1;
		}
		food_remain--;
	}
	putMonsters();
	//updateGift();
	pill.counter = 0;
	//pill.eaten = false;
	gift.eaten = false;

	document.getElementById("nameOfuser").innerHTML = uName;

	/* 	window.onscroll = function () { window.scrollTo(200, 200); };
	 */
	//window.scrollTo(200, 230);

	HowToDraw(1);
	init = true;

	if (!newgame) {
		keysDown = {};
		addEventListener(
			"keydown",
			function (e) {
				keysDown[e.keyCode] = true;
				switch (e.keyCode) {
					case 37: case 39: case 38: case 40: // Arrow keys
					case 32: e.preventDefault(); break; // Space
					default: break; // do not block other keys
				}
				keysDown[e.keyCode] = true;
				UpdatePositionPacman();
			},
			false
		);
		addEventListener(
			"keyup",
			function (e) {
				keysDown[e.keyCode] = false;
			},
			false
		);
	}

	//UpdatePosition();
	interval = setInterval(UpdatePosition, 300);
}

function nearMonsters(i, j) {
	var result = ((i == 0 && j == 0) || (i == 0 && j == 9) || (i == 9 && j == 0) ||
		(i == 9 && j == 9) || (i == 0 && j == 1) || (i == 1 && j == 1) || (i == 1 && j == 0) ||
		(i == 0 && j == 8) || (i == 1 && j == 8) || (i == 1 && j == 9) ||
		(i == 8 && j == 0) || (i == 8 && j == 1) || (i == 9 && j == 1) ||
		(i == 8 && j == 8) || (i == 8 && j == 9) || (i == 9 && j == 8));
	return result;
};

function putMonsters() {
	blueM.before = board[0][0];
	board[0][0] = 7; // blue monster
	blueM.i = 0;
	blueM.j = 0;

	if (numOfMonsters > 1) {
		pinkM.before = board[14][0];
		board[14][0] = 8; // pink monster
		pinkM.i = 14;
		pinkM.j = 0;
	}
	if (numOfMonsters > 2) {
		orangeM.before = board[0][9];
		board[0][9] = 9; // orange monster
		orangeM.i = 0;
		orangeM.j = 9;
	}

	if (numOfMonsters > 3) {
		redM.before = board[14][9];
		board[14][9] = 10; //red monster
		redM.i = 14;
		redM.j = 9;
	}
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 14 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
/* 	var checkedCells = new Array(); */
	while (board[i][j] != 0) {
		/* if(checkedCells[i][j] != 1){ */
		i = Math.floor(Math.random() * 14 + 1);
		j = Math.floor(Math.random() * 9 + 1);
/* 		checkedCells[i][j] = 1;
 */		/* } */
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[upKey]) { //up
		return 1;
	}
	if (keysDown[downKey]) { //down
		return 2;
	}
	if (keysDown[leftKey]) { //left
		return 3;
	}
	if (keysDown[rightKey]) { //right
		return 4;
	}
}

function Draw(x) {

	if (init) {
		window.scrollTo(0, 135);
	}
	//context.clearRect(0, 0, canvas.width, canvas.height);
	init = false;
	canvas.width = canvas.width; //clean board
	lblScore.value = score;

	context.beginPath();
	context.strokeStyle = "grey";
	context.lineWidth = 10;
	context.strokeRect(0, 0, canvas.width, canvas.height);
	/* context.moveTo(0, 0);
	context.lineTo(0, canvas.height);
	context.lineTo(canvas.width, canvas.height);
	context.lineTo(canvas.width, 0);
	context.lineTo(0,0);
	context.strokeStyle = "grey";
	context.stroke(); */

	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) { //pacman
				if (x == 1) { //up
					context.beginPath();
					context.arc(center.x, center.y, 25, 1.7 * Math.PI, 1.4 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 15, center.y - 5, 3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else if (x == 2) { //down
					context.beginPath();
					context.arc(center.x, center.y, 25, 0.6 * Math.PI, 0.3 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 15, center.y + 5, 3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else if (x == 3) { //left
					context.beginPath();
					context.arc(center.x, center.y, 25, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 5, center.y - 15, 3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else if (x == 4) { //right
					context.beginPath();
					context.arc(center.x, center.y, 25, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
			} else if (board[i][j] == 1) { //ball
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				//context.stroke(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = firstColor; //color
				context.fill();
				context.lineWidth = 1;
				context.strokeStyle = 'black';
				context.stroke();
			} else if (board[i][j] == 5) { //ball
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = secondColor; //color
				context.fill();
				context.lineWidth = 1;
				context.strokeStyle = 'black';
				context.stroke();
			} else if (board[i][j] == 6) { //ball
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = thirdColor; //color
				context.fill();
				context.lineWidth = 1;
				context.strokeStyle = 'black';
				context.stroke();
			} else if (board[i][j] == 4) { //wall
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
				context.lineWidth = 1;
				context.strokeStyle = 'black';
				context.stroke();
			}
			else if (board[i][j] == 7) { //monster 

				context.drawImage(blueImage, center.x - 30, center.y - 30, canvas.width / 15, canvas.height / 12);

			} else if (board[i][j] == 8) { //monster 

				context.drawImage(pinkImage, center.x - 30, center.y - 30, canvas.width / 15, canvas.height / 12);

			} else if (board[i][j] == 9) { //monster 

				context.drawImage(orangeImage, center.x - 30, center.y - 30, canvas.width / 15, canvas.height / 12);

			} else if (board[i][j] == 10) { //monster 

				context.drawImage(redImage, center.x - 30, center.y - 30, canvas.width / 15, canvas.height / 12);

			}
			else if (board[i][j] == 11) { //gift 

				context.drawImage(giftImage, center.x - 30, center.y - 30, canvas.width / 15, canvas.height / 12);
			}
			else if (board[i][j] == 12) { //pill 

				context.drawImage(pillImage, center.x - 30, center.y - 30, canvas.width / 15, canvas.height / 12);

			}
			else if (board[i][j] == 13) { //clock

				context.drawImage(clockImage, center.x - 30, center.y - 30, canvas.width / 15, canvas.height / 12);

			}
		}
	}
	if (gameover) {
		context.font = "80px Verdana";
		// Create gradient
		var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
		gradient.addColorStop("0", "magenta");
		gradient.addColorStop("0.5", "blue");
		gradient.addColorStop("1.0", "red");
		// Fill with gradient
		context.strokeStyle = gradient;
		context.strokeText("Game Over", 10, 50);
	}
}

function UpdatePosition() {
	if (!strike) {
		PlusPlus();

		var x = GetKeyPressed();

		//	movePackman(x);
		//	whereIsPacman(x);

		//	board[shape.i][shape.j] = 2; //pacman

		endGame();


		updateMonsters();

		whereIsPacman(x);

		updateTimeandMore();

		HowToDraw(x);
	}
	else {
		resetmonsters();
		resetPackman();
		strike = false;
	}
}


function UpdatePositionPacman() {
	if (!strike) {
		PlusPlus();

		var x = GetKeyPressed();
		movePackman(x);

		whereIsPacman(x);

		endGame();

		updateTimeandMore();

		if (!strike) {
			board[shape.i][shape.j] = 2; //pacman
		}
		HowToDraw(x);
	}
	else {
		resetmonsters();
		resetPackman();
		strike = false;
	}
}

function updateMonsters() {
	if (!init && monstercount > 10) {
		updatePosMonster(blueM, 7);

		if (numOfMonsters > 1) {
			updatePosMonster(pinkM, 8);
		}
		if (numOfMonsters > 2) {
			updatePosMonster(orangeM, 9);
		}
		if (numOfMonsters > 3) {
			updatePosMonster(redM, 10);
		}
	}
}

function movePackman(x) {

	board[shape.i][shape.j] = 0;

	if (x == 1) { //up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) { //down
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) { //left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) { //right
		if (shape.i < 14 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
}

function HowToDraw(x) {
	if (x !== undefined) {
		beforeX = x;
		Draw(x);
	} else {
		Draw(beforeX);
	}
}

function whereIsPacman(x) {

	if (board[shape.i][shape.j] == 1) { // ball
		score += 25;
		pacmanEats.play();
	}
	else if (board[shape.i][shape.j] == 5) { // ball
		score += 15;
			pacmanEats.play();
	}
	else if (board[shape.i][shape.j] == 6) { // ball
		score += 5;
			pacmanEats.play();

	}
	else if (board[shape.i][shape.j] == 11) { // gift
		gift.eaten = true;
		score += 50;
			pacmanEatsBonus.play();

	} else if (board[shape.i][shape.j] == 12) { // pill
		//	pilleaten = true;
			pacmanEatsBonus.play();
		if (lives < 5) {
			lives++;
			pill.counter++;
			updateLife();
		}
	}
	else if (board[shape.i][shape.j] == 13) { // clock
		timer.setSeconds(timer.getSeconds() + 20);
	}
	else {
		isPacmanEaten(x);
	}
}

function isPacmanEaten(x) {

	if (board[shape.i][shape.j] == 7 || board[shape.i][shape.j] == 8 ||
		board[shape.i][shape.j] == 9 || board[shape.i][shape.j] == 10) {

		strike = true;
		lives--;
		score -= 10;
		pacmanDies.play();

		updateLife();
		HowToDraw(x);

		//	sleep(1);
		if (lives == 0) {
			window.clearInterval(interval);
			gameover = true;
			//window.alert("Loser! Your Score is: " + score);
			Message("Loser! Your Score is: " + score + " ", true);
			return;
		}

		//alert("Be Carefull!! You Have " + lives + " More Lives");
		//	Message("Be Carefull!! You Have " + lives + " More Lives", false);
		//	board[shape.i][shape.j] = 2;
	}
}

function Message(messege, isGameOver) {
	document.getElementById("innerMessege").innerHTML = messege;

	if (isGameOver) {
		$("#btn").css('display', 'inline');
		$("#Messege").modal({
			escapeClose: false,
			clickClose: false,
			showClose: false
		});

		//	$("#Messege").modal.AFTER_CLOSE = function () {strike=false; }
		//newGame();
	} else {
		$("#btn").css('display', 'none');
		$("#Messege").modal();
		//	$("#Messege").modal.AFTER_CLOSE = function () { strike=false; }
	}

	//strike=false;
	return false;
}

function PlusPlus() {
	giftCount++;
	pillCount++;
	clockCount++;
	monstercount++;
}

function endGame() {
	if (score >= 100 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (((timer / 1000) - time_elapsed) <= 0) {

		if (score < 100) {
			Message("You are better than " + score + " points!", true);
		}
		else {
			Message("Winner! ", true);
		}
		gameover = true;
		window.clearInterval(interval);
		//window.alert("Your Time Run Out");
		return;
	}
	/* else if (score >= 400 || numOfBalls == 0) {
		window.clearInterval(interval);
		//	window.alert("Game completed");

	} */
}

function updateTimeandMore() {

	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (Math.floor((timer / 1000) - time_elapsed) >= 0) {
		lblTime.value = Math.floor((timer / 1000) - time_elapsed);
	}
	else {
		lblTime.value = 0;
	}

	if (giftCount == 5 && !gift.eaten) {
		updateGift();
		giftCount = 0;
	}
	if (pillCount == 20) {
		updatePill();
		pillCount = 0;
	}
	if (clockCount == 10) {
		updateClock();
		clockCount = 0;
	}
}

function sleep(seconds) {
	var e = new Date().getTime() + (seconds * 1000);
	while (new Date().getTime() <= e) { }
};


function resetPackman() {
	//while(($("#Messege").modal.isActive())){resetPackman();};
	//if (strike) {  }
	board[shape.i][shape.j] = 0;
	var emptyPCell = findRandomEmptyCell(board);
	shape.i = emptyPCell[0];
	shape.j = emptyPCell[1];
	board[shape.i][shape.j] = 2;

};

function updatePosMonster(monster, num) {

	if (monster.before != num) {
		board[monster.i][monster.j] = monster.before;
	}
	else {
		board[monster.i][monster.j] = 0;
	}
	if (monster.j > 0 && monster.j > shape.j &&
		isValidMoveForMonster(monster.i, monster.j - 1)) {
		// up
		monster.j--;
	}
	else if (monster.j < 9 && monster.j < shape.j &&
		isValidMoveForMonster(monster.i, monster.j + 1)) {
		// down  
		monster.j++;
	}

	else if (monster.i > 0 && monster.i > shape.i &&
		isValidMoveForMonster(monster.i - 1, monster.j)) {
		// left
		monster.i--;
	}
	else if (monster.i < 14 && monster.i < shape.i &&
		isValidMoveForMonster(monster.i + 1, monster.j)) {
		// right
		monster.i++;
	}
	else {
		if (isValidMoveForMonster(monster.i, monster.j - 1)) { // up
			monster.j--;
		}
		else if (isValidMoveForMonster(monster.i, monster.j + 1)) { // down  
			monster.j++;
		}
		else if (isValidMoveForMonster(monster.i - 1, monster.j)) { // left  
			monster.i--;
		}
		else if (isValidMoveForMonster(monster.i + 1, monster.j)) { // right  
			monster.i++;
		}
	}

	monster.before = board[monster.i][monster.j];
	board[monster.i][monster.j] = num; // Monster
}

function resetmonsters() {
	/* if (strike) {
		resetmonsters();
	} */
	//while(($("#Messege").modal.isActive())){resetmonsters();};
	monstercount = 0;
	if (blueM.before != 7) {
		board[blueM.i][blueM.j] = blueM.before;
	}
	else {
		board[blueM.i][blueM.j] = 0;
	}
	blueM.i = 0;
	blueM.j = 0;
	blueM.before = 7;
	board[blueM.i][blueM.j] = 7;
	if (numOfMonsters > 1) {
		if (pinkM.before != 8) {
			board[pinkM.i][pinkM.j] = pinkM.before;
		}
		else {
			board[pinkM.i][pinkM.j] = 0;
		}
		pinkM.i = 14;
		pinkM.j = 0;
		pinkM.before = 8;
		board[pinkM.i][pinkM.j] = 8;
	}
	if (numOfMonsters > 2) {
		if (orangeM.before != 9) {
			board[orangeM.i][orangeM.j] = orangeM.before;
		}
		else {
			board[orangeM.i][orangeM.j] = 0;
		}
		orangeM.i = 0;
		orangeM.j = 9;
		orangeM.before = 9;
		board[orangeM.i][orangeM.j] = 9;
	}
	if (numOfMonsters > 3) {
		if (redM.before != 10) {
			board[redM.i][redM.j] = redM.before;
		}
		else {
			board[redM.i][redM.j] = 0;
		}
		redM.i = 14;
		redM.j = 9;
		redM.before = 10;
		board[redM.i][redM.j] = 10;
	}
}

function isValidMoveForMonster(i, j) {
	var result = (i >= 0 && i <= 14 && j >= 0 && j <= 9) &&
		(board[i][j] == 0 ||
			board[i][j] == 1 ||
			board[i][j] == 5 ||
			board[i][j] == 6 ||
			board[i][j] == 2);
	return result;
}

function isValidMoveForGift(i, j) {
	var result = (board[i][j] == 0 ||
		board[i][j] == 1 ||
		board[i][j] == 5 ||
		board[i][j] == 6 ||
		board[i][j] == 12);
	return result;
}

function updateGift() {

	if (gift.i == undefined && gift.j == undefined) {
		if (numOfMonsters == 4) {
			var giftcell = findRandomEmptyCell();
			gift.i = giftcell[0];
			gift.j = giftcell[1];

		} else {
			gift.i = 14;
			gift.j = 9;
		}
		gift.before = board[gift.i][gift.j];
		board[gift.i][gift.j] = 11;
	} else {

		if (gift.before != 11) {
			board[gift.i][gift.j] = gift.before;
		}
		else {
			board[gift.i][gift.j] = 0;
		}

		let num = Math.floor(Math.random() * 9 + 1);
		//up
		if (gift.j > 0 && isValidMoveForGift(gift.i, gift.j - 1) && num < 3) {
			gift.j--;
		}

		//down
		else if (gift.j < 9 && isValidMoveForGift(gift.i, gift.j + 1) && num < 5) {
			gift.j++;
		}

		//left
		else if (gift.i > 0 && isValidMoveForGift(gift.i - 1, gift.j) && num < 7) {
			gift.i--;
		}

		//right
		else if (gift.i < 14 && isValidMoveForGift(gift.i + 1, gift.j) && num < 11) {
			gift.i++;
		}
		gift.before = board[gift.i][gift.j];
		board[gift.i][gift.j] = 11;
	}
}

function updatePill() {
	if (pill.counter < 4) {
		if (pill.i !== undefined && pill.j !== undefined) {
			board[pill.i][pill.j] = 0;
		}
		var emptyGCell = findRandomEmptyCell(board);
		pill.i = emptyGCell[0];
		pill.j = emptyGCell[1];
		board[pill.i][pill.j] = 12;
	} else {
		board[pill.i][pill.j] = 0;
	}
}

function updateClock() {

	if (clock.i !== undefined && clock.j !== undefined) {
		board[clock.i][clock.j] = 0;
	}
	var emptyGCell = findRandomEmptyCell(board);
	clock.i = emptyGCell[0];
	clock.j = emptyGCell[1];
	board[clock.i][clock.j] = 13;
}

function updateLife() {
	var id = "#";
	for (i = 1; i <= lives; i++) {
		id = id + i;
		$(id).css('display', 'inline');
		id = "#";
	}
	for (; i <= 5; i++) {
		id = id + i;
		$(id).css('display', 'none');
		id = "#";
	}
};






