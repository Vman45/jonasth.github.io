function AUTOGRAPH() {
    arr = [];
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
