<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$response = [
    "rest_table" => 0,
    "menu" => 0,
    "orders" => 0
];

$result = $conn->query("SELECT COUNT(*) AS total FROM rest_table");
$row = $result->fetch_assoc();
$response["restaurants"] = (int)$row["total"];
$result = $conn->query("SELECT COUNT(*) AS total FROM menu");
$row = $result->fetch_assoc();
$response["menu_items"] = (int)$row["total"];
$result = $conn->query("SELECT COUNT(*) AS total FROM order_details");
$row = $result->fetch_assoc();
$response["orders"] = (int)$row["total"];

echo json_encode($response);
