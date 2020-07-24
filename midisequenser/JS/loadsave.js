function loadURL() {
console.log("loadURL()");
  var url="http://anybase.co.nf/SC-7.bnk"
 var request = new XMLHttpRequest();
  request.open('GET',url, true);
  request.responseType = 'text';
  var fileReader = new FileReader();
  request.onload = function() {
  textmass = request.response;
  document.getElementById("keystream").value = textFromFileLoaded;
  };
request.send();
// 
//  fileReader.onload = function(fileLoadedEvent)
//    {
//        var textFromFileLoaded = fileLoadedEvent.target.result;
//        document.getElementById("keystream").value = textFromFileLoaded;
//    };
//    fileReader.readAsText(fileToLoad, "UTF-8");
//
}

function openFile(){
	loadFileAsText();
	setTimeout(function () {
      openBTBfile();
    }, 1000);
}

function loadFileAsText(){
    var fileToLoad = document.getElementById("fileToLoad").files[0];
    str= document.getElementById("fileToLoad").value;
    myArr = str.split("\\");
    BTBfilename=myArr[2];
    document.getElementById("inputFileName").value = BTBfilename;
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent)
    {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        document.getElementById("inputTextToSave").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}

function openBTBfile(){
	BTBfile=document.getElementById("inputTextToSave").value;
	console.log(BTBfile);
	BTBline = BTBfile.split(";");
	
	document.getElementById("author").value=BTBline[0];
	document.getElementById("songname").value=BTBline[1];
	document.getElementById("songauthor").value=BTBline[2];
	document.getElementById("songinfo").value=BTBline[3];
	document.getElementById("ppq").valTRAue=BTBline[4];
	BTBTRACK = BTBfile.split("TRACK");
	for (var j=1;j<BTBTRACK.length;j++){
		TRACKLINE=BTBTRACK[j].split(";");
		var insertTR=TRACKLINE[1];
		insertTR=parseInt(insertTR);
		//alert("TRACK="+insertTR);
		for (var i=3;i<TRACKLINE.length-1;i++){
			TRACKLINE[i]=TRACKLINE[i].trim();
			//alert("LINE="+TRACKLINE[i]);
			BTBobj =TRACKLINE[i].split(":");
			
		   	if (BTBobj.length==3){
				BTBobj[0]=parseInt(BTBobj[0]);
				BTBobj[1]=parseInt(BTBobj[1]);
				BTBobj[2]=parseFloat(BTBobj[2]);
				track[insertTR].midiMess.push({
					time: BTBobj[2],
					data0: BTBobj[0],
					data1: BTBobj[1],
					data2: undefined,
				});
			} else {
				BTBobj[0]=parseInt(BTBobj[0]);
				BTBobj[1]=parseInt(BTBobj[1]);
				BTBobj[2]=parseInt(BTBobj[2]);
				BTBobj[3]=parseFloat(BTBobj[3]);
				track[insertTR].midiMess.push({
					
					time: BTBobj[3],
					data0: BTBobj[0],
					data1: BTBobj[1],
					data2: BTBobj[2]
				});
			}	
		}
		
	}
	initPiano();
	listTrSet();
	MA();
}

function newFile() {
console.log("newFile()");
document.getElementById("songname").value="new.btb";
init();
}

function loadFile(filePath) {
console.log("loadFile()");
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}


function dataToTextArea(){
	var outTxt="";
	outTxt+=document.getElementById("author").value+";"+"\n";
	outTxt+=document.getElementById("songname").value+";"+"\n";
	outTxt+=document.getElementById("songauthor").value+";"+"\n";
	outTxt+=document.getElementById("songinfo").value+";"+"\n";
	outTxt+=document.getElementById("ppq").value+";"+"\n";
	for (var i=1;i<maxtrack;i++){	
		for (var k=0;k<track[i].trackpart.length;k++){
			var txtTrack=track[i].trackpart[k].pTrack;
			var txtName=track[i].trackpart[k].pName;
			var SBA=track[i].trackpart[k].pStartbar;
			var EBA=track[i].trackpart[k].pEndbar;
			var BP=track[i].trackpart[k].pBPM;
			var TRB=track[i].trackpart[k].pBeat;
			var TRD=track[i].trackpart[k].pDiv;
			outTxt+="PART:"+txtTrack+":"+txtName+":"+SBA+":"+EBA+":"+BP+":"+TRB+":"+TRD+";"+"\n";	
		}
	}
	for (var i=1;i<maxtrack;i++){	
		if (track[i].midiMess.length!=0){
			var txtTrack="TRACK;"+"\n";
			var txtTrackNr=i+";\n";
			var txtTrName=track[i].trackname+";"+"\n";
			outTxt+=txtTrack+txtTrackNr+txtTrName;
		}
		
		for (var j=0;j<track[i].midiMess.length;j++){
			var txtTime=track[i].midiMess[j].time;
			var	txtData0=track[i].midiMess[j].data0;
			var txtData1=track[i].midiMess[j].data1;
			var txtData2=track[i].midiMess[j].data2;
			if ((track[i].midiMess[j].data0<128 || track[i].midiMess[j].data0>143)&& (track[i].midiMess[j].data0<"192"|| track[i].midiMess[j].data0>"207")) {
				
					outTxt+=txtData0+":"+txtData1+":"+txtData2+":"+txtTime+";"+"\n";
				}
			 
			else {
				outTxt+=txtData0+":"+txtData1+":"+txtTime+";"+"\n";
			}
		}
	}
	document.getElementById("inputTextToSave").value=outTxt;
}

function saveTextAsFile() {
	console.log("saveTextAsFile()");
    var textToSave = document.getElementById("inputTextToSave").value;
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = document.getElementById("filename").value;
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}

function loadInsFile(){
	console.log("loadInsFile()");
    var insToLoad = document.getElementById("insToLoad").files[0];
    str=document.getElementById("insToLoad").value;
    var myArr = str.split("\\");
    var filename=myArr[2];
    document.getElementById("loadedtext").value = filename;
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent)
    {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        document.getElementById("loadedtext").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}
