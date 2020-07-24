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
        message2 = "MOVE"
        node_fetch();
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
    }  else if (document.getElementById('movemarked').checked) {
        message2 = "MOVE MARKED"
        moveMarked();
    }   else if (document.getElementById('reshaper').checked) {
        message2 = "RESHAPE MARKED";
        reShape();
    }
}

function mouseup_logic() {
    if (document.getElementById('movenode').checked) {
        move_release();
        message2 = "NODE RELEASE";
    } else if (document.getElementById('cnode').checked) {
        message2 = "NODES " + arr.length;
    } else if (document.getElementById('area').checked) {
        message2 = "AREA SELECT NODES"
        areaSelectUp();
    }  else if (document.getElementById('movemarked').checked) {
        message2 = "RELEASE MOVED"
        move_release();
    }  else if (document.getElementById('reshaper').checked) {
        message2 = "RESHAPE RELEASED";
        reshape_release();
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
        //  message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    }, false);

    // DEBUG LISTENERS
    document.addEventListener('keydown', function(event) {
        if (event.keyCode == 65) {
            document.getElementById("cnode").checked = true;
        } else if (event.keyCode == 66) {
            document.getElementById("rnode").checked = true;
        } else if (event.keyCode == 67) {
            document.getElementById("rmnode").checked = true;
        } else if (event.keyCode == 68) {
            document.getElementById("movenode").checked = true;
        } else if (event.keyCode == 69) {
            document.getElementById("mnode").checked = true;
        } else if (event.keyCode == 70) {
            document.getElementById("relnodes").checked = true;
        } else if (event.keyCode == 71) {
            document.getElementById("area").checked = true;
        } else if (event.keyCode == 72) {
            document.getElementById("cmlink").checked = true;
        } else if (event.keyCode == 73) {
            document.getElementById("rmlink").checked = true;
        } else if (event.keyCode == 74) {
            document.getElementById("drawtool").checked = true;
            drawTool();
        } else if (event.keyCode == 17) {
            drawstart = true;
            message2="SET FOCUS"
        } else if (event.keyCode == 16) {
            shiftpress = true;
        }
    });
}
