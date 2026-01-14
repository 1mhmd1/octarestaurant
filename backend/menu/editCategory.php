<?php
include '../connection/conn.php';
$data=json_decode(file_get_contents('php://input'), true);
$id=$data['food_cat_id'];
$new_name=$data['new_name'];
$stmt=$conn->prepare("UPDATE food_category SET food_cat_name=? WHERE food_cat_id=?");
$stmt->bind_param('si', $new_name, $id);
$stmt->execute();
echo json_encode(["status" => "success"]);
?>