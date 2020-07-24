// Onload
function scriptload() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    UI_bwselect();
    ctx.fillStyle = mybgcolor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //Start listeners
    start_listeners();
    //Init
    initscript();
}

/* INIT */
function initscript() {
    // Init string values
    markarea=false;
    doreshape=false;
    reshape=false;
    moveit=false;
    focus=false;
    shiftpress=false;
    drawstart=true;
    mytext = "";
    autotext = "";
    message = "";
    leftcornerX=0;
    upcornerY=0;
    rightcornerX=0;
    downcornerY=0;
    areaPressDown=undefined;
    //Create empty nodearray
    arr = new Array();
    Xlength= new Array();
    Ylength= new Array();
    posDifX = new Array();
    posDifY = new Array();
    marklist = new Array();
    tmpcolor=new Array();
    multiple = 1;
    /* MAIN */
    MAIN();
}
