let httpsRequest;


//var typedoc;

//okay so, we want to from here, first just create a skelleton that will 
//grab the json data, and send it as an alert, Later we will parse? it. 

function requestSwitches() {
    makeRequest1();
}

function makeRequest1() {
    httpsRequest = new XMLHttpRequest();
    if (!httpsRequest) {
        alert("Cannot create an XMLHTTP instance");
        return false;
    }
    httpsRequest.onreadystatechange = alertContents1;
    httpsRequest.open("GET", "mySwitches.json", true);
    httpsRequest.send();

}


function alertContents1() {
    try {
        if (httpsRequest.readyState === XMLHttpRequest.DONE) {
            if (httpsRequest.status === 200) {
                alert(httpsRequest.responseText);
            } else {
                alert("There was a problem with the request.");
            }
        }
    }
    catch (e) {
        alert("Caught Exception: " + e.description);
    }
}