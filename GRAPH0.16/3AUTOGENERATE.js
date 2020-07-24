function autoNodes() {
    for (var m = 0; m < nodes; m++) {
        arr[m] = {
            nodelinks: [],
            hold: false,
            rposX: 0,
            rposY: 0,
            rposZ: 0,
            rwidth: 10,
            rheigth: 10,
            rcolor: "red",
            bcolor: "green",
            print: true
        };
        printnode[m] = m;
    }
    return arr;
}

function autoLinks(arr) {
    var i = 0;
    var j = 0;
    var newnode = false;
    while (i < nodes - 1) {
        j = arr[i].nodelinks.length;
        temparr = new Array();
        while (j < links) {
            dublett = false;
            // Only have to generate random values that is bigger than "i" otherwise node full / exhausted
            aLink = Math.floor(Math.random() * (nodes - 1 - i)) + i + 1;
            if (temparr[0] == null) {
                temparr[0] = aLink;
            }
            for (k = 0; k < arr[i].nodelinks.length; k++) {
                if (aLink == arr[i].nodelinks[k]) {
                    dublett = true;
                }
            }
            if (dublett == false && arr[aLink].nodelinks.length < links) {
                arr[i].nodelinks[arr[i].nodelinks.length] = aLink;
                arr[aLink].nodelinks[arr[aLink].nodelinks.length] = i;
                j++;
                newnode = true;
            }
            if (newnode == false) {
                inmylist = false;
                for (var m = 0; m < temparr.length; m++) {
                    if (temparr[m] == aLink) {
                        inmylist = true;
                    }
                }
                if (inmylist == false) {
                    temparr[temparr.length] = aLink;
                }
                scope = (nodes - 1) - i;

                if (temparr.length == scope) {
                    regular = false;
                    return regular;
                }
            }
            newnode = false;
        }
        i++;
    }
    if (arr[i].nodelinks.length < links) {
        regular = false;
        return regular;
    } else {
        regular = true;
        return regular;
    }

}
