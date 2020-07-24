function getEditBars(){
	console.log("getEditBars()");
	editSPos=document.getElementById("SB").value;
	editEPos=document.getElementById("EB").value;
	initPiano();
}
focus=false;
function Focus(){
	if(focus==false){
    startSave=document.getElementById("SB").value;
	endSave=document.getElementById("EB").value;
	document.getElementById("SB").value=document.getElementById("startbar").value;
	document.getElementById("EB").value=document.getElementById("endbar").value;
	initPiano();
	focus=true;
	}
}

function FocusDrop(){
	if(focus==true){
	document.getElementById("SB").value=startSave;
	document.getElementById("EB").value=endSave;
	initPiano();
	focus=false;
	}
}

function pagePlus(){
console.log("pagePlus()");
	var SELSTART=document.getElementById("startbar").value;
	var SELEND=document.getElementById("endbar").value;
	var EDITEND=document.getElementById("EB").value;
	var EDITSTART=document.getElementById("SB").value;
	SELSTART=parseInt(SELSTART);
	SELEND=parseInt(SELEND);
	EDITEND=parseInt(EDITEND);
	EDITSTART=parseInt(EDITSTART);
	espSave=SELSTART;
	SELSTART=SELSTART+(SELEND-SELSTART);
	SELEND=SELEND+(SELEND-espSave);
	document.getElementById("endbar").value=SELEND
	document.getElementById("startbar").value=SELSTART;
	if (EDITEND<SELEND && document.getElementById("lockedit").checked){
	  SELLENGTH=SELEND-SELSTART;
	  document.getElementById("SB").value=EDITSTART+SELLENGTH;
	  document.getElementById("EB").value=SELEND;
	} else if (EDITEND<SELEND){ document.getElementById("EB").value=SELEND;}
	setRangeRec();
	initPiano();
	listLeftCanvas();
	recRange();
}

function pageMinus(){
	console.log("pageMinus()");
	var SELSTART=parseInt(document.getElementById("startbar").value);
	var SELEND=parseInt(document.getElementById("endbar").value);
	var EDITEND=parseInt(document.getElementById("EB").value);
	var EDITSTART=parseInt(document.getElementById("SB").value);
	
	var SelStartSave=SELSTART
	SELSTART=SELSTART-(SELEND-SELSTART);
	SELEND=SELEND-(SELEND-SelStartSave);
	if (SELSTART>=0){
	if (SELSTART<EDITSTART && document.getElementById("lockedit").checked){
		SELLENGTH=SELEND-SELSTART;
		document.getElementById("SB").value=EDITSTART-SELLENGTH;
		document.getElementById("EB").value=EDITEND-SELLENGTH;
	} 
	else if(SELSTART<EDITSTART){
		document.getElementById("SB").value=SELSTART;
	}
	document.getElementById("endbar").value=SELEND
	document.getElementById("startbar").value=SELSTART;
	setRangeRec();
	initPiano();
	listLeftCanvas();
	recRange();
	}
}

function epagePlus(){
	var ESP=parseInt(document.getElementById("SB").value);
	var EBP=parseInt(document.getElementById("EB").value);
	espSave=ESP
	ESP=ESP+(EBP-ESP);
	EBP=EBP+(EBP-espSave);
	document.getElementById("EB").value=EBP
	document.getElementById("SB").value=ESP;
	initPiano();
}

function epageMinus(){
	var ESP=parseInt(document.getElementById("SB").value);
	var EBP=parseInt(document.getElementById("EB").value);
	var ebpSave=ESP
	ESP=ESP-(EBP-ESP);
	EBP=EBP-(EBP-ebpSave);
	if (ESP>=0){
	document.getElementById("EB").value=EBP
	document.getElementById("SB").value=ESP;
	initPiano();
	}
}

function SrangePlus() {
	console.log("SrangePlus()");
	var ESP=document.getElementById("SB").value;
	var EBP=document.getElementById("EB").value;
	ESP=parseInt(ESP);
	EBP=parseInt(EBP);
	if (EBP>ESP+1){
	document.getElementById("SB").value++;
	initPiano();
	}
}

function SrangeMinus() {
	console.log("SrangeMinus()");
	var ESP=document.getElementById("SB").value;
	var EBP=document.getElementById("EB").value;
	ESP=parseInt(ESP);
	EBP=parseInt(EBP);
	if (ESP>0){
	document.getElementById("SB").value--;
	initPiano();
	}
 }

function ErangePlus() {
	console.log("ErangePlus()");
	document.getElementById("EB").value++;
	initPiano();
}

function ErangeMinus() {
	console.log("ErangeMinus()");
	var ESP=document.getElementById("SB").value;
	var EBP=document.getElementById("EB").value;
	ESP=parseInt(ESP);
	EBP=parseInt(EBP);
	if (EBP>ESP+1){
	document.getElementById("EB").value--;
	initPiano();
	}
 }

function BarsFPSupdate(){
	console.log("BarsFPSupdate()");	
	if (metSet.checked){stopScrollAnime();initPiano();startScrollAnime();} else { initPiano();}
}

function RSrangePlus() {
	console.log("RSrangePlus()");
	console.log("RErangeMinus()");
	var tempSB=document.getElementById("startbar").value;
	var tempEB=document.getElementById("endbar").value;
	tempSB=parseInt(tempSB);
	tempEB=parseInt(tempEB);
	if (tempSB<tempEB-1){
	document.getElementById("startbar").value++;
	setRangeRec();
	initPiano();
	listLeftCanvas();
	recRange();
	}
}

function RSrangeMinus() {
	console.log("RSrangeMinus()");
	console.log("RErangeMinus()");
	var tempSB=document.getElementById("startbar").value;
	var tempEB=document.getElementById("endbar").value;
	tempSB=parseInt(tempSB);
	tempEB=parseInt(tempEB);
	if(	tempSB>0){
	document.getElementById("startbar").value--;
	setRangeRec();
	initPiano();
	listLeftCanvas();
	recRange();
	}
}

function RErangePlus() {
	console.log("RErangePlus()");
	var tempSB=document.getElementById("startbar").value;
	var tempEB=document.getElementById("endbar").value;
	tempSB=parseInt(tempSB);
	tempEB=parseInt(tempEB);
	if (tempEB<document.getElementById("EB").value){
		document.getElementById("endbar").value++;
	} else {
		tempEB++;
		document.getElementById("endbar").value++;
		document.getElementById("EB").value=tempEB;
	}
	setRangeRec();
	initPiano();
	listLeftCanvas();
	recRange();
	initScrollBar();
}

function RErangeMinus() {
	console.log("RErangeMinus()");
	var tempSB=document.getElementById("startbar").value;
	var tempEB=document.getElementById("endbar").value;
	tempSB=parseInt(tempSB);
	tempEB=parseInt(tempEB);
	if (tempEB>tempSB+1){
	document.getElementById("endbar").value--;
	setRangeRec();
	initPiano();
	listLeftCanvas();
	recRange();
	}
}
