<?php
include 'connection/conn.php';
$data = json_decode(file_get_contents('php://input') , true);
$id = $data['rest_id'];
$new_name= $data['new_name'];
$new_desc= $data['new_desc'];
$new_loc = $data['new_loc'];
$new_phone= $data['new_phone'];
$new_opening_hours= $data['new_opening_hours'];

$stmt=$conn->prepare ("UPDATE rest_table SET name=? , description=?, location=?, phone=?, opening_hours=? WHERE rest_id=? ");
$stmt->bind_param("sssssi" , $new_name , $new_desc , $new_loc, $new_phone, $new_opening_hours, $id);
$stmt->execute();
echo json_encode(["status" => "success"]);
?>