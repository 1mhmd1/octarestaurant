<?php
include '../connection/conn.php';

$stmt = $conn->prepare("SELECT * FROM rest_table");
$stmt->execute();
$result=$stmt->get_result();
$restaurants = [];
while ($row = $result->fetch_assoc()) {
    $restaurants[] = $row;
}
echo json_encode(['status'=>'success', 'data'=>$restaurants]);
?>