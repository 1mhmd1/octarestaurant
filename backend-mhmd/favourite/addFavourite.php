<?php
require_once __DIR__ . "/../../connection/conn.php";

header("Content-Type: application/json; charset=UTF-8");

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

$sql = "INSERT INTO favourite (user_id, rest_id) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $user_id, $rest_id);
$stmt->execute();

echo json_encode(["status" => "success"]);
