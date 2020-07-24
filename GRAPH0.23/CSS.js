/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function PT() {
    document.getElementById("PAINTOUT").classList.toggle("show");

}

function LS() {
       document.getElementById("LOADSAVE").classList.toggle("show");
}

function AG() {
       document.getElementById("AUTO").classList.toggle("show");
}

function EG() {
       document.getElementById("EDIT").classList.toggle("show");
}

function GD() {
       document.getElementById("DATA").classList.toggle("show");
}

function DG() {
       document.getElementById("DEBUG").classList.toggle("show");
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
