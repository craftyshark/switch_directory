<?php 

include 'switch.php';

//in this php file, I want to delete all the rows in the myDBSwitches database, from the 
//switches table and then resave the switches from mySwitches.json

//later on we will move to doing this purely in php, but just to get it working, I will use
//the mySwitches.json file

//first, we need to open the file
$myfile = fopen("mySwitches.json", "r") or die("Unable to open file!");

//now we need to read the file 
$mySwitches = fread($myfile,filesize("mySwitches.json"));

//now we need to close the file
fclose($myfile);

//now we need to decode the json
$mySwitches = json_decode($mySwitches, true);

//now we create an array of size of mySwitches

$n = count($mySwitches);
$a0 = array();
for ($i=0;$i<$n;$i++) {
    $a0[$i]=new SwitchItem();
}

//now we set our database info
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

$stmt = $conn->prepare("INSERT INTO Switches (weight_, house_mat, stem_mat, bottom_mat,
 brand_, name_, price_, img_, link_) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
 if ($stmt === FALSE) {
    echo "there is a problem with prepare<br>";
    echo $conn->error;
 }

 $stmt->bind_param("sssssssss", $weight_, $house_mat, $stem_mat, $bottom_mat, $brand_, $name_, $price_, $img_, $link_);

for ($i=0;$i<$n;$i++) {
    $switchItem = new SwitchItem();
    
    $switchItem->setWeight($mySwitches[$i]["weight"]);
    $switchItem->setHouseMat($mySwitches[$i]["house_mat"]);
    $switchItem->setStemMat($mySwitches[$i]["stem_mat"]);
    $switchItem->setBottomMat($mySwitches[$i]["bottom_mat"]);
    $switchItem->setBrand($mySwitches[$i]["brand"]);
    $switchItem->setName($mySwitches[$i]["name"]);
    $switchItem->setPrice($mySwitches[$i]["price"]);
    $switchItem->setImg($mySwitches[$i]["img"]);
    $switchItem->setLink($mySwitches[$i]["link"]);
    
    echo $switchItem->Display() . "<br>";
    $weight_ = $switchItem->weight;
    $house_mat = $switchItem->house_mat;
    $stem_mat = $switchItem->stem_mat;
    $bottom_mat = $switchItem->bottom_mat;
    $brand_ = $switchItem->brand;
    $name_ = $switchItem->name;
    $price_ = $switchItem->price;
    $img_ = $switchItem->img;
    $link_ = $switchItem->link;

    $stmt->execute();

    echo "New record " . $i . " created successfully<br>";
}

$stmt->close();


$conn->close();