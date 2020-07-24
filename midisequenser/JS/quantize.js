function renderQuantizeTrack(){
  track[222].midiMess.length=0;
  var qtype= document.getElementById("quanttype").value;	
  var qnote= document.getElementById("quantnote").value; 
  console.log(qnote);
  var saveMet=document.getElementById("notevalue").value;
  //p.stop();
  document.getElementById("notevalue").value=qnote; 
  getFormNoteTime();
  var qdelay = document.getElementById("delaytime").value;
  var qinterval = parseInt(qdelay);
  console.log(qinterval);
  var qTime=1
  var j=1;
  for(var i=0;i<60000;i++){
   if(j==qnote){j=1;}
   if (j==1) { metvol=127 } else { metvol=50}
    track[222].midiMess.push({
    time: qTime,
    data0: 153,
    data1: 80,
    data2: metvol
   });	
   j++;
   qTime = qTime + qinterval;	  
  }
  if (qtype=="Boundary Selection"){qBoundarySelection();	console.log("B sel");}
else if (qtype=="Selected Track"){ qTrackSelection();	console.log("T sel");}
else {console.log("what?");}
}

function qTrackSelection(){
	for (var i=0;i<track[activetrack].midiMess.length;i++){
		var j=0;var diffOne;var diffTwo;
		while(track[activetrack].midiMess[i].time>=track[222].midiMess[j].time){ j++;}
		console.log("active time="+track[activetrack].midiMess[i].time);
		console.log("active time="+track[222].midiMess[j].time);
		console.log("j="+j);
		diffOne=Math.abs(track[activetrack].midiMess[i].time-track[222].midiMess[j].time);
		diffTwo=Math.abs(track[activetrack].midiMess[i].time-track[222].midiMess[j-1].time);
		console.log("one="+diffOne+" two="+diffTwo);
		if (diffOne<diffTwo){track[activetrack].midiMess[i].time=track[222].midiMess[j].time;}
		else {track[activetrack].midiMess[i].time=track[222].midiMess[j-1].time}
			
	}
	initPiano();
	listTrSet();
}

function qBoundarySelection(){
	
        //Not fixed yet...	
	
		for (var i=0;i<track[activetrack].midiMess.length;i++){
		var j=0;var diffOne;var diffTwo;
		while(track[activetrack].midiMess[i].time>=track[222].midiMess[j].time){ j++;}
		console.log("active time="+track[activetrack].midiMess[i].time);
		console.log("active time="+track[222].midiMess[j].time);
		console.log("j="+j);
		diffOne=Math.abs(track[activetrack].midiMess[i].time-track[222].midiMess[j].time);
		diffTwo=Math.abs(track[activetrack].midiMess[i].time-track[222].midiMess[j-1].time);
		console.log("one="+diffOne+" two="+diffTwo);
		if (diffOne<diffTwo){track[activetrack].midiMess[i].time=track[222].midiMess[j].time;}
		else {track[activetrack].midiMess[i].time=track[222].midiMess[j-1].time}
			
	}
	initPiano();
}