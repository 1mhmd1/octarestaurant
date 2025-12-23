<?php
include 'connection/conn.php';
$id=$_GET['rest_id'];
$stmt=$conn->prepare('DELETE FROM rest_table WHERE rest_id=?');
$stmt->bind_param('i', $id);
if($stmt->execute()){
    echo json_encode(['status'=>'The restaurant is deleted']);
}
else{
    echo json_encode(["status" => "error", "error" => $stmt->error]);
}
?>