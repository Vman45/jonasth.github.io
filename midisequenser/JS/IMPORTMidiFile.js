function parseInfo(){
	impPPQStart=myChannels[0].indexOf('"ppq": ')+7;
	impPPQEnd=myChannels[0].indexOf('"tempos":');
	impPPQ=myChannels[0].substring(impPPQStart,impPPQEnd);
	impPPQ=impPPQ.replace(",",""); 
	impPPQ=parseInt(impPPQ);
	document.getElementById("ppq").value=impPPQ;
	impBPMStart=myChannels[0].indexOf('"tempos": [');
    impBPMEnd=myChannels[0].indexOf('"timeSignatures"');
	impBPM=myChannels[0].substring(impBPMStart,impBPMEnd);
	impBPM=impBPM.replace(",",""); 
	BPMS=impBPM.split("bpm");
	TICKS=impBPM.split("ticks");
	for (var i=1;i<BPMS.length;i++){
		BPMsplit(i);
		TICKsplit(i);
	}
}

function TICKsplit(IN){
	TICKstart=TICKS[IN].indexOf('":')+2;
	TICKend=TICKS[IN].indexOf('}');
	TICKS[IN]=TICKS[IN].substring(TICKstart,TICKend);
	TICKS[IN]=TICKS[IN].replace(",",""); 
	//alert(TICKS[IN]);
}

function BPMsplit(IN){
	BPMstart=BPMS[IN].indexOf(':"')+4;
	BPMend=BPMS[IN].indexOf('"ticks"');
	BPMS[IN]=BPMS[IN].substring(BPMstart,BPMend);
	BPMS[IN]=BPMS[IN].replace(",",""); 
	BPMS[IN]=parseFloat(BPMS[IN]);	
	document.getElementById("bpm").value=BPMS[IN];
	getFormNoteTime();
	//alert(BPMS[IN]);
}


// THIS IS THE MAIN FUNCTION FIRST CALLED WHEN PARSING A MIDI FILE
function reparseMidi(){
	console.log("reparseMidi");
	document.getElementById("keystream").value="";
	track=[];
	makeTrack();
	document.getElementById("keystream").value=importedMidi;
	myChannels = importedMidi.split("channel");
	parseInfo();
	for (var i=1;i<myChannels.length;i++){
		//EXTRACT EACH CHANNEL
		console.log("****** NEW CHANNEL *********");
		channelStart=myChannels[i].indexOf(":");
		channelEnd=myChannels[i].indexOf(",");
		importChannel=myChannels[i].substring(channelStart+1,channelEnd);
		importChannel=parseInt(importChannel);
		activetrack=importChannel+1;
		document.getElementById("track").value=activetrack;
		console.log("ActiveTrack= "+activetrack);
		
		//There can be more "channel posts/objects" then one, on same channel
		//alert("Number of parts="+myChannels.length+" This channel="+activetrack+" ChPart ="+myChannels[i]);
		parseCC(i);
		parsePitchBend(i);
		parsePrograms(i);
		parseNotes(i);
		track[activetrack].midiMess.sort(dynamicSort("time"));
	    
	}	
	maxtrack=16;
	
	for(var i=0;i<maxtrack; i++){
		for (var j=0;j<track[i].midiMess.length;j++){
			if	(track[i].midiMess[j].time===false || Number.isNaN(track[i].midiMess[j].time)){
			   track[i].midiMess.splice(j, 2); 
			}
        }			
	}
	
	for (var i=0;i <maxtrack; i++){
		track[activetrack].midiMess.sort(dynamicSort("time"));
	}
	downMixALLEventList();
	getNoteTicks(activetrack);
	console.log("****** Finished import *********");
	//Set to track 1 and close menu
	document.getElementById("track").value=1;
	changeTrack();
	MA();
}




function parseCC(IC){
	impCCStart=myChannels[IC].indexOf('"tracks"');
    impCCEnd=myChannels[IC].indexOf('"pitchBends"');
	impCC=myChannels[IC].substring(impCCStart,impCCEnd);
	//console.log("impCC"+impCC);
	CCpart=impCC.split("[");
	for (var i=1; i <CCpart.length;i++){
	//	console.log("CC="+CCpart[i]);
		CCsplit(i);
	}
}


function parsePitchBend(PB){
	
	
}

function parsePrograms(IP){
	evtype = myChannels[IP].split("instrument");
	console.log("MidiChannel="+activetrack+" Nr of instruments="+evtype.length);
	for (var i=1; i <evtype.length;i++){
		impPRStart=evtype[i].indexOf('"number":')+9;
		impPREnd=evtype[i].indexOf('},');
		impPR=evtype[i].substring(impPRStart,impPREnd);
		impPR=impPR.trim();
		PRChan=191+activetrack;
		//alert("start"+impPR);
		activetrack=parseInt(activetrack);
		track[activetrack].midiMess.push({
			time: 0,
			data0:PRChan,
			data1:impPR,
		});
	}
}

function parseNotes(IC){
	evtype = myChannels[IC].split("notes");
	impNote=evtype[1].split("},");
	for (var i=0; i <impNote.length;i++){
		noteSplit(i);
	}
}

function CCsplit(IN){
	CCStartNumber=CCpart[IN].indexOf('"number":')+9;
    CCEndNumber=CCpart[IN].indexOf('"ticks"');
	CCNumber=CCpart[IN].substring(CCStartNumber,CCEndNumber);
	CCNumber=CCNumber.replace(",",""); 
	CCNumber=parseInt(CCNumber);
		
	CCStartTick=CCpart[IN].indexOf('"ticks":')+9;
    CCEndTick=CCpart[IN].indexOf('"time"');
	CCTick=CCpart[IN].substring(CCStartTick,CCEndTick);
	CCTick=CCTick.replace(",",""); 
	CCTick=parseInt(CCTick);
	//alert("CC tick "+CCTick); This should be used later to recalculate time at other BPM
	
	CCStartTime=CCpart[IN].indexOf('"time":')+7;
    CCEndTime=CCpart[IN].indexOf('"value"');
	CCTime=CCpart[IN].substring(CCStartTime,CCEndTime);
	CCTime=CCTime.replace(",",""); 
	CCTime=parseFloat(CCTime*1000);
	
	CCStartValue=CCpart[IN].indexOf('"value":')+9;
	CCEndValue=CCpart[IN].indexOf('}');
	CCEValue=CCpart[IN].substring(CCStartValue,CCEndValue);
	CCEValue=CCEValue.replace(",",""); 
	CCEValue=Math.round(CCEValue*127);
		
	CCchan=176+importChannel;
	CCchan=parseInt(CCchan);
		
	//alert("CC time "+CCTime+" CC number "+CCNumber+" CC chanel "+CCchan+" CC value "+CCEValue);
	pushCC(IN);
}

function pushCC(IN){
	if (CCNumber!=11 && CCNumber!=0 && CCNumber!=32 && CCNumber!=121 ){
		//track[activetrack].eventTicks.push(CCTick);
		track[activetrack].midiMess.push({
			time: CCTime,
			data0:CCchan,
			data1:CCNumber,
			data2:CCEValue
		});
	}
 // console.log ("Event="+midiMess.length+" Time "+track[activetrack].midiMess[midiMess.length].time +" data0 "+track[activetrack].midiMess[midiMess.length].data0+" data1 "+track[activetrack].midiMess[midiMess.length].data1+" data2 "+track[activetrack].midiMess[midiMess.length].data2);  
}

function noteSplit(IN){
	impStartTick=impNote[IN].indexOf('"ticks":')+9;
    impEndTick=impNote[IN].indexOf('"time"');
	impTick=impNote[IN].substring(impStartTick,impEndTick);
	impTick=impTick.replace(",",""); 
	impTick=parseInt(impTick);
	//alert("imptick="+impTick);
	
	durStartTick=impNote[IN].indexOf('Ticks":')+7;
    durEndTick=impNote[IN].indexOf('"midi');
	durTick=impNote[IN].substring(durStartTick,durEndTick);
	durTick=durTick.replace(",",""); 
	durTick=parseInt(durTick);
	
	endTick=impTick+durTick;
	//alert(endTick);
		
	impTimeStart=impNote[IN].indexOf('"time": ')+8;
	impTimeEnd=impNote[IN].indexOf('"velocity":');
	impTime=impNote[IN].substring(impTimeStart,impTimeEnd);
	impTime=impTime.replace(",",""); 
    impTime=parseFloat(impTime*1000);
	
	impNoteStart=impNote[IN].indexOf('"midi": ')+8;
	impNoteEnd=impNote[IN].indexOf('"name":');
	impKey=impNote[IN].substring(impNoteStart,impNoteEnd);
	impKey=impKey.replace(",",""); 
	impKey=impKey.replace(".",""); 
	impKey=impKey.trim();
	impKey=parseInt(impKey);
	
	
	impDurationStart=impNote[IN].indexOf('"duration": ')+12;
	impDurationEnd=impNote[IN].indexOf('"durationTicks":');
	impDuration=impNote[IN].substring(impDurationStart,impDurationEnd);
	impDuration=impDuration.replace(",",""); 
	impDuration=parseFloat(impDuration*1000);
	
	impVelocityStart=impNote[IN].indexOf('"velocity": ')+12;
	impVelocityEnd=impNote[IN].indexOf("},"	);
	impVelocity=impNote[IN].substring(impVelocityStart,impNote[IN].length);
	impVelocity=Math.round(impVelocity*127);
		
	impOffTime=impTime+impDuration;
	NoteOffChan=128+importChannel;
	NoteOnChan=144+importChannel;
	pushNote(IN);
	
}

function pushNote(IN){
	//if (activetrack==2){alert("channel 2");}
 // track[activetrack].eventTicks.push(impTick);	
  track[activetrack].midiMess.push({
      time: impTime,
      data0:NoteOnChan,
      data1:impKey,
      data2:impVelocity
  });
 // console.log ("Event="+IN+" Time "+track[activetrack].midiMess[IN].time +" data0 "+track[activetrack].midiMess[IN].data0+" data1 "+track[activetrack].midiMess[IN].data1+" data2 "+track[activetrack].midiMess[IN].data2);  
// track[activetrack].eventTicks.push(endTick);
 track[activetrack].midiMess.push({
      time: impOffTime,
      data0:NoteOffChan,
      data1:impKey,
  });
// IN=IN+1;
// console.log ("Event="+IN+" Time "+track[activetrack].midiMess[IN+1].time +" data0 "+track[activetrack].midiMess[IN+1].data0+" data1 "+track[activetrack].midiMess[IN+1].data1+" data2 "+track[activetrack].midiMess[IN+1].data2);  
}

