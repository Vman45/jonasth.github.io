function initMouseListener(){
	    mainCanvas.addEventListener("mouseup", function(evt) {
        mouseUp = getMousePosition(mainCanvas, evt);
        message = 'Mouse up: ' + mouseUp.x + ',' + mouseUp.y;
        mouseup_logic();
    }, false);
	
    mainCanvas.addEventListener("mousedown", function(evt) {
        mouseDown = getMousePosition(mainCanvas, evt);
        message = 'Mouse down: ' + mouseDown.x + ',' + mouseDown.y;
        mousedown_logic();
    }, false);
	
    mainCanvas.addEventListener('mousemove', function(evt) {
        mousePos = getMousePosition(mainCanvas, evt);
        message = 'Mouse pos: ' +Math.round(mousePos.x) + ',' +Math.round(mousePos.y);
	//	mousemove_logic();
    }, false);
	
	mainCanvas.addEventListener('wheel',function(evt){
		message = 'Mouse scroll';
		//mouseScroll=mouseController.wheel(evt);
		evt.preventDefault();
		return false; 
	}, false);
}

// Get X, Y cordinates mouse position
function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

//Stop mouse listener
function stopMouseListener() {
	console.log("stopMouseListener()");
	mainCanvas.removeEventListener('mouseup',nothing);
	mainCanvas.removeEventListener('mousedown',nothing);
	mainCanvas.removeEventListener('getPosition',nothing);
	mouseOutLogic();
}

function nothing(){
		
}

// Start mouse listener
function startMouseListener() {
	console.log("startMouseListener()");
    mousePos = [0, 0];
    mouseDown = [0, 0];
    mouseUp = [0, 0];
}

function searchNotes(){
	if (graphNotePosX.length>0){
		for (var t=0;t<=graphNotePosX.length;t++){
		  if (mousePos.x >= graphNotePosX[t] && mousePos.x <= (graphNotePosX[t] + graphNoteLength[t]) && mousePos.y >= graphNotePosY[t] && mousePos.y <= (graphNotePosY[t] + graphNoteHeight[t])) {
		    ctT.fillStyle = "darkblue";
			ctT.fillRect(215,0,170,20);
			ctT.fillStyle="orange";
			ctT.fillText("Click To Edit", 220, 15);
			
		  } 
		}
	} 
}

var edOpen=false;
// How program behave on mouse click, drag, drop
function mousedown_logic() {
	for (var t=0;t<=graphNotePosX.length;t++){
		if (mousePos.x >= graphNotePosX[t] && mousePos.x <= (graphNotePosX[t] + graphNoteLength[t]) && mousePos.y >= graphNotePosY[t] && mousePos.y <= (graphNotePosY[t] + graphNoteHeight[t])) {
			ctT.fillStyle = "darkblue";
			ctT.fillRect(215,0,170,20);
			ctT.fillStyle="lightgreen";
			ctT.fillText(message, 220, 15);
			document.getElementById("chosenEvent").value=graphNoteEvent[t];
			selectEvent();
			if (edOpen==false){
				TRED();edOpen=true;
			}
			
		} 
	} 	
}

function mouseup_logic() {
	for (var t=0;t<=graphNotePosX.length;t++){
		if (mousePos.x >= graphNotePosX[t] && mousePos.x <= (graphNotePosX[t] + graphNoteLength[t]) && mousePos.y >= graphNotePosY[t] && mousePos.y <= (graphNotePosY[t] + graphNoteHeight[t])) {
			ctT.fillStyle = "darkblue";
			ctT.fillRect(215,0,170,20);
			ctT.fillStyle="lightgreen";
			ctT.fillText(message, 220, 15);
		}
	}
}	

function mousemove_logic(){
	ctT.fillStyle = "darkblue";
	ctT.fillRect(215,0,170,20);
	ctT.fillStyle="lightgreen";
	ctT.fillText(message, 220, 15);
	searchNotes();
}

function mouseOutLogic(){
	ctT.fillStyle = "darkblue";
	ctT.fillRect(215,0,170,20);
}

function startKeyboardListener(){
	 // DEBUG LISTENERS
    document.addEventListener('keydown', function(event) {
        if (event.keyCode == 67) {
            document.getElementById("cnode").checked = true;
        } else if (event.keyCode == 66) {
            document.getElementById("rnode").checked = true;
        } else if (event.keyCode == 69) {
           document.getElementById("rmnode").checked = true;
           removeMarkedNodes();
        } else if (event.keyCode == 74) {
           reset_booleans;
           moveit=true;
           build_canvas();
           document.getElementById("movenode").checked = true;
        } else if (event.keyCode == 71) {
            document.getElementById("mnode").checked = true;
        } else if (event.keyCode == 70) {
            document.getElementById("relnodes").checked = true;
            reset_booleans();
            markarea=true;
            markUnmarkAll();
            build_canvas();
            document.getElementById("movenode").checked = true;
        } else if (event.keyCode == 65) {
            document.getElementById("area").checked = true;
        } else if (event.keyCode == 72) {
            document.getElementById("cmlink").checked = true;
            createMarkedLinks();
        } else if (event.keyCode == 73) {
            document.getElementById("rmlink").checked = true;
            removeMarkedLinks();
        } else if (event.keyCode == 68) {
            document.getElementById("drawtool").checked = true;
        } else if (event.keyCode == 82) {
          document.getElementById("reshape").checked = true;
        } else if (event.keyCode == 17) {
            drawstart = true;
            message2="SET FOCUS"
        } else if (event.keyCode == 16) {
            shiftpress = true;
        } else if (event.keyCode == 84) {
            document.getElementById("beziercurve").checked = true;
            bezier_curve();
        }
    });
}


//mainCanvas.removeEventListener("click", savepng);
//mainCanvas.removeEventListener("click", saveGraph);

function startSaveListener(){
	document.getElementById("saveit").addEventListener("click", saveGraph);
    document.getElementById("pushit").addEventListener("click", savepng);
}

function reset_booleans(){
  markarea=false;
  doreshape=false;
  reshape=false;
  moveit=false;
  holdbezier1=false;
  holdbezier2=false;
}
