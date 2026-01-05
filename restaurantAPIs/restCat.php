<?php
include '../connection/conn.php';
$stmt = $conn->prepare("SELECT * FROM rest_category");
$stmt->execute();
$result=$stmt->get_result();
$categories = [];
while ($row = $result->fetch_assoc()) {
    $categories[] = $row;
}
echo json_encode(['status'=>'success', 'data'=>$categories]);


?>