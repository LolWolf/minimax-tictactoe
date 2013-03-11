var canvas;
var context;
var width, height;
var cell = new Array();

var s_size = 50; //Symbol Size

var INFTY = 100000;

//NOTE: Player 2 is the computer, while Player 1 is the human player.

//===============================BEGIN NEGAMAX ALGORITHM================================

function nextMove() {
	var best = {score:-INFTY, move:-1}
	var temp_score = -INFTY;

	for(var i=0; i<9; i++) {
		if(isEmpty(i)) {
			//Make possible move
			cell[i]=2;

			//Compute best move score for human player
			temp_score = -negaMax(1);
			
			//Undo previous move
			cell[i]=0;

			//Take greatest score and move
			if(temp_score > best.score) {
				best.move = i;
				best.score = temp_score;
				//loginfo("Better Move found: "+i+" With Score "+best.score);
			}
		}
	}
	
	//Perform best move
	cell[best.move] = 2;

	//Draw move performed
	var a = getCellXY(best.move);
	drawO(a.x, a.y);

	//Check for win
	if(checkWinner()==2) {
		alert("Sorry, you lost... try again?");
		clearBoard();
	}
}


function negaMax(player) {
	//Check and add accordingly for possible win
	var a = checkWinner();
	if(a>0) {
		if(a==player) return 100;
		else return -100;
	}

	//Check and add accordingly for possible tie
	if(checkTie()) return 0;

	//Initiate temporary variables
	var max = -INFTY;
	var temp = 0;

	//Perform and compute all further possible moves
	for(var i=0; i<9; i++) {
		if(isEmpty(i)){
			//Do possible move
			cell[i]=player;

			//Compute best score
			temp = -negaMax(player==1 ? 2:1);
			
			//Undo previous move
			cell[i]=0;

			//Swap max if necessary
			if(temp > max) {
				max = temp;
			}
		}
	}
	return max;
}

//===============================END NEGAMAX ALGORITHM================================

function checkTie() {
	for(var i=0; i<9; i++) {
		if(cell[i]==0) return false;
	}
	return true;
}

//Declared for loading the document, canvas, et al, and initiating drawing.
function onLoad() {
	canvas = document.getElementById("cnv");
	if(canvas.getContext) {
		loginfo("Canvas loaded correctly");
		context = canvas.getContext('2d');
	}
	else {
		logerr("Canvas could not load correctly");
		return;
	}

	init();
}

function init() {
	width = 300;
	height = 300;

	for(var i=0; i<9; i++)
		cell[i]=0;

	drawCanvas();
}

function drawX(x, y) {
	context.beginPath();

	context.lineWidth = 2.;

	context.moveTo(x-s_size/2, y-s_size/2);
	context.lineTo(x+s_size/2, y+s_size/2);

	context.moveTo(x-s_size/2, y+s_size/2);
	context.lineTo(x+s_size/2, y-s_size/2);

	context.stroke();

	context.closePath();
}

function drawO(x, y) {
	context.beginPath();

	context.lineWidth=2.;

	context.arc(x, y, s_size/2,
		0, 2*Math.PI, false);

	context.stroke();

	context.closePath();
}

//Draw the canvas
function drawCanvas() {
	context.beginPath();

	context.moveTo(width/3, 0);
	context.lineTo(width/3, height);

	context.moveTo(width*2/3, 0);
	context.lineTo(width*2/3, height);

	context.moveTo(0, height/3);
	context.lineTo(width, height/3);

	context.moveTo(0, height*2/3);
	context.lineTo(width, height*2/3);

	context.stroke();

	context.closePath();
}

function getCellXY(cell_clicked) {
	return {
		x:(cell_clicked%3)*100+50,
		y:(Math.floor(cell_clicked/3))*100+50
	};
}

function onClick(e) {
	var pos = getRelPos(e);
	//loginfo("Mouse Click on: "+pos.x+" "+pos.y);

	var cell_clicked = Math.floor(3*pos.x/width) + 3*Math.floor(3*pos.y/height);

	if(isEmpty(cell_clicked)) {
		cell[cell_clicked] = 1;
		var a = getCellXY(cell_clicked);
		drawX(a.x, a.y);
		//negaMax();
	}
	if(checkWinner()==1) {
		alert("Nice job, mate, you won.");
		clearBoard();
	}
	else if(checkTie()) {
		alert("It's a Tie");
		clearBoard();
	}
	else
		nextMove();
}

function getRelPos(e) {
	var boundRect = canvas.getBoundingClientRect();
	return {
		x: Math.floor(e.clientX - boundRect.left),
		y: Math.floor(e.clientY - boundRect.top)
	};
}

function clearBoard() {
	context.clearRect(0, 0, width, height);
	init();
}

//Not efficient by any means, I'd rather use a bitmask, but this is easier to
//grasp.
function clone(o) {
	return o.slice(0);
}
//Just a crapload of cases
function checkWinner() {
	if(cell[4]!=0) {
		if(cell[4]==cell[8] && cell[4]==cell[0])
			return cell[4];
		else if(cell[4]==cell[2] && cell[4]==cell[6])
			return cell[4];
		else if(cell[1]==cell[4] && cell[4]==cell[7])
			return cell[4];
		else if(cell[3]==cell[4] && cell[4]==cell[5])
			return cell[4]
	}
	if(cell[0]!=0) {
		if(cell[1]==cell[0] && cell[0]==cell[2])
			return cell[0];
		if(cell[0]==cell[3] && cell[0]==cell[6])
			return cell[0]
	}
	if(cell[2]!=0) {
		if(cell[2]==cell[5] && cell[8]==cell[5])
			return cell[2];
	}
	if(cell[6]!=0) {
		if(cell[7]==cell[8] && cell[6]==cell[7])
			return cell[6];
	}
	return 0;
}

function getCell(cell_x, cell_y, board) {
	if(cell_x>=0 && cell_x<=2 && cell_y>=0 && cell_y<=2)
		return board[cell_x+3*cell_y];
	else {
		logerr("WTF, you just put in a cell that doesn't exist");
		return -1;
	}
}

function isEmpty(cellno) {
	//loginfo("Is empty on "+cellno+" result "+cell[cellno]);
	return cell[cellno]==0;
}

//Logging funtions.
function loginfo(e) {
	console.log("INFO: "+e);
}
function logerr(e) {
	console.log("ERROR: "+e);
}