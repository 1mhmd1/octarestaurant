<?php
include '../connection/conn.php';
$id=$_GET['food_cat_id'];
$stmt=$conn->prepare('DELETE FROM food_category WHERE food_cat_id=?');
$stmt->bind_param('i', $id);
if($stmt->execute()){
    echo json_encode(['status'=>'The category is deleted']);
}
else{
    echo json_encode(["status" => "error", "error" => $stmt->error]);
}
?>