function sendCCSettings(){
	console.log("sendCCSettings()");
	setVol();
	setPan();
	setRev();
	setChor();
	setMod();
	setHold();
	
}


function sendBank(){
	console.log("sendBank()");
	bankNr=document.getElementById("selBank").selectedIndex;
	settingChange = [176,0,GM];	
	outportarr[outportindex].send(settingChange);
	settingChange = [176,32,bankNr];
	outportarr[outportindex].send(settingChange);
	settingChange = [prgbase,0];
	outportarr[outportindex].send(settingChange);
}

function setVol(){
	console.log("setVol()");
	CCchan=176+trackMidiCh-1;
	CCtype=7;
	CCvol=document.getElementById("volID").value;
	settingChange=[CCchan,CCtype,CCvol];
	outportarr[outportindex].send(settingChange);
}

function setPan(){
	console.log("setPan()");
	CCchan=176+trackMidiCh-1;
	CCtype=10;
	CCpan=document.getElementById("panID").value;
	settingChange=[CCchan,CCtype,CCpan];
	outportarr[outportindex].send(settingChange);
}

function setRev(){
	console.log("setRev()");
	CCchan=176+trackMidiCh-1;
	CCtype=91;
	CCrev=document.getElementById("revID").value;
	settingChange=[CCchan,CCtype,CCrev];
	outportarr[outportindex].send(settingChange);
}

function setChor(){
	console.log("setChor()");
	CCchan=176+trackMidiCh-1;
	CCtype=93;
	CCchor=document.getElementById("chorID").value;
	settingChange=[CCchan,CCtype,CCchor];
	outportarr[outportindex].send(settingChange);
}

function setMod(){
	console.log("sendMod()");
   	CCchan=176+trackMidiCh-1;
	CCtype=1;
	CCmod=document.getElementById("modID").value;
	settingChange=[CCchan,CCtype,CCmod];
	outportarr[outportindex].send(settingChange);	
}

function setHold(){
	console.log("setHold()");
   	CCchan=176+trackMidiCh-1;
	CCtype=64;
	CChold=document.getElementById("holdID").value;
	settingChange=[CCchan,CCtype,CChold];
	outportarr[outportindex].send(settingChange);	
}

function sendProgram() {
	console.log("sendProgram()");
	//Set program on the track
	programNbr = document.getElementById("prog_sel").value;
	//Set channel
	midiCh = 192 + trackMidiCh-1;
	//Build message for midi synth
	settingChange = [midiCh, programNbr];
	//Send to midiport
	if (outportarr.length>0) {
		outportarr[outportindex].send(settingChange);
		//SEND TO SOUNDFONT SYNTH build message for soundfont synth
		SFprogram=programNbr;
		//Send to soundfont synth
		synth.PGMchange(midiCh,SFprogram);
	}
}

function sendOutport() {
	console.log("sendOutport()");
	outportindex = document.getElementById("out_portsel").selectedIndex;
	console.log("ChangePort");
	//PORToutmess = outportarr[outportindex];
	PORTout = outportarr[outportindex];
}