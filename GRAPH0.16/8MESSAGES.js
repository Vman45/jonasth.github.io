function messages_canvas() {
    if (timeB < stoptime) {
        message2 = "success!";
        txtcolor = "lightgreen";
    } else {
        message2 = "failure!";
        txtcolor = "yellow";
    }
    message = "SEARCH Regular graph " + param1 + ", Connected graph " + param2;
    message1 = "FOUND Regular graph " + regular + ", Connected graph " + connected + ", Time ms " + timeB;
}

function autograph_message() {
    autotext = "SEARCH Regular " + param1 + "\n" + "SEARCH Connected " + param2 + "\n" + "FOUND Regular " + regular + "\n" + "FOUND Connected " + connected + "\n";
   // update_GraphData();
}

function update_GraphData() {
    //alert("update");
    mytext = "";
    for (var i = 0; i < arr.length; i++) {
        mytext += "N " + i + " Links-> " + arr[i].nodelinks + "\n";
    }
    document.graph.data.value = autotext + mytext + "Paint Order " + printnode + "\n";
}

