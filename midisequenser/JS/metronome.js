function renderMetTrack(){
  console.log("renderMetTrack()");
  fetched = document.getElementById("delaytime").value;
  interval = parseInt(fetched);
  currentTime=1
  var j=1;
  track[777].midiMess.length=0;
  for(var i=0;i<60000;i++){
   if(j==noteval+1){j=1;}
   if (j==1) { metvol=127 } else { metvol=50}
    track[777].midiMess.push({
    time: currentTime,
    data0: 153,
    data1: 77,
    data2: metvol
   });	
   j++;
   currentTime = currentTime + interval;	  
  }
 }
 
 function metToUse(){
metselect = metvalue.options[metvalue.selectedIndex].text;
if (metselect=="SF2") { metcall=SF2met; document.getElementById('synthval').selectedIndex = '0';} 
 else if (metselect=="SC7(GM)") { metcall=SC7met;}
 else if (metselect=="N364") { metcall=N364met;}	
}

function metronomeInit(){
  console.log("metronomeInit()");
  fetched = document.getElementById("delaytime").value;
  interval = parseInt(fetched);
}

function N364met(metvol){
	 PORTout.send([153, 80, metvol]);
	 PORTout.send([153, 80,0]);
}

function SC7met(metvol){
    PORTout.send([153, 80, metvol]);
	PORTout.send([153, 80,0]);
}

function SF2met(metvol){
	synth.NoteOn(153,77,metvol);synth.NoteOff(153,77);
}






