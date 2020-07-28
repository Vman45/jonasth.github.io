function MAIN() {
    UI_select_animation();
    INTRO();
    document.getElementById('textdata').checked = true;
    AUTOGRAPH();
}

function INTRO() {
    mycount = 300;
    document.NoLinks.linkval.value = mycount;
    document.getElementById('mysubset').selectedIndex = 1;
    bananas = setInterval(function() {
        monkeybuisness();
    }, 10);
}

function monkeybuisness() {
    mycount--;
    document.NoLinks.linkval.value = mycount;
    AUTOGRAPH();
    if (links < 4) {
        clearInterval(bananas);

        document.getElementById('mysubset').selectedIndex = 0;
    }
}

function AUTOGRAPH() {
    arr = [];
    while (arr.length > 0) {
        arr.pop();
    }
    //Check UI inputs
    UI_autoinput();
    UI_autooutput();
    UI_select_subset();
    printnode = new Array;
    start_timer();
    generate_graph();
    sortlinks();
    UI_select_textdata();
    messages_canvas();
    selectPattern();
    message2 = "NODES " + arr.length;
}

function generate_graph() {
    found = false;
    while (found == false && timeB < stoptime) {
        arr = autoNodes();
        regular = autoLinks(arr);
        if (regular == true && param3 == true) printnode = sort_connection(arr);
        if (regular == param1 && connected == param2) {
            found = true;
        }
        var endB = new Date().getTime();
        timeB = endB - startB;
    }
    if (printnode.length == nodes) {} else {
        for (i = 0; i < nodes; i++) printnode[i] = i;
    }
    mytext += "Printnode " + printnode.length + "\n";
}


 
