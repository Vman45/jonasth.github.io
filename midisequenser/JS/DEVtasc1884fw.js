function korgvol(kid,kvol){
	CCchan=176+trackMidiCh-1;
	alert("id="+kid+" vol="+kvol);
	CCvol=kvol;
	if(kid=="korgvol1") {CCtype=0}
	else if (kid=="korgvol2") {CCtype=1}
	else if (kid=="korgvol3") {CCtype=2}
	else if (kid=="korgvol4") {CCtype=3}
	else if (kid=="korgvol5") {CCtype=4}
	else if (kid=="korgvol6") {CCtype=5}
	else if (kid=="korgvol7") {CCtype=6}
	else if (kid=="korgvol8") {CCtype=7}
	else if (kid=="korgvol9") {CCtype=8}
	else if (kid=="korgvol10") {CCtype=9}
	else if (kid=="korgvol11") {CCtype=10}
	else if (kid=="korgvol12") {CCtype=11}
	else if (kid=="korgvol13") {CCtype=12}
	else if (kid=="korgvol14") {CCtype=13}
	else if (kid=="korgvol15") {CCtype=14}
	else if (kid=="korgvol16") {CCtype=15}
	settingChange=[CCchan,CCtype,CCvol];
	outportarr[outportindex].send(settingChange);
}

function setKorgRC168Pan(){
	CCchan=176+trackMidiCh-1;
	if(id=="korgPan1") {CCtype=0}
	else if (id=="korgPan2") {CCtype=1}
	else if (id=="korgPan3") {CCtype=1}
	else if (id=="korgPan4") {CCtype=1}
	else if (id=="korgPan5") {CCtype=1}
	else if (id=="korgPan6") {CCtype=1}
	else if (id=="korgPan7") {CCtype=1}
	else if (id=="korgPan8") {CCtype=1}
	else if (id=="korgPan9") {CCtype=1}
	else if (id=="korgPan10") {CCtype=1}
	else if (id=="korgPan11") {CCtype=1}
	else if (id=="korgPan12") {CCtype=1}
	else if (id=="korgPan13") {CCtype=1}
	else if (id=="korgPan14") {CCtype=1}
	else if (id=="korgPan15") {CCtype=1}
	else if (id=="korgPan16") {CCtype=1}

	CCpan=document.getElementById("korgPanID").value;
	settingChange=[CCchan,CCtype,CCvol];
	outportarr[outportindex].send(settingChange);
}

function setKorgRC168Mute(){
	CCchan=176+trackMidiCh-1;
	if(id=="korgMute1") {CCtype=0}
	else if (id=="korgMute2") {CCtype=1}
	else if (id=="korgMute3") {CCtype=1}
	else if (id=="korgMute4") {CCtype=1}
	else if (id=="korgMute5") {CCtype=1}
	else if (id=="korgMute6") {CCtype=1}
	else if (id=="korgMute7") {CCtype=1}
	else if (id=="korgMute8") {CCtype=1}
	else if (id=="korgMute9") {CCtype=1}
	else if (id=="korgMute10") {CCtype=1}
	else if (id=="korgMute11") {CCtype=1}
	else if (id=="korgMute12") {CCtype=1}
	else if (id=="korgMute13") {CCtype=1}
	else if (id=="korgMute14") {CCtype=1}
	else if (id=="korgMute15") {CCtype=1}
	else if (id=="korgMute16") {CCtype=1}

	CCpan=document.getElementById("korgPanID").value;
	settingChange=[CCchan,CCtype,CCvol];
	outportarr[outportindex].send(settingChange);
}