function makeGrid(m){
    gridarr[m] ={
    XgridLine:XGpos,
    YgridLine:YGpos
  };
}

function makeNode(m){
  arr[m] = {
     nodelinks: [],
     hold: false,
     rposX: 0,
     rposY: 0,
     rwidth: 10,
     rheigth: 10,
     rcolor: "red",
     bcolor: "green",
     print: true,
     BcurveX1:[],
     BcurveY1:[],
     BcurveX2:[],
     BcurveY2:[],
     spineStartNode:undefined,
     splinePointX:[],
     splinePointY:[],
     splineEndNode:undefined,
     rposZ: 0
 };
 printnode[m]=m;
}

function makeXYnode(m) {
  arr[m] = {
     nodelinks: [],
     hold: false,
     rposX: mousePos.x,
     rposY: mousePos.y,
     rwidth: 10,
     rheigth: 10,
     rcolor: standardcolor,
     bcolor: standardcolor,
     print: true,
     BcurveX1:[],
     BcurveY1:[],
     BcurveX2:[],
     BcurveY2:[],
     rposZ: 0
 };
   printnode[m]=m;
}
