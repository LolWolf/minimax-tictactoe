var context;
var width, height;

//Declared for loading the document, canvas, et al, and initiating drawing.
function onLoad() {
	var canvas = document.getElementById("cnv");
	if(canvas.getContext) {
		loginfo("Canvas loaded correctly");
		context = canvas.getContext('2d');
	}
	else {
		logerr("Canvas could not load correctly");
		return;
	}

}



//Logging funtions.
function loginfo(e) {
	console.log("INFO: "+e);
}
function logerr(e) {
	console.log("ERROR: "+e);
}