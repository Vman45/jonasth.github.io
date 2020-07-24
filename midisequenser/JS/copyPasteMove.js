//Copy notes in interval
function copySelection(){
var CS=document.getElementById("recstart").value;
var CE=document.getElementById("recend").value;
	if(track[rectrack].midiMess.length>0){
		for (var i=0;i<track[rectrack].midiMess.length;i++){
			
			if (track[rectrack].midiMess[i].time>=CS && track[rectrack].midiMess[i].time<=CE){
				copyTime[i]=track[rectrack].midiMess[i].time;
				copy0[i]=track[rectrack].midiMess[i].data0;
				copy1[i]=track[rectrack].midiMess[i].data1;
				copy2[i]=track[rectrack].midiMess[i].data2;
			}
		}
	}
document.getElementById("paste").value=document.getElementById("endbar").value;
}

//Paste notes in copied interval to the positions in PString
function pasteSelection(){
var PString=document.getElementById("paste").value;
var pasteArray = PString.split(",");
var j=0;
while (j<pasteArray.length){
//alert("NOTEVALUE "+noteval+" inverval"+interval);
pastePoint=interval*noteval*pasteArray[j];
//alert("Paste BAR"+pasteArray[i]+"PASTE TIME"+pastePoint);
    //alert("copyTime length="+copyTime.length);
    for (var i=0;i<copyTime.length;i++){   
	        var  copyPoint=copyTime[i];
			var newTime=pastePoint+copyPoint;
			//alert(newTime);
			track[rectrack].midiMess.push({
				time:  newTime,
				data0: copy0[i],
				data1: copy1[i],
				data2: copy2[i]
			});
	}
	j++;
}	
	initPiano();
}