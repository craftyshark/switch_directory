<?php 

//okay so here, we are going to go ahead and create a switch object
//and then we are going to create a switch database

//for the class, it will be based on the mySwitches.json data 

class SwitchItem implements JsonSerializable {
    public $weight;
    public $house_mat;
    public $stem_mat;
    public $bottom_mat;
    public $brand;
    public $name;
    public $price;
    public $img;
    public $link; 
    public function SetWeight($w) {
        $this->weight = $w;
    }

    public function SetHouseMat($hm) {
        $this->house_mat = $hm;
    }

    public function SetStemMat($sm) {
        $this->stem_mat = $sm;
    }

    public function SetBottomMat($bm) {
        $this->bottom_mat = $bm;
    }

    public function SetBrand($b) {
        $this->brand = $b;
    }

    public function SetName($n) {
        $this->name = $n;
    }

    public function SetPrice($p) {
        $this->price = $p;
    }

    public function SetImg($im) {
        $this->img = $im;
    }

    public function SetLink($l) {
        $this->link = $l;
    }

    public function __construct() {
        $this->weight = generateRandomString();
        $this->house_mat = generateRandomString();
        $this->stem_mat = generateRandomString();
        $this->bottom_mat = generateRandomString();
        $this->brand = generateRandomString();
        $this->name = generateRandomString();
        $this->price = generateRandomString();
        $this->img = generateRandomString();
        $this->link = generateRandomString();

    }

    
    //rechecking all. This is fine for now.
    public function jsonSerialize() {
        return [
            'weight' => $this->weight,
            'house_mat' => $this->house_mat,
            'stem_mat' => $this->stem_mat,
            'bottom_mat' => $this->bottom_mat,
            'brand' => $this->brand,
            'name' => $this->name,
            'price' => $this->price,
            'img' => $this->img,
            'link' => $this->link
        ];
    }



    //we are going to go ahead and implement everything in student but for switches here
    //for this specific set up, for our databrowser there is no reason to do something more complex 
    //than that

    //we are going to go ahead and create a destructor for this class
    // public function __destruct() {
    //     echo "Destroying " . $this->name . "<br>";
    // }

    public function Set($json) {
        $this->SetWeight($json['weight']);
        $this->SetHouseMat($json['house_mat']);
        $this->SetStemMat($json['stem_mat']);
        $this->SetBottomMat($json['bottom_mat']);
        $this->SetBrand($json['brand']);
        $this->SetName($json['name']);
        $this->SetPrice($json['price']);
        $this->SetImg($json['img']);
        $this->SetLink($json['link']);
    }

    public function Display(){
        $v=json_encode($this);
        echo $v;
    }

    public function GetString() {
        $v=json_encode($this);
        return $v;
    }

}

function generateRandomString($length = 10) {
	// list of characters that can be present in the string
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}


?>