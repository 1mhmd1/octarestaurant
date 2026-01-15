<?php
require_once __DIR__ . "/../../connection/conn.php";

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
$raw = file_get_contents("php://input");
$body = json_decode($raw, true);

$user_id = $body['user_id'] ?? null;
$rest_id = $body['rest_id'] ?? null;

if (!$user_id || !$rest_id) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing data"
    ]);
    exit;
}

$sql = "DELETE FROM favourite WHERE user_id = ? AND rest_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $user_id, $rest_id);
$stmt->execute();

if ($stmt->affected_rows === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Favourite not found"
    ]);
    exit;
}

echo json_encode(["status" => "success"]);
