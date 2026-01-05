<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = "centerbeam.proxy.rlwy.net";
$port = 59934;
$user = "root";
$pass = "yQvvsgCwhGoHcENMTmwfmbhnJljYzQdh";
$db   = "railway";

$conn = new mysqli($host, $user, $pass, $db, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
