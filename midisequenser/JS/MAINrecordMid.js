//RECORD ANY MESSAGE SENT OR KEY PRESSED
function record(message) {
	clock = performance.now()-browserLoadTIME+rs;
	midievent++;
	track[rectrack].midiMess.push({
		time: clock,
		data0: message.data[0],
		data1: message.data[1],
		data2: message.data[2]
	});
}

//RUN TO REPLACE MESSAGES IN INTERVAL OF RECORDING
function removeTrackMessages() {
	rs = document.getElementById("recstart").value;
	rs = parseInt(rs);
	re = document.getElementById("recend").value;
	re = parseInt(re);
	console.log("removeTrackMessages() " + activetrack);
	for (var i = 0; i < track[activetrack].midiMess.length; i++) {
		console.log("REMOVE TIME>=RS "+rs+"REMOVE TIME <=RE "+re);
		if (track[activetrack].midiMess[i].time >= rs && track[activetrack].midiMess[i].time <= re) {
			console.log(i+" Midi message="+track[activetrack].midiMess[i].time);
			track[activetrack].midiMess.splice(i, 1);
			i--;
		}
	}
}

//CALLED WHEN REC PUSHED IN HTML DOCUMENT
function recINIT() {
	console.log("recInit()"+activetrack);
	document.getElementById("keystream").value = "";
	rectrack=activetrack; //Tells that we going to record the active track 
	if (document.getElementById("recordmode").value == "REPLACE") {
		console.log("REMOVING EVENTS");
		removeTrackMessages(rectrack);
	}
	//Saving the active recording track while writing to 333
	savetrack=rectrack; 
	//Always record to temp track 333 and "after cleanup" move the section into the realtrack.
	rectrack=333;
	//Cleanup default recording track "wipe"
	track[333].midiMess.length=0; 
	EventREC = 0;  
	//Build tracks to playedup while recording
	buildPlayTrack(); 
	metToUse();
	mode = "Count In";
	listLeftCanvas();
	containerMain();
	pianoVariables();
	initScrollBar();
	initPianoScroll();
	renderPiano();
	jint=1;mvol=1;
	//We have to save and use to early recorded/pushed notes, we can't create them because they will not have velocity...
	recordmidi = true;
	prog=0;
	//Here the recording is count in
    if (SF2PLAY==true){stopCount=setInterval(countInSF2,interval);}
	else {stopCount=setInterval(countIn,interval);}
}

function countIn(){
	console.log("countIn()");
	if (jint==noteval*2+1){
		clearInterval(stopCount); 
		stopRec=setTimeout(STARTREC,0);
	} else {
		if (mvol==1 || mvol==noteval+1) { metvol=120; } else { metvol=50;} 
		noteMessage = [153, 77, metvol];
		outportarr[outportindex].send(noteMessage);
		//DRAWOUT COUNTIN SQUARES
		ctT.fillStyle = "red";
		ctT.fillRect(240+prog, 5, 10,10);
		prog=prog+15;
	}
	jint++;
	mvol++;
}

function countInSF2(){
	console.log("countInSF2()");
	if (jint==noteval*2+1){
		clearInterval(stopCount); 
		stopRec=setTimeout(STARTREC,0);
	} else {
		if (mvol==1 || mvol==noteval+1) { metvol=120 } else { metvol=50} 
		synth.NoteOn(153, 77, metvol);
		synth.NoteOff(153,77);
		//DRAWOUT COUNTIN SQUARES
		ctT.fillStyle = "red";
		ctT.fillRect(240+prog, 5, 10,10);
		prog=prog+15;
	}
	jint++;
	mvol++;
}

function STARTREC(){
	console.log("STARTREC()");	
	//Here the actual recording start
	waittime = 0;
	keepGoing = true;
	mode = "Record";
	listLeftCanvas(); 
	//Sending/recording settins program, pan, vol, chorus,reverb, sustain, modulation
	recProgMess();
	recCCMess();
	browserLoadTIME=performance.now();
	startScrollAnime();
	STARTRECPLAY();
	//Needed because is STARTRECPLAY is not same "length  / interval" as STARTPLAY
	//Also easier to read out what goes wrong if not mixed up
}

function recCCMess(){
	CCtype=7;
	CCvol=document.getElementById("volID").value;
	sendCCMess(CCtype,CCvol);
	CCtype=10;
	CCpan=document.getElementById("panID").value;
	sendCCMess(CCtype,CCpan);
	CCtype=91;
	CCrev=document.getElementById("revID").value;
	sendCCMess(CCtype,CCrev);
	CCtype=93;
	CCchor=document.getElementById("chorID").value;
	sendCCMess(CCtype,CCchor);
	CCtype=1;
	CCmod=document.getElementById("modID").value;
	sendCCMess(CCtype,CCmod);
	CCtype=64;
	CChold=document.getElementById("holdID").value;
	sendCCMess(CCtype,CChold)
}

function sendCCMess(A,B){
	console.log("sendRecCC()");
	midiCh = 176 + trackMidiCh-1;
    midievent++;
    mymess.data[0]=midiCh;
    mymess.data[1]=A;
    mymess.data[2]=B;
    clock = 1;
    clock = clock + rs;
    initMESS(mymess);
    //if (SFload=="SF2 synth") {synth.NoteOn(143+trackMidiCh,A,B);} else {playbackPort(mymess); }
}

function recProgMess(){
	console.log("recProgramMess()");
	midievent++;
	programNbr = document.getElementById("prog_sel").value;
	//Set channel
	midiCh = 192 + trackMidiCh-1;
	mymess.data[0]=midiCh;
    mymess.data[1]=programNbr;
	clock = 1;
    clock = clock + rs;
    initMESS(mymess);
}


function partTrack() {
	track[rectrack].trackpart.push({
		pName: document.getElementById("patname").value,
		pStartbar: document.getElementById("startbar").value,
		pEndbar: document.getElementById("endbar").value,
		pTrack: rectrack,
		pBPM: document.getElementById("bpm").value,
		pBeat: document.getElementById("treat").value,
		pDiv: document.getElementById("trick").value,
	
	});
	
}


function initMESS(message){
	//SET VALUES AT REC INIT "REVERB, PAN, MODULATION, VOLUME, PROGRAM, SUSTAIN"
	clock = 1;
    clock = clock + rs;
	midievent++;
	track[rectrack].midiMess.push({
		time: clock,
		data0: message.data[0],
		data1: message.data[1],
		data2: message.data[2]
	});
}

function STARTRECPLAY(){
	console.log("STARTRECPLAY()");
	copyEv = recEv.slice();
	last = copyEv[copyEv.length - 1]
	copyEv[copyEv.length] = last;
	var waittime = copyEv.shift();
	console.log("waittime="+waittime);
	midEvent = 0;  myTime=waittime;
	if (SF2PLAY==true){stopJump=setTimeout(SF2Playup, waittime);}
	else {stopJump=setTimeout(doPlayup, waittime);}
}

//WHEN RECORDING INTERVAL ENDED/STOPPED
function stopREC() {
	
	console.log("stopIT() "+rectrack);
	stopScrollAnime(); 
	clearTimeout(stopRec);
	stopAllVoices();
	recordmidi = false;
	earlyNotesFix();
	lateNotesFix();
	latencyFix();
	rectrack=savetrack;
	copyToRecTrack();
	track[rectrack].midiMess.sort(dynamicSort("time"));
	fillInExtraValues(rectrack);
	partTrack();
	//Will calculate number of ticks for event using PPQ 960
	getNoteTicks(rectrack);
	trackEvent=0;
	document.getElementById("trackListed").value = rectrack;
	drawTrackX(rectrack, trackEvent);
	echostate=false;
	document.getElementById("echo").checked = echostate;
	document.getElementById("status").value = "Listen";
	mode="Listen";
	listLeftCanvas();
	setTimeout(initPiano,1);
	listTrSet();
}	



function getNoteTicks(rectrack){
	for (var j=0;j<	track[rectrack].midiMess.length;j++){
		var tickLength=1/QPS;
		var numberOfTicks=track[rectrack].midiMess[j].time*QPS;
		var PPQtime=tickLength*numberOfTicks;
		track[rectrack].eventTicks[j]=numberOfTicks;
		//console.log(PPQtime);
	}
}

function copyToRecTrack(){
	console.log("copyToRecTrack() "+z);
	for (var k = 0; k < track[333].midiMess.length; k++) {
		    //We need to insert note after
			track[rectrack].midiMess[track[rectrack].midiMess.length] = track[333].midiMess[k];
	}
}

function earlyNotesFix() {
	console.log("earlyNotesFix");
	//Check if any messages	
	if (track[rectrack].midiMess.length>0){
		var i=0;earlyfound=false;
		//Check how many early startpoints
		var savetime=track[rectrack].midiMess[i].time;
		while (track[rectrack].midiMess[i].time<track[rectrack].midiMess[i+1].time && i<track[rectrack].midiMess.length-2){
			i++;
		}	
		if (i!=track[rectrack].midiMess.length-2) {earlyfound=true;}
		//alert(i);
		//Fix the early pushed keys
		//j is the note after last early event.
		j=i+1;i=0;
		if (earlyfound==true){
			//console.log("found early note");
			while (i<=j && track[rectrack].midiMess[i].data0==144) {
				track[rectrack].midiMess[i].time=rs+1;
				i++;
			}	
		}
	}
}
	
function lateNotesFix(){
	//Check if any messages	
	if (track[rectrack].midiMess.length>0){
		//Trying another approach,first all notes initiated to OFF, in off array
		var switchnr=0;var OFF = [];
		for (var k=0;k<128;k++){
			OFF[k]=true;
		}
		//Now we switch the 128 values, on "false" and off "true"
		for (var l=0;l<track[rectrack].midiMess.length;l++){
			switchnr=track[rectrack].midiMess[l].data1;
			//alert("switchnr="+switchnr);
			if (track[rectrack].midiMess[l].data0==144)
			{OFF[switchnr]=false;} 
		    else if (track[rectrack].midiMess[l].data0==128)
			{ OFF[switchnr]=true;}
		}
		//Here we create off values for notes that still on.
		for (var l=0;l<128;l++){
			if (OFF[l]==false){
				track[rectrack].midiMess.push({
				time: re-1,
				data0: 128,
				data1: l,
				data2: 0
				});
			}
		}	
	}
}

function latencyFix(){
	console.log("latencyFix()");
	if (track[rectrack].midiMess.length>0){
		for (var i = 0; i < track[rectrack].midiMess[i].length; i++) {
			track[rectrack].midiMess[i].time=track[rectrack].midiMess[i].time+latCorr;
		}
	}
}

//RECFORMAT FIX
function fillInExtraValues(rectrack){
  console.log("fillInExtraValues()");
  //Set extra values track, midichannel, program after"events recorded"
  if (track[rectrack].midiMess.length > 0) {
    for (var i = 0; i < track[rectrack].midiMess[i].length; i++) {
      track[rectrack].outport = setPort;
      track[rectrack].portname = setportname;
      track[rectrack].midichannel = setMidichannel;
      track[rectrack].program = setProgram;
    }
  }
}