//SET TRACK IS CALLED WHENEVER A SETTING CHANGE
function setTrack(activetrack) {
	console.log("setTrack()"+activetrack);
	getUIvalues();
	drawAllTrackSettings();
	listLeftCanvas();
	sendOutport();
	MidiChannelsend();
	sendProgram();
	sendTrackname();
}

//WHEN SETTING CHANGE OCCURE, READ IN ALL VALUES FROM UI AGAIN AND SET INTO VARIABLES
function getUIvalues() {
	console.log("getUIvalues()");
    //Read in all UI values for TRACK into variables, and write into TRACK
	activetrack = document.getElementById("track").value;
	//GET SET OUTPORT
	setPort = document.getElementById("out_portsel").selectedIndex;
	track[activetrack].outport[0] = setPort;
	//GET SET PORTNAME USING OUTPORT
	setportname = document.getElementById("out_portsel").value;
	track[activetrack].portname[0] = setportname;
	//GET SET MIDICHANNEL
	trackMidiCh = document.getElementById("out_channel").selectedIndex + 1;
	track[activetrack].midichannel[0] = trackMidiCh;
	//GET SET PROGRAM
	programNbr = document.getElementById("prog_sel").value;
	track[activetrack].program[0] = programNbr;
	//Get what events to list
	listchoice = document.getElementById("listselect").value;
}

function changeProgram() {
	console.log("changeProgram()");
	programNbr = document.getElementById("prog_sel").value;
	document.getElementById("selInst").selectedIndex=programNbr;
	setTrack(activetrack);
}

function pgPlus() {
	console.log("pgPlus()");
	if (document.getElementById("prog_sel").value < 128) {
		document.getElementById("prog_sel").value++;
		programNbr = document.getElementById("prog_sel").value;
		document.getElementById("selInst").selectedIndex=programNbr;
		setTrack(activetrack);
	}
}

function pgMinus() {
  console.log("pgMinus()");
	if (document.getElementById("prog_sel").value > 0	) {
		document.getElementById("prog_sel").value--;
		programNbr = document.getElementById("prog_sel").value;
		document.getElementById("selInst").selectedIndex=programNbr;
		setTrack(activetrack);
	}
}

function changeMidiChannel() {
	console.log("changeMidiChannel()");
	trackMidiCh = document.getElementById("out_channel").selectedIndex + 1;
	setTrack(activetrack);
}

function changeOutPort() {
	console.log("changeOutPort()");
	outportindex = document.getElementById("out_portsel").value;
	console.log("selected index " + outportindex);
	setTrack(activetrack);
}

function MidiChannelsend() {
	//Set midichannel on the track
	var trackMidiCh = document.getElementById("out_channel").selectedIndex; // don't need +1 here
	//console.log("sendmidiChannel="+trackMidiCh);
  	if ( trackMidiCh >= 0 && trackMidiCh < 16) {
		NOTE_ON = 144 + trackMidiCh;
		NOTE_OFF = 128 + trackMidiCh;
		
	}
}

function changeTrackName(){
 track[activetrack].trackname=document.getElementById("nametrack").value;
}

function sendTrackname(){
  document.getElementById("nametrack").value=track[activetrack].trackname;
}
