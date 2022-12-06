
//all for one and one for all 
let httpsRequest;

//just so we know what's what
var allSwitchesJson;

//same here
var allSwitchesObj;

//keep track of what switch is currently being displayed
let currentSwitchIndex = 0;

//is useful for keeping track of where we want to go vs where we are currently
let requestedSwitchIndex;






// so I want to make sure an inital switch is loaded up and shown on load up 

function startUpLoad() {
    requestStartUpSwitches();

}

//so I want to make sure an inital switch is loaded up and shown on load up
//we will be loading up all switches, and have them ready to display in an array

function requestStartUpSwitches() {
    makeRequest();
}

function makeRequest() {
    httpsRequest = new XMLHttpRequest();
    if (!httpsRequest) {
        alert("Unable to create request");
        return false;
    }

    httpsRequest.onreadystatechange = pullAllSwitches;
    httpsRequest.open('GET', 'php/get_DB_data.php');
    // httpsRequest.open('GET', 'mySwitchItems.json');
    httpsRequest.send();

}

function pullAllSwitches() {
    try {
        if (httpsRequest.readyState === XMLHttpRequest.DONE) {
            if (httpsRequest.status === 200) {
                //request from get_data.php, all switches
                allSwitchesJson = httpsRequest.responseText;
                console.log(allSwitchesJson);
                //objectify the switches
                allSwitchesObj = JSON.parse(allSwitchesJson);
                console.log(allSwitchesObj);

                if (currentlyEditing) {
                    //we are editing, just redraw the table
                    redrawCurrentSwitch();
                } else {

                    displaySwitchesOnStartup();
                }

            } else {
                alert("Bro what heal you doing")
            }
        }
    } catch (error) {
        alert("Caught Exception: " + error.description);
        console.log(error);
    }
}

function displaySwitchesOnStartup() {
    //so now we want to display the switches, by a new function
    //we already have a switch table, and one switch body, 
    //and one switch row, so we will just add the rest of the switches to the switch body
    //and create and append another row 
    let SwitchTable = document.getElementById("switches");
    let SwitchBody = SwitchTable.lastElementChild;
    //add the first switch to the end of the switch body
    let SwitchRow = document.createElement("tr");
    SwitchBody.appendChild(SwitchRow);

    //we will drop in the first swithc, but the rest will be available to be displayed, in other functions
    SwitchBody.lastChild.innerHTML = "<td>" + allSwitchesObj[0].weight + "</td><td>" + allSwitchesObj[0].brand + "</td><td>" +
        allSwitchesObj[0].name + "</td><td>" + allSwitchesObj[0].price + "</td><td>" + allSwitchesObj[0].silent + "</td><td>" +
        allSwitchesObj[0].type + "</td><td>" + '<img src="' + allSwitchesObj[0].img + '">' + "</td><td>" + '<a href="' + allSwitchesObj[0].link + '"> Link </a>' +
        "</td><td>" + currentSwitchIndex + "</td><td>" + allSwitchesObj.length + "</td>";

    //I want to give the above image a height and width of 20px

    document.getElementsByTagName("img")[0].style.height = "75px";
    document.getElementsByTagName("img")[0].style.width = "75px";
}


function nextSwitch() {
    //so we want to display the next switch in the array
    //we will be using the currentSwitchIndex to keep track of which switch we are on

    //we will also need a new displaySwitches funtion, that will replace
    //the current switch with the next switch

    let SwitchTable = document.getElementById("switches");
    let SwitchBody = SwitchTable.lastElementChild;
    //find the last row in SwitchBody, and replace it's contents with the next switch

    if (currentSwitchIndex < allSwitchesObj.length - 1) {
        currentSwitchIndex++;
    } else {

        currentSwitchIndex = 0;
    }

    SwitchBody.lastChild.innerHTML = "<td>" + allSwitchesObj[currentSwitchIndex].weight
        + "</td><td>" + allSwitchesObj[currentSwitchIndex].brand + "</td><td>" +
        allSwitchesObj[currentSwitchIndex].name + "</td><td>" + allSwitchesObj[currentSwitchIndex].price
        + "</td><td>" + allSwitchesObj[currentSwitchIndex].silent + "</td><td>" +
        allSwitchesObj[currentSwitchIndex].type + "</td><td>" + '<img src="' + allSwitchesObj[currentSwitchIndex].img + '">'
        + "</td><td>" + '<a href="' + allSwitchesObj[currentSwitchIndex].link + '"> Link </a>' + "</td>"
        + "</td><td>" + currentSwitchIndex + "</td><td>" + allSwitchesObj.length + "</td>";

    document.getElementsByTagName("img")[0].style.height = "75px";
    document.getElementsByTagName("img")[0].style.width = "75px";
}

function prevSwitch() {
    //display previous switch in array 
    //we will be using the currentSwitchIndex to keep track of which switch we are on

    let SwitchTable = document.getElementById("switches");
    let SwitchBody = SwitchTable.lastElementChild;
    //find the last row in SwitchBody, and replace it's contents with the next switch

    if (currentSwitchIndex > 0) {
        currentSwitchIndex--;
    } else {
        currentSwitchIndex = allSwitchesObj.length - 1;
    }

    SwitchBody.lastChild.innerHTML = "<td>" + allSwitchesObj[currentSwitchIndex].weight
        + "</td><td>" + allSwitchesObj[currentSwitchIndex].brand + "</td><td>" +
        allSwitchesObj[currentSwitchIndex].name + "</td><td>" + allSwitchesObj[currentSwitchIndex].price
        + "</td><td>" + allSwitchesObj[currentSwitchIndex].silent + "</td><td>" +
        allSwitchesObj[currentSwitchIndex].type + "</td><td>" + '<img src="' + allSwitchesObj[currentSwitchIndex].img + '">'
        + "</td><td>" + '<a href="' + allSwitchesObj[currentSwitchIndex].link + '"> Link </a>' + "</td>"
        + "</td><td>" + currentSwitchIndex + "</td><td>" + allSwitchesObj.length + "</td>";

    document.getElementsByTagName("img")[0].style.height = "75px";
    document.getElementsByTagName("img")[0].style.width = "75px";

}

function firstSwitch() {
    //display first switch in array
    //we will be using the currentSwitchIndex to keep track of which switch we are on

    let SwitchTable = document.getElementById("switches");
    let SwitchBody = SwitchTable.lastElementChild;

    currentSwitchIndex = 0;
    SwitchBody.lastChild.innerHTML = "<td>" + allSwitchesObj[currentSwitchIndex].weight
        + "</td><td>" + allSwitchesObj[currentSwitchIndex].brand + "</td><td>" +
        allSwitchesObj[currentSwitchIndex].name + "</td><td>" + allSwitchesObj[currentSwitchIndex].price
        + "</td><td>" + allSwitchesObj[currentSwitchIndex].silent + "</td><td>" +
        allSwitchesObj[currentSwitchIndex].type + "</td><td>" + '<img src="' + allSwitchesObj[currentSwitchIndex].img + '">'
        + "</td><td>" + '<a href="' + allSwitchesObj[currentSwitchIndex].link + '"> Link </a>' + "</td>"
        + "</td><td>" + currentSwitchIndex + "</td><td>" + allSwitchesObj.length + "</td>";

    document.getElementsByTagName("img")[0].style.height = "75px";
    document.getElementsByTagName("img")[0].style.width = "75px";
}

function lastSwitch() {
    //display last switch in array

    let SwitchTable = document.getElementById("switches");
    let SwitchBody = SwitchTable.lastElementChild;


    currentSwitchIndex = allSwitchesObj.length - 1;
    if (currentSwitchIndex < 0) {
        console.log("No switches in array");
        return;
    }
    SwitchBody.lastChild.innerHTML = "<td>" + allSwitchesObj[currentSwitchIndex].weight
        + "</td><td>" + allSwitchesObj[currentSwitchIndex].brand + "</td><td>" +
        allSwitchesObj[currentSwitchIndex].name + "</td><td>" + allSwitchesObj[currentSwitchIndex].price
        + "</td><td>" + allSwitchesObj[currentSwitchIndex].silent + "</td><td>" +
        allSwitchesObj[currentSwitchIndex].type + "</td><td>" + '<img src="' + allSwitchesObj[currentSwitchIndex].img + '">'
        + "</td><td>" + '<a href="' + allSwitchesObj[currentSwitchIndex].link + '"> Link </a>' + "</td>"
        + "</td><td>" + currentSwitchIndex + "</td><td>" + allSwitchesObj.length + "</td>";

    document.getElementsByTagName("img")[0].style.height = "75px";
    document.getElementsByTagName("img")[0].style.width = "75px";
}

function sortSwitchByBrand() {
    // sort the array by brand, by making a get request to
    // getBrandSort.php, and then 
    // redraw the table with the new sorted array

    currentlyEditing = true;
    httpsRequest = new XMLHttpRequest();
    httpsRequest.onreadystatechange = pullAllSwitches;
    httpsRequest.open("GET", "getBrandSortS.php");
    httpsRequest.send();
}

function sortSwitchDefault() {
    // sort the array by default, simply by recalling 
    // pullAllSwitches(), with currently editing set to 
    // true so that the table is redrawn
    // global variable moment by setting 
    // isDefault if we care about making sure 
    // never to change the order of the array (I don't care)

    currentlyEditing = true;
    reLoadIfSuccessful();

}










startUpLoad();

