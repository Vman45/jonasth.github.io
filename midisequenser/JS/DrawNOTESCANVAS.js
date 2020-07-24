var copy0=[];
var copy1=[];
var copy2=[];
var copyTime=[];
var pasteArray=[];
var	graphNotePosX= [];
var graphNotePosY= [];
var	graphNoteLength= [];
var	graphNoteHeight= [];
var	graphNoteEvent= [];

// FETCH VALUES WHERE TO DRAW
function drawAllNotes(){
 
  drawtrack=activetrack;	
  startPoint=50;
  endPoint=Mwidth;
  editSPos=document.getElementById("SB").value;
  editEPos=document.getElementById("EB").value;
  TimeSPos=document.getElementById("EditStart").value;
  TimeEPos=document.getElementById("EditEnd").value;
  notePlot();

}

// DRAWOUT NOTE ON MAIN CANVAS
function notePlot(){
	console.log("NOTEPLOT TRACK="+drawtrack+" midiMess length="+track[drawtrack].midiMess.length);
	var plotRightSide=0;var plotLeftSide=0;var x=0;var z=0;var i=0;
 	nbrOfEV = track[drawtrack].midiMess.length;
	while (x<nbrOfEV){
		if (track[drawtrack].midiMess[x].time>TimeSPos && track[drawtrack].midiMess[x].time<TimeEPos && track[drawtrack].midiMess[x].data0==NOTE_ON){ 
			distanceTotal=Mwidth-50;
			TimeTotal=TimeEPos-TimeSPos;
			TimeOnLeft=track[drawtrack].midiMess[x].time-TimeSPos;
			TimePerc=TimeOnLeft/TimeTotal;
			plotLeftSide=TimePerc*distanceTotal;
			z=x+1;
			while(z<nbrOfEV){
				if(track[drawtrack].midiMess[z].data1==track[drawtrack].midiMess[x].data1){
					TimeOnRight=TimeTotal-(TimeEPos-track[drawtrack].midiMess[z].time);
					TimePerc=TimeOnRight/TimeTotal;
					plotRightSide=TimePerc*distanceTotal;
					recLength=plotRightSide-plotLeftSide;
					keyNr=track[drawtrack].midiMess[x].data1;
					if (drawtrack==0){keyNr=70;}
					else {keyNr=parseInt(keyNr);}
					ctm.fillStyle = pcolor[keyNr];
					ctm.fillRect(50+plotLeftSide,(PistartX+keyHeight*88)-(keyHeight*(track[drawtrack].midiMess[x].data1-8)),recLength,keyHeight-1);
					//Saving the values of note graphic to array to compare with mouse
					graphNotePosX[i]=50+plotLeftSide;
					graphNotePosY[i]=(PistartX+keyHeight*88)-(keyHeight*(track[drawtrack].midiMess[x].data1-8));
					graphNoteLength[i]=recLength;
					graphNoteHeight[i]=keyHeight-1;
					graphNoteEvent[i]=x;
					i++;
					break;
				}
			z++;
			}	
		}
	x++;
   }
   nbrOfEV=0;
}