var output;
var input;
var inputs;
var outputs;
var onMIDIMessage;
var message;
inportIndex = 0;
outportIndex = 0;
outportarr = [];
inportarr = [];
var PORTout;
sysex=false;
browserLoadTIME=0;
NOTE_ON = 0x90 + 1;
NOTE_OFF = 0x80 + 1;
inBox = [];
firstrun=true;


//MIDI ACCESS TO PORTS INITIATED
function midiInitiation(){
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess(
     {sysex: true}
   )
  .then(success,failure );
}
}

//IF MIDI ACCESS FAIL
function failure() {
  console.error('No access to your midi devices.' + +msg)
}

//IF MIDI ACCESS INITIATED
function success(midi) {
  mid = midi;
  listInPorts(mid);
  midiPortsListener();
  createOutports(mid);
  listOutPorts(mid);
  init();
}

function listInPorts(){
  console.log("***********************listInPorts()");
  var x=0; portstring="<table border='1' bgcolor=cyan width='199'>";
  inputs = mid.inputs.values();
  //List ports in 
  Lportin = mid.inputs.values();
  for (listinput = Lportin.next(); listinput && !listinput.done; listinput = Lportin.next()) {
    var deviceIn = listinput.value.name;
    var optin = document.createElement("option");
    optin.text = deviceIn;
	//document.getElementById("in_portsel").add(optin);
    portstring=portstring+"<tr><td align=right><b>"+optin.text+"<input id='inBox"+x+"' type='checkbox' onChange='midiPortsListener()' checked></b></td></tr> ";
	x++;
  }
   document.getElementById("ports").innerHTML=portstring+"</table>";
}

function midiPortsListener(){
  var x=0;
  inputs = mid.inputs.values();
  for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
   input.value.onmidimessage = null; 
   var myVar = document.getElementById("inBox" + x).checked;
   console.log("******"+myVar);
   if(myVar==false){  }   
   else if(myVar==true){ 
			//input.value.onmidimessage = onMIDIMessage; 
		portid=input.value.name;
		input.value.onmidimessage = onMIDIMessage.bind(portid);
		}
   x++;
   
  }
}

function createOutports(mid){
  outputs = mid.outputs.values();
  for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
  outportarr.push(output.value);
  }
}

//LISTPORTS AFTER MIDI SUCCESS "CALLED FROM MAIN INIT"
function listOutPorts(mid) {
  PORTout = outportarr[outportindex];
  Lportout = mid.outputs.values();
  for (listoutput = Lportout.next(); listoutput && !listoutput.done; listoutput = Lportout.next()) {
    var deviceOut = listoutput.value.name;
    var optout = document.createElement("option");
    optout.text = deviceOut;
    document.getElementById("out_portsel").add(optout);
  }
}

//MESSAGES SENT TO PORTS
function onMIDIMessage(message) {
  portid=this;
  //console.log(portid);
  mess = message;
  if (mess.data[0] <240 ) {
    if (SF2PLAY==true) {
       sf2synth(message);
    } else { 
	   playbackPort(message); 
	}
    if (recordmidi) {
			record(message);
    }
	if (echo) {
		echoNotesCanvas(mess);
		checkMessageType(mess);
		drawpiano(mess);
   
   } else {
		checkMessageType(mess);
	}
  } 
}

function checkMessageType(mess) {
	if (mess.data[0] == 254) {
	    typeOfMessage = "ACTIVE SENSE";
	} else if (mess.data[0] > 127 && mess.data[0] < 144) {
		typeOfMessage = "NOTE ON	";
	} else if (mess.data[0] > 143 && mess.data[0] < 167) {
		typeOfMessage = "NOTE OFF  ";
	} else if (mess.data[0] > 223 && mess.data[0] < 240) {
		typeOfMessage = "PITCH BEND";	
	} else if(mess.data[0] > 175 && mess.data[0]< 192 && (mess.data[1]==1 || mess.data[1]==2)) {
		typeOfMessage = "MODULATION";
		document.getElementById("modID").value=mess.data[2];
		
	} else if(mess.data[0] > 175 && mess.data[0]< 192 &&  mess.data[1]==7 ) {
		typeOfMessage = "VOLUME";
	    document.getElementById("volID").value=mess.data[2];
	} else if (mess.data[0] == 192 && mess.data[1]>0 && mess.data[1]<128) {
		//typeOfMessage = "PROGRAM CHANGE";
		
	} else if(mess.data[0] > 175 && mess.data[0]< 192 &&  mess.data[1]==91 ) {
		typeOfMessage = "REVERB";
		document.getElementById("revID").value=mess.data[2];
	} else if(mess.data[0] > 175 && mess.data[0]< 192 &&  mess.data[1]==93 ) {
		typeOfMessage = "CHORUS";
		document.getElementById("chorID").value=mess.data[2];
	} else if(mess.data[0] > 175 && mess.data[0]< 192 &&  mess.data[1]==10 ) {
		typeOfMessage = "PAN";	
		document.getElementById("panID").value=mess.data[2];
	} else if(mess.data[0] > 175 && mess.data[0]< 192 &&  mess.data[1]==64 ){
		typeOfMessage = "SUSTAIN/HOLD";
		document.getElementById("holdID").value=mess.data[2];
	} else if(mess.data[0] > 175 && mess.data[0]< 192 &&  mess.data[1]==74 ) {
		typeOfMessage = "BRIGHTNESS";
	} else if(mess.data[0] > 175 && mess.data[0]< 192 &&  mess.data[1]==71 ) {
		typeOfMessage = "HARMONIC CONTENT";
	} else if(mess.data[0] > 175 && mess.data[0]< 192 &&  mess.data[1]==73 ) {
		typeOfMessage = "ATTACK TIME";
	} else if(mess.data[0] > 175 && mess.data[0]< 192 &&  mess.data[1]==72 ) {
		typeOfMessage = "RELEASE TIME";
	} else if (mess.data[0] == 176 && mess.data[1]==32){
		if(mess.data[2]==0){ typeOfMessage = "BANK CHANGE TO "+mess.data[2];  }
		else if(mess.data[2]==1){ typeOfMessage = "BANK CHANGE TO "+mess.data[2];}
		else if(mess.data[2]==2){ typeOfMessage = "BANK CHANGE TO "+mess.data[2]; }
		else if(mess.data[2]==3){ typeOfMessage = "BANK CHANGE T0 "+mess.data[2]; }
		else { typeOfMessage = "BANK CHANGE T0 GM"; 
		}	
	} else {
	  typeOfMessage = "OTHER CC";
	}
}

//ECHO *ANY* PLAYED KEY MESSAGE TO THE SELECTED OUTPORT
function playbackPort(mess) {
//console.log("MIDUT "+mess.data[0]+" "+mess.data[1]+" "+mess.data[2]);

if (mess.data[0] == 144 && trackMidiCh != 1) {
   mess.data[0] = NOTE_ON;
}

else if (mess.data[0] == 128 && trackMidiCh != 1) {
  mess.data[0] = NOTE_OFF;
}

else if (mess.data[0] == 176){
	mess.data[0]=175+trackMidiCh;
} 

else if (mess.data[0] == 224){
	mess.data[0]=223+trackMidiCh;
} 

  var noteMessage = [mess.data[0], mess.data[1], mess.data[2]];
  PORTout.send(noteMessage);
}

