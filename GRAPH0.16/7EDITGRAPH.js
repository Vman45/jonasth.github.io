function node_fetch() {
    for (t = 0; t < arr.length; t++) {
        if (mouseDown.x >= arr[t].rposX && mouseDown.x <= (arr[t].rposX + arr[t].rwidth) && mouseDown.y >= arr[t].rposY && mouseDown.y <= (arr[t].rposY + arr[t].rheigth)) {
            marklist[0]=t;
            moveit=true;
            posDifX[0]=0;
            posDifY[0]=0;
        }
    }
}

function moveMarked() {
    for (var t = 0; t < arr.length; t++) {
        if (mouseDown.x >= arr[t].rposX && mouseDown.x <= (arr[t].rposX + arr[t].rwidth) && mouseDown.y >= arr[t].rposY && mouseDown.y <= (arr[t].rposY + arr[t].rheigth)) {
            moveit=true;
            for (var s = 0; s < marklist.length; s++) {
                  movenode=marklist[s];
                  arr[movenode].hold=true;
                  posDifX[s]=arr[movenode].rposX-mouseDown.x;
                  posDifY[s]=arr[movenode].rposY-mouseDown.y;
            }
        }
    }
}



function move_release() {
  doreshape=false;
  reshape=false;
  moveit=false;
}

function reshape_release(){
  doreshape=false;
  reshape=false;
  findboundaries();
}

function markNode() {
    move_release();
    for (var t = 0; t < arr.length; t++) {
        if (mouseDown.x >= arr[t].rposX && mouseDown.x <= (arr[t].rposX + arr[t].rwidth) && mouseDown.y >= arr[t].rposY && mouseDown.y <= (arr[t].rposY + arr[t].rheigth)) {
            var index = marklist.indexOf(t);
            if (index === -1) {
              mark(t);
            } else {
              unmark(t,index)
            }
        }
    }
    marklist.sort();
    autotext = "Marked="+marklist+"\n";
    update_GraphData();
}

function mark(t){
  marklist.push(t);
  arr[t].rwidth = 15;
  arr[t].rheigth = 15;
  tmpcolor[t]=arr[t].bcolor;
  arr[t].bcolor = "red";
}

function unmark(t,index){
  marklist.splice(index, 1);
  arr[t].rwidth = 10;
  arr[t].rheigth = 10;
  arr[t].bcolor = tmpcolor[t];
}

function reShape(){
  if (marklist.length>0){
          findboundaries();
        if (mousePos.x>rightcornerX && mousePos.x<rightcornerX+30 && mousePos.y>downcornerY && mousePos.y < downcornerY+30){
        reshape=false;
        doreshape=true;
        oldX=rightcornerX;
        oldY=downcornerY;
        }
      }
}

function findboundaries() {
    var mindex=marklist[0];
    leftcornerX = arr[mindex].rposX;
    rightcornerX = arr[mindex].rposX;
    upcornerY = arr[mindex].rposY;
    downcornerY = arr[mindex].rposY;
    for (var j = 0; j < marklist.length; j++) {
        var mindex = marklist[j];
        if (arr[mindex].rposX < leftcornerX) leftcornerX = arr[mindex].rposX;
        if (arr[mindex].rposX > rightcornerX) rightcornerX = arr[mindex].rposX;
        if (arr[mindex].rposY < upcornerY) upcornerY = arr[mindex].rposY;
        if (arr[mindex].rposY > downcornerY) downcornerY = arr[mindex].rposY;
      }
markLengths();
reshape=true;
}

function markLengths(){
  var i=0;
  for (var j = 0; j < marklist.length; j++) {
    var move = marklist[j];
    Xlength[i] = arr[move].rposX-leftcornerX;
    Ylength[i] = arr[move].rposY-upcornerY;
    i++;
    }
}


function check_overlapping(){
  //alert("checking");
  overlapping=false;
  for(var b=0;b<arr.length;b++){
    if (mousePos.x >= arr[b].rposX && mousePos.x <= (arr[b].rposX + arr[b].rwidth) && mousePos.y >= arr[b].rposY && mousePos.y <= (arr[b].rposY + arr[b].rheigth))
     {
       overlapping=true;
       inarray = arr[b].nodelinks.indexOf(m-1);
       if (inarray == -1) {
       arr[m-1].nodelinks.push(b);
       arr[b].nodelinks.push(m-1);
       m=oldnode;
       out_update();
     }
  }
}
return overlapping;
}

function drawTool(){
  message2="DRAWTOOL SELECTED";
  justdraw=true;
  overlapping=false;
  for(var b=0;b<arr.length;b++){
    if (mousePos.x >= arr[b].rposX && mousePos.x <= (arr[b].rposX + arr[b].rwidth) && mousePos.y >= arr[b].rposY && mousePos.y <= (arr[b].rposY + arr[b].rheigth))
     {m=b;justdraw=false;selectednodeoverlap();} else {}
   }
  if (justdraw==true) {drawLine();justdraw=false;}
}

function selectednodeoverlap() {
    if (drawstart == true) {
        focus = true;
        message2 = "FOCUSED=" + m;
        oldnode = m;
        drawstart = false;
    } else {
        inarray = arr[m].nodelinks.indexOf(oldnode);
        if (inarray == -1 && m != oldnode) {
            arr[oldnode].nodelinks.push(m);
            arr[m].nodelinks.push(oldnode);
            drawstart = true;
            focus = false;
        }
    }
    out_update();
}


function drawLine() {
    if (drawstart == true) {
        standardcolor = rndColor();
        m = arr.length;
        arr[m] = {
            nodelinks: [],
            hold: false,
            rposX: mousePos.x,
            rposY: mousePos.y,
            rwidth: 10,
            rheigth: 10,
            rcolor: standardcolor,
            bcolor: standardcolor,
            print: true
        };
        nodes = m + 1;
        document.NoNodes.nodeval.value = nodes;
        drawstart = false;
        oldnode = m;
        out_update();
    } else if (drawstart == false) {
        standardcolor = rndColor();
        m = arr.length;
        check_overlapping();
        if (overlapping == false) {
            arr[m] = {
                nodelinks: [],
                hold: false,
                rposX: mousePos.x,
                rposY: mousePos.y,
                rwidth: 10,
                rheigth: 10,
                rcolor: standardcolor,
                bcolor: standardcolor,
                print: true
            };
            printnode[m] = m;
            if (m > 0 && focus == false) {
                inarray = arr[m].nodelinks.indexOf(m - 1);
                if (inarray == -1) {
                    arr[m].nodelinks.push(m - 1);
                    arr[m - 1].nodelinks.push(m);
                }
            } else if (m > 0 && focus == true) {
                inarray = arr[m].nodelinks.indexOf(oldnode);
                if (inarray == -1) {
                    arr[m].nodelinks.push(oldnode);
                    arr[oldnode].nodelinks.push(m);
                    focus = false;
                    oldnode = m;
                }
            }
        }
        oldnode = m;
        nodes = m + 1;
        document.NoNodes.nodeval.value = nodes;
        out_update();
    }
}

function out_update(){
  UI_autooutput();
  autotext = "Marked="+marklist+"\n";
  update_GraphData();
}

function createMarkedLinks() {
    move_release();
    var y = 0;
    for (var t = 0; t < marklist.length - 1; t++) {
        var x = y;
        y++;
        currentnode = marklist[t];
        //  alert("currentnode="+ marklist[t]);
        for (var s = 1 + x; s < marklist.length; s++) {
            nextnode = marklist[s];
            x++;
            inarray = arr[currentnode].nodelinks.indexOf(nextnode);
            if (inarray == -1) {
                arr[currentnode].nodelinks.push(nextnode);
                arr[nextnode].nodelinks.push(currentnode);
            }
        }
    }
    autotext = "Marked="+marklist+"\n";
    update_GraphData();
}

function removeMarkedLinks() {
   move_release();
    var y = 0;
    for (var t = 0; t < marklist.length - 1; t++) {
        var x = y;
        y++;
        currentnode = marklist[t];
        for (var s = 1 + x; s < marklist.length; s++) {
            nextnode = marklist[s];
            x++;
            inarray = arr[currentnode].nodelinks.indexOf(nextnode);
            if (inarray != -1) {
               var linkindex = arr[currentnode].nodelinks.indexOf(nextnode);
               arr[currentnode].nodelinks.splice(linkindex,1);
               linkindex = arr[nextnode].nodelinks.indexOf(currentnode);
               arr[nextnode].nodelinks.splice(linkindex,1);
           }
        }
    }
    autotext = "Marked="+marklist+"\n";
    update_GraphData();
}

function relNodes() {
   move_release();
    for (var t = 0; t < arr.length; t++) {
        if (arr[t].bcolor == "red") {
            arr[t].rwidth = 10;
            arr[t].rheigth = 10;
            arr[t].bcolor = tmpcolor[t];
        }
    }
    tmpcolor = [];
    marklist = [];
    autotext = "Marked=" + marklist + "\n";
    update_GraphData();
}

function createNode() {
    m = arr.length;
    standardcolor = rndColor();
    arr[m] = {
        nodelinks: [],
        hold: false,
        rposX: mousePos.x,
        rposY: mousePos.y,
        rwidth: 10,
        rheigth: 10,
        rcolor: standardcolor,
        bcolor: standardcolor,
        print: true
    };
    printnode[m] = m;
    nodes = m + 1;
    document.NoNodes.nodeval.value = nodes;
    UI_autooutput();
    autotext = "Marked="+marklist+"\n";
    update_GraphData();
}

function removeNode() {
    marklist=[];
    for (var t = 0; t < arr.length; t++) {
         if (mouseDown.x >= arr[t].rposX && mouseDown.x <= (arr[t].rposX + arr[t].rwidth) && mouseDown.y >= arr[t].rposY && mouseDown.y <= (arr[t].rposY + arr[t].rheigth)) {
            if (t > -1) {
               var tr = arr[t].nodelinks.length;
                for (s = 0; s < tr; s++) {
                    remove = arr[t].nodelinks[s];
                    var index = arr[remove].nodelinks.indexOf(t);
                    arr[remove].nodelinks.splice(index, 1);
                }
                arr[t].nodelinks=[];
              }
        reOrderArr(t);
        }
    }
    update_Marklist();
    autotext = "Marked="+marklist+"\n";
    update_GraphData();
}

function RMN() {
    if (z > -1) {
        var tr = arr[z].nodelinks.length;
        for (s = 0; s < tr; s++) {
            remove = arr[z].nodelinks[s];
            var index = arr[remove].nodelinks.indexOf(z);
            arr[remove].nodelinks.splice(index, 1);
        }
        arr[z].nodelinks = [];
    }
    if (zeromark == true) {
        marklist.pop();
    } else {
        marklist.splice(0, 1);
    }
    reOrderArr(z);
    autotext = "Marked=" + marklist + "\n";
    update_GraphData();
}

function removeMarkedNodes() {
   move_release();
    iterate = marklist.length;
    for (var x = 0; x < iterate; x++) {
        z = marklist[0];
        if (arr[arr.length - 1].bcolor == "red") {
            zeromark = true;
        } else {
            zeromark = false;
        }
        //  alert(z);
        RMN(z);
        update_Marklist();
    }
}

function update_Marklist(){
   marklist=[];
   var y=0;
   for (var t = 0; t < arr.length; t++) {
   if (arr[t].bcolor=="red"){marklist[y]=t; y++;}
   }
}

function reOrderArr(t) {
    arr[t].nodelinks = arr[arr.length - 1].nodelinks;
    arr[t].hold = arr[arr.length - 1].hold;
    arr[t].rposX = arr[arr.length - 1].rposX;
    arr[t].rposY = arr[arr.length - 1].rposY;
    arr[t].rwidth = arr[arr.length - 1].rwidth;
    arr[t].rheigth = arr[arr.length - 1].rheigth;
    arr[t].rcolor = arr[arr.length - 1].rcolor;
    arr[t].bcolor = arr[arr.length - 1].bcolor;
    arr[t].print = arr[arr.length - 1].print;
    last=arr.length-1;
    arr.pop();
    for (var s=0;s<arr.length;s++){
      for (var v=0;v<arr[s].nodelinks.length;v++){
        if (arr[s].nodelinks[v]==last) arr[s].nodelinks[v]=t;
      }
    }
}

function areaSelectDown() {
    markarea=true;
    areaPressDown=true;
    rightcornerX = 0;
    downcornerY = 0;
    leftcornerX = mouseDown.x;
    upcornerY = mouseDown.y;
    message2 = "AREA SELECT MOUSE DOWN";
}

function areaSelectUp() {
    areaPressDown=false;
    rightcornerX = mouseUp.x - mouseDown.x;
    downcornerY = mouseUp.y - mouseDown.y;
    message2 = "AREA SELECT MOUSE UP";
    areaMark();
    markarea=false;
}

function areaMark() {
    markindex = marklist.length;
    for (var t = 0; t < arr.length; t++) {
        if (leftcornerX <= arr[t].rposX && leftcornerX+rightcornerX >= (arr[t].rposX + arr[t].rwidth) && upcornerY <= arr[t].rposY && upcornerY+downcornerY >= (arr[t].rposY + arr[t].rheigth)) {
          var index = marklist.indexOf(t);
          if (index === -1) {
            mark(t);
          } else {
            unmark(t,index)
          }
        }
    }
    autotext = "Marked=" + marklist + "\n";
    update_GraphData();
}
