<?php 

//okay so here, we are going to go ahead and create a switch object
//and then we are going to create a switch database

//for the class, it will be based on the mySwitches.json data 

class SwitchItem implements JsonSerializable {
    public $weight;
    public $brand;
    public $name;
    public $price;
    public $silent;
    public $type;
    public $img;
    public $link; 
    public function SetWeight($w) {
        $this->weight = $w;
    }

    public function SetBrand($hm) {
        $this->brand = $hm;
    }

    public function SetName($sm) {
        $this->name = $sm;
    }

    public function SetPrice($bm) {
        $this->price = $bm;
    }

    public function SetSilent($b) {
        $this->silent = $b;
    }

    public function SetType($n) {
        $this->type = $n;
    }

    public function SetImg($im) {
        $this->img = $im;
    }

    public function SetLink($l) {
        $this->link = $l;
    }

    public function __construct() {
        $this->weight = 0;
        $this->brand = generateRandomString();
        $this->name = generateRandomString();
        $this->price = 0;
        $this->silent = false;
        $this->type = "clicky";
        $this->img = generateRandomString();
        $this->link = generateRandomString();

    }

    
    //rechecking all. This is fine for now.
    public function jsonSerialize() {
        return [
            'weight' => $this->weight,
            'brand' => $this->brand,
            'name' => $this->name,
            'price' => $this->price,
            'silent' => $this->silent,
            'type' => $this->type,
            'img' => $this->img,
            'link' => $this->link
        ];
    }




    public function Set($json) {
        $this->SetWeight($json['weight']);
        $this->SetBrand($json['brand']);
        $this->SetName($json['name']);
        $this->SetPrice($json['price']);
        $this->SetSilent($json['silent']);
        $this->SetType($json['type']);
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