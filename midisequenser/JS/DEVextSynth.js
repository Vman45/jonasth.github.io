//NOTE ON Channel 90-9F
//NOTE OFF Channel 80-8F

function Synth() {
        this.sy = null;
        this.Load = function(url) {
        this.sy = window.open(url, "extSynth", "width=700,height=700,scrollbars=yes,resizable=yes");
		this.sy.focus();
        }
        this.NoteOn = function(SFM,note, velo) {
            this.SendMessage(this.sy, "midi,"+SFM.toString(16)+"," + note.toString(16) + "," + velo.toString(16));
        }
        this.NoteOff = function(SFM,note) {
            this.SendMessage(this.sy, "midi,"+SFM.toString(16)+","+ note.toString(16) + ",0");
        }
        this.PGMchange = function(SFchan,SFprg) {
            //console.log(SFchan.toString(16));
            this.SendMessage(this.sy, "midi,"+SFchan.toString(16)+","+SFprg.toString(16));
        }
        this.AllSoundOff = function() {
            this.SendMessage(this.sy, "midi,b0,78,0");
        }
        this.SendMessage = function(sy, s) {
            if(this.sy)
                this.sy.postMessage(s, "*");
        }
}

var synth = new Synth();

function sf2synth(mess) {
  //console.log("SF2 "+mess.data[0]+" "+mess.data[1]+" "+mess.data[2]);
  if (mess.data[0] > 143 && mess.data[0] < 160) {
	  mess.data[0]=NOTE_ON;
      synth.NoteOn(mess.data[0],mess.data[1], mess.data[2]);
  }
  else if (mess.data[0] > 127 && mess.data[0] < 144) {
	 mess.data[0]=NOTE_OFF;
     synth.NoteOff(mess.data[0],mess.data[1]);
  }
  else {}
  if (mode=="Listen" || mode=="Play") drawpiano(mess);
}
