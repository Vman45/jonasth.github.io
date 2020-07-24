Tascvisible=0; 
 
function toggleTascam(){
  if (Tascvisible==0){	
  //alert("cheked the button - worked");
  document.getElementById("TascamMix").style.visibility= "visible" ; Tascvisible=1;}
  else {	
  //alert("cheked the button - worked");
  document.getElementById("TascamMix").style.visibility= "hidden" ; Tascvisible=0;}
}

VPvisible=0; 
VDvisible=0;                                                                                                                                                                                      
function toggleVP(){
  if (VPvisible==0){	
  //alert("cheked the button - worked");
  document.getElementById("virtpiano").style.visibility= "visible" ; VPvisible=1;}
  else {	
  //alert("cheked the button - worked");
  document.getElementById("virtpiano").style.visibility= "hidden" ; VPvisible=0;}
  
}

function toggleSF(){
  var dropdownlistbox = document.getElementById("synthval");
for(var x=0;x < dropdownlistbox.length ; x++)
{
  
 if("SF2 synth" == dropdownlistbox.options[x].text)
 //alert(dropdownlistbox.options[x].text);
 dropdownlistbox.selectedIndex = x;
		
}

if (SF2PLAY==false){
	SF2PLAY=true;
	document.getElementById('metvalue').value = "SF2";
	initPiano();
	synth.Load('https://imaya.github.io/demo/sf2.js/wml.html');
	//synth.Load('https://logue.github.io/smfplayer.js/wml2.html')
	setTimeout(loadSFtracks, 1000);
}
  if (VDvisible==0){	
	//alert("cheked the button - worked");
	document.getElementById("extSynth").style.visibility= "visible" ; VDvisible=1;
	setTimeout(focusSF, 1000);
	}
  else {	
  //alert("cheked the button - worked");
  document.getElementById("extSynth").style.visibility= "hidden" ; VDvisible=0;}
}

function focusSF(){
	extSynth.focus();
	extSynth.contentDocument.body.focus();
}



/*
function mouse_position(e)
{
var x = e.clientX;     // Get the horizontal coordinate
var y = e.clientY;     // Get the vertical coordinate
var coor = "X coords: " + x + ", Y coords: " + y;

}
*/

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
