function recLatency	(){
	document.getElementById("startbar").value=0;
	document.getElementById("endbar").value=8;
	setRangeRec();
	initPiano();
	recINIT();
}

function plusLatency(){
  document.getElementById("Clatency").value++;
  latCorr=document.getElementById("Clatency").value;
}

function minusLatency(){
  document.getElementById("Clatency").value--;
   latCorr=document.getElementById("Clatency").value;
}

function calcDeviation(){
	//Find Notes On ***among recorded midivalues***
	var temptime = [];var Deviation=[];var myString="";var totDev=0; latency=0;
	var k=0;var j =0; var lowvalue; var highvalue;
	for (j=0;j<track[rectrack].midiMess.length;j++){
		console.log("get on notes");
		if (track[rectrack].midiMess[j].data0==144){
	 	   temptime[k]= track[rectrack].midiMess[j].time;
		   k++;
		}
	}
	//Find which metronome timings closest to each recorded keyboard note time
    k=0;
	for (j=0;j<temptime.length;j++){
		while (k*interval<temptime[j]){
			var lowvalue=interval*k;
			var highvalue=interval*(k+1);
			k++;
		}
		k=0;
		var	A=temptime[j] - highvalue;
		var	B=temptime[j] - lowvalue;
		if (Math.abs(A)>Math.abs(B)){Deviation[j]=B} else {Deviation[j]=A}
		myString+="Rec Time="+temptime[j]+" low MET VALUE="+lowvalue+" high MET VALUE="+highvalue+" Calculated Deviation="+Deviation[j]+"\n";
		totDev=totDev+Deviation[j];	
	}	
	latency=totDev/temptime.length;
	document.getElementById("Dlatency").value=latency;
	document.getElementById("timings").value="Latency="+latency+"\n"+myString;
}

function correctLatency(){
	latCorr=latency*-1;
	document.getElementById("Clatency").value=latCorr;
}