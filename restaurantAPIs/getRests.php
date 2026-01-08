<?php
include '../connection/conn.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$stmt = $conn->prepare("SELECT * FROM rest_table");
$stmt->execute();
$result=$stmt->get_result();
$restaurants = [];
while ($row = $result->fetch_assoc()) {
    $restaurants[] = $row;
}
echo json_encode(['status'=>'success', 'data'=>$restaurants]);
?>