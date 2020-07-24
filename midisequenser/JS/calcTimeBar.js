function timeSpannRec(){  
  console.log("timeSpannRec()");
  var sec = 60 / BPM;
  timePerBAR = (4 / 1 * sec) * 1000;
   //Calculate write out starttime endtime, "RECORDBAR"
  recStime = recSPos * timePerBAR;
  document.getElementById("recstart").value = recStime;
  recEtime = recEPos * timePerBAR;
  document.getElementById("recend").value = recEtime;
}

function timeSpannEdit(){
  console.log("timeSpannEdit()");
  var sec = 60 / BPM;
  timePerBAR = (4 / 1 * sec) * 1000;
  //Calculate write out starttime endtime, "EDITBAR"
  editStime = editSPos * timePerBAR;
  document.getElementById("EditStart").value = editStime;
  editEtime=editEPos * timePerBAR;
  document.getElementById("EditEnd").value = editEtime;	
}

function reCalcQNPM(BPM,PPQ){
	//console.log("BPM"+BPM);
	//QNPM "quarters note per minute
	QPM=BPM*PPQ;
	//QPS "quarters per second
	QPS=QPM/60;
}

function reCalcNotesTime(QPM){
	for (var i=1;i<maxtrack;i++){
		for (var j=0;j<	track[i].midiMess.length;j++){
			tickLength=track[i].eventTicks[j];
			//TickTime "length ms of a tick" 1/QPS
			track[i].midiMess[j].time=tickLength*(1/QPS);
		}
	}	
}

function getFormNoteTime() {
  //console.log("getFormNoteTime()");
  noteval=0;
  BPM=document.getElementById("bpm").value;
  var PPQ=document.getElementById("ppq").value;
  reCalcQNPM(BPM,PPQ);
  reCalcNotesTime(QPM);
  var sec = 1;
  sec = 60 / BPM;
  var e = document.getElementById("notevalue");
  var notevalue_selection = e.options[e.selectedIndex].value;
  //console.log(notevalue_selection);
  if (notevalue_selection == "4W") {
     noteval = .25;
  }
  if (notevalue_selection == "3W") {
     noteval = .3333333
  }
  if (notevalue_selection == "2W") {
     noteval = .5;
  }
  if (notevalue_selection == "1W") {
     noteval = 1;
  }
  if (notevalue_selection == "2") {
     noteval = 2;
  }
  if (notevalue_selection == "4") {
     noteval = 4;
  }
  if (notevalue_selection == "8") {
     noteval = 8;
  }
  if (notevalue_selection == "16") {
     noteval = 16;
  }
  if (notevalue_selection == "32") {
     noteval = 32;
  }
  if (notevalue_selection == "64") {
     noteval = 64;
  }
  //console.log();
  document.getElementById("delaytime").value = (4/ noteval * sec) * 1000;
  var dotindex = document.getElementById("dotnote");
  var dotnote_selection = dotindex.options[dotindex.selectedIndex].value;
  if (dotnote_selection == "YES") {
    document.getElementById("delaytime").value = document.getElementById("delaytime").value * 1.5;
  }
  renderMetTrack();
  setTimeout(initScrollBar, 100);
}
