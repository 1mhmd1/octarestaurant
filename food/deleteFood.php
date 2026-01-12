<?php
include '../connection/conn.php';
$id= $_GET['food_id'];
$stmt=$conn->prepare('DELETE FROM food WHERE food_id=?');
$stmt->bind_param('i', $id);
$stmt->execute();
if($stmt->execute()){
    echo json_encode(['status'=>'The food is deleted']);
}
else{
    echo json_encode(["status" => "error", "error" => $stmt->error]);
}
?>