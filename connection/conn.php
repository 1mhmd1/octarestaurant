<?php
$host = "centerbeam.proxy.rlwy.net";
$port = 59934;
$user = "root";
$pass = "yQvvsgCwhGoHcENMTmwfmbhnJljYzQdh";
$db   = "railway";

$conn = mysqli_connect($host, $user, $pass, $db, $port);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
