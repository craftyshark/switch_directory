<?php

//in this php file, I want to be able to grab a specific item from mySwitches.json and echo it out
//we will send a variable in the get request called i that will be the index of the item we want to grab

//I think it woulc be a better idea to just get the i variable here 
//and then pass it to the array 
//so we can use it in the echo statement

//the i variable was sent in the url, so I need to parse the url 
$index = $_GET['i'];

//first, we need to open the file
$myfile = fopen("mySwitches.json", "r") or die("Unable to open file!");

//now we grab just the index we want
$mySwitches = fread($myfile,filesize("mySwitches.json"));

//now we need to close the file
fclose($myfile);

//now we need to decode the json
$mySwitches = json_decode($mySwitches, true);

//now we need to echo out an item at the index we want
echo json_encode($mySwitches[$index]);



?>