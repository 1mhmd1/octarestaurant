<?php
include '../connection/conn.php';
$data=json_decode(file_get_contents('php://input'), true);
$name=$data['name'];
$id=$data['rest_id'];
$stmt=$conn->prepare('INSERT INTO menu (name , rest_id) VALUES (?, ?)');
$stmt->bind_param('si', $name, $id);
$stmt->execute();
echo json_encode(["status" => "success"]);
?>