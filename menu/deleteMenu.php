<?php
include '../connection/conn.php';
$id=$_GET['menu_id'];
$stmt=$conn->prepare('DELETE FROM menu WHERE menu_id=?');
$stmt->bind_param('i', $id);
if($stmt->execute()){
    echo json_encode(['status'=>'The menu is deleted']);
}
else{
    echo json_encode(["status" => "error", "error" => $stmt->error]);
}
?>