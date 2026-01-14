<?php
include '../connection/conn.php';
$id=$_GET['menu_id'];
$stmt=$conn->prepare("SELECT * FROM food WHERE menu_id=? ");
$stmt->bind_param('i', $id);
if($stmt->execute()){
    echo json_encode(['status' => 'success','menu_id' => $id,'data' => $foods]);
}
?>