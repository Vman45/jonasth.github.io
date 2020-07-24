// Get X, Y cordinates mouse position
function getPosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// How program behave on mouse click, drag, drop
function mousedown_logic() {

    if (document.getElementById('movenode').checked) {
      reset_booleans;
      moveit=true;
      build_canvas();
      message2 = "MOVE NODE";
      if(marklist.length==0){markNode();Move();} else {Move();}
      if(beziers==true) {bezier_fetch();}
    } else if (document.getElementById('cnode').checked) {
        message2 = "CREATE MODE"
        createNode();
    } else if (document.getElementById('rnode').checked) {
        message2 = "REMOVE NODE"
        removeNode();
    } else if (document.getElementById('mnode').checked) {
        message2 = "MARK NODE"
        markNode();
    } else if (document.getElementById('area').checked) {
        message2 = "AREA SELECT NODES"
        areaSelectDown();
    } else if (document.getElementById('drawtool').checked) {
        message2 = "DRAWTOOL"
        drawTool();
    }   else if (document.getElementById('reshape').checked) {
        message2 = "MOVE / RESHAPE MARKED";
        moveReshape();
    }
}

function mouseup_logic() {
    if (document.getElementById('movenode').checked) {
        move_release();
        if(marklist.length==1)markUnmarkAll();
        message2 = "NODE DROP";
    } else if (document.getElementById('cnode').checked) {
        message2 = "NODES " + arr.length;
    } else if (document.getElementById('area').checked) {
        message2 = "AREA SELECT NODES"
        areaSelectUp();
    }  else if (document.getElementById('reshape').checked) {
        message2 = "MOVE / RESHAPED RELEASE";
        reshape_release();
        move_release();
        findboundaries();
    }
}

function stop_listeners() {
    canvas.removeEventListener('mouseup', start_listeners);
    canvas.removeEventListener('mousedown', start_listeners);
    canvas.removeEventListener('getPosition', start_listeners);
    canvas.removeEventListener("click", savepng);
    canvas.removeEventListener("click", saveGraph);
}

// Start listeners
function start_listeners() {
    mousePos = [0, 0];
    mouseDown = [0, 0];
    mouseUp = [0, 0];
    document.getElementById("saveit").addEventListener("click", saveGraph);
    document.getElementById("pushit").addEventListener("click", savepng);
    canvas.addEventListener("mouseup", function(evt) {
        mouseUp = getPosition(canvas, evt);
        //   message = 'Mouse up: ' + mouseUp.x + ',' + mouseUp.y;
        mouseup_logic();
    }, false);
    canvas.addEventListener("mousedown", function(evt) {
        mouseDown = getPosition(canvas, evt);
        //   message = 'Mouse down: ' + mouseDown.x + ',' + mouseDown.y;
        mousedown_logic();
    }, false);
    canvas.addEventListener('mousemove', function(evt) {
        mousePos = getPosition(canvas, evt);
        message = '                  Mouse: ' +Math.round(mousePos.x) + ',' +Math.round(mousePos.y);
    }, false);

    // DEBUG LISTENERS
    document.addEventListener('keydown', function(event) {
        if (event.keyCode == 67) {
            document.getElementById("cnode").checked = true;
        } else if (event.keyCode == 66) {
            document.getElementById("rnode").checked = true;
        } else if (event.keyCode == 69) {
           document.getElementById("rmnode").checked = true;
           removeMarkedNodes();
        } else if (event.keyCode == 74) {
           reset_booleans;
           moveit=true;
           build_canvas();
           document.getElementById("movenode").checked = true;
        } else if (event.keyCode == 71) {
            document.getElementById("mnode").checked = true;
        } else if (event.keyCode == 70) {
            document.getElementById("relnodes").checked = true;
            reset_booleans();
            markarea=true;
            markUnmarkAll();
            build_canvas();
            document.getElementById("movenode").checked = true;
        } else if (event.keyCode == 65) {
            document.getElementById("area").checked = true;
        } else if (event.keyCode == 72) {
            document.getElementById("cmlink").checked = true;
            createMarkedLinks();
        } else if (event.keyCode == 73) {
            document.getElementById("rmlink").checked = true;
            removeMarkedLinks();
        } else if (event.keyCode == 68) {
            document.getElementById("drawtool").checked = true;
        } else if (event.keyCode == 82) {
          document.getElementById("reshape").checked = true;
        } else if (event.keyCode == 17) {
            drawstart = true;
            message2="SET FOCUS"
        } else if (event.keyCode == 16) {
            shiftpress = true;
        } else if (event.keyCode == 84) {
            document.getElementById("beziercurve").checked = true;
            bezier_curve();
        }
    });
}

function reset_booleans(){
  markarea=false;
  doreshape=false;
  reshape=false;
  moveit=false;
  holdbezier1=false;
  holdbezier2=false;
}
