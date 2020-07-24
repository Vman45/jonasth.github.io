function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

function savepng() {
    var mypic = canvas.toDataURL('image/jpg', 0.5);
    var anobject = document.createElement('a');
    anobject.href = mypic;
    anobject.download = document.snap.filename.value;
    anobject.click();
}

function loadGraph() {
    arr = new Array;
    var fileToLoad = document.getElementById("fileToLoad").files[0];
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        document.debug.data.value = textFromFileLoaded;
        var radarray = textFromFileLoaded.split("\r\n");
        nodes = radarray.length - 1;
        UI_autooutput();


        for (var m = 0; m < radarray.length - 1; m++) {
            arr[m] = {
                nodelinks: [],
                hold: false,
                rposX: 0,
                rposY: 0,
                rwidth: 10,
                rheigth: 10,
                rcolor: "red",
                bcolor: "green"
            };
            printnode[m] = m;
        }
        var x = 0;
        while (x < radarray.length - 1) {
            var dataitem = [];
            dataitem = radarray[x].split("*");
            if (dataitem[1] !== "") {
                var nlinks = dataitem[1].split(",");
                var b = 0;
                while (b < nlinks.length) {
                    arr[x].nodelinks[b] = parseInt(nlinks[b]);
                    b++;
                }
            }
            arr[x].hold = false;
            arr[x].rposX = parseInt(dataitem[3]);
            arr[x].rposY = parseInt(dataitem[4]);
            arr[x].rwidth = parseInt(dataitem[5]);
            arr[x].rheigth = parseInt(dataitem[6]);
            arr[x].rcolor = dataitem[7];
            arr[x].bcolor = dataitem[8];
            if (dataitem[9] == "true") {
                arr[x].print = true;
            } else {
                arr[x].print = false;
            }
            x++;
        }
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}

function saveGraph() {
    var textToSave = "";
    for (var m = 0; m < arr.length; m++) {
        var xx = parseInt(arr[m].rposX);
        var yy = parseInt(arr[m].rposY);
        textToSave += m + "*" + arr[m].nodelinks + "*" + arr[m].hold + "*" + xx + "*" + yy + "*" + arr[m].rwidth + "*" + arr[m].rheigth + "*" + arr[m].rcolor + "*" + arr[m].bcolor + "*" + arr[m].print + "\r\n";
    }
    var textToSaveAsBlob = new Blob([textToSave], {
        type: "text/plain"
    });
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = document.savegraph.filename.value;
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}
