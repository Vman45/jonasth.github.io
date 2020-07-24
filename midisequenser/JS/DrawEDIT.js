var x=15;
var y=54; 

//EDITOR TEXTVALUES
function initEditorCanvas()  {
  console.log("initEditorCanvas()");
  var canvas = document.getElementById("editorCanvas");
  ctr = canvas.getContext("2d");
  get_Edcanvas_res();
  set_Edcanvas_res();
  ctr.fillStyle = "black";
  ctr.fillRect(0, 0, Rwidth, Rheight);
  trackCanvasDraw();

}

function get_Edcanvas_res() {
  console.log("get_Edcanvas_res()");
  Rsize = document.getElementById('editorId');
  Rwidth =437;
  Rheight = 320;
  //Rwidth = Rsize.offsetWidth;
 // Rheight = Rsize.offsetHeight;
}

function set_Edcanvas_res() {
  console.log("set_Edcanvas_res()");
  document.getElementById('editorCanvas').width = Rwidth;
  document.getElementById('editorCanvas').height = Rheight;
}

function trackCanvasDraw() {
  console.log("trackCanvasDraw()");
  currTrack=activetrack;
  ctr.fillStyle = "black";
  ctr.fillRect(0, 0, Rwidth, Rheight);
  ctr.font = "13pt sans-serif";
  ctr.fillStyle = "WHITE";
  ctr.fillText("TRACK " + editTrack+" EDIT", 10, 21);
  ctr.fillStyle = "purple";
  ctr.fillRect(0, y - 17, Rwidth , 22);
}

function listTrackEvents(eventList, trX, trY,Evcolor) {
  // console.log("listTrackEvents()");
  ctr.font = "13px sans-serif";
  ctr.fillStyle = Evcolor;
  ctr.fillText(eventList, trX, trY);
}

//LIST TRACK CONTENT
function drawTrackX(editTrack, trackEvent) {
  console.log("listTrackX() "+editTrack);
  fetchFormValues();
  x=15; y=54;
  trackCanvasDraw();
  //DO ONLY IF EVENTS ON TRACK
  if(track[editTrack].midiMess.length>0){
	//LIST ALL NOTES
	for (var i = trackEvent; i < track[editTrack].midiMess.length; i++) {
         var d0=track[editTrack].midiMess[i].data0;
		 var d1=track[editTrack].midiMess[i].data1;
		 var d2=track[editTrack].midiMess[i].data2;
		 var t0=track[editTrack].midiMess[i].time;
		eventlist = "";
		if (d0 >143 && d0 < 160 && listchoice=="on") {listNoteOn(i,d0,d1,d2,t0); }
		else if (d0 > 143 && d0 < 160 && listchoice=="on/off") {listNoteOn(i,d0,d1,d2,t0);} 
		else if (d0 > 127 && d0 < 144 && listchoice=="on/off") {listNoteOff(i,d0,d1,d2,t0);} 
		else if (d0 > 143 && d0 < 160 && listchoice=="all") {listNoteOn(i,d0,d1,d2,t0);} 
		else if (d0 > 127 && d0 < 144 && listchoice=="all") {listNoteOff(i,d0,d1,d2,t0); }
		else if (d0 > "223" && d0<"240" && listchoice=="all") {listPitchBend(i,d0,d1,d2,t0);}
		else if (d0 > "175" && d0<"192" && d1=="1" && listchoice=="all") {listModulation(i,d0,d1,d2,t0);}
		else if (d0 > "175" && d0<"192" && d1=="7" && listchoice=="all") {listVolume(i,d0,d1,d2,t0);}
		else if (d0 > "175" && d0<"192" && d1=="10" && listchoice=="all") {listPan(i,d0,d1,d2,t0); }
		else if (d0 > "175" && d0<"192" && d1=="91" && listchoice=="all") {listReverb(i,d0,d1,d2,t0); }
		else if (d0 > "175" && d0<"192" && d1=="93" && listchoice=="all") {listChorus(i,d0,d1,d2,t0); }
		else if (d0 > "175" && d0<"192" && d1=="64" && listchoice=="all") {listSustain(i,d0,d1,d2,t0); }
		else if (d0 > "175" && d0<"192" && listchoice=="all"){listOther(i,d0,d1,d2,t0);}
		else if (d0 > "191" && d0<"208" && listchoice=="all") {listProgramCh(i,d0,d1,d2,t0); }
		else if (d0 > "223" && d0<"240" && listchoice=="cc") {listPitchBend(i,d0,d1,d2,t0); }
		else if (d0 > "175" && d0<"192" && d1=="1" && listchoice=="cc") {listModulation(i,d0,d1,d2,t0); }
		else if (d0 > "175" && d0<"192" && d1=="7" && listchoice=="cc") {listVolume(i,d0,d1,d2,t0); }
		else if (d0 > "175" && d0<"192" && d1=="10" && listchoice=="cc") {listPan(i,d0,d1,d2,t0); }
		else if (d0 > "175" && d0<"192" && d1=="91" && listchoice=="cc") {listReverb(i,d0,d1,d2,t0); }
		else if (d0 > "175" && d0<"192" && d1=="93" && listchoice=="cc") {listChorus(i,d0,d1,d2,t0); }
		else if (d0 > "175" && d0<"192" && d1=="64" && listchoice=="cc") {listSustain(i,d0,d1,d2,t0); }
		else if (d0 > "191" && d0 < "208" && listchoice=="cc") {listProgramCh(i,d0,d1,d2,t0); }
		else if (d0 > "175" && d0<"192" && listchoice=="cc"){listOther(i,d0,d1,d2,t0);}
		else if (listchoice=="cc" && (d0<128 || d0>159)){ wtf(i,d0,d1,d2,t0);}
	}
  }
}

//IDENTIFY DRAW MESSAGE TYPE SELECTED MIDI EVENTS
function listNoteOn(i,d0,d1,d2,t0){
  //console.log("listNoteOn()");
  notenumber = d1;
  note = getNote(notenumber);
  duration = t0 - t0;
  currTrack=d0-143;
  eventlist +="Event."+i + "  time=" + t0.toFixed(3)+" NOTE ON " + note + "  Velocity " + d2+" CH="+currTrack;
  listTrackEvents(eventlist, x, y,"white");
  y = y + 18;
}

function listNoteOff(i,d0,d1,d2,t0){
   notenumber = d1;
   note = getNote(notenumber);
   currTrack=d0-127;
   eventlist +="Event."+i + "  time=" + t0.toFixed(3)+" NOTE OFF " + note +" CH="+currTrack;
   listTrackEvents(eventlist, x, y,"orange");
   y = y + 18;
}

function listPitchBend(i,d0,d1,d2,t0){
  currTrack=d0-191;
  eventlist +="Ev="+i+" DATA0="+d0+" time="+t0.toFixed(3)+" PITCHBEND Value="+d1+ "  time="+t0.toFixed(3)+" CH="+currTrack;
  listTrackEvents(eventlist, x, y,"cyan");
  y = y + 18;
}

function listProgramCh(i,d0,d1,d2,t0){
  currTrack=d0-191;	
  eventlist +="Ev="+i+" DATA0="+d0+"  time="+t0.toFixed(3)+" PROGRAM NR="+d1+" CH="+currTrack;
  listTrackEvents	(eventlist, x, y,"yellow");
  y = y + 18;
}

function listModulation(i,d0,d1,d2,t0){
	  currTrack=d0-175;
	  eventlist +="Ev="+i+ " DATA0="+d0+"  time="+t0.toFixed(3)+" MODULATION"+" CC="+d1+" AMOUNT="+d2+" CH="+currTrack;
	  listTrackEvents	(eventlist, x, y,"lightcoral");
	  y = y + 18;
}

function listVolume(i,d0,d1,d2,t0){
	  currTrack=d0-175;
	  eventlist +="Ev="+i+ " DATA0="+d0+"  time="+t0.toFixed(3)+" VOL"+" CC="+d1+" AMOUNT="+d2+" CH="+currTrack;
	  listTrackEvents	(eventlist, x, y,"lightgreen");
	  y = y + 18;
}

function listReverb(i,d0,d1,d2,t0){
	  currTrack=d0-175;
	  eventlist +="Ev="+i+" DATA0="+d0+ "  time="+t0.toFixed(3)+" REV"+" CC="+d1+" AMOUNT="+d2+" CH="+currTrack;
	  listTrackEvents	(eventlist, x, y,"lightgreen");
	  y = y + 18;
}

function listChorus(i,d0,d1,d2,t0){
	  currTrack=d0-175;
	  eventlist +="Ev="+i+ " DATA0="+d0+"  time="+t0.toFixed(3)+" CHORUS"+" CC="+d1+" AMOUNT="+d2+" CH="+currTrack;
	  listTrackEvents	(eventlist, x, y,"lightgreen");
	  y = y + 18;
}

function listSustain(i,d0,d1,d2,t0){
	currTrack=d0-175;
	eventlist +="Ev="+i+" DATA0="+d0+"  time="+t0.toFixed(3)+" SUSTAIN"+" CC="+d1+" AMOUNT="+d2+" CH="+currTrack;
	listTrackEvents	(eventlist, x, y,"lightgreen");
	y = y + 18;
}

function listPan(i,d0,d1,d2,t0){
	currTrack=d0-175;
	eventlist +="Ev="+i+" DATA0="+d0+ "  time="+t0.toFixed(3)+" PAN"+" CC="+d1+" AMOUNT="+d2+" CH="+currTrack;
	listTrackEvents	(eventlist, x, y,"lightgreen");
	y = y + 18;
}

function listOther(i,d0,d1,d2,t0){
  currTrack=d0-175;
  eventlist +="Ev="+i+" DATA0="+d0+"  time="+t0.toFixed(3)+" Other"+" CC="+d1+" AMOUNT="+d2+" CH="+currTrack;
  listTrackEvents	(eventlist, x, y,"#ff80ff");
  y = y + 18;
}

function wtf(i,d0,d1,d2,t0){
  eventlist +="Ev="+i+" DATA0="+d0+"  time="+t0.toFixed(3)+" WTF data0 "+d0+" data1 "+d1+" data2 "+d2;
  listTrackEvents	(eventlist, x, y,"red");
  y = y + 18;
	
}
