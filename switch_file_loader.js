let httpsRequest;

var switchesJson;

var switchesObj;

let switchIndex = 0;

let indexSwitch;

let indexSwitchObj;
//var typedoc;

//okay so, we want to from here, first just create a skelleton that will 
//grab the json data, and send it as an alert, Later we will parse? it. 

function requestSwitches() {
    makeRequest1();
}


//I want to be able to pull the json file from the server, and then parse it,
//and then display it on the page.

//the first step in that, is just getting the raw json file right? Lets check the slides
//and see if we can find a way to do that.

function makeRequest1() {
    httpsRequest = new XMLHttpRequest();
    if (!httpsRequest) {
        alert("Unable to create request");
        return false;
    }
    //I want to display switches next in call back function
    httpsRequest.onreadystatechange = pullSwitches;
    //next for the get request, I want to get mySwitches.json from the server
    httpsRequest.open("GET", "mySwitches.json");
    //this is just sending the request
    httpsRequest.send();
}

//this is the callback function, that will display the switches
function pullSwitches() {
    //we want to make sure we have a try catch functino here, so that we can
    //catch any errors that might occur
    try {
        //check if request is done 
        if (httpsRequest.readyState === XMLHttpRequest.DONE) {
            //check if all is well
            if (httpsRequest.status === 200) {
                //grab de switches
                switchesJson = httpsRequest.responseText;
                //objectify the switches
                switchesObj = JSON.parse(switchesJson);
            } else {
                alert("Bro what heal you doing")
            }
        }
        
    } catch (gotEeem) {
        alert("Caught Exception: " + gotEeem.description);
    }
}

function displaySwitches() {
    let SwitchTable = document.getElementById("switches");
    let SwitchBody = document.createElement("tbody");
    SwitchTable.appendChild(SwitchBody);
    SwitchBody.setAttribute("id", "switchBody");
    SwitchTable.setAttribute("border", "1");
    //I want to create a table, and then populate it with the switches
    //the data for this table will come from switchesObj
    //I want to create one table row for now for the first switch
    SwitchBody.innerHTML = "<tr><td>" + "weight" + "</td><td>" + "house_mat" + "</td><td>" +
        "stem_mat" + "</td><td>" + "bottom_mat" + "</td><td>" + "brand" + "</td><td>" + "name" + "</td><td>" +
        "price" + "</td><td>" + "img" + "</td><td>" + "link" + "</td><td>";
    //now I want to create just one row for a switch, which we will dynamically change later
    //we will change the values of the row, based on the switch that is selected, 
    //we will browse through the switches with a next and previous buttons
    //we will also have a drop down menu, that will allow us to select a switch
    SwitchBody.appendChild(document.createElement("tr"));
    
    SwitchBody.lastChild.innerHTML = "<td>" + switchesObj[0].weight + "</td><td>" + switchesObj[0].house_mat + "</td><td>" +
    switchesObj[0].stem_mat + "</td><td>" + switchesObj[0].bottom_mat + "</td><td>" + switchesObj[0].brand + "</td><td>" +
    switchesObj[0].name + "</td><td>" + switchesObj[0].price + "</td><td>" + "</td><td>" + switchesObj[0].link + "</td><td>";


}

//I want to create a function that will allow me to change the values of the table
//by hitting next and previous buttons
function nextSwitch() {
    //I want to increment the switch index
    //while we should be grateful for c, we should remmeber to find better solutions 
    //such as this on our own without brute force
    let SwitchBody = document.getElementById("switchBody");

    if (switchIndex < switchesObj.length) {
        switchIndex++;
    } else {
        switchIndex = 0;
    }

    SwitchBody.lastChild.innerHTML = "<td>" + switchesObj[switchIndex].weight + "</td><td>" + switchesObj[switchIndex].house_mat + "</td><td>" +
    switchesObj[switchIndex].stem_mat + "</td><td>" + switchesObj[switchIndex].bottom_mat + "</td><td>" + switchesObj[switchIndex].brand + "</td><td>" +
    switchesObj[switchIndex].name + "</td><td>" + switchesObj[switchIndex].price + "</td><td>" + "</td><td>" + switchesObj[switchIndex].link + "</td><td>";
}

function prevSwitch() {
    //I want to decrement the switch index
    //safely of course
    let SwitchBody = document.getElementById("switchBody");
    if (switchIndex > 0) {
        switchIndex--;
    } else {
        switchIndex = switchesObj.length - 1;
    }

    //and then a little showing off
    SwitchBody.lastChild.innerHTML = "<td>" + switchesObj[switchIndex].weight + "</td><td>" + switchesObj[switchIndex].house_mat + "</td><td>" +
    switchesObj[switchIndex].stem_mat + "</td><td>" + switchesObj[switchIndex].bottom_mat + "</td><td>" + switchesObj[switchIndex].brand + "</td><td>" +
    switchesObj[switchIndex].name + "</td><td>" + switchesObj[switchIndex].price + "</td><td>" + "</td><td>" + switchesObj[switchIndex].link + "</td><td>";
}


//I want to grab a specific item from the array, who's index will be passed thanks to a variable 
//that will be passed to the function

function grabSwitch() {
    //I want to grab the switch at the index that is passed to the function
    //and then display it in the table
    let i = document.getElementById("switch_position").value;
    console.log(i);

    makeRequestIndex(i);
}

function makeRequestIndex(i) {
    httpsRequest = new XMLHttpRequest();
    if (!httpsRequest) {
        alert("Unable to create request");
        return false;
    }
    //I want to display a specific switch in a callback function
    httpsRequest.onreadystatechange = pullSwitch;
    //next for the get request, I want to get mySwitches.json from the server
    httpsRequest.open("GET", "GetSpecificSwitch.php?i=" + i);
    //this is just sending the request
    httpsRequest.send();
}

function pullSwitch() {
    //we want to make sure we have a try catch functino here, so that we can
    //catch any errors that might occur
    try {
        //check if request is done
        if (httpsRequest.readyState === XMLHttpRequest.DONE) {
            //check if all is well
            if (httpsRequest.status === 200) {
                //grab de switche
                indexSwitch = httpsRequest.responseText;
                //objectify the switch
                indexSwitchObj = JSON.parse(indexSwitch);
                console.log(indexSwitchObj);
            } else {
                alert("Bro what heal you doing")
            }
        }

    } catch (gotEeem) {
        alert("Caught Exception: " + gotEeem.description);
    }
}

function displaySwitchIndex() {
    //I want to display the switch that was grabbed from the server
    //I want to display it in the table

    //if we have not yet created the table, do this
    if (document.getElementById("singleSwitchBody") === null) {
    let SingleSwitchTable = document.getElementById("specific_switch");
    let SingleSwitchBody = document.createElement("tbody");
    SingleSwitchTable.appendChild(SingleSwitchBody);
    SingleSwitchBody.setAttribute("id", "singleSwitchBody");
    SingleSwitchTable.setAttribute("border", "1");


    SingleSwitchBody.innerHTML = "<tr><td>" + "weight" + "</td><td>" + "house_mat" + "</td><td>" +
        "stem_mat" + "</td><td>" + "bottom_mat" + "</td><td>" + "brand" + "</td><td>" + "name" + "</td><td>" +
        "price" + "</td><td>" + "img" + "</td><td>" + "link" + "</td><td>";
    //now I want to create just one row for a switch, which we will dynamically change later

    SingleSwitchBody.appendChild(document.createElement("tr"));
    SingleSwitchBody.lastChild.innerHTML = "<td>" + indexSwitchObj.weight + "</td><td>" + indexSwitchObj.house_mat + "</td><td>" +
    indexSwitchObj.stem_mat + "</td><td>" + indexSwitchObj.bottom_mat + "</td><td>" + indexSwitchObj.brand + "</td><td>" +
    indexSwitchObj.name + "</td><td>" + indexSwitchObj.price + "</td><td>" + "</td><td>" + indexSwitchObj.link + "</td><td>";
    } else {
        //if we have already created the table, we just want to change the values
        let SingleSwitchBody = document.getElementById("singleSwitchBody");
        SingleSwitchBody.lastChild.innerHTML = "<td>" + indexSwitchObj.weight + "</td><td>" + indexSwitchObj.house_mat + "</td><td>" +
        indexSwitchObj.stem_mat + "</td><td>" + indexSwitchObj.bottom_mat + "</td><td>" + indexSwitchObj.brand + "</td><td>" +
        indexSwitchObj.name + "</td><td>" + indexSwitchObj.price + "</td><td>" + "</td><td>" + indexSwitchObj.link + "</td><td>";

        

    }

}






// function makeRequest1() {
//     httpsRequest = new XMLHttpRequest();
//     if (!httpsRequest) {
//         alert("Cannot create an XMLHTTP instance");
//         return false;
//     }
//     httpsRequest.onreadystatechange = alertContents1;
//     httpsRequest.open("GET", "mySwitches.json", true);
//     httpsRequest.send();

// }


// function alertContents1() {
//     try {
//         if (httpsRequest.readyState === XMLHttpRequest.DONE) {
//             if (httpsRequest.status === 200) {
//                 alert(httpsRequest.responseText);
//             } else {
//                 alert("There was a problem with the request.");
//             }
//         }
//     }
//     catch (e) {
//         alert("Caught Exception: " + e.description);
//     }
// }