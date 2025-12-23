<?php
$host='192.168.87.123';
$db='restaurant';
$user='mhmdSalim';
$pass='StrongPassword123';
$port=3306;


$conn=new mysqli($host,$user,$pass,$db,$port);
if($conn->connect_error){
    die('Connection Failed : '.$conn->connect_error);
}
echo 'Connected Successfully';  
?>
