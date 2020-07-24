//MAIN CANVAS INITIATION
function main_canvas_init() {
	mainCanvas = document.getElementById("maincanvas");
	ctm = mainCanvas.getContext("2d");
	ctm.font = "12px Arial";
	mget_canvas_res();	
	mset_canvas_resolution();
	mainCanvas.addEventListener("mouseover", function(evt) {
    if(mode=="Listen"){  
			startMouseListener();
		}
	}, false);
	mainCanvas.addEventListener("mouseout", function(evt) {
		if(mode=="Listen"){    
			stopMouseListener();
		}
	}, false);
}

function mget_canvas_res() {
Msize = document.getElementById('midid');
  Mwidth = Msize.offsetWidth*1;
  Mheight = Msize.offsetHeight*0.96;
}

function mset_canvas_resolution() {
  document.getElementById('maincanvas').width = Mwidth;
  document.getElementById('maincanvas').height = Mheight;
}

function containerMain() {
  ctm.rect(0, 0, Mwidth, Mheight);
  if (drawmode=="midinotes"){ ctm.fillStyle = "#000a4d";}
  else if (drawmode=="barnotes"){ctm.fillStyle = "#FFFDD0";}
  ctm.fill();
}

function initPiano(){
	console.log("initPiano()");
	containerMain();
	pianoVariables();
	initScrollBar();
	initPianoScroll();
	renderPiano();
	if (mode=="Listen"&& drawmode=="midinotes"){drawMarked();} else {drawBar();}
	if (mode!="Record" && mode!="Play") {drawAllNotes(); console.log("djfdjfslfjdsjfldsljfslk");}

}

function drawMarked() {
var LeftTime=parseInt(document.getElementById("recstart").value);
var RightTime=parseInt(document.getElementById("recend").value);	
var TimeSPos=document.getElementById("EditStart").value;
var TimeEPos=document.getElementById("EditEnd").value;
if(LeftTime>=TimeSPos && RightTime<=TimeEPos && mode=="Listen")  {
	calcMarking();
	drawOutMark();
	leftMarker();
	rightMarker();
 }  
 
}

function OLDcalcMarking(){
	var STARTBAR=document.getElementById("SB").value;
	var LeftTime=parseInt(document.getElementById("recstart").value);
	var RightTime=parseInt(document.getElementById("recend").value);	
	var TimeSPos=document.getElementById("EditStart").value;
	var TimeEPos=document.getElementById("EditEnd").value;
	//Do calculation
	distanceTotal=Mwidth-50;
	TimeTotal=TimeEPos-TimeSPos;
	RightPerc=RightTime/TimeTotal;
	LeftPerc=LeftTime/TimeTotal;
	zz=50+(RightPerc*distanceTotal)-(barlength*STARTBAR)*0.99771462;
	yy=50+(LeftPerc*distanceTotal)-(barlength*STARTBAR)*0.99771462;
}

function calcMarking(){
	var recSPos = document.getElementById("startbar").value;
	var	recEPos = document.getElementById("endbar").value;
	var editSPos=document.getElementById("SB").value;
	var	editEPos=document.getElementById("EB").value;
	var left=recSPos-editSPos;
	var right=recEPos-editSPos;
    zz=50+(left*barlength);
	yy=50+(right*barlength);
}

function drawOutMark(){
	ctm.fillStyle ="#661313";
	ctm.fillRect(yy, 25,zz-yy,Mheight);
}

function leftMarker(){
    ctm.fillStyle = "orange";
    ctm.beginPath();
    ctm.moveTo(yy-10, 15);
    ctm.lineTo(yy+10, 15);
    ctm.lineTo(yy, 25);
    ctm.fill();
}

function rightMarker(){
    ctm.fillStyle = "orange";
    ctm.beginPath();
    ctm.moveTo(zz-10, 15);
    ctm.lineTo(zz+10, 15);
    ctm.lineTo(zz, 25);
	ctm.lineWidth = 2;
    ctm.fill();
}

function pianoVariables(){
	PistartX=25;
	PiendX=Mheight;
	rangeX=PiendX-PistartX;
	keyHeight=rangeX/88;
	PistartY=0;
	PiendY=Mwidth;
	keylength=keyHeight*5;
	bkeylength=keyHeight*3;
}

function renderPiano(){
   //if (mode==="Listen"){pushkey="cyan";} else if (mode=="Record"){pushkey="red";} else if (mode=="Play"){pushkey="green";}
   PistartX=25;
   var y=0;
   var color1="white";
   var color2="black";
   ctm.fillStyle = color1;
   ctm.fillRect(0, PistartX+(y*keyHeight), keylength,keyHeight);
   y++;
   for (var octave=1;octave<8;octave++){
        ctm.fillStyle = color1;
        ctm.fillRect(0, PistartX+(y*keyHeight), keylength, 2*keyHeight);
        y++;
        ctm.fillStyle = color2;
        ctm.fillRect(0, PistartX+(y*keyHeight), bkeylength, keyHeight);
        y++;
        ctm.fillStyle = color1;
        ctm.fillRect(0, PistartX+(y*keyHeight), keylength, 2*keyHeight);
        y++;
        ctm.fillStyle = color2;
        ctm.fillRect(0, PistartX+(y*keyHeight), bkeylength, keyHeight);
        y++;
        ctm.fillStyle = color1;
        ctm.fillRect(0, PistartX+(y*keyHeight), keylength, 2*keyHeight);
        y++;
        ctm.fillStyle =  color2;
        ctm.fillRect(0, PistartX+(y*keyHeight), bkeylength,keyHeight);
        y++;
        ctm.fillStyle = color1;
        ctm.fillRect(0, PistartX+(y*keyHeight), keylength,2*keyHeight);
        y++;
         ctm.fillStyle = color1;
        ctm.fillRect(0, PistartX+(y*keyHeight), keylength, 2*keyHeight);
        y++;
         ctm.fillStyle = color2;
        ctm.fillRect(0, PistartX+(y*keyHeight), bkeylength,keyHeight);
        y++;
          ctm.fillStyle = color1;
        ctm.fillRect(0, PistartX+(y*keyHeight), keylength, 2*keyHeight);
        y++;
        ctm.fillStyle = color2;
        ctm.fillRect(0, PistartX+(y*keyHeight), bkeylength, keyHeight);
        y++;
        ctm.fillStyle = color1;
        ctm.fillRect(0, PistartX+(y*keyHeight),keylength, 2*keyHeight);
        y++;
   }
   ctm.fillStyle = color1;
   ctm.fillRect(0, PistartX+(y*keyHeight), keylength, 2*keyHeight);
   y++;
   ctm.fillStyle = color2;
   ctm.fillRect(0, PistartX+(y*keyHeight), bkeylength, keyHeight);
   y++;
   ctm.fillStyle = color1;
   ctm.fillRect(0, PistartX+(y*keyHeight),keylength, 2*keyHeight);
   y++;
   scrollBarPos=keylength;
}

function drawpiano(message){
if(message.data[0]==NOTE_ON){
 ctm.fillStyle = "cyan";
 ctm.fillRect(30,(PistartX+keyHeight*88)-(keyHeight*(message.data[1]-8)), keylength-30, keyHeight);
} else if(message.data[0]==NOTE_OFF){
 ctm.fillStyle = "white";
 ctm.fillRect(30, (PistartX+keyHeight*88)-(keyHeight*(message.data[1]-8)+1), keylength-30, keyHeight+2);
}
}
