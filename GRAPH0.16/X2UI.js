/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
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

function UI_bwselect() {
    if (document.getElementById('bwselect').checked) {
        mybgcolor = "black";
        mytxtcolor = "cornsilk";
    } else {
        mybgcolor = "white";
        mytxtcolor = "black";
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
    } else {
        stopanime();
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
