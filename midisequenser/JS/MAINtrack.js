var track = [];

function newTrack(m) {	
  track[m] = {
	//When you record some part/bars of midi these values always can change  
    outport: [],
    portname: [],
	trackname:"",
	trackpart:[],
    bank:[],
    midichannel: [],
    program: [],
	//Below messages are event based
	eventTicks: [], //For all events "calculated" from ppq and time and multiplied with tickLength "to get new position when BPM change"
    midiMess: [],   //CONFIGURATION OF midiMess:[{time:0,data0:0,data1:0,data2:0}]
  };
  return track;
}

var pianoroll = [];

//I reserved some "tracks" above 100 and below 1, for **other** use then track saving
//Track 333 whenever recording all notes first recorded to track 333, after cleanup they are moved to active recording track
//Track 0 is the track where all the tracks get mixdown "together" and played up
//Track 777 is the track that hold the metronome "yes it is just a created track"
//Track 888 is the track that is drawn out
//Track 222 is  the track used when you quantize

function makeTrack() {
  console.log("makeTrack()");	
  maxtrack=16;
  for (var m =-1; m <= maxtrack; m++) {
    newTrack(m);
    settingsTrack(m);
  }
  
  //Recordingtrack
  newTrack(333);
  settingsTrack(333);
  //track[333].midichannel[0] = m;
  
  //Metronometrack
  newTrack(777);
  settingsTrack(777);
  //track[777].midichannel[0] = 10;
  
  //Graphictrack
  newTrack(888);
  settingsTrack(888);
  //track[888].midichannel[0] = m;
  
  //Quantizetrack
  newTrack(222);
  settingsTrack(222);
  //track[222].midichannel[0] = m;
  
  defaultTrackInstruments();
  drawAllTrackSettings();
}

function settingsTrack(m) {
	track[m].outport[0] = document.getElementById("out_portsel").selectedIndex;
    track[m].portname[0] = document.getElementById("out_portsel").value;
    if (m==0){track[m].midichannel[0] = 1;} else {track[m].midichannel[0] = m;}
    track[m].program[0] = document.getElementById("prog_sel").value;
    track[m].trackname = "NONAME";
}

function addTrack(){
maxtrack++;
newTrack(maxtrack);
newSetting(maxtrack);
changeTrack();
console.log("created track="+maxtrack);
}

function newSetting(m){
	track[m].outport[0] = document.getElementById("out_portsel").selectedIndex;
    track[m].portname[0] = document.getElementById("out_portsel").value;
    track[m].midichannel[0] = 1;
    track[m].program[0] = document.getElementById("prog_sel").value;
    track[m].trackname = "";
}

function removeTrack() { 
       alert(activetrack); 
       if (maxtrack>0) { 
                if (maxtrack==activetrack) { 
                        track.pop(); activetrack--;document.getElementById("track").value--;
                } else { 
                        track.splice(activetrack, 1); 
                }
       } 
       changeTrack();
       console.log('now:', activetrack); 
} 

function defaultTrackInstruments(){
	console.log("defaultTrackInstruments()");
	track[0].program[0] = 75;
	track[1].program[0] = 0;
	track[2].program[0] = 100;
	track[3].program[0] = 18;
	track[4].program[0] = 25;
	track[5].program[0] = 26;
	track[6].program[0] = 49;
	track[7].program[0] = 81;
	track[8].program[0] = 4;
	track[9].program[0] = 94;
	track[10].program[0] = 0;
	track[11].program[0] = 50;
	track[12].program[0] = 46;
	track[13].program[0] = 39;
	track[14].program[0] = 57;
	track[15].program[0] = 13;
	track[16].program[0] = 0;
	track[777].program[0] = 0;
}
