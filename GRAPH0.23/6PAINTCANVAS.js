// Paint logic
function redraw() {
     // Redraw graph every x-th millisec
     for (var m=0;m<callfunctions.length;m++) {callfunctions[m]()}
}

function back_ground(){
    // Clear canvas
    ctx.lineWidth = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //  // Redraw canvas
    ctx.fillStyle = mybgcolor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Paint out and redraw stuff on canvas
function build_canvas(arr) {
    callfunctions[0]=back_ground;
    if (grid==true)  {
      callfunctions[1]=graphBackground;
    } else {
      callfunctions[1]=empty;
    }

    if (markarea == true) {
        callfunctions[2]=markDraw;
    } else if (moveit == true) {
        callfunctions[2]=moveDraw;
    } else if (reshape == true) {
        callfunctions[2]=boundariesDraw;
    } else if (doreshape == true) {
        callfunctions[2]=reshapeDraw;
    } else if (holdbezier1==true){
      callfunctions[2]=moveBezierDraw1;
    } else if (holdbezier2==true){
      callfunctions[2]=moveBezierDraw2;
    } else { callfunctions[2]=moveit; }

    callfunctions[3]=graphDraw;

    if (handles==true){
      callfunctions[4]=nodeDraw;
    } else {
      callfunctions[4]=empty;
    }

    callfunctions[5]=paint_message;
}

function empty(){
  //YES INDEED
}

function graphDraw() {
    for (var t = 0; t < arr.length; t++) {
        if (arr[t].print == true) {
            ctx.strokeStyle = arr[t].bcolor;
            var tempcolor=arr[t].bcolor;
            for (s = 0; s < arr[t].nodelinks.length; s++) {
                var myvar = arr[t].nodelinks[s];
                if (arr[t].BcurveX1[myvar] == undefined) {
                    ctx.beginPath();
                    ctx.moveTo(arr[t].rposX, arr[t].rposY);
                    ctx.lineTo(arr[myvar].rposX, arr[myvar].rposY);
                    ctx.stroke();
                } else {
                if (bhandles==true) { bezcontrol(t,myvar,tempcolor);ctx.strokeStyle=tempcolor;}
                    ctx.beginPath();
                    ctx.moveTo(arr[t].rposX, arr[t].rposY);
                    ctx.bezierCurveTo(arr[t].BcurveX1[myvar], arr[t].BcurveY1[myvar], arr[t].BcurveX2[myvar], arr[t].BcurveY2[myvar], arr[myvar].rposX, arr[myvar].rposY);
                  //  quadratic_spline();
                    ctx.stroke();

                }
            }
        }
    }
}

function bezcontrol(t,myvar,tempcolor){
  ctx.beginPath();
  ctx.fillStyle=tmpcolor[t];
  //ctx.arc(arr[t].BcurveX1[myvar],arr[t].BcurveY1[myvar],10,0,2*Math.PI);
  ctx.fillRect(arr[t].BcurveX1[myvar],arr[t].BcurveY1[myvar],10,10);
  //ctx.arc(arr[t].BcurveX2[myvar],arr[t].BcurveY2[myvar],10,0,2*Math.PI);
  ctx.fillRect(arr[t].BcurveX2[myvar],arr[t].BcurveY2[myvar],10,10);
  ctx.fill();
  ctx.fillStyle = mytxtcolor;
  ctx.fillText(t+","+myvar,arr[t].BcurveX1[myvar] ,arr[t].BcurveY1[myvar]);
  ctx.fillText(t+","+myvar,arr[t].BcurveX2[myvar] ,arr[t].BcurveY2[myvar]);
  ctx.stroke();
}

function stopdraw_canvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = mybgcolor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    message2 = "NO PAINTOUT"
    ctx.font = '18pt Calibri';
    ctx.fillStyle = 'white';
    ctx.fillText(message2, 500, 65);
}

function clear_canvas(){
  back_ground();
  arr = new Array();
  marklist=new Array();
  nodes = 0;
  links = 0;
  message="";
  message1="";
  message2="";
  autotext="";
  document.graph.data.value = autotext;
  document.getElementById('clearcanvas').checked = false;
}



function graphBackground(){
  ctx.strokeStyle=gridcolor;
  ctx.beginPath();
  for (var i=0;i<gridSize;i++){
  ctx.moveTo(gridarr[i].XgridLine,0);
  ctx.lineTo(gridarr[i].XgridLine,canvaswidth);
  ctx.moveTo(0,gridarr[i].YgridLine);
  ctx.lineTo(canvasheight,gridarr[i].YgridLine);
 }
 ctx.stroke();
}

function paint_message() {
    ctx.font = '35px Arial';
    ctx.fillStyle = txtcolor;
    ctx.fillText(message2, 500, 35);
    ctx.font = '18px Calibri';
    ctx.fillStyle = mytxtcolor;
    ctx.fillText(message, mousePos.x, mousePos.y);
    ctx.fillText(message1, 10, 35);
}

function markDraw(){
  if (areaPressDown == true) {
      ctx.fillStyle = "gray";
      ctx.fillRect(leftcornerX, upcornerY, mousePos.x - leftcornerX, mousePos.y - upcornerY);
  } else if (areaPressDown == false) {
      ctx.fillStyle = mybgcolor;
      ctx.fillRect(leftcornerX, upcornerY, rightcornerX, downcornerY);
  }
}

function moveDraw(){
  var i = 0;
  for (var t = 0; t < marklist.length; t++) {
      var move = marklist[t];
      arr[move].rposX = mousePos.x + posDifX[i] - 10;
      arr[move].rposY = mousePos.y + posDifY[i] - 10;
      i++;
  }
}

function moveBezierDraw1(){
      arr[beziernode].BcurveX1[bezierlink]=mousePos.x - 5;
      arr[beziernode].BcurveY1[bezierlink]=mousePos.y - 5;
}

function moveBezierDraw2(){
      arr[beziernode].BcurveX2[bezierlink]=mousePos.x - 5;
      arr[beziernode].BcurveY2[bezierlink]=mousePos.y - 5;
}

function boundariesDraw(){
 ctx.fillStyle = "lightblue";
 ctx.fillRect(leftcornerX, upcornerY, rightcornerX - leftcornerX, downcornerY - upcornerY);
 ctx.fillStyle = mytxtcolor;
 ctx.strokeStyle="white";
 ctx.lineWidth=3;
 ctx.beginPath();
 ctx.moveTo(leftcornerX-10, upcornerY-10);
 ctx.lineTo(leftcornerX+10,upcornerY+10);
 ctx.moveTo(leftcornerX+10, upcornerY-10);
 ctx.lineTo(leftcornerX-10,upcornerY+10);
 ctx.stroke();
 ctx.lineWidth=1;
 ctx.fillRect(rightcornerX,downcornerY,20,20);
}

function reshapeDraw(){
  ctx.fillStyle = "lightblue";
  ctx.fillRect(leftcornerX, upcornerY, mousePos.x- leftcornerX, mousePos.y - upcornerY);
  ctx.fillStyle = mytxtcolor;
  ctx.strokeStyle="white";
  ctx.lineWidth=3;
  ctx.beginPath();
  ctx.moveTo(leftcornerX-10, upcornerY-10);
  ctx.lineTo(leftcornerX+10,upcornerY+10);
  ctx.moveTo(leftcornerX+10, upcornerY-10);
  ctx.lineTo(leftcornerX-10,upcornerY+10);
  ctx.stroke();
  ctx.lineWidth=1;
  ctx.fillRect(mousePos.x-10,mousePos.y-10,20,20);
  percX=(mousePos.x-leftcornerX)/(oldX-leftcornerX);
  percY=(mousePos.y-upcornerY)/(oldY-upcornerY);
  for (var t = 0; t < marklist.length; t++) {
    var move = marklist[t];
    arr[move].rposX = (Xlength[t]*percX)+leftcornerX;
    arr[move].rposY = (Ylength[t]*percY)+upcornerY;
  }
}

function nodeDraw() {
    for (var t = 0; t < arr.length; t++) {
        ctx.fillStyle= arr[t].bcolor;
        ctx.fillRect(arr[t].rposX, arr[t].rposY, arr[t].rwidth, arr[t].rheigth);
        ctx.fillStyle = mytxtcolor;
        ctx.fillText(t, arr[t].rposX, arr[t].rposY);
    }
}

// Start animation "form"
function startanime() {
    //Start animation
    message2 = "";
    build_canvas(arr);
    refresh = setInterval(redraw, 33);
}


// Stop animation "form"
function stopanime() {
    clearInterval(refresh);
}
