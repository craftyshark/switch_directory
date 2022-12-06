// in this file I want to delete the switch based on the currentSwitchIndex
//basically, all we need to do is rip that switch out of the 
//allSwitchesObj array, and then call the requestJsonSave function. done. 
//go me for making somewhat reuseable code, even if it's disgusting. 
//we'll refactor if we get the chance later.

function deleteSwitch() {
    //we need to delete the switch at the currentSwitchIndex
    //we will do that by splicing it out of the array
    allSwitchesObj.splice(currentSwitchIndex, 1);
    //now we need to save the array to the database
    //we will do that by calling the requestJsonSave function
    let json = JSON.stringify(allSwitchesObj);

    //in order to make sure we don't make duplicate tables, 
    //we will set currentlyEditing to true before we call requestJsonSave
    currentlyEditing = true;

    requestJsonSave(json);

}