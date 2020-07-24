function rndColor() {
    var hex = ['D', 'E', 'F', '3', '4', '5', '6', '7',
            '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'
        ],
        color = '#',
        i;
    for (i = 0; i < 6; i++) {
        color = color + hex[Math.floor(Math.random() * 16)];
    }
    return color;
}

function clear_canvas() {
    arr = new Array();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = mybgcolor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.getElementById('clearcanvas').checked = false;
    nodes = 0;
    links = 0;
    message2 = "";
    message1 = "";
    message = "";
}


// Paint logic
function redraw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = mybgcolor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Redraw canvas
    paint_graph(arr);
    paint_message();
}

function paint_message() {
    ctx.font = '35px Arial';
    ctx.fillStyle = txtcolor;
    ctx.fillText(message2, 500, 35);
    ctx.font = '18px Calibri';
    ctx.fillStyle = mytxtcolor;
    ctx.fillText(message, 10, 15);
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

function graphDraw(){
  for (var t = 0; t < arr.length; t++) {
      if (arr[t].print == true) {
          ctx.strokeStyle = arr[t].bcolor;
          for (s = 0; s < arr[t].nodelinks.length; s++) {
              myvar = arr[t].nodelinks[s];
              ctx.beginPath();
              ctx.moveTo(arr[t].rposX, arr[t].rposY);
              ctx.lineTo(arr[myvar].rposX, arr[myvar].rposY);
              ctx.stroke();
          }
          ctx.fillStyle = arr[t].bcolor;
          ctx.fillRect(arr[t].rposX, arr[t].rposY, arr[t].rwidth, arr[t].rheigth);
          ctx.fillStyle = mytxtcolor;
          ctx.fillText(t, arr[t].rposX, arr[t].rposY);
      }
  }
}

// Paint out and redraw stuff on canvas
function paint_graph(arr) {
    ctx.lineWidth = 1;

    if (markarea == true) {
        markDraw();
    } else if (moveit == true) {
        moveDraw();
    } else if (reshape == true) {
        boundariesDraw();
    } else if (doreshape == true) {
        reshapeDraw();
    }

      graphDraw();
}

// Start animation "form"
function startanime() {
    //Start animation
    message2 = "";
    refresh = setInterval(redraw, 33);
}

// Stop animation "form"
function stopanime() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    message2 = "NO PAINTOUT"
    ctx.font = '18pt Calibri';
    ctx.fillStyle = 'white';
    ctx.fillText(message2, 500, 65);
    clearInterval(refresh);
    //stop_listeners();
}
