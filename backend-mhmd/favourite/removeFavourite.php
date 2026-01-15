<?php
require_once __DIR__ . "/../../connection/conn.php";
header("Content-Type: application/json");

$user_id = isset($_POST['user_id']) ? $_POST['user_id'] : null;
$rest_id = isset($_POST['rest_id']) ? $_POST['rest_id'] : null;

if ($user_id == null || $rest_id == null) {
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

echo json_encode(["status" => "success"]);
