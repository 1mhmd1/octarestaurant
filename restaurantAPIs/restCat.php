<?php
include '../connection/conn.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$stmt = $conn->prepare("SELECT * FROM rest_category");
$stmt->execute();
$result=$stmt->get_result();
$categories = [];
while ($row = $result->fetch_assoc()) {
    $categories[] = $row;
}
echo json_encode(['status'=>'success', 'data'=>$categories]);


?>