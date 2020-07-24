function startScrollAnime(){
	console.log("!!!!!!!!!!startScrollanime()!!!!!!!!!!!");
	scrollrefresh = setInterval(drawScrollBar,drawpause);
}

function stopScrollAnime(){
	console.log("+++++++++stopScrollanime()+++++++++++");
	clearInterval(scrollrefresh);
}

function pauseScrollAnime(){
	console.log("+++++++++stopScrollanime()+++++++++++");
	clearInterval(scrollrefresh);
}

function resumeScrollAnime(){
	console.log("!!!!!!!!!!startScrollanime()!!!!!!!!!!!");
	scrollrefresh = setInterval(drawScrollBar,drawpause);
}

function setRangeRec() {
	console.log("setRangeRec()");
	recSPos = document.getElementById("startbar").value;
	recEPos = document.getElementById("endbar").value;
	BPM = document.getElementById("bpm").value;
	timeSpannRec();
}

function setRangeEdit(){
	console.log("setRangeEdit()");
	editSPos=document.getElementById("SB").value;
	editEPos=document.getElementById("EB").value;
	document.getElementById("vrange").value=editEPos-editSPos;
	timeSpannEdit();
}

//Both REC and EDIT RANGE MUST BE INITIATED
function initScrollBar(){
	console.log("initScrollBar()");
	selBarmode();
	setRangeEdit();
	setRangeRec();
	getFPSandBARS(); //Fetch values from UI
	checkScrollMode();
	calcScrollValues();
	reStartScrollBar();
}

function getFPSandBARS() {
	console.log("getFPSandBARS()");	
	renderFPS=document.getElementById("FPS").value;
	if (mode=="Play" ){
		//alert("Play");
		startTimeBar = 0;
		lastToPlay=track[0].midiMess.length;
		playEnd=track[0].midiMess[lastToPlay-1].time;
	} else if (mode=="Count In" || mode=="Record" || mode=="Listen"){	
	    //alert("Record");
		startTimeBar = document.getElementById("recstart").value;
		startTimeBar = parseInt(rs);
		recEnd = document.getElementById("recend").value;
		re = parseInt(recEnd);
	}
}

function checkScrollMode(){
	console.log("checkScrollMode()");
	if( mode=="Listen"){editScrollLook();uimode="green";}
	else if(mode=="Play"){playScrollLook();uimode="green";}
	else if(mode=="Record" || mode=="Count In" ){recScrollLook();uimode="red";}
}

function editScrollLook() {
	barSave=editSPos; 
	barEnd=editEPos;
	ScrollBarLength=editEPos-editSPos;
	barColor="white";	
}
	
function recScrollLook(){

	barSave=recSPos;
	barEnd=recEPos;
	ScrollBarLength=recEPos-recSPos;
	barColor="yellow";
}

function playScrollLook(){
	playCursPos=0;
	barSave=0;
	barEnd=recEPos;
	ScrollBarLength=recEPos-recSPos;
	barColor="cyan";
}

function calcScrollValues(){
	console.log("calcScrollValues()");	
	barposition=0;
	drawpause=0;
	pixelmove=0;
	tottime=0;
	//Scrollcursor top position
	SBtop=0;
	//Scrollbar start position "after keys"
	scrollBarPos=keylength;
	scrollLine=keylength;
	//Length in pixels of canvas
	canvasWidth=Mwidth-keylength;
	//Length in pixels of ***EACH*** bar
	barlength=(canvasWidth/ScrollBarLength);
	//Time for scrollbar to traverse full canvas??
	RENDERtime=timePerBAR*ScrollBarLength;
	//console.log("rendertime"+RENDERtime);
	//NOT SURE WHERE I PULLED THIS ONE ????
	BARmultiple=RENDERtime/1000;
	//This seem to be... number of frames to render on canvas
	FramesTOrender=BARmultiple*renderFPS;
	//This should be the pause between rendering each frame????
	drawpause=RENDERtime/FramesTOrender;
	//Pixels to move ***scrollbar and keyscroll*** between each frame rendered
	pixelmove=canvasWidth/FramesTOrender;
	//Rendered bars initiator not shure why 1 and not 0
	canvasScrolls=1;drawnlines=0;
}

function selBarmode(){
	barMode=document.getElementById("barmode").value;
}

function reStartScrollBar(){
	//checkBarLogic();
	console.log("resStartScrollBar() The scrollbar start -> end is drawn");
	barposition=0;
	ctm.fillStyle = barColor;
	ctm.fillRect(0, 0, Mwidth,PistartX-1);
	ctm.fillStyle = "black";
	ctm.font = "18px courier bold";

	//alert(barMode);
	if (mode=="Count In") {
		barCount=barSave;
		while (barposition<=ScrollBarLength){
			if(barMode=="barnr"){ barPrint=barCount;}
            else if(barMode=="timestamp"){ barPrint=barCount*timePerBAR/1000;}
		    else if (barMode=="framenr"){barPrint=barCount*renderFPS;}
			
			ctm.textAlign = "center";
			ctm.fillText(barPrint,keylength+(barlength*barposition),13);
			ctm.textAlign = "left";
			ctm.fillText("|",keylength+(barlength*barposition),22);
			barCount++;
			barposition++;
		}
	}else if (mode=="Record"){
		while (barposition<=ScrollBarLength){
			if(barMode=="barnr"){ barPrint=barSave;}
            else if(barMode=="timestamp"){ barPrint=barSave*timePerBAR/1000;}
		    else if (barMode=="framenr"){barPrint=barSave*renderFPS;}
		
			ctm.textAlign = "center";
			ctm.fillText(barPrint,keylength+(barlength*barposition),13);
			ctm.textAlign = "left";
			ctm.fillText("|",keylength+(barlength*barposition),22);
			barSave++;
			barposition++;
		}	
	}else if (mode=="Play"){
		while (barposition<=ScrollBarLength){
				if(barMode=="barnr"){ barPrint=barSave;}
				else if(barMode=="timestamp"){ barPrint=barSave*timePerBAR/1000;}
				else if (barMode=="framenr"){barPrint=barSave*renderFPS;}
				
				ctm.textAlign = "center";
				ctm.fillText(barPrint,keylength+(barlength*barposition),13);
				ctm.textAlign = "left";
				ctm.fillText("|",keylength+(barlength*barposition),22);
				barSave++;
				barposition++;
		}	
	} else if (mode=="Listen"){
		while (barposition<=ScrollBarLength){
			if(barMode=="barnr"){ barPrint=barSave;}
            else if(barMode=="timestamp"){ barPrint=barSave*timePerBAR/1000;}
		    else if (barMode=="framenr"){barPrint=barSave*renderFPS; }
			ctm.textAlign = "center";
			ctm.fillText(barPrint,keylength+(barlength*barposition),13);
			ctm.textAlign = "left";
			ctm.fillText("|",keylength+(barlength*barposition),22);
			barSave++;
			barposition++;
		}
	}
}

function drawScrollBar(){
	ctm.strokeStyle = uimode;
	ctm.lineWidth=2;
	ctm.beginPath();
	ctm.moveTo(scrollLine+2,14);
	ctm.lineTo(scrollLine+2,PistartX);
	ctm.stroke();
	drawnlines++;
	tottime=startTimeBar+(drawpause*drawnlines);
	if (mode=="Record") { 
	   if (tottime>re) {stopREC();} 
	} else if (mode=="Play") {
	  
	}
	//LET BE TIME COMP
	//checkBarLogic();
	if (tottime>RENDERtime*(canvasScrolls)) {
		if(mode=="Play"){reStartScrollBar();}
		scrollLine=keylength;
		canvasScrolls++;
	} else {
		//Writing Time to left canvas	 
		ctT.font = "20px Times new roman";
		ctT.fillStyle = "lightgrey";ctT.fillRect(0,245,Mwidth,25);
		ctT.fillStyle = "black";ctT.fillText("Time ms "+ tottime , 7, 260);
		scrollBarPos=pixelmove+scrollBarPos;
		scrollLine=pixelmove+scrollLine;
	}
	if (noteRender)pianoSCROLL();
}

function checkBarLogic(){
	ctm.fillStyle = "black";
	ctm.fillRect(580, 60, 340,740);
    ctm.fillStyle = "lightgrey";
	ctm.font = "18px courier";
	ctm.fillText("Count IN 8 Bars ",600,100);
	ctm.fillText("ScrollBar MODE "+mode,600,120);
	ctm.fillText("CanvasScrolls "+canvasScrolls,600,140);
	ctm.fillText("RENDER Time "+RENDERtime,600,160);
	ctm.fillText("Scrolls*Rendertime= "+canvasScrolls*RENDERtime,600,180);
	ctm.fillText("Totaltime "+tottime,600,200);
	ctm.fillText(mode+" Bar START "+barSave,600,220);
	ctm.fillText(mode+" Bar END "+barEnd,600,240);
	ctm.fillText("Bar LENGTH "+ScrollBarLength,600,260);
	ctm.fillText("StartTime Bar "+startTimeBar,600,280);
	ctm.fillText("DrawPause "+drawpause,600,300);
	ctm.fillText("DrawnLines "+drawnlines,600,320);
	ctm.fillText("BarSave "+barSave,600,340);
	
}

