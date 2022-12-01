//let httpsRequest;

var singleSwitchJson;

var singleSwitchObj;

//let switchIndex = 0;

function requestSingleSwitch() {
    makeSingleRequest();
}

function makeSingleRequest() {

    //I want to try loading a single switch by calling the get_data.php file
    httpsRequest = new XMLHttpRequest();
    if (!httpsRequest) {
        alert("Unable to create request");
        return false;
    }
    //I want to display a single switch that is echoed from the php file, in the callback function

    httpsRequest.onreadystatechange = pullSingleSwitch;
    //next for the get request, I am going to ask for the get_data.php file, which will send our switch data
    httpsRequest.open("GET", "get_data.php");
    //this is just sending the request
    httpsRequest.send();

}

function pullSingleSwitch() {
    //so next get_data.php will send over (in theory) just one switch 
    //we will grab that one switch, and display it, as one does 

    try {
        if (httpsRequest.readyState === XMLHttpRequest.DONE) {
            if (httpsRequest.status === 200) {
                //request from get_data.php, one switch
                singleSwitchJson = httpsRequest.responseText;
                //objectify the switch
                singleSwitchObj = JSON.parse(singleSwitchJson);
                console.log(singleSwitchObj);

            } else {
                alert("Bro what heal you doing")
            }
        }
    } catch (error) {
        alert("Caught Exception: " + error.description);
    }
}

function displaySingleSwitch() {
    //so now we want to display the switch, by a new function
    let SwitchTable = document.getElementById("switches");
    let SwitchBody = document.createElement("tbody");
    SwitchTable.appendChild(SwitchBody);
    SwitchBody.setAttribute("id", "switchBody");
    SwitchTable.setAttribute("border", "1");

    SwitchBody.innerHTML = "<tr><td>" + "weight" + "</td><td>" + "house_mat" + "</td><td>" +
        "stem_mat" + "</td><td>" + "bottom_mat" + "</td><td>" + "brand" + "</td><td>" + "name" + "</td><td>" +
        "price" + "</td><td>" + "img" + "</td><td>" + "link" + "</td><td>";

    //sub switchesObj for singleSwitchObj

    SwitchBody.appendChild(document.createElement("tr"));

    SwitchBody.lastChild.innerHTML = "<td>" + singleSwitchObj.weight + "</td><td>" + singleSwitchObj.house_mat + "</td><td>" +
    singleSwitchObj.stem_mat + "</td><td>" + singleSwitchObj.bottom_mat + "</td><td>" + singleSwitchObj.brand + "</td><td>" + singleSwitchObj.name + "</td><td>" +
    singleSwitchObj.price + "</td><td>" + singleSwitchObj.img + "</td><td>" + singleSwitchObj.link + "</td><td>";

}

var specificSwitch;

var specificSwitchObj;

function requestSpecificSwitch(x) {
    makeSpecificRequest(x);
}

function makeSpecificRequest(y) {
    
        //I want to try loading a single switch by calling the get_data.php file
        httpsRequest = new XMLHttpRequest();
        if (!httpsRequest) {
            alert("Unable to create request");
            return false;
        }
        //I want to display a single switch that is echoed from the php file, in the callback function
    
        httpsRequest.onreadystatechange = pullSpecificSwitch;
        //next for the get request, I am going to ask for the get_data.php file, which will send our switch data
        httpsRequest.open("POST", "GetSpecificSwitch.php");
        //this is just sending the request
        httpsRequest.send(y);
    
}