<?php
// Allow frontend access
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

// DB connection
require_once "../connection/connection.php";

$response = [
    "restaurants" => 0,
    "menu_items" => 0,
    "orders" => 0
];

try {
    // Count restaurants
    $result = $conn->query("SELECT COUNT(*) AS total FROM restaurants");
    if ($row = $result->fetch_assoc()) {
        $response["restaurants"] = (int)$row["total"];
    }

    // Count menu items
    $result = $conn->query("SELECT COUNT(*) AS total FROM menu_items");
    if ($row = $result->fetch_assoc()) {
        $response["menu_items"] = (int)$row["total"];
    }

    // Count orders
    $result = $conn->query("SELECT COUNT(*) AS total FROM orders");
    if ($row = $result->fetch_assoc()) {
        $response["orders"] = (int)$row["total"];
    }

    echo json_encode($response);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Server error",
        "message" => $e->getMessage()
    ]);
}
