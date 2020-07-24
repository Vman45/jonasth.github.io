activetrack = 1;
outportindex = 0;
programNbr = 1;
trackMidiCh = 1;
recTrack=1;
var mySynths =[];
playEv = [];
recEv = [];
midiMess = [];
t0 = 0;
x = 0;
textout = "";
midievent = 0;
recordmidi = false;
playmidi = false;
midimessage = false;
echo = false;
solo=false;
clock = 0;
listTr = "";
typeOfMessage="";
mode = "Listen";
rs = 0;
korgLoad=false;
var img = new Image();   // Create new img element
img.src = 'PICS/JT.JPG'; // Set source path

function init() {
	rectrack=1;
	console.log("init()");
	makeTrack();
	LeftCanvas_init();
	myPic();
	
	setTimeout(function(){ 
	 	initEditorCanvas();
		checkIfPianoRoll();
		getUIvalues(); 
		getFormNoteTime();
		checkIfEchoMessage();
		echo=false;
		checkIfMonitor();
		synthChoice();
		initDrum();
		initMouseListener();
		metronomeInit();
		setTrack(activetrack); 
		if (SFload=="Korg N364"){document.getElementById("selBank").selectedIndex = 1;} 
		else {document.getElementById("selBank").selectedIndex = 0;} 
		renderMetTrack();
		sendCCSettings();
		SAVEBPM=document.getElementById("bpm").value;
		SAVEBPM=parseInt(SAVEBPM);
		
		BAQ();
		
        setTimeout(function(){clearInterval(stopCircle); initPiano();listLeftCanvas();echo=true;},5000);
	   
		console.log("**init end**");
	}, 300);
	
}

//synth.Load('https://logue.github.io/smfplayer.js/wml2.html')
//synth.Load('http://imaya.github.io/demo/sf2.js/wml.html')

function myPic(){
	console.log("myPic()");
	ctT.drawImage(img, 0, 0,Twidth,Theight);
}









