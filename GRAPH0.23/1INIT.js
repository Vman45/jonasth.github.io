// Onload
function scriptload() {
    canvas = document.getElementById("myCanvas");
    canvaswidth = canvas.width;
    canvasheight = canvas.height;
    ctx = canvas.getContext("2d");
    //Start listeners
    start_listeners();
    //Init
    initscript();
    UI_background();
    UI_grid();
    DEMO();
    UI_select_animation();
    AUTOGRAPH();

}

/* INIT */
function initscript() {
    //Init booleans
    grid=true;
    beziers=false;
    holdbezier1=false;
    holdbezier2=false;
    bhandles=true;
    handles=true;
    markarea=false;
    doreshape=false;
    reshape=false;
    moveit=true;
    focus=false;
    shiftpress=false;
    drawstart=true;
    areaPressDown=undefined;
    // Init textstring values
    mytext = "";
    autotext = "";
    message = "";
    //Init cordinates
    leftcornerX=0;
    upcornerY=0;
    rightcornerX=0;
    downcornerY=0;
    //Init gridvalues
    linespace=20;
    gridSize=canvaswidth/linespace;
    //Autograph
    multiple = 1;
    //Create empty nodearray
    arr = new Array();
    callfunctions = new Array();
    gridarr= new Array();
    Xlength= new Array();
    Ylength= new Array();
    posDifX = new Array();
    posDifY = new Array();
    marklist = new Array();
    tmpcolor=new Array();
    /*CALL MAIN */

}
