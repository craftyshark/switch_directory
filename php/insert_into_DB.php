<?php

include '../switch.php';

//in this php file, we will insert the data into the database

//first we need to grab the incoming data from the post request

$json = json_decode($_POST['newSwitchString'], true);



//now we set up the connection to the database

$servername = "localhost";
$username = "AdminLab12"; //user name that you created
$password = "73xp7vQHWFzi6Xta"; //password that you created
$dbname = "myDBSwitches"; //database name that you created

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//now we need to insert the data for one switch into one database row
//we only need to do this once, because we are only inserting one switch at a time

//now we insert the data into the database

$stmt = $conn->prepare("INSERT INTO Switches (weight_, brand_, name_, price_, silent_, type_, img_, link_)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

if ($stmt === false) {
    echo "there was an error";
    echo "Error: " . $conn->error;
}

$stmt->bind_param("issiisss", $weight_, $brand_, $name_, $price_, $silent_, $type_, $img_, $link_);

$switchItem = new switchItem();

$switchItem->setWeight($json['weight']);
$switchItem->setBrand($json['brand']);
$switchItem->setName($json['name']);
$switchItem->setPrice($json['price']);
$switchItem->setSilent($json['silent']);
$switchItem->setType($json['type']);
$switchItem->setImg($json['img']);
$switchItem->setLink($json['link']);

$weight_ = $switchItem->weight;
$brand_ = $switchItem->brand;
$name_ = $switchItem->name;
$price_ = $switchItem->price;
$silent_ = $switchItem->silent;
$type_ = $switchItem->type;
$img_ = $switchItem->img;
$link_ = $switchItem->link;

$stmt->execute();

$stmt->close();

$conn->close();

?>