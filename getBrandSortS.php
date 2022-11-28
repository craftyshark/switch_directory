<?php
include "switch.php";

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

//in this specific php, we will be returning all the rows sorted by the brand
$sql = "SELECT * FROM switches ORDER BY brand_";
$result = $conn -> query($sql);

$arr = array();
$i = 0;

//now we want to place those rows in our switch class, then into an array
//we will be basing the data we enter, based on our switch class

if ($result->num_rows > 0) {
    //output data of each row
    while($row = $result->fetch_assoc()) {

        //$row = $result->fetch_assoc();

        $newSwitchItem = new SwitchItem();
        $newSwitchItem->weight = $row["weight_"];
        $newSwitchItem->house_mat = $row["house_mat"];
        $newSwitchItem->stem_mat = $row["stem_mat"];
        $newSwitchItem->bottom_mat = $row["bottom_mat"];
        $newSwitchItem->brand = $row["brand_"];
        $newSwitchItem->name = $row["name_"];
        $newSwitchItem->price = $row["price_"];
        $newSwitchItem->img = $row["img_"];
        $newSwitchItem->link = $row["link_"];
        $arr[$i] = $newSwitchItem;

        $i++;

    }
    echo json_encode($arr);
} else {
    echo "0 results";
    
}