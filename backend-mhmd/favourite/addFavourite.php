<?php
require "../config/conn.php";
header("Content-Type: application/json");

$user_id = $_POST['user_id'] ?? null;
$rest_id = $_POST['rest_id'] ?? null;

if (!$user_id || !$rest_id) {
  echo json_encode(["status" => "error", "message" => "Missing data"]);
  exit;
}

$sql = "INSERT IGNORE INTO favourite (user_id, rest_id)
        VALUES (?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $user_id, $rest_id);
$stmt->execute();

echo json_encode(["status" => "success"]);
