function DEMO() {
    document.getElementById('textdata').checked = true;
    mycount = 48;
    document.NoLinks.linkval.value = mycount;
    document.getElementById('mysubset').selectedIndex = 1;
    tiresome = setInterval(function() {
        monkeybuisness();
    }, 0);
}

function monkeybuisness() {
    document.NoLinks.linkval.value = mycount;
    AUTOGRAPH();
    if (nodes < 5) {
        clearInterval(tiresome);
        document.getElementById('mysubset').selectedIndex = 0;

    }
  mycount--;
}
