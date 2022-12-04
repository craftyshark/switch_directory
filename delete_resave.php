<?php

include 'switch.php';

//in this php file, I want to delete all the rows in the myDBSwitches database, from the 
//switches table and then resave the switches from mySwitches.json

//grab the incoming json data with post, it will be named, json
$json = json_decode($_POST['json'], true);



//now we create an array of size of mySwitches

$n = count($json);
$a0 = array();
for ($i = 0; $i < $n; $i++) {
    $a0[$i] = new SwitchItem();
}

//now we set our database info
$servername = "localhost"; //default server name
$username = "AdminLab12"; //user name that you created
$password = "73xp7vQHWFzi6Xta"; //password that you created
$dbname = "myDBSwitches"; //database name that you created

//create connection 
$conn = new mysqli($servername, $username, $password, $dbname);
//check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//now we need to delete all the rows in the switches table
$sql = "DELETE FROM switches";

//never assume it worked, check always 
if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . $conn->error;
}

//now we need to resave the switches from mySwitches.json into the database


//we will now insert the data from mySwitches.json into the table

$stmt = $conn->prepare("INSERT INTO Switches (weight_, brand_, name_, price_,
 silent_, type_, img_, link_) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
if ($stmt === FALSE) {
    echo "there is a problem with prepare<br>";
    echo $conn->error;
}

$stmt->bind_param("issiisss", $weight_, $brand_, $name_, $price_, $silent_, $type_, $img_, $link_);

for ($i = 0; $i < $n; $i++) {
    $switchItem = new SwitchItem();

    $switchItem->SetWeight($json[$i]["weight"]);
    $switchItem->SetBrand($json[$i]["brand"]);
    $switchItem->SetName($json[$i]["name"]);
    $switchItem->SetPrice($json[$i]["price"]);
    $switchItem->SetSilent($json[$i]["silent"]);
    $switchItem->SetType($json[$i]["type"]);
    $switchItem->SetImg($json[$i]["img"]);
    $switchItem->SetLink($json[$i]["link"]);

    echo $switchItem->Display() . "<br>";
    $weight_ = $switchItem->weight;
    $brand_ = $switchItem->brand;
    $name_ = $switchItem->name;
    $price_ = $switchItem->price;
    $silent_ = $switchItem->silent;
    $type_ = $switchItem->type;
    $img_ = $switchItem->img;
    $link_ = $switchItem->link;

    $stmt->execute();

    echo "New record " . $i . " created successfully<br>";
}

$stmt->close();


$conn->close();