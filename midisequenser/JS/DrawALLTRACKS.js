function TrackCanvas_init() {
  var canvas = document.getElementById("sidecanvas");
  ctx = canvas.getContext("2d");
  get_TrackCanvas_res();
}

function get_TrackCanvas_res() {
  Ssize = document.getElementById('SIDEid');
  Swidth=700;
  Sheight=350;
  setTrackCanvas_resolution();
}

function setTrackCanvas_resolution() {
  document.getElementById('sidecanvas').width = Swidth;
  document.getElementById('sidecanvas').height = Sheight;
}

function drawAllTrackSettings() {
  console.log("drawAllTrackSettings()");
  allTrContainer();
  var x = 4;
  var y = 15;
  markSelectedTrack(x,activetrack);
  for (var i = 1; i < maxtrack; i++) {
      programNbr=track[i].program[0];
      getInsName();
      canvasList = "[Tr " + i +" "+ track[i].trackname+  "] "+" Port=" + track[i].portname[0] + " Midi Ch=" +
      track[i].midichannel[0] + " Prog=" + track[i].program[0] +" Instrument "+instrument+ "\n";
      listTrack(canvasList, x, y);
      y = y + 18;
 }
}

function markSelectedTrack(x,activetrack){
  ctx.fillStyle = "PURPLE";
  ctx.fillRect(0, activetrack*18-20, Swidth, 20);
}

function listTrack(trackList, trX, trY) {
  ctx.font = "14px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(trackList, trX, trY);
}

function allTrContainer() {
  ctx.rect(0, 0, Swidth, Sheight);
  ctx.fillStyle = "RED";
  ctx.fill();
}
