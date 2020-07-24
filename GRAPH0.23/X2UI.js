function UI_background(){
   gridcolor="darkgray";
   if (document.getElementById('invback').checked){
     mybgcolor="black";
     mytxtcolor="white";

  } else {
    mybgcolor="white";
    mytxtcolor="black";
  }
}

function UI_grid(){
    grid=autoGrid();

   if (!document.getElementById('drawgrid').checked) {grid=false;} else {grid=true;}
}

function UI_autoinput() {
    connected = false;
    regular = false;
    timeB = 0;
    links = document.NoLinks.linkval.value * 1;
    nodes = document.NoNodes.nodeval.value * 1;
    subset = document.getElementById("mysubset").value;
    paint = document.getElementById("mySelect").value;
    param1 = document.getElementById('regular').checked;
    param2 = document.getElementById('connected').checked;
    param3 = document.getElementById('sort').checked;
}

function UI_autooutput() {
    mytxtname = "N" + nodes + "L" + links + paint + ".txt";
    mypicname = "N" + nodes + "L" + links + paint + ".jpg";
    document.savegraph.filename.value = mytxtname;
    document.snap.filename.value = mypicname;
}



function UI_handleselect() {
    if (document.getElementById('nhandles').checked) {
        handles = true;
    } else {
        handles =  false;
    }
}

function UI_bhandleselect() {
    if (document.getElementById('bhandles').checked) {
        bhandles = true;
    } else {
        bhandles =  false;
    }
}

function UI_select_subset() {
    if (subset == "L*d+1=N") {
        if (document.lmultiple.lmult.value == "NaN") multiple = 1;
        document.getElementsByName("lmult").disabled = "false";
        document.lmultiple.lmult.value = multiple;
        nodes = (links * multiple) + 1;
    } else if (subset == "All") {
        document.getElementsByName("lmult").disabled = "true";
        document.lmultiple.lmult.value = "NaN";
    }
    document.NoNodes.nodeval.value = nodes;
}

//Select animation
function UI_select_animation() {
    if (document.getElementById('graphic').checked) {
        startanime();
        //alert("started anime");
    } else {
        stopdraw_canvas();
        stopanime();
      //  alert("stopped anime");
    }
}

function UI_select_textdata() {
    if (document.getElementById('textdata').checked) {
        autograph_message();
    } else {
        document.graph.data.value = "";
    }
}

function start_timer() {
    startB = new Date().getTime();
    stoptime = getTimer();
}

function getTimer() {
    timer = document.getElementById("time").value;
    if (timer == "0.2") {
        stoptime = 200;
    }
    if (timer == "2") {
        stoptime = 2000;
    } else if (timer == "5") {
        stoptime = 5000;
    } else if (timer == "15") {
        stoptime = 15000;
    } else if (timer == "45") {
        stoptime = 45000;
    } else if (timer == "900") {
        stoptime = 900000;
    } else if (timer == "3600") {
        stoptime = 3600000;
    }
    return stoptime;
}

function selectPattern() {
    paint = document.getElementById("mySelect").value;
    if (paint == "random") {
        randomNodes();
    } else if (paint == "circle") {
        circleNodes();
    } else if (paint == "elipse") {
        elipseNodes();
    } else if (paint == "spiral") {
        spiralNodes();
    } else if (paint == "phylotaxi") {
        phylotaxiNodes();
    } else if (paint == "swirl") {
        swirlNodes();
    }
}

function plusN() {
    nodes++;
    document.NoNodes.nodeval.value = nodes;
    AUTOGRAPH();
}

function minusN() {
    nodes--;
    document.NoNodes.nodeval.value = nodes;
    AUTOGRAPH();
}

function plusL() {
    links++;
    document.NoLinks.linkval.value = links;
    AUTOGRAPH();
}

function minusL() {
    links--;
    document.NoLinks.linkval.value = links;
    AUTOGRAPH();
}

function plusM() {
    if (subset == "L*d+1=N") {
        multiple++;
        //multiple=7;
        document.lmultiple.lmult.value = multiple;
        AUTOGRAPH();
    }
}

function minusM() {
    if (subset == "L*d+1=N") {
        multiple--;
        // multiple=7;
        document.lmultiple.lmult.value = multiple;
        AUTOGRAPH();
    }
}
