
function quadratic_spline() {
// move to the first point
   var index = marklist.indexOf(0);
   ctx.moveTo(arr[index].rposX, arr[index].rposY);
   for (i = 1; i < marklist.length - 2; i ++)
   {
     index = marklist.indexOf(i);
     var indexB = marklist.indexOf(i+1);
     var xc = (arr[index].rposX + arr[indexB].rposX) / 2;
     var yc = (arr[index].rposY + arr[indexB].rposY) / 2;
     ctx.quadraticCurveTo(arr[index].rposX, arr[index].rposY, xc, yc);
   }
   index = marklist.indexOf(i);
   indexB = marklist.indexOf(i+1);

 // curve through the last two points
 ctx.quadraticCurveTo(arr[index].rposX, arr[index].rposY, arr[indexB].rposX,arr[indexB].rposY);
 }




//DRAWS A LINE from X1,Y1 to X2,Y2
function Linear_Interpolation(x1,y1,x2,y2){
var line=new Array();


return line;
}


// That's how you define the value of a pixel //
function drawPixel (x, y, r, g, b, a) {
    var index = (x + y * canvasWidth) * 4;
    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
}

// That's how you update the canvas, so that your //
// modification are taken in consideration //
function updateCanvas() {
    ctx.putImageData(canvasData, 0, 0);
}

function test(){
drawPixel(1, 1, 255, 0, 0, 255);
drawPixel(1, 2, 255, 0, 0, 255);
drawPixel(1, 3, 255, 0, 0, 255);
updateCanvas();
}
