volumeDR =new Array();
ArrPad =new Array();
bigString=new Array();
STRINGINS="undefined";

function mouseOverDrum(){
	console.log("mouseOverDrum()");
    document.getElementById("keyboardlistener").checked=true;
    checkIfCharNotes(); 
    midiSave=document.getElementById("out_channel").selectedIndex;
    document.getElementById("out_channel").selectedIndex=10-1;
    setTrack(activetrack);
}

function mouseOutDrum(){
	console.log("mouseOutDrum()");
	document.getElementById("keyboardlistener").checked=false; 
	document.getElementById("out_channel").selectedIndex=midiSave;
	setTrack(activetrack);
}

function ListenKeybNote(){
	console.log("ListenKeybNote()");
	var charCode=event.keyCode;
	var A=charCode;
	var B=64;
	var dev="DR";
	drumNote(A,B,dev);
	stateChange(A);
}

function stateChange(A) {
	console.log("statChange()");
    setTimeout(function(){ drumStop(A); }, 10);
}

function createKitOption() {
console.log("createKitOption()");
var i=0;
DrInst="";
for (var i=0;i<16;i++) {
ArrPad[i] ="<select id=dPad"+i+" onChange='selDrum()'>\n";
}	

for (var j=0;j<127;j++){
STRINGINS=kitName[r];

DrInst+="<option value="+j+"> "+j+"  "+STRINGINS+"</option>\n";
STRINGINS="undefined";
}
optEnd="</select> \n";

for (var i=0;i<16;i++) {
bigString[i]=ArrPad[i]+DrInst+optEnd;
}
//console.log("bigString="+bigString[0]);
}

function createOptionList(){
console.log("createOptionList()");
var i=0;
DrInst="";
for (var i=0;i<16;i++) {
ArrPad[i] ="<select id=dPad"+i+" onChange='selDrum()'>\n";
}
for (var j=0;j<127;j++){
if(j==23){STRINGINS="BASS";}
if(j==26){STRINGINS="SNARE";}
if(j==25){STRINGINS="RIMSHOT";}
if(j==28){STRINGINS="SNARE 2";}
if(j==29){STRINGINS="TOM1";}
if(j==30){STRINGINS="TOM2";}
if(j==32){STRINGINS="TOM3";}
if(j==27){STRINGINS="HANDCLAP";}
if(j==36){STRINGINS="TAMBURINE";}
if(j==38){STRINGINS="COWBELL";}
if(j==57){STRINGINS="TIMBALE";}
if(j==45){STRINGINS="MARIMBA";}
DrInst+="<option value="+j+"> "+j+"  "+STRINGINS+"</option>\n";
STRINGINS="undefined";
}
optEnd="</select> \n";

for (var i=0;i<16;i++) {
bigString[i]=ArrPad[i]+DrInst+optEnd;
}
//console.log("bigString="+bigString[0]);
}

function initDrum(){
console.log("initDrum()");
createOptionList(); //Create the HTML strings for option list
writeOptionList();  //Write the HTML strings
setPads(); //SET STANDARD INSTRUMENT IN SELECT
selDrum(); // CONNECT INSTRUMENT TO PAD
newDrumVol(); //INITIATE ALL PAD VOLUMES
}

function writeOptionList(){
console.log("writeOptionList()");
document.getElementById("PAD0").innerHTML=bigString[0];
document.getElementById("PAD1").innerHTML=bigString[1];
document.getElementById("PAD2").innerHTML=bigString[2];
document.getElementById("PAD3").innerHTML=bigString[3];
document.getElementById("PAD4").innerHTML=bigString[4];
document.getElementById("PAD5").innerHTML=bigString[5];
document.getElementById("PAD6").innerHTML=bigString[6];
document.getElementById("PAD7").innerHTML=bigString[7];
document.getElementById("PAD8").innerHTML=bigString[8];
document.getElementById("PAD9").innerHTML=bigString[9];
document.getElementById("PAD10").innerHTML=bigString[10];
document.getElementById("PAD11").innerHTML=bigString[11];
document.getElementById("PAD12").innerHTML=bigString[12];
document.getElementById("PAD13").innerHTML=bigString[13];
document.getElementById("PAD14").innerHTML=bigString[14];
document.getElementById("PAD15").innerHTML=bigString[15];
}

function setPads(){
console.log("setPads()");
document.getElementById("dPad0").selectedIndex = "23";//BASS
document.getElementById("dPad1").selectedIndex = "26";//SNARE
document.getElementById("dPad2").selectedIndex = "25";//RIMSHOT
document.getElementById("dPad3").selectedIndex = "28";//SNARE 2
document.getElementById("dPad4").selectedIndex = "29";//TOM1
document.getElementById("dPad5").selectedIndex = "30";//TOM2
document.getElementById("dPad6").selectedIndex = "32";//TOM3
document.getElementById("dPad7").selectedIndex = "27";//HANDCLAP
document.getElementById("dPad8").selectedIndex = "36";//TAMBURINE
document.getElementById("dPad9").selectedIndex = "38";//COWBELL
document.getElementById("dPad10").selectedIndex = "57";//TIMBALES
document.getElementById("dPad11").selectedIndex = "45";//MARIMBA
}

function newDrumVol(){
console.log("newDrumVol()");
volumeDR[0]=+document.getElementById("vol0").value; 
volumeDR[1]=+document.getElementById("vol1").value; 
volumeDR[2]=+document.getElementById("vol2").value; 
volumeDR[3]=+document.getElementById("vol3").value; 
volumeDR[4]=+document.getElementById("vol4").value; 
volumeDR[5]=+document.getElementById("vol5").value; 
volumeDR[6]=+document.getElementById("vol6").value; 
volumeDR[7]=+document.getElementById("vol7").value; 
volumeDR[8]=+document.getElementById("vol8").value; 
volumeDR[9]=+document.getElementById("vol9").value; 
volumeDR[10]=+document.getElementById("volA").value; 
volumeDR[11]=+document.getElementById("volB").value; 
volumeDR[12]=+document.getElementById("volC").value; 
volumeDR[13]=+document.getElementById("volD").value; 
volumeDR[14]=+document.getElementById("volE").value; 
volumeDR[15]=+document.getElementById("volF").value; 
}

function selDrum(){
console.log("selDrum()");
DRUM0=document.getElementById('dPad0').value;
DRUM1=document.getElementById('dPad1').value;
DRUM2=document.getElementById('dPad2').value;
DRUM3=document.getElementById('dPad3').value;
DRUM4=document.getElementById('dPad4').value;
DRUM5=document.getElementById('dPad5').value;
DRUM6=document.getElementById('dPad6').value;
DRUM7=document.getElementById('dPad7').value;
DRUM8=document.getElementById('dPad8').value;
DRUM9=document.getElementById('dPad9').value;
DRUM10=document.getElementById('dPad10').value;
DRUM11=document.getElementById('dPad11').value;
DRUM12=document.getElementById('dPad12').value;
DRUM13=document.getElementById('dPad13').value;
DRUM14=document.getElementById('dPad14').value;
DRUM15=document.getElementById('dPad15').value;
}

function drumStop(X){
console.log("drumStop()");
if (X==48){X=DRUM0;stopNote(X);}
else if (X==49){X=DRUM1;stopNote(X);}
else if (X==50){X=DRUM2;stopNote(X);}
else if (X==51){X=DRUM3;stopNote(X);}
else if (X==52){X=DRUM4;stopNote(X);}
else if (X==53){X=DRUM5;stopNote(X);}
else if (X==54){X=DRUM6;stopNote(X);}
else if (X==55){X=DRUM7;stopNote(X);}
else if (X==56){X=DRUM8;stopNote(X);}
else if (X==57){X=DRUM9;stopNote(X);}
else if (X==65){X=DRUM10;stopNote(X);}
else if (X==66){X=DRUM11;stopNote(X);}
else if (X==67){X=DRUM12;stopNote(X);}
else if (X==68){X=DRUM13;stopNote(X);}
else if (X==69){X=DRUM14;stopNote(X);}
else if (X==70){X=DRUM15;stopNote(X);}
}

function drumNote(X,Y,Z){
console.log("drumNote()");
if (X==48){X=DRUM0;playNote(X,volumeDR[0],"DR");}
if (X==49){X=DRUM1;playNote(X,volumeDR[1],"DR");}
if (X==50){X=DRUM2;playNote(X,volumeDR[2],"DR");}
if (X==51){X=DRUM3;playNote(X,volumeDR[3],"DR");}
if (X==52){X=DRUM4;playNote(X,volumeDR[4],"DR");}
if (X==53){X=DRUM5;playNote(X,volumeDR[5],"DR");}
if (X==54){X=DRUM6;playNote(X,volumeDR[6],"DR");}
if (X==55){X=DRUM7;playNote(X,volumeDR[7],"DR");}
if (X==56){X=DRUM8;playNote(X,volumeDR[8],"DR");}
if (X==57){X=DRUM9;playNote(X,volumeDR[9],"DR");}
if (X==65){X=DRUM10;playNote(X,volumeDR[10],"DR");}
if (X==66){X=DRUM11;playNote(X,volumeDR[11],"DR");}
if (X==67){X=DRUM12;playNote(X,volumeDR[12],"DR");}
if (X==68){X=DRUM13;playNote(X,volumeDR[13],"DR");}
if (X==69){X=DRUM14;playNote(X,volumeDR[14],"DR");}
if (X==70){X=DRUM15;playNote(X,volumeDR[15],"DR");}
}



