<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . "/../../connection/conn.php";
header("Content-Type: application/json");

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing user_id"
    ]);
    exit;
}

$sql = "
    SELECT r.*
    FROM favourite f
    JOIN rest_table r ON r.rest_id = f.rest_id
    WHERE f.user_id = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();

$result = $stmt->get_result();

$favourites = [];
while ($row = $result->fetch_assoc()) {
    $favourites[] = $row;
}

echo json_encode([
    "status" => "success",
    "data" => $favourites
]);
