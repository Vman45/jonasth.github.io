function compareNumeric(a, b) {
    return a - b;
}

function sort_connection() {
    connected = true;
    var j = 0;
    var i = 0;
    var tempnode = 0;
    var tnode = new Array();
    //S� l�nge i �r mindre �n antal noder
    while (i < nodes) {
        //S� l�nge som k �r mindre �n antal element i "tnode array"
        for (var k = 0; k < tnode.length; k++) {
            //J�mf�r tnode=k med tempnode=0s l�nk j++ om lika h�mta n�sta l�nk
            if (arr[tempnode].nodelinks[j] == tnode[k]) {
                j++;
            }
        }
        tnode.sort(compareNumeric);
        if (j > links) {
            t = 0;
            while (t == tnode[t]) {
                t++;
            }
            connected = false;
            if (arr[tempnode].nodelinks.length == 0) t++;
            tempnode = t;
            tnode[tnode.length] = tempnode;
            printnode[i] = tempnode;
            i++;
            j = 0;
        } else {
            tempnode = arr[tempnode].nodelinks[j];
            tnode[tnode.length] = tempnode;
            printnode[i] = tempnode;
            i++;
            j = 0;
        }

    }
    return printnode;
}

function sortlinks() {
    //Sort each the links of each node
    for (i = 0; i < nodes; i++) {
        arr[i].nodelinks.sort(compareNumeric);
    }
}
