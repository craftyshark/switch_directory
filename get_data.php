<?php

//okay so, we want to grab one item from mySwitches.json and echo it out

//first, we need to open the file
$myfile = fopen("mySwitches.json", "r") or die("Unable to open file!");

//now we need to read the file
$mySwitches = fread($myfile,filesize("mySwitches.json"));

//now we need to close the file
fclose($myfile);

//now we need to decode the json
$mySwitches = json_decode($mySwitches, true);

//now we need to echo out the first item in the array

echo json_encode($mySwitches[3]);




?>