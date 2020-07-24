//"UPDATE INSERT DELETE" SELECTED EVENT
function noteDelete() {
  console.log("noteDelete()");
  if (track[editTrack].midiMess[trackEvent].data0>143 && track[editTrack].midiMess[trackEvent].data0<160 && track[editTrack].midiMess != undefined && track[editTrack].midiMess.length >= 0) {
	track[editTrack].midiMess.splice(trackEvent, 1);
    track[editTrack].midiMess.splice(stopEvent-1, 1);
    drawTrackX(editTrack, trackEvent);
  }
  document.getElementById("chosenEvent").value=trackEvent;
  compareNote=track[editTrack].midiMess[trackEvent].data0;
  compareNote=parseInt(compareNote);
  //alert(compareNote);
  while(compareNote<144 && compareNote>160){
	  alert("inside");
	  trackEvent++;
	  compareNote=track[editTrack].midiMess[trackEvent].data0;
  } 
  //console.log(track[editTrack].midiMess.length);
}

function prgDelete() {
  console.log("prgDelete()");
  if (track[editTrack].midiMess[trackEvent].data0>191 && track[editTrack].midiMess[trackEvent].data0<208 && track[editTrack].midiMess != undefined && track[editTrack].midiMess.length >-1) {
    track[editTrack].midiMess.splice(trackEvent, 1);
    drawTrackX(editTrack, trackEvent);
  }
  document.getElementById("chosenEvent").value=trackEvent;
}

function CCDelete() {
  console.log("CCDelete()");
  if (track[editTrack].midiMess[trackEvent].data0==176 && track[editTrack].midiMess != undefined && track[editTrack].midiMess.length >= 0) {
    track[editTrack].midiMess.splice(trackEvent, 1);
    drawTrackX(editTrack, trackEvent);
  }
  document.getElementById("chosenEvent").value=trackEvent;
}

function noteInsert() {
  console.log("noteInsert()");
  if (track[editTrack].midiMess != undefined) {
    var insnote = parseInt(document.getElementById("NOTEVAL").value);
    var instime = parseInt(document.getElementById("NOTESTART").value);
    var insvel = parseInt(document.getElementById("NOTEVEL").value);
	var instimeEND = parseInt(document.getElementById("NOTEEND").value);
    track[activetrack].midiMess.splice(trackEvent, 0, {
      time: instime,
      data0: 143+editTrack,
      data1: insnote,
      data2: insvel
    });
	track[activetrack].midiMess.splice(trackEvent, 0, {
      time: instimeEND,
      data0: 127+editTrack,
      data1: insnote,
    });
	track[editTrack].midiMess.sort(dynamicSort("time"));
    drawTrackX(editTrack, 0);
  }
  initPiano();
}

function prgInsert() {
  console.log("noteInsert()");
    editTrack=parseInt(editTrack);
	document.getElementById("PRGMESS").value=191+editTrack;
    var prgtime = parseInt(document.getElementById("PRGTIME").value);
    var program = parseInt(document.getElementById("PRGNR").value);
	if (track[editTrack].midiMess != undefined) {
		track[activetrack].midiMess.splice(trackEvent, 0, {
		time: prgtime,
			data0: 191+editTrack,
			data1: program,
		});
	track[editTrack].midiMess.sort(dynamicSort("time"));
    drawTrackX(editTrack, 0);
  }
  initPiano();
}

function CCInsert() {
  console.log("noteInsert()");
  editTrack=parseInt(editTrack);
  var CCtype = parseInt(document.getElementById("CCTYPE").value);
  var CCtime = parseInt(document.getElementById("CCTIME").value);
  var CCval = parseInt(document.getElementById("CCAMOUNT").value);
  if (track[editTrack].midiMess != undefined) {
	track[activetrack].midiMess.splice(trackEvent, 0, {
      time: CCtime,
      data0: 175+editTrack,
      data1: CCtype,
      data2: CCval
    });
	track[editTrack].midiMess.sort(dynamicSort("time"));
    drawTrackX(editTrack, 0);
  }
  initPiano();
}

function onUpdate() {
  console.log("onUpdate()");
  editTrack=parseInt(editTrack);
  if (track[editTrack].midiMess != undefined) {
    var insnote = parseInt(document.getElementById("NOTEVAL").value);
    var instime = parseFloat(document.getElementById("NOTESTART").value);
    var insvel = parseInt(document.getElementById("NOTEVEL").value);
    track[activetrack].midiMess[trackEvent]={
      time: instime,
      data0: 143+editTrack,
      data1: insnote,
      data2: insvel
    };
	track[editTrack].midiMess.sort(dynamicSort("time"));
    drawTrackX(editTrack, trackEvent);
  }
}

function offUpdate() {
  console.log("offUpdate()");
  editTrack=parseInt(editTrack);
  if (track[editTrack].midiMess != undefined) {
    var insnote = parseInt(document.getElementById("NOTEVAL").value);
    var insvel = parseInt(document.getElementById("NOTEVEL").value);
	var instimeEND = parseFloat(document.getElementById("NOTEEND").value);
  	track[activetrack].midiMess[stopEvent]={
			time: instimeEND,
			data0: 127+editTrack,
			data1: insnote,
	};
	track[editTrack].midiMess.sort(dynamicSort("time"));
    drawTrackX(editTrack, trackEvent);
  }
}

function OffPlus(){
	var eTimeMS=document.getElementById("NOTEEND").value;
	var addMS=document.getElementById("moveMS").value;
	addMS=parseFloat(addMS);
	eTimeMS=parseFloat(eTimeMS);
	eTimeMS=eTimeMS+addMS;
	document.getElementById("NOTEEND").value=eTimeMS;
	offUpdate();
}

function OnPlus(){
	var eTimeMS=document.getElementById("NOTEEND").value;
	var sTimeMS=document.getElementById("NOTESTART").value;
	var addMS=document.getElementById("moveMS").value;
	addMS=parseFloat(addMS);
	sTimeMS=parseFloat(sTimeMS);
	eTimeMS=parseFloat(eTimeMS);
	sTimeMS=sTimeMS+addMS;
	document.getElementById("NOTESTART").value=sTimeMS;
	if(sTimeMS>track[editTrack].midiMess[trackEvent+1].time && sTimeMS<eTimeMS) {trackEvent++; }
	onUpdate();
	if(eTimeMS<sTimeMS){
	  eTimeMS=sTimeMS+10;
	  document.getElementById("NOTEEND").value=eTimeMS;
	  offUpdate();
	}
}

function OffMinus(){
	var sTimeMS=document.getElementById("NOTESTART").value;
	sTimeMS=parseFloat(sTimeMS);
	var eTimeMS=document.getElementById("NOTEEND").value;
	var subMS=document.getElementById("moveMS").value;
	subMS=parseFloat(subMS);
	eTimeMS=parseFloat(eTimeMS);
	eTimeMS=eTimeMS-subMS;
	document.getElementById("NOTEEND").value=eTimeMS;
	offUpdate();
	if(eTimeMS<sTimeMS){
	  sTimeMS=eTimeMS-1;
	  document.getElementById("NOTESTART").value=sTimeMS;
	  onUpdate();
	}
}

function OnMinus(){
	var sTimeMS=document.getElementById("NOTESTART").value;
	var subMS=document.getElementById("moveMS").value;
	subMS=parseFloat(subMS);
	sTimeMS=parseFloat(sTimeMS);
	sTimeMS=sTimeMS-subMS;
	document.getElementById("NOTESTART").value=sTimeMS;
	onUpdate();
}