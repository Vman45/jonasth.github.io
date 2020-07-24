//AT TRACK CHANGE SET NEW VALUES TO BE SHOWN ON UI
function trackChangeToUI(){
    //When track change get all values for track
    document.getElementById("out_portsel").selectedIndex = track[activetrack].outport[0];
    document.getElementById("bank").selectedIndex = track[activetrack].outport[0];
    document.getElementById("out_channel").selectedIndex = track[activetrack].midichannel[0] - 1;
    document.getElementById("prog_sel").value = track[activetrack].program[0];
	document.getElementById("selInst").value = track[activetrack].program[0];
}

function getInsName(){
	instrument = "";
}

function getNote(note) {
  // console.log("getNote()");
  xtimes = Math.floor(note / 12);
  if (note % 12 == 0) {
    note = "C"
  } else if (note % 12 == 1) {
    note = "C#";
  } else if (note % 12 == 2) {
    note = "D"
  } else if (note % 12 == 3) {
    note = "D#"
  } else if (note % 12 == 4) {
    note = "E"
  } else if (note % 12 == 5) {
    note = "F"
  } else if (note % 12 == 6) {
    note = "F#"
  } else if (note % 12 == 7) {
    note = "G"
  } else if (note % 12 == 8) {
    note = "G#"
  } else if (note % 12 == 9) {
    note = "A"
  } else if (note % 12 == 10) {
    note = "A#"
  } else if (note % 12 == 11) {
    note = "B"
  }
  note = note.concat(xtimes);
  return note;
}

function synthChoice(){
	console.log("synthChoice()");
	var e = document.getElementById("synthval");
	SFload = e.options[e.selectedIndex].text;
	if (SFload=="SF2 synth") {
		SF2PLAY=true;
		document.getElementById('metvalue').value = "SF2";
		initPiano();
		synth.Load('https://imaya.github.io/demo/sf2.js/wml.html');
		//synth.Load('https://logue.github.io/smfplayer.js/wml2.html')
		setTimeout(loadSFtracks, 1000);
		document.getElementById("extSynth").style.visibility= "visible" ; VDvisible=1;
	} else if (SFload=="Korg N364") {
		SF2PLAY=false;
		document.getElementById('metvalue').value="N364";
		initPiano();
		synth.Load('blank.html');
		korgLoad=true;
			
	} else if (SFload=="Roland SC7") {
		SF2PLAY=false;
		document.getElementById('metvalue').value="SC7(GM)";
		initPiano();
		synth.Load('blank.html');
	}
	
	autoLoadInsFile();
}

function loadSFtracks(){
	var i=1;
	while (i<maxtrack){
		trackPlus();
		i++;
	}
	document.getElementById("track").value=1;
	activetrack = document.getElementById("track").value;
	trackChangeToUI();
	document.getElementById("prog_sel").value=1;
	setTrack(activetrack);
}

//Check what mode metronome in
function metroState(){
	console.log("metroState()");
	// CHECKBOX "METRO ON/OFF"
	if (metSet.checked){mode="Metronome";listLeftCanvas();metronomeInit();} else {mode="Listen";listLeftCanvas();containerMain();initPiano();}
}


//Check if render piano notes while playing
function checkIfPianoRoll() {
	console.log("checkIfPianoRoll()");
	noteRender=document.getElementById("piroll").checked;
	drawmode="midinotes";
}

//Check if drum listener is on or off "set automaticly" when drums shown
function checkIfCharNotes(){
	console.log("checkIfCharNotes()");
	charNotes = document.getElementById("keyboardlistener").checked;
	console.log(charNotes);
	if (charNotes){ document.addEventListener("keydown", ListenKeybNote)}
	else {document.removeEventListener('keydown', ListenKeybNote);}
}

//Check if messages should be listed on left canvas
function checkIfEchoMessage() {
	console.log("checkIfEchoMessage()");
	echo = document.getElementById("echo").checked;
	document.getElementById("keystream").value = "";
	if (echo==false){ listLeftCanvas();}
}

//Check if monitoring should be on
function checkIfMonitor(){
	console.log("checkIfMonitor()");
	monitor = document.getElementById("monitScreen").checked;
	if (monitor==false){document.getElementById("keystream").value ="";}
}

//Check if solo "not implemented yet"
function checkIfSolo(){
	console.log("checkIfSolo()");
	solo = document.getElementById("solostate").checked;
	console.log("Solostate="+solo);
}
