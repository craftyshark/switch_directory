let currentlyAdding = false;

function insertSwitch() {
    //so currently the insertSwitch div has nothing inside of it 
    //what we want to do, is go ahead and add the input fields to it
    //we will do that by creating a table, a tbody, table headers, 
    //and finall the input fields in their own table row 

    //first we need to check if we are currently adding a switch
    if (currentlyAdding) {
        //we are already adding a switch, so we don't want to add another one
        return;
    }

    //we are not currently adding a switch, so we can go ahead and add one
    currentlyAdding = true;

    //first we need to get the insertSwitch div
    let insertSwitchDiv = document.getElementById("insertSwitch");
    //after that we need to create a table, a tbody, and a table header row
    //and after that a table row with all of our input fields
    let table = document.createElement("table");
    table.setAttribute("id", "insertSwitchTable");
    let tbody = document.createElement("tbody");
    let tableHeaderRow = document.createElement("tr");
    let tableRow = document.createElement("tr");

    //add those elements where they go in the DOM
    
    insertSwitchDiv.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tableHeaderRow);
    tbody.appendChild(tableRow);

    //now we need to add the table headers
    tableHeaderRow.innerHTML = "<th>Switch Weight</th>" +
        "<th>Switch Brand</th>" +
        "<th>Switch Name</th>" +
        "<th>Switch Price</th>" +
        "<th>Silence Switch</th>" +
        "<th>Switch Type</th>" +
        "<th>Switch Image</th>" +
        "<th>Switch Link</th>";

    // now, we will add all of the input fields to the table row, simillarly
    //to how we have in our other js files for consistency

    tbody.lastChild.innerHTML = "<td>" +
    '<input type="text" id="weight" value="">' +
    "</td><td>" +
    '<input type="text" id="brand" value="">' +
    "</td><td>" +
    '<input type="text" id="name" value="">' +
    "</td><td>" +
    '<input type="text" id="price" value="">' +
    //okay so this specific part is going to be disgusting as I have to force it to work with the boolean value
    //tldr: two radio buttons.
    "</td><td>" +
    '<input type="radio" id="silent_true" name="silent" value="silent"> Silent' +
    '<input type="radio" id="silent_false" name="silent" value="Non-silent"> Non-Silent' +
    "</td><td>" +
    '<input type="text" id="type" value="">' +
    "</td><td>" +
    '<input type="text" id="img" value="">' +
    "</td><td>" +
    '<input type="text" id="link" value="">' +
    "</td>";

    //we don't need to set the radio buttons to the correct value, as we are adding a new switch
    //so we can just leave them as they are

    //now we need to add the submit button
    let submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit";
    submitButton.onclick = submitSwitch;
    insertSwitchDiv.appendChild(submitButton);

    //now we need to add the cancel button
    let cancelButton = document.createElement("button");
    cancelButton.innerHTML = "Cancel";
    cancelButton.onclick = cancelSwitch;
    //in cancel button, we will set currentlyAdding to false
    insertSwitchDiv.appendChild(cancelButton);


}

function submitSwitch() {
    //first we need to get all of the values from the input fields
    let weight = document.getElementById("weight").value;
    let brand = document.getElementById("brand").value;
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let silent = document.getElementById("silent_true").checked;
    let type = document.getElementById("type").value;
    let img = document.getElementById("img").value;
    let link = document.getElementById("link").value;

    //now we need to create the switch object
    let newSwitch = {
        weight: weight,
        brand: brand,
        name: name,
        price: price,
        silent: silent,
        type: type,
        img: img,
        link: link
    };

    //now we need to add the switch to the database
    //we will use the addSwitch function from the database.js file
    //allSwitchesObj.push(newSwitch);

    //convert the object to a string

    let newSwitchString = JSON.stringify(newSwitch);

    //now we need to send the new switch to the database
    //we will send it to the addSwitchToDatabase function

    addSwitchToDatabase(newSwitchString);
    
}

function addSwitchToDatabase(newSwitchString) {
    //we need to send the string to the database
    //we will use the post method

    httpsRequest = new XMLHttpRequest();
    if (!httpsRequest) {
        alert("Cannot create an XMLHTTP instance");
        return false;
    }
    console.log(newSwitchString);

    currentlyEditing = true;
    httpsRequest.onreadystatechange = reLoadIfSuccessful;
    httpsRequest.open("POST", "php/insert_into_DB.php");
    httpsRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpsRequest.send("newSwitchString=" + newSwitchString);

}
























function cancelSwitch() {
    let insertSwitchDiv = document.getElementById("insertSwitch");
    //we need to remove the table and the buttons from the insertSwitch div
    //we will do that by removing the last three children
    insertSwitchDiv.removeChild(insertSwitchDiv.lastChild);
    insertSwitchDiv.removeChild(insertSwitchDiv.lastChild);
    insertSwitchDiv.removeChild(insertSwitchDiv.lastChild);

    //now we need to set currentlyAdding to false
    currentlyAdding = false;


}