<?php

include '../switch.php';

//in this php file, I want to do the same thing getBrandSort is doing but
//just grab the data from the database, in normal way

//open up the server connection to database 

$servername = "localhost"; //default server name
$username = "AdminLab12"; //user name that you created
$password = "73xp7vQHWFzi6Xta"; //password that you created
$dbname = "myDBSwitches";

//create connection
$conn = new mysqli($servername, $username, $password, $dbname);
//check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//in this specific php, we sending everythang
$sql = "SELECT * FROM switches";
$result = $conn -> query($sql);

$arr = array();
$i = 0;

//now we want to place those rows in our switch class, then into an array
//we will be basing the data we enter, based on our switch class

if ($result->num_rows > 0) {

    //output data of each row
    while($row = $result->fetch_assoc()) {

        $newSwitchItem = new SwitchItem();
        $newSwitchItem->weight = $row["weight_"];
        $newSwitchItem->brand = $row["brand_"];
        $newSwitchItem->name = $row["name_"];
        $newSwitchItem->price = $row["price_"];
        $newSwitchItem->silent = $row["silent_"];
        $newSwitchItem->type = $row["type_"];
        $newSwitchItem->img = $row["img_"];
        $newSwitchItem->link = $row["link_"];
        $arr[$i] = $newSwitchItem;

        $i++;
    }
    echo json_encode($arr);
} else {
    echo "0 results";
    
}