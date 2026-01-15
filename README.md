# octarestaurant

https://rest123.lovable.app/admin/restaurants 

[https://railway.com/project/c4f7da8c-98af-4f02-8b60-925f9f8d516f/service/1eb2b79c-f98f-426d-9e8d-0a6737bd8ccf/database?environmentId=a9c85afa-dcc5-4052-8cc0-3f1c4207da89
](https://railway.com/invite/Pw5MiZZ5Keo)

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


<?php
require_once __DIR__ . "/../../connection/conn.php";
header("Content-Type: application/json; charset=UTF-8");

$raw = file_get_contents("php://input");
$body = json_decode($raw, true);

$user_id = $body["user_id"] ?? null;
$rest_id = $body["rest_id"] ?? null;

if (!$user_id || !$rest_id) {
  echo json_encode(["status" => "error", "message" => "Missing data"]);
  exit;
}

$sql = "INSERT INTO favourite (user_id, rest_id) VALUES (?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
  http_response_code(500);
  echo json_encode(["status" => "error", "message" => $conn->error]);
  exit;
}

$stmt->bind_param("ii", $user_id, $rest_id);

if (!$stmt->execute()) {
  http_response_code(500);
  echo json_encode(["status" => "error", "message" => $stmt->error]);
  exit;
}

echo json_encode(["status" => "success"]);

             
