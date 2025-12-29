<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once "../connection/connection.php";
$response = [
    "restaurants" => 0,
    "menu_items" => 0,
    "orders" => 0
];

$result = $conn->query("SELECT COUNT(*) AS total FROM restaurants");
$row = $result->fetch_assoc();
$response["restaurants"] = (int)$row["total"];
$result = $conn->query("SELECT COUNT(*) AS total FROM menu_items");
$row = $result->fetch_assoc();
$response["menu_items"] = (int)$row["total"];
$result = $conn->query("SELECT COUNT(*) AS total FROM orders");
$row = $result->fetch_assoc();
$response["orders"] = (int)$row["total"];

echo json_encode($response);
