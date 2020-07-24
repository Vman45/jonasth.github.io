

function mainSplit() {
    strArr = str.split(separator);
    //alert("Did split text into string into Element Array! ["+strArr+"]");
}

function subSplit(x) {
    document.getElementById("istruct").value = "";
    subStrArr = strArr[x].split(subseparator);
    for (y = 0; y < subStrArr.length; y++) {
        encodeStruct(y);
    }
    //alert("Did split each Element into SubElement Array! ["+subStrArr+"]");
}



