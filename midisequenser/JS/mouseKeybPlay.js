mymess = {
  data : [],
};

function playNote(A,B,dev){
    console.log("playNote()");
    midievent++;
    mymess.data[0]=143+trackMidiCh;
    mymess.data[1]=A;
    mymess.data[2]=B;
    if (recordmidi) {
      clock = performance.now() - browserLoadTIME;
      clock = clock + rs;
      record(mymess);
    }
   if (SFload=="SF2 synth") {synth.NoteOn(143+trackMidiCh,A,B);}
    else {playbackPort(mymess); }
}

function stopNote(C){
   console.log("stopNote()");
   midievent++;
   mymess.data[0]=127+trackMidiCh;
   mymess.data[1]=C;
   mymess.data[2]=0;
   if (recordmidi) {
   clock = performance.now() - browserLoadTIME;
   clock = clock + rs;
   record(mymess);
   }
  if (SFload=="SF2 synth") {synth.NoteOff(127+trackMidiCh,C);}
   else {playbackPort(mymess); }
}



