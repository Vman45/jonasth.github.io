function phylotaxiNodes() {
    var width = 1000;
    var height = 1000;
    var nbr_circles = nodes;
    var phi = (Math.sqrt(5) + 1) / 2 - 1;
    // golden ratio
    var golden_angle = phi * 2 * Math.PI;
    // golden angle
    var lg_rad = width * .45;
    var sm_rad = 2;
    var cx = width / 2;
    var cy = height / 2;
    for (var m = 0; m < arr.length; m++) {
        nodeout = printnode[m];
        var ratio = m / nbr_circles;
        var angle = m * golden_angle;
        var spiral_rad = ratio * lg_rad;
        var MX = cx + Math.cos(angle) * spiral_rad;
        var MY = cy + Math.sin(angle) * spiral_rad;
        mycolor = rndColor();
        arr[nodeout].rposX = Math.round(MX);
        arr[nodeout].rposY = Math.round(MY);
        arr[nodeout].rcolor = mycolor;
        arr[nodeout].bcolor = mycolor;
    }
}

function spiralNodes() {
    for (var m = 0; m < arr.length; m++) {
        nodeout = printnode[m];
        angle = 19.0 * m;
        MX = (angle) * Math.cos(angle) + 300;
        MY = (angle) * Math.sin(angle) + 400;
        mycolor = rndColor();
        arr[nodeout].rposX = Math.round(MX);
        arr[nodeout].rposY = Math.round(MY);
        arr[nodeout].rcolor = mycolor;
        arr[nodeout].bcolor = mycolor;
    }
}

function swirlNodes() {
    for (var m = 0; m < nodes; m++) {
        nodeout = printnode[m];
        angle = 10.014 * m;
        MX = (20 + angle) * Math.cos(angle) + 500;
        MY = (2 + angle) * Math.sin(angle) + 400;
        mycolor = rndColor();
        arr[nodeout].rposX = Math.round(MX);
        arr[nodeout].rposY = Math.round(MY);
        arr[nodeout].rcolor = mycolor;
        arr[nodeout].bcolor = mycolor;
    }
}

function circleNodes() {
    var step = 2 * Math.PI / (nodes);
    var h = 600;
    var k = 410;
    var r = 320;
    m = 0;
    theta = 0;
    for (var m = 0; m < arr.length; m++) {
        nodeout = printnode[m];
        var MX = h + r * Math.cos(theta);
        var MY = k - r * Math.sin(theta);
        mycolor = rndColor();
        arr[nodeout].rposX = Math.round(MX);
        arr[nodeout].rposY = Math.round(MY);
        arr[nodeout].rcolor = mycolor;
        arr[nodeout].bcolor = mycolor;
        theta += step

    }
}

function elipseNodes() {
    message2 = "elipse";
    var step = 2 * Math.PI / nodes;
    var h = 600;
    var k = 410;
    var r = 500;
    m = 0;
    theta = 0;
    for (var m = 0; m < arr.length; m++) {
        nodeout = printnode[m];
        var MX = h + 0.2 * r * Math.cos(theta);
        var MY = k - 0.5 * r * Math.sin(theta);
        mycolor = rndColor();
        arr[nodeout].rposX = Math.round(MX);
        arr[nodeout].rposY = Math.round(MY);
        arr[nodeout].rcolor = mycolor;
        arr[nodeout].bcolor = mycolor;
        theta += step
    }
}

function randomNodes() {
    var k = 0;
    min = 30;
    max = 830;
    while (k < arr.length) {
        space = 800 * 800;
        nodespace = space / nodes;
        nodespace = Math.sqrt(nodespace) / 2;
        dodot = true;
        MX = Math.floor(Math.random() * (max - min)) + min;
        MY = Math.floor(Math.random() * (max - min)) + min;
        for (var i = 0; i < arr.length; i++) {
            testx = Math.abs(arr[i].rposX - MX);
            testy = Math.abs(arr[i].rposY - MY);
            if (testx < nodespace && testy < nodespace) {
                dodot = false;
            }
        }
        if (dodot == true) {
            mycolor = rndColor();
            arr[nodeout].rposX = Math.round(MX);
            arr[nodeout].rposY = Math.round(MY);
            arr[nodeout].rcolor = mycolor;
            arr[nodeout].bcolor = mycolor;
            k++;
        }
    }
}
