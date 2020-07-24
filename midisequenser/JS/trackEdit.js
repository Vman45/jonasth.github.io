trackEvent = 0;
editTrack = 1;
duration = 0;

function fetchFormValues(){
	//Fetch NOTE NAME AND List option
	if(track[editTrack].midiMess.length>0){
		listchoice = document.getElementById("listselect").value;
		formTypeFetch();	
	}
}

function formTypeFetch(){
	if(track[editTrack].midiMess[trackEvent].data0>127 && track[editTrack].midiMess[trackEvent].data0<161) {
			document.getElementById("CCTYPE").value ="";
			document.getElementById("CCAMOUNT").value ="";
			document.getElementById("CCTIME").value = "";
			document.getElementById("PRGMESS").value = "";
			document.getElementById("PRGNR").value = "";
			document.getElementById("PRGTIME").value = "";
			document.getElementById("EVTYPE").value ="";
			notenumber=track[editTrack].midiMess[trackEvent].data1;
			note = getNote(notenumber);
			formNoteEvent(editTrack, trackEvent, note); 
	} else if (track[editTrack].midiMess[trackEvent].data0>191 && track[editTrack].midiMess[trackEvent].data0<207){
		    document.getElementById("NOTEVAL").value = "";
			document.getElementById("NOTE").value = "";
			document.getElementById("NOTESTART").value = "";
			document.getElementById("NOTEEND").value = "";
			document.getElementById("test").value = "";
			document.getElementById("NOTEVEL").value = "";
		    document.getElementById("CCTYPE").value ="";
			document.getElementById("CCAMOUNT").value ="";
			document.getElementById("CCTIME").value = "";
			document.getElementById("EVTYPE").value ="";
			formProgramEvent(); 
	} else { 
			document.getElementById("NOTEVAL").value = "";
			document.getElementById("NOTE").value = "";
			document.getElementById("NOTESTART").value = "";
			document.getElementById("NOTEEND").value = "";
			document.getElementById("test").value = "";
			document.getElementById("NOTEVEL").value = "";
			document.getElementById("PRGMESS").value = "";
			document.getElementById("PRGNR").value = "";
			document.getElementById("PRGTIME").value = "";
			document.getElementById("EVTYPE").value ="";
			formCCevent();
	}
	getEventName();
}

function formCCevent(){
  console.log("editCCEvent()");
  document.getElementById("CCTYPE").value = track[editTrack].midiMess[trackEvent].data1;
  document.getElementById("CCAMOUNT").value = track[editTrack].midiMess[trackEvent].data2;
  document.getElementById("CCTIME").value = track[editTrack].midiMess[trackEvent].time;
}

function formProgramEvent(){
  console.log("editProgramEvent()");
  document.getElementById("PRGMESS").value = track[editTrack].midiMess[trackEvent].data0;
  document.getElementById("PRGNR").value = track[editTrack].midiMess[trackEvent].data1;
  document.getElementById("PRGTIME").value = track[editTrack].midiMess[trackEvent].time;
	
}

function formNoteEvent(editTrack, i, note) {
  console.log("editEvent()");
  console.log("Track "+editTrack+" Event "+i+" Note"+note);
  findNoteOff();
  document.getElementById("NOTEVAL").value = notenumber;
  document.getElementById("NOTE").value = note;
  document.getElementById("NOTESTART").value = track[editTrack].midiMess[i].time;
  document.getElementById("test").value = duration;
  document.getElementById("NOTEVEL").value = track[editTrack].midiMess[i].data2;
}

function getEventName(){
var d0=track[editTrack].midiMess[trackEvent].data0;
var d1=track[editTrack].midiMess[trackEvent].data1;
var d2=track[editTrack].midiMess[trackEvent].data2;
var t0=track[editTrack].midiMess[trackEvent].time;
eventName="";	

if (d0 > 143 && d0 < 160) {document.getElementById("EVTYPE").value = "NOTE ON"; }
else if (d0 > 127 && d0 < 144) {document.getElementById("EVTYPE").value = "NOTE OFF"; }	
else if (d0 == "224" && listchoice=="all") {document.getElementById("EVTYPE").value = "PITCHBEND"; }
else if (d0 > "175" && d0<"192" && d1=="1") {document.getElementById("EVTYPE").value = "MODULATION"; }	
else if (d0 > "175" && d0<"192" && d1=="7") {document.getElementById("EVTYPE").value = "VOLUME"; }	
else if (d0 > "175" && d0<"192" && d1=="10") {document.getElementById("EVTYPE").value = "PAN"; }	
else if (d0 > "175" && d0<"192" && d1=="91") {document.getElementById("EVTYPE").value = "REVERB"; }	
else if (d0 > "175" && d0<"192" && d1=="93"){document.getElementById("EVTYPE").value = "CHORUS"; }		
else if (d0 > "175" && d0<"192" && d1=="64") {document.getElementById("EVTYPE").value = "SUSTAIN"; }	
else if (d0 > "191" && d0 < "208") {document.getElementById("EVTYPE").value = "PROGRAM"; }	
else if (d0 > "175" && d0<"192") {document.getElementById("EVTYPE").value = "OTHER CC"; }	
else {document.getElementById("EVTYPE").value = "WHAT THE FUCK"; }
}

//SELECT EVENT TO EDIT 
function eventPlus() {
	console.log("eventPlus() ");
	eventMinMax();
	console.log("onOffMin="+onOffMin+" onOffMax="+onOffMax+" trackEvent="+trackEvent);
	if (trackEvent>=allMin-1 && trackEvent<=allMax && listchoice=="all") {
		trackEvent++;
		if (trackEvent>=allMin && trackEvent<=allMax) {
		while ( trackEvent < track[editTrack].midiMess.length-1 && track[editTrack].midiMess[trackEvent].data0 > "127" &&	track[editTrack].midiMess[trackEvent].data0 <"144") {
			trackEvent++;
			console.log(trackEvent);
		}
			document.getElementById("chosenEvent").value = trackEvent;
			drawTrackX(editTrack, trackEvent);
		}
		
	} else if ((trackEvent>=onOffMin-1 && trackEvent<=onOffMax) && (listchoice=="on" || listchoice=="on/off")){
		trackEvent++;
		if (trackEvent>=onOffMin && trackEvent<=onOffMax) {
		while (track[editTrack].midiMess[trackEvent].data0 < "144" || track[editTrack].midiMess[trackEvent].data0 > "159") 
		{
			trackEvent++;
			console.log(trackEvent);
		}
			document.getElementById("chosenEvent").value = trackEvent;
			drawTrackX(editTrack, trackEvent);
		}
		
	} else if (trackEvent>=ccMin-1 && trackEvent<=ccMax && listchoice=="cc") {
	    trackEvent++;
		if (trackEvent>=ccMin && trackEvent<=ccMax) {
		while (trackEvent < track[editTrack].midiMess.length && track[editTrack].midiMess[trackEvent].data0 > "127" &&	track[editTrack].midiMess[trackEvent].data0 <"159")
		{
			trackEvent++;
			console.log(trackEvent);
		}
			document.getElementById("chosenEvent").value = trackEvent;
			drawTrackX(editTrack, trackEvent);
			console.log("max="+ccMax+" min="+ccMin);
		} 
	}
}

function eventMinus() {
	console.log("eventMinus() ");
	eventMinMax();
	if (trackEvent > 0 && track[editTrack].midiMess.length > -1 && listchoice=="all") {
    trackEvent--;
		while (trackEvent < track[editTrack].midiMess.length && track[editTrack].midiMess[trackEvent].data0	 == "128") {
			trackEvent--;
			console.log(trackEvent);
		}
		if (trackEvent > 0 && track[editTrack].midiMess.length > -1) {
			document.getElementById("chosenEvent").value = trackEvent;
			drawTrackX(editTrack, trackEvent);
		}
	
	} else if ((trackEvent>=onOffMin && trackEvent<=onOffMax+1) && (listchoice=="on" || listchoice=="on/off")) {
		trackEvent--;
		if (trackEvent>=onOffMin && trackEvent<=onOffMax) {
		while (track[editTrack].midiMess[trackEvent].data0 < "144" || track[editTrack].midiMess[trackEvent].data0 > "159") 
		{
			trackEvent--;
			console.log(trackEvent);
		}
			document.getElementById("chosenEvent").value = trackEvent;
			drawTrackX(editTrack, trackEvent);
		}
  
	} else if (trackEvent>=ccMin && trackEvent<=ccMax+1 && listchoice=="cc") {
	    trackEvent--;
		if (trackEvent>=ccMin && trackEvent<=ccMax) {
			while (trackEvent < track[editTrack].midiMess.length && track[editTrack].midiMess[trackEvent].data0 > "127" &&	track[editTrack].midiMess[trackEvent].data0 <"159")
			{
				trackEvent--;
				console.log(trackEvent);
			}
			document.getElementById("chosenEvent").value = trackEvent;
			drawTrackX(editTrack, trackEvent);
			console.log("max="+ccMax+" min="+ccMin);
		} 
	}
}

function selectEvent() {
  console.log("selectEvent() ");
  editTrack = parseInt(document.getElementById("trackListed").value);
  trackEvent = parseInt(document.getElementById("chosenEvent").value);
  drawTrackX(editTrack, trackEvent);
}

function listChange(){
	console.log("was changing");
	allMin=0;allMax=0;onOffMin=0;onOffMax=0;
	if (listchoice=="on/off" || listchoice=="on"){document.getElementById("chosenEvent").value=onOffMin;}
	else if (listchoice=="cc"){document.getElementById("chosenEvent").value=ccMin;}
	else if (listchoice=="all"){document.getElementById("chosenEvent").value=allMin;}
}

function eventMinMax(){
    allMin=0;allMax=0;onOffMin=0;onOffMax=0;
	var onOff=false; var cc=false;var all=false;
	console.log("listchoice="+listchoice);
	for (var j=0;j<track[editTrack].midiMess.length;j++){
		if (track[editTrack].midiMess[j].data0 > "143" && track[editTrack].midiMess[j].data0 < "159"){
			if(onOff==false){onOffMin=j;onOff=true;}
			onOffMax=j;
		}
		if( track[editTrack].midiMess[j].data0 < "127" || track[editTrack].midiMess[j].data0 >"143"){
			
			if(all==false){allMin=j;all=true;}
			allMax=j;
		}
		if ((track[editTrack].midiMess[j].data0 > "175" && track[editTrack].midiMess[j].data0 <"208")||(track[editTrack].midiMess[j].data0=="224")) {
			if(cc==false){ccMin=j;cc=true;}
			ccMax=j;
		}
	}
	if ((listchoice=="on/off" || listchoice=="on") && trackEvent<onOffMin){trackEvent=onOffMin;} 
	else if ((listchoice=="on/off" || listchoice=="on") && trackEvent>onOffMax){trackEvent=onOffMax;} 
	else if (listchoice=="cc" && trackEvent<ccMin){trackEvent=ccMin;} 
	else if (listchoice=="cc" && trackEvent>ccMax){trackEvent=ccMax;} 
	else if (listchoice=="all" && trackEvent<allMin){trackEvent=allMin; console.log("trackEvent AA"+trackEvent);} 
	else if (listchoice=="all" && trackEvent>allMax){trackEvent=allMax;} 
}

function findNoteOff(){
	stopEvent=trackEvent+1;
	 while (track[editTrack].midiMess[stopEvent].data1!=track[editTrack].midiMess[trackEvent].data1){
        stopEvent++;
    }
	stopNT=track[editTrack].midiMess[stopEvent].time;
	//alert(stopNT);
	startNT=track[editTrack].midiMess[trackEvent].time;
	//alert(startNT);
	duration=stopNT-startNT;
	//alert(ABC);
	document.getElementById("test").value=duration;
	document.getElementById("NOTEEND").value = track[editTrack].midiMess[stopEvent].time;
}

