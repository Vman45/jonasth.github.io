	var midiEv=0;
	var rightSide=[];
	var FRONTOFFSET=[];
	var BACKOFFSET=[];
	var barLength=[];
	var keyreleased=[]; 
    var pcolor=[];
	
function setColor(){
    var p=0;		
	while (p<128){
		pcolor[p]="#ff3333";
		p++;
		pcolor[p]="#cae200"; 
		p++;	
		pcolor[p]="#ff9933";
		p++;
		pcolor[p]="#ff33ff";
		y++;
		pcolor[p]="#66ff33";
		p++;
		pcolor[p]="#33ffff";
		p++;
		pcolor[p]="#ffffff";
		p++;
		pcolor[p]="#3333ff";
		p++;
		pcolor[p]="#e82883";
		p++;
		pcolor[p]="#05b2e2";
		p++;
		pcolor[p]="#ed004b";
		p++;
		pcolor[p]="#77704b";
		p++;
		pcolor[p]="#45604b";
		p++;
		}
}



   
//DON'T FUCKING TOUCH ANYTHING
function initPianoScroll(){
    //console.log("@@@@@@@@@@@initPianoScroll@@@@@@@@@@@");		
	for (var p=0;p<20000;p++) {setColor();rightSide[p]=0;FRONTOFFSET[p]=0;keyreleased[p]=false;barLength[p]=0;midiEv=0;}
}

function pianoSCROLL(){
	//console.log("pianoSCROLL");	
	//console.log("TRACK="+rectrack+" midiMess length="+track[rectrack].midiMess.length);
	nbrOfEV = track[rectrack].midiMess.length;
	var x=0;

	while (x<nbrOfEV){
	   midiEv=x;
	   //INSIDE KEY PRESSED
	   if(track[rectrack].midiMess[midiEv].data0==NOTE_ON && keyreleased[midiEv]==false){
		  ctm.fillStyle = pcolor[track[rectrack].midiMess[midiEv].data1];
		  ctm.fillRect(56,(PistartX+keyHeight*88)-(keyHeight*(track[rectrack].midiMess[midiEv].data1-8)), rightSide[midiEv],keyHeight);
		  //When ***A NEW*** key pressed a startvoint relative the scrollbar created ***FRONTOFFSET***
		  if(FRONTOFFSET[midiEv]==0) {FRONTOFFSET[midiEv]=scrollBarPos;}
		  rightSide[midiEv]=scrollBarPos-FRONTOFFSET[midiEv];
       }
       //INSIDE KEY RELEASED
	   else if(track[rectrack].midiMess[midiEv].data0==NOTE_OFF && keyreleased[midiEv]==false){
		keyreleased[midiEv]=true;	
		for (var q=midiEv-1;q>=0;q--){
			if(track[rectrack].midiMess[q].data1==track[rectrack].midiMess[midiEv].data1) { 
				barLength[q]=rightSide[q]-50;
				BACKOFFSET[q]=FRONTOFFSET[q]+barLength[q];
				keyreleased[q]=true;
				break;
    		}
		}
       } 
	   //INSIDE MOVE BAR
	   else if(track[rectrack].midiMess[midiEv].data0==NOTE_ON && keyreleased[midiEv]==true){
		z=midiEv+1;
	    while(z<nbrOfEV){
		  if(track[rectrack].midiMess[z].data1==track[rectrack].midiMess[midiEv].data1){
			//This file was changed here the 6 december 2019
			//Removal before next drawout
			if (6+scrollBarPos-BACKOFFSET[midiEv]>Mwidth+15){
				z=nbrOfEV;
				//BACKOFFSET.splice(midiEv,1);
				//track[rectrack].midiMess.splice(midiEv,1);
			} else {
				ctm.fillStyle = "#000a4d";
				ctm.fillRect(scrollBarPos-BACKOFFSET[midiEv],(PistartX+keyHeight*88)-(keyHeight*(track[rectrack].midiMess[midiEv].data1-8))-1,barLength[midiEv]+50 ,keyHeight+2);
		    	ctm.fillStyle = pcolor[track[rectrack].midiMess[midiEv].data1];
				ctm.fillRect(6+scrollBarPos-BACKOFFSET[midiEv],(PistartX+keyHeight*88)-(keyHeight*(track[rectrack].midiMess[midiEv].data1-8)), barLength[midiEv]+50,keyHeight);
				break;
			}
		  }
		z++;
		}
	   } 
	  x++;
	}
}


	