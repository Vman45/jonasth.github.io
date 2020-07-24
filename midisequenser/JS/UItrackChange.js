//SELECT TRACK TO EDIT THIS IS TRACK CHANGE IN EDIT MODE 
function listTrPlus() {
  console.log("listTrPlus()");
  if (document.getElementById("trackListed").value < maxtrack ) {
    document.getElementById("trackListed").value++;
	document.getElementById("track").value++;
    listTrSet();
  }
}

function listTrMinus() {
  console.log("listTrMinus()");
  if (document.getElementById("trackListed").value > 0) {
    document.getElementById("trackListed").value--;
	document.getElementById("track").value--;
    listTrSet();
  }
}

function changeTrListing() {
   console.log("changeTrListing()");
   if (document.getElementById("trackListed").value >= 0 && document.getElementById("trackListed").value <= maxtrack) {
	document.getElementById("track").value=document.getElementById("trackListed").value;
    listTrSet();
  }
}

//THIS CHANGE ACTIVE TRACK TO DRAWOUT ON CANVAS IN PLAY MODE
function trackPlus() {
  if (document.getElementById("track").value < maxtrack) {
    document.getElementById("track").value++;
	document.getElementById("trackListed").value++;
    listTrSet();
  }
}

function trackMinus() {
  if (document.getElementById("track").value > 0) {
    document.getElementById("track").value--;
	document.getElementById("trackListed").value--;
	listTrSet();
  }
}

function changeTrack() {
   console.log("change track");
   if (document.getElementById("track").value > 0 && document.getElementById("track").value < maxtrack) {
	document.getElementById("trackListed").value=document.getElementById("track").value;
    listTrSet();
  }
}

//This is the code that will update canvaseditor,leftcanvas,maincanvas
function listTrSet() {
  console.log("listTrSet()");
   
  //This update the "setting values" when a new track selected
  activetrack = document.getElementById("track").value;
  editTrack = document.getElementById("trackListed").value;
  trackChangeToUI();
  setTrack(activetrack);
  rectrack=activetrack;
  initPiano();
	
  //Get what events to list, find min max, then drawout event on edit canvas  
  listChange();
  eventMinMax();
  trackEvent = 0;
  drawTrackX(editTrack, trackEvent);
}



