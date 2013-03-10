var canvas;
var context;
var width, height;
var cell = new Array();

var s_size = 50; //Symbol Size

function MiniMax() {
	//TODO: Implement, obviously.
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

function onClick(e) {
	var pos = getRelPos(e);
	//loginfo("Mouse Click on: "+pos.x+" "+pos.y);

	var cell_clicked = Math.floor(3*pos.x/width) + 3*Math.floor(3*pos.y/height);

	if(isEmpty(cell_clicked)) {
		cell[cell_clicked] = 1;
		drawX((cell_clicked%3)*100+50, (Math.floor(cell_clicked/3))*100+50);
		//minimax();
	}
}

function getRelPos(e) {
	var boundRect = canvas.getBoundingClientRect();
	return {
		x: Math.floor(e.clientX - boundRect.left),
		y: Math.floor(e.clientY - boundRect.top)
	};
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