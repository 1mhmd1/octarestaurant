<?php
include '../connection/conn.php';
$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];
$stmt = $conn->prepare('INSERT INTO food_category (food_cat_name) VALUES (?)');
$stmt->bind_param('s', $name);
$stmt->execute();
echo json_encode(["status" => "success"]);
?>