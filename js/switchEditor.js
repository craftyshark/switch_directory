//here I will turn the current tables into inputs so that the user can edit the data

//please donut judge my global variables

let currentlyEditing = false;

function editSwitch() {
  //we will be using the currentSwitchIndex to keep track of which switch we are on

  let SwitchTable = document.getElementById("switches");
  let SwitchBody = SwitchTable.lastElementChild;
  //find the last row in SwitchBody, and replace it's contents with the next switch

  if (currentlyEditing == false) {
    SwitchBody.lastChild.innerHTML =
      "<td>" +
      '<input type="text" id="weight" value="' +
      allSwitchesObj[currentSwitchIndex].weight +
      '">' +
      "</td><td>" +
      '<input type="text" id="brand" value="' +
      allSwitchesObj[currentSwitchIndex].brand +
      '">' +
      "</td><td>" +
      '<input type="text" id="name" value="' +
      allSwitchesObj[currentSwitchIndex].name +
      '">' +
      "</td><td>" +
      '<input type="text" id="price" value="' +
      allSwitchesObj[currentSwitchIndex].price +
      '">' +
      //okay so this specific part is going to be disgusting as I have to force it to work with the boolean value
      //tldr: two radio buttons.
      "</td><td>" +
      '<input type="radio" id="silent_true" name="silent" value="silent"> Silent' +
      '<input type="radio" id="silent_false" name="silent" value="Non-silent"> Non-Silent' +
      "</td><td>" +
      '<input type="text" id="type" value="' +
      allSwitchesObj[currentSwitchIndex].type +
      '">' +
      "</td><td>" +
      '<input type="text" id="img" value="' +
      allSwitchesObj[currentSwitchIndex].img +
      '">' +
      "</td><td>" +
      '<input type="text" id="link" value="' +
      allSwitchesObj[currentSwitchIndex].link +
      '">' +
      "</td><td>" +
      currentSwitchIndex +
      "</td><td>" +
      allSwitchesObj.length +
      "</td>";
    currentlyEditing = true;
  } else {
    cancelEditingSwitches();
  }

  //now we need to set the radio buttons to the correct value
  if (allSwitchesObj[currentSwitchIndex].silent == true) {
    document.getElementById("silent_true").checked = true;
  } else {
    document.getElementById("silent_false").checked = true;
  }
}

function cancelEditingSwitches() {
  //we will be using the currentSwitchIndex to keep track of which switch we are on

  let SwitchTable = document.getElementById("switches");
  let SwitchBody = SwitchTable.lastElementChild;
  //find the last row in SwitchBody, and replace it's contents with the current switch
  SwitchBody.lastChild.innerHTML =
    "<td>" +
    allSwitchesObj[currentSwitchIndex].weight +
    "</td><td>" +
    allSwitchesObj[currentSwitchIndex].brand +
    "</td><td>" +
    allSwitchesObj[currentSwitchIndex].name +
    "</td><td>" +
    allSwitchesObj[currentSwitchIndex].price +
    "</td><td>" +
    allSwitchesObj[currentSwitchIndex].silent +
    "</td><td>" +
    allSwitchesObj[currentSwitchIndex].type +
    "</td><td>" +
    '<img src="' +
    allSwitchesObj[currentSwitchIndex].img +
    '">' +
    "</td><td>" +
    '<a href="' +
    allSwitchesObj[currentSwitchIndex].link +
    '"> Link </a>' +
    "</td>" +
    "</td><td>" +
    currentSwitchIndex +
    "</td><td>" +
    allSwitchesObj.length +
    "</td>";

  document.getElementsByTagName("img")[0].style.height = "75px";
  document.getElementsByTagName("img")[0].style.width = "75px";

  currentlyEditing = false;
}

function saveEdits() {
  //we now want to save the edits of the input fields of our table to json, and then send that to the server
  //to be saved to the database
  //we will then redraw the table with the new data, just to make sure it worked

  //first we need to get the data from the input fields
  let weight = parseInt(document.getElementById("weight").value);
  let brand = document.getElementById("brand").value;
  let name = document.getElementById("name").value;
  let price = parseInt(document.getElementById("price").value);
  let silent = document.getElementById("silent_true").checked;
  let type = document.getElementById("type").value;
  let img = document.getElementById("img").value;
  let link = document.getElementById("link").value;

  //now we need to update the object
  allSwitchesObj[currentSwitchIndex].weight = weight;
  allSwitchesObj[currentSwitchIndex].brand = brand;
  allSwitchesObj[currentSwitchIndex].name = name;
  allSwitchesObj[currentSwitchIndex].price = price;
  allSwitchesObj[currentSwitchIndex].silent = silent;
  allSwitchesObj[currentSwitchIndex].type = type;
  allSwitchesObj[currentSwitchIndex].img = img;
  allSwitchesObj[currentSwitchIndex].link = link;

  //now we need to send the object to the server
  //first we need to convert the object to a json string
  let json = JSON.stringify(allSwitchesObj);

  //now we need to send the json string to the server
  //we will do that with a post request, to a php file that will save the json string to a database

  //first we need to create a new XMLHttpRequest object

  requestJsonSave(json);
}

function requestJsonSave(json) {
  httpsRequest = new XMLHttpRequest();
  if (!httpsRequest) {
    alert("Unable to create request");
    return false;
  }

  httpsRequest.onreadystatechange = reLoadIfSuccessful;
  httpsRequest.open("POST", "delete_resave.php");
  httpsRequest.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  httpsRequest.send("json=" + json);
}

function reLoadIfSuccessful() {
  if (httpsRequest.readyState === XMLHttpRequest.DONE) {
    if (httpsRequest.status === 200) {
      //we have successfully saved the json to the database
      //now we need to redraw the table
      // httpsRequest = null;
      requestReLoadSwitches();
    } else {
      alert("There was a problem with the request.");
    }
  }
}

function requestReLoadSwitches() {
  //we need to grab the data in the database and reload allSwitchesObj with it
  //we will then redraw the table with the new data in redrawCurrentSwitch()
  httpsRequest = new XMLHttpRequest();
  if (!httpsRequest) {
    alert("Unable to create request");
    return false;
  }

  httpsRequest.onreadystatechange = pullAllSwitches;
  httpsRequest.open("GET", "php/get_DB_data.php");
  httpsRequest.send();
}

function redrawCurrentSwitch() {
  //display first switch in array
  //we will be using the currentSwitchIndex to keep track of which switch we are on

  let SwitchTable = document.getElementById("switches");
  let SwitchBody = SwitchTable.lastElementChild;

  SwitchBody.lastChild.innerHTML =
    "<td>" +
    allSwitchesObj[currentSwitchIndex].weight +
    "</td><td>" +
    allSwitchesObj[currentSwitchIndex].brand +
    "</td><td>" +
    allSwitchesObj[currentSwitchIndex].name +
    "</td><td>" +
    allSwitchesObj[currentSwitchIndex].price +
    "</td><td>" +
    allSwitchesObj[currentSwitchIndex].silent +
    "</td><td>" +
    allSwitchesObj[currentSwitchIndex].type +
    "</td><td>" +
    '<img src="' +
    allSwitchesObj[currentSwitchIndex].img +
    '">' +
    "</td><td>" +
    '<a href="' +
    allSwitchesObj[currentSwitchIndex].link +
    '"> Link </a>' +
    "</td>" +
    "</td><td>" +
    currentSwitchIndex +
    "</td><td>" +
    allSwitchesObj.length +
    "</td>";

  document.getElementsByTagName("img")[0].style.height = "75px";
  document.getElementsByTagName("img")[0].style.width = "75px";

  currentlyEditing = false;
  currentlyAdding = false;

  if (document.getElementById("insertSwitchTable") != null) {
    let insertSwitchDiv = document.getElementById("insertSwitch");
    insertSwitchDiv.removeChild(insertSwitchDiv.lastChild);
    insertSwitchDiv.removeChild(insertSwitchDiv.lastChild);
    insertSwitchDiv.removeChild(insertSwitchDiv.lastChild);
  }
    
  
}

// notes for me for later, you will need to validate if the user entered a link
