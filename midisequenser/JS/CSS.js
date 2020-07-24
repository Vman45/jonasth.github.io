function showDiv(idInfo) {
  var sel = document.getElementById('divLinks').getElementsByTagName('div');
  for (var i=0; i<sel.length; i++) {
    sel[i].style.display = 'none';
  }
  document.getElementById('container'+idInfo).style.display = 'block';
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

function inports() {
    document.getElementById("inports").classList.toggle("show");
    
}

function synthEditor() {
    document.getElementById("synthedit").classList.toggle("show");
}


function SF() {
    document.getElementById("SF").classList.toggle("show");
}

function menu() {
    document.getElementById("menu").classList.toggle("show");
    
}
var EEopen=false;

function EE() {
    document.getElementById("EE").classList.toggle("show");
    
}

function RR() {
    document.getElementById("RR").classList.toggle("show");
    
}

function LL() {
    document.getElementById("LL").classList.toggle("show");
}

function QQ() {
    document.getElementById("QQ").classList.toggle("show");
}

function PT() {
    document.getElementById("PAINTOUT").classList.toggle("show");

}

function VK() {
       document.getElementById("VK").classList.toggle("show");
}

function VD() {
       document.getElementById("VD").classList.toggle("show");
}

function INS() {
       document.getElementById("INS").classList.toggle("show");
}

function MA() {
       document.getElementById("MA").classList.toggle("show");
	  
	   dataToTextArea();
}

function MQ() {
       document.getElementById("MQ").classList.toggle("show");
}

function MB() {
       document.getElementById("MB").classList.toggle("show");
}


function TRED() {
	   if (edOpen==true){} else { document.getElementById("TRED").classList.toggle("show"); edOpen=true;}
}

function TREDHTML(){
	if (edOpen==true){edOpen=false}else if (edOpen==false){edOpen=true}
	document.getElementById("TRED").classList.toggle("show"); }

function MD() {
       document.getElementById("MD").classList.toggle("show");
}

function ME() {
       document.getElementById("ME").classList.toggle("show");
}

function MM() {
       document.getElementById("MM").classList.toggle("show");
}

function MT() {
       document.getElementById("MT").classList.toggle("show");
}

var MJopen=false;

function MJ() {
       document.getElementById("MJ").classList.toggle("show");
   
}

function TT() {
       document.getElementById("TT").classList.toggle("show");
   
}

function myFunction() {
    var x = document.getElementById('menu');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
    //    openDropdown.classList.remove('show');
      }
    }
  }
}
