<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

 require_once "../connection/conn.php"; 

$response = [
    "restaurants" => 0,
    "menu_items" => 0,
    "orders" => 0
];


$result = $conn->query("SELECT COUNT(*) AS total FROM rest_table");
if ($result) {
    $row = $result->fetch_assoc();
    $response["restaurants"] = (int)($row["total"] ?? 0);
} else {
    echo json_encode(["error" => "Query failed: rest_table", "db_error" => $conn->error]);
    exit;
}

$result = $conn->query("SELECT COUNT(*) AS total FROM menu");
if ($result) {
    $row = $result->fetch_assoc();
    $response["menu_items"] = (int)($row["total"] ?? 0);
} else {
    echo json_encode(["error" => "Query failed: menu", "db_error" => $conn->error]);
    exit;
}

$result = $conn->query("SELECT COUNT(*) AS total FROM order_details");
if ($result) {
    $row = $result->fetch_assoc();
    $response["orders"] = (int)($row["total"] ?? 0);
} else {
    echo json_encode(["error" => "Query failed: order_details", "db_error" => $conn->error]);
    exit;
}

echo json_encode($response);
