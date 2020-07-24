// **************IMPORTANT DO NOT REMOVE********************
//Tracks must be BUILT/MIXDOWN just before recording because the "interval" dependency to playup range
//So i do it just before recording and **also** playup
//We need ***create*** boundary variables for both playup and recording lengths easier to separate in code
//got pretty confused for a while....

function buildPlayTrack(){
	console.log("buildPlayTrack()");
	if (mode=="Play"){ createPlayupRange();}
	else { createRecRange();} 
	playtrack=0;
}

function createPlayupRange(){
	console.log("getPlayupRange()");
	playmidi = true;
	downMixALLEventList();
	PlaylistGen();
}

function createRecRange(){
	console.log("getRecRange()");
	rs = document.getElementById("recstart").value;
	rs = parseInt(rs);
	recEnd = document.getElementById("recend").value;
	re = parseInt(recEnd);
	playmidi = true;
	//Save active track
	//activeTrack = rectrack;
	downMixALLEventList();
	//Setting back active track
	//rectrack = activeTrack;
	ReclistGen();
}

function downMixALLEventList() {
	lastNote=0;	
	console.log("downMixALLEventList()");
	track[0].midiMess.length = 0;
	//Check if soloplay or downmix trax
	if (solo==true){
		copyToTrackZero(activetrack);
	}else {
		for (var j = 1; j <= maxtrack; j++) { 	
			copyToTrackZero(j);
		}
	}
	//Find last note to play	
	if (track[0].midiMess.length>0){
		lastNote=track[0].midiMess.length;
		console.log("lastNote="+lastNote);
		endNoteTime=track[0].midiMess[lastNote-1].time;
	}
	metstate=document.getElementById("metSet").checked;
	//At initial "mentronome creation" the mode will be "Listen"
	if(mode=="Record" || mode=="Listen"){ copyToTrackZero(777);}
	track[0].midiMess.sort(dynamicSort("time"));
	console.log("LastNote="+lastNote);


}

function copyToTrackZero(z) {
	console.log("copyToTrackZero() "+z);
	//alert("mode="+mode+"trackNumber="+z+" number of messages="+track[z].midiMess.length);
	//You need special case for record because otherwise copy "all metronome notes" slow........
	//DO NOT TOUCH!!!!
	for (var k = 0; k < track[z].midiMess.length; k++) {
			 if (mode=="Play"){
				
				track[0].midiMess[track[0].midiMess.length] = track[z].midiMess[k];	
		} else {	
			if (track[z].midiMess[k].time>=rs &&  track[z].midiMess[k].time<re){
				track[0].midiMess[track[0].midiMess.length] = track[z].midiMess[k];
			} 
		}
	}
}

PLAYSTART=0;PLAYEND=0;
function PlaylistGen() {
	console.log("PlaylistGen()");
	playEv = new Array();
	if (track[0].midiMess===undefined || track[0].midiMess.length == 0) {} 
	else { 
	    //Later replace ps with cursor position
	    PLAYSTART=0;
		//Finding last note to play, 
		LPNote=track[0].midiMess.length;
		PLAYEND=track[0].midiMess[LPNote-1].time;
   		console.log("mixdown PLAY EVENTS");
		for (var i = 0; i < track[0].midiMess.length; i++) {
		    // console.log("PLAY EvTime="+track[0].midiMess[i].time+" RecStart"+rs+" RecEnd"+re);
			if (i > 0) {
				playEv[i] = track[0].midiMess[i].time - track[0].midiMess[i - 1].time;
				//console.log(playEv[i]);
			} else {
				playEv[0] = track[0].midiMess[i].time-PLAYSTART;
				//console.log(playEv[i]);
				
			}
		}
	} 
	
}
  
function ReclistGen() {
	console.log("ReclistGen()");
	console.log("Rec Start="+rs+" Rec End="+re);
	recEv = new Array();
	if (track[0].midiMess===undefined || track[0].midiMess.length == 0) {} 
	else { 
		//Generate waitlist PLAYUP
		console.log("mixdown PLAY EVENTS");
		for (var i = 0; i < track[0].midiMess.length; i++) {
			console.log("Rec EvTime="+track[0].midiMess[i].time+" RecStart"+rs+" RecEnd"+re);
			if (i > 0) {
				recEv[i] = track[0].midiMess[i].time - track[0].midiMess[i - 1].time;
			} else {
				recEv[0] = track[0].midiMess[i].time-rs;
			}
		}
	} 
}

function dynamicSort(property) {
	console.log("dynamicSort()");
	var sortOrder = 1;
	if (property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function(a, b) {
		var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	}
}
