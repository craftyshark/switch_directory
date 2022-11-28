<?php

// This script is used to initialize the database for the switches
//however, it appears we may need to be able to use objects in a second here, which is annoying
//as we did not create objects yet. But I guess I will have to. 

include 'switch.php';

//echo "Create some switches<br>";

//we need to create an array of switches however, we only have 5 switches

//I want to pull the switches from mySwitche.json into an array

$myfile = fopen("mySwitchItems.json", "r") or die("Unable to open file!");

//now we need to read the file
$mySwitchItems = fread($myfile,filesize("mySwitchItems.json"));

//now we need to close the file
fclose($myfile);

//now we need to decode the json
$mySwitchItems = json_decode($mySwitchItems, true);



$n=5;
$a0=array();
for ($i=0;$i<$n;$i++) {
    $a0[$i]=new SwitchItem();
}

//now we create our database

$servername = "localhost"; //default server name 
$username = "AdminLab12"; //user name that you created
$password = "73xp7vQHWFzi6Xta"; //password that you created
$dbname = "myDBSwitches";

// // Create connection
// $conn = new mysqli($servername, $username, $password);

// // Check connection
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error ."<br>");
// }

// echo "Connected successfully <br>";

// // Creation of the database
// $sql = "CREATE DATABASE ". $dbname;
// if ($conn -> query($sql) === TRUE) {
//     echo "Database ". $dbname ." created successfully<br>";
// } else {
//     echo "Error creating database: " . $conn->error ."<br>";
// }

// // close the connection
// $conn->close();


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// we will now create a table with rows that corespond to the data in mySwitchItems.json

$sql = "CREATE TABLE Switches (
    pkey INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    weight_ INT(6) NOT NULL,
    brand_ VARCHAR(30) NOT NULL,
    name_ VARCHAR(30) NOT NULL,
    price_ INT(6) NOT NULL,
    silent_ VARCHAR(30) NOT NULL,
    img_ VARCHAR(30) NOT NULL,
    link_ VARCHAR(30) NOT NULL
)";

if ($conn->query($sql) === TRUE) {
    echo "Table Switches created successfully<br>";
} else {
    echo "Error creating table: " . $conn->error ."<br>";
}

// we will now insert the data from mySwitchItems.json into the table

$stmt = $conn->prepare("INSERT INTO Switches (weight_, brand_, name_, price_, silent_, img_, link_) VALUES (?, ?, ?, ?, ?, ?, ?)");
if ($stmt === FALSE) {
    echo "there is a problem with prepare<br>";
    echo $conn->error;
}

$stmt->bind_param("ississs", $weight_, $brand_, $name_, $price_, $silent_, $img_, $link_);

for ($i=0;$i<$n;$i++) {
    $switchItem = new SwitchItem();
    
    $switchItem->SetWeight($mySwitchItems[$i]["weight"]);
    $switchItem->SetBrand($mySwitchItems[$i]["brand"]);
    $switchItem->SetName($mySwitchItems[$i]["name"]);
    $switchItem->SetPrice($mySwitchItems[$i]["price"]);
    $switchItem->SetSilent($mySwitchItems[$i]["silent"]);
    $switchItem->SetImg($mySwitchItems[$i]["img"]);
    $switchItem->SetLink($mySwitchItems[$i]["link"]);

    
    echo $switchItem->Display() . "<br>";
    $weight_ = $switchItem->weight;
    $brand_ = $switchItem->brand;
    $name_ = $switchItem->name;
    $price_ = $switchItem->price;
    $silent_ = $switchItem->silent;
    $img_ = $switchItem->img;
    $link_ = $switchItem->link;


    $stmt->execute();

    echo "New record " . $i . " created successfully<br>";
}

$stmt->close();

$conn->close();


?>