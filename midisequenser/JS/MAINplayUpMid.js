function playInit() {
	console.log("playInit()");
	waittime = 0;
	keepGoing = true;
	if (mode == "Pause") {
		resumeplay();
	} else if (mode == "Listen" || mode =="Forward" || mode=="Rewind" ) {
		mode = "Play";
		buildPlayTrack();  //In mixdown
		if (playEv==undefined || playEv.length==0){
			//Nothing to do	
		} else {
			listLeftCanvas(); 
			containerMain();
			pianoVariables();
			initScrollBar();
			initPianoScroll();
			renderPiano();
			if (track[0].midiMess.length > 0) {	
				rectrack=0;
				startScrollAnime();
				stopRec=setTimeout(STARTPLAY,0);
			} 
		}
	}
}

function STARTPLAY(){
	console.log("STARTPLAY()");
	copyEv = playEv.slice();
	last = copyEv[copyEv.length - 1]
	copyEv[copyEv.length] = last;
	var waittime = copyEv.shift();
	console.log("waittime="+waittime);
	midEvent = 0;  myTime=waittime;
	//console.log(SF2PLAY);
	if (SF2PLAY==true){stopJump=setTimeout(SF2Playup, waittime);}
	else {stopJump=setTimeout(doPlayup, waittime);}
}

//WHILE MESSAGES TO PLAY DO PLAYUP
function doPlayup() {
	if (keepGoing) {
		if (copyEv.length) {
			if (track[playtrack].midiMess[midEvent].data0<192 || track[playtrack].midiMess[midEvent].data0>207)
				{noteMessage = [track[playtrack].midiMess[midEvent].data0, track[playtrack].midiMess[midEvent].data1, track[playtrack].midiMess[midEvent].data2];
				} else { noteMessage = [track[playtrack].midiMess[midEvent].data0, track[playtrack].midiMess[midEvent].data1];}
			if (mode=="Play"){	pianoKeypressOut(); scrollPianoOut();}
			outportarr[outportindex].send(noteMessage);
			waittime = copyEv.shift();
			midEvent++;
			setTimeout(doPlayup, waittime);
		} else { stopPLAY();}
	}
} 

function SF2Playup() {
	if (keepGoing) {
		if (copyEv.length) {
			if (track[playtrack].midiMess[midEvent].data0 > 143 && track[playtrack].midiMess[midEvent].data0 < 160) {
					synth.NoteOn(track[playtrack].midiMess[midEvent].data0,track[playtrack].midiMess[midEvent].data1,track[playtrack].midiMess[midEvent].data2);
				} 
			else if (track[playtrack].midiMess[midEvent].data0 > 127 && track[playtrack].midiMess[midEvent].data0 < 144) {
					synth.NoteOff(track[playtrack].midiMess[midEvent].data0,track[playtrack].midiMess[midEvent].data1);
			}
			if (mode=="Play"){	pianoKeypressOut(); scrollPianoOut();}
			waittime = copyEv.shift();
			midEvent++;
			setTimeout(SF2Playup, waittime);
		} else { stopPLAY();}
	} 
}

function scrollPianoOut(){
	rectrack=888;
	myTime=myTime+waittime,
		track[rectrack].midiMess.push({
			time: myTime,
			data0: track[0].midiMess[midEvent].data0,
			data1: track[0].midiMess[midEvent].data1,
			data2: track[0].midiMess[midEvent].data1,
	}); 
}

function pianoKeypressOut(){
	mymess.data[0]=track[0].midiMess[midEvent].data0;
	mymess.data[1]=track[0].midiMess[midEvent].data1;
	mymess.data[2]=track[0].midiMess[midEvent].data2;
	drawpiano(mymess);
}


//PAUSE, STOP, RESUME
function stopPLAY() {
	console.log("stopPLAY()");
	copyEv.length = 0;
    clearTimeout(stopJump);
	stopScrollAnime(); 
	stopAllVoices();
	mode = "Listen";
	listLeftCanvas();
	initPiano();
}


function stopAllVoices(){
	for (var i=0;i<16;i++){
		settingChange=[176+i,123,0];
		outportarr[outportindex].send(settingChange);	
	}
}


function speedchange(){
	playspeed=document.getElementById("speed").value;
	PLAYBPM=SAVEBPM*playspeed;
	document.getElementById("bpm").value=PLAYBPM;
	getFormNoteTime();
}

function stop() {
	console.log("stop()");
	if (copyEv === undefined || copyEv.length == 0) {
		// array empty or does not exist
	} else 	if (mode == "Play" || mode == "Pause"){stopPLAY();}
      else if (mode == "Record" || mode == "Count In"){
		copyEv.length = 0;
		stopREC();
	}
}

function pauseplay() {
	console.log("pauseplay()");
	mode = "Pause";
	listLeftCanvas();
	savewait = waittime;
	keepGoing = false;
	pauseScrollAnime(); 
}

function resumeplay() {
	console.log("resumeplay()");
	//speedchange();
	keepGoing = true;
	console.log("resumeplay");
	mode = "Play";
	listLeftCanvas();
	waittime = savewait;
	setTimeout(doPlayup, waittime);
	keepGoing = true;
	resumeScrollAnime();
}

function pause() {
	console.log("pause()");
	if (mode == "Play") {
		pauseplay();
	} else if (mode=="Forward"){
		pausePlay();
		document.getElementById("bpm").value=SAVEBPM;
		getFormNoteTime();
		
	}
}