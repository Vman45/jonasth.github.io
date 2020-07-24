messOut="";

function LeftCanvas_init(){
  var canvas = document.getElementById("trackcanvas");
  ctT = canvas.getContext("2d");
  getLeftCanvas_res();
  setLeftCanvas_resolution();
}

function getLeftCanvas_res() {
  Tsize = document.getElementById('trid');
  Twidth = Tsize.offsetWidth;
  Theight = Tsize.offsetHeight;
}

function setLeftCanvas_resolution() {
  document.getElementById('trackcanvas').width = Twidth;
  document.getElementById('trackcanvas').height = Theight;
}
		 
function listLeftCanvas(){
	insoffset=8;
	programNbr=track[activetrack].program[0];
	getInsName();
	ctT.fillStyle = "darkblue";
	ctT.fillRect(0,0,Twidth,Theight);
	ctT.font = "12pt sans-serif";
	ctT.fillStyle = "cyan";
	ctT.fillText("Sequenser MODE** "+mode,2,7+insoffset);
	ctT.fillText("OutPort " + setportname ,  7, 22+insoffset);
	ctT.font = "26pt sans-serif";
	ctT.fillText("Track " + activetrack+"   MidiCh " + track[activetrack].midichannel[0] , 7, 52+insoffset);
	ctT.font = "12pt sans-serif";
	var floff=document.getElementById("selBank");
	var text = floff.options[floff.selectedIndex].text;
	var fluff=document.getElementById("selInst");
	var text2 = fluff.options[fluff.selectedIndex].text;
	ctT.fillText("Bank" + text +"  Instrument " + text2, 7, 67+insoffset);
	ctT.font = "36pt sans-serif";
	ctT.fillText("BAQ 2 BASIC ",30, 150);
	ctT.font = "bold 12pt sans-serif";
	ctT.fillStyle = "BLACK";
	playRange();
	recRange();
}

function playRange(){
	//PLAYEND =PLAYEND.toFixed(3);
	ctT.fillStyle = "lightgreen";
	ctT.fillText("PLAY RANGE "+PLAYSTART+" - "+PLAYEND,110,83+insoffset);
	ctT.fillText("Events "+playEv.length,8,83+insoffset);
}

function recRange(){
	myOne=document.getElementById("recstart").value;
	myTwo=document.getElementById("recend").value;
	ctT.fillStyle = "orange";
	ctT.fillText("RECORD RANGE "+myOne+" - "+myTwo,130,97+insoffset);
	ctT.fillText("Rec Events "+track[0].midiMess.length,8,97+insoffset);
}

function echoNotesCanvas(mess) {
	ctT.fillStyle = "darkblue";
	ctT.fillRect(0,Theight-110,Twidth,110);
	ctT.fillStyle = "ORANGE";
	ctT.font = "bold 12pt sans-serif";
	ctT.fillText("Trigport: "+portid, 7, Theight-92); 
	if (mess.data[0]>127 && mess.data[0]<168){
		messOut ="**NOTE: " + mess.data[1] + " VELOCITY " + mess.data[2];
		messOut2 = "Ev. = " + typeOfMessage  ;
		ctT.fillText(messOut2, 7, Theight-60);
		ctT.fillText(messOut, 7, Theight-75); 
	} else if (mess.data[0] != 254) {
		messOut2 = "Ev. = " + typeOfMessage  ;
		ctT.fillText(messOut2, 7, Theight-60);
		messOut3 =  "D_0=" + mess.data[0] + "    D_1=" + mess.data[1] + "    D_2=" + mess.data[2] ;
		ctT.fillText(messOut3, 7, Theight-45);
	} else { 
		ctT.fillStyle = "darkblue";ctT.fillRect(0,Theight-80,Twidth,20);
	}	
	if (monitor) {
		if (textout.length > 1650) textout = textout.slice(0, 1200);
		textout = messOut + "\n" + textout;
		textout = messOut2 + "\n" + textout;
		textout = messOut3 + "\n" + textout;
		document.getElementById("keystream").value = textout;
	}
}
