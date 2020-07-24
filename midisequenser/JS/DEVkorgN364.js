function sendBankN364(){
savebank=0;
bankNr=document.getElementById("selBank").selectedIndex;

if (bankNr<6) {selectProgramMode();}
else if (bankNr>5) {selectCombiMode();}

KorgCH=192 + trackMidiCh-1;

if (bankNr==0){bankNr=0;GM=62;}
else if (bankNr==1){savebank=bankNr; bankNr=0;GM=56;}	
else if (bankNr==2){bankNr=bankNr-2;synthMode="instrument";GM=0;}
else if (bankNr==3){bankNr=bankNr-2;synthMode="instrument";GM=0;}
else if (bankNr==4){bankNr=bankNr-2;synthMode="instrument";GM=0;}
else if (bankNr==5){bankNr=bankNr-2;synthMode="instrument";GM=0;}
else if (bankNr==6){bankNr=bankNr-6;synthMode="combi";     GM=0;}
else if (bankNr==7){bankNr=bankNr-6;synthMode="combi";     GM=0;}
else if (bankNr==8){bankNr=bankNr-6;synthMode="combi";     GM=0;}
else if (bankNr==9){bankNr=bankNr-6;synthMode="combi";     GM=0;}
setBank();
//if (savebank==1) GMsystemOn();
} 

function GMsystemOn(){
  settingChange = [0xf0,0x7e,0x00,0x09,0x01,0xf7];
  outportarr[outportindex].send(settingChange);
}

function selectCombiMode(){
settingChange=[0xf0,0x42,0x30,0x35,0x4e,0x00,0x00,0xf7];
//alert("combi");
outportarr[outportindex].send(settingChange);
}

function selectProgramMode(){
settingChange=[0xf0,0x42,0x30,0x35,0x4e,0x02,0x00,0xf7];
//alert("program");
outportarr[outportindex].send(settingChange);
}

function setBank(){
  settingChange = [176,0,GM];
  outportarr[outportindex].send(settingChange);
  settingChange = [176,32,bankNr];
  outportarr[outportindex].send(settingChange);
  settingChange = [KorgCH,0];
  outportarr[outportindex].send(settingChange);
}

function selectSequenserMode(){
settingChange=[0xf0,0x42,0x30,0x35,0x4e,0x04,0x00,0xf7];
alert("sequenser");
outportarr[outportindex].send(settingChange);
}

