function autoLoadInsFile(){
  console.log("autoLoadInsFile()");
  var ATXT;
  //console.log(SFload);
  if(SFload=="Korg N364") {
  ATXT=loadFile('KORG364.html'); 
  document.getElementById("soundcollection").value=ATXT;
  getPatchNames(ATXT);
  bankSelection(); }
  else if(SFload=="Roland SC7") {
  ATXT=loadFile('SC-7.html');
  document.getElementById("soundcollection").value=ATXT;
  getPatchNames(ATXT);
  bankSelection(); 
  }
  else if(SFload=="SF2 synth") {
  ATXT=loadFile('Roland SC-55.html');
  document.getElementById("soundcollection").value=ATXT;
  getPatchNames(ATXT);
  getDrumNames(ATXT);
  bankSelection(); 
  }
}

function bankSelection(){
	console.log("bankSelection()");
	current=document.getElementById("selBank").selectedIndex;
	ListBankInstruments(current);
	if(SFload=="Korg N364") {
	sendBankN364();
	}
}

function getPatchNames(ATXT){
	console.log("getPatchNames()");
	bankName=[];
	var PatchStart = ATXT.indexOf(".Patch Names",0);
	var NoteStart = ATXT.indexOf(".Note Names",0);
	var allBANKS=ATXT.substring(PatchStart+12,NoteStart);
	listBanks(allBANKS);
}

function getDrumNames(ATXT){
	console.log("getDrumNames()");
	drumSet=[];
	var DrumStart = ATXT.indexOf(".Note Names",0);
	var  DrumEnd= ATXT.indexOf(".Controller Names",0);
	var allDrums=ATXT.substring(DrumStart+12,DrumEnd);
	listDrums(allDrums);
}

function listDrums(allDrums){

	
}

function listBanks(allBANKS){
	console.log("listBanks()");
	//console.log("Write out just the banks"+allBANKS);
	Abank = allBANKS.split("\n[");
	Abank.shift();
	for(i=0;i<Abank.length;i++){
    //alert(Abank[i]);
	getBankName(i);	
    }
	//alert(bankName);
	bankOptionList();
	if (korgLoad==true) {
	defaultBank=1;
	document.getElementById("selBank").selectedIndex = defaultBank;
	ListBankInstruments(defaultBank); korgLoad=false;}
	else {
	defaultBank=0;
	document.getElementById("selBank").selectedIndex = defaultBank;
	ListBankInstruments(defaultBank);}
}

function getBankName(i){
	console.log("getBankName()");
	var ENDBANKNAME = Abank[i].indexOf("]",0);
	bankName[i]=Abank[i].substring(0,ENDBANKNAME);
   // console.log(bankName[i]);
}

function ListBankInstruments(current){
	console.log("ListBankInstruments()");
	instName=Abank[current].split("\n");
	//REMOVE FIRST LINE "BANKNAME"
	instName.shift();
	//REMOVE LINES NOT STARTING WITH DIGIT OR EMPTY
	for (var j=instName.length-1;j>=0;j--){
   	ChCode=instName[j].charCodeAt(0);
	if (ChCode<48 || ChCode>57 || ChCode==13 ) { instName.splice(j,1); }
	}
	instOptionList();
}



function instSelection(){
	console.log("instSelection()");
	document.getElementById("prog_sel").value=document.getElementById("selInst").selectedIndex;
	changeProgram();
}

function bankOptionList(){
console.log("bankOptionList()");
bankOptNames="";	
bankSelect ="<font color=black><b>BANK:</b></font> <select id='selBank' onChange='bankSelection()'>\n";
for (var r=0;r<bankName.length;r++){
bankOption=bankName[r];
bankOptNames+="<option value="+r+"> "+r+"  "+bankOption+"</option>\n";
}
bankOptEnd="</select> \n";
bankOptionString=bankSelect+bankOptNames+bankOptEnd;
//alert(bankOptionString);
document.getElementById("bankOptList").innerHTML=bankOptionString;
}

function instOptionList(){
console.log("instOptionList()");
instOptNames="";	
instSelect ="<B>Patch</B> <select id='selInst' onChange='instSelection()'>\n";
for (var r=0;r<instName.length;r++){
instOption=instName[r];
//alert(bankName[r]);
instOptNames+="<option value="+r+">  "+instOption+"</option>\n";
}
instOptEnd="</select> \n";
instOptionString=instSelect+instOptNames+instOptEnd;
//alert(instOptionString);
document.getElementById("instOptList").innerHTML=instOptionString;
}

function loadFile(filePath) {
  console.log("loadFile()");
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", loadFile, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}






