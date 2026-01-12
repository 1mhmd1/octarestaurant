<?php
include '../connection/conn.php';

if (!isset($_GET['food_id'])) {
    http_response_code(422);
    echo json_encode(["status"=>"error","message"=>"food_id is required"]);
    exit;
}
$food_id = $_GET['food_id'];
$stmt = $conn->prepare("SELECT * FROM food WHERE food_id = ?");
$stmt->bind_param("i", $food_id);
$stmt->execute();
$result = $stmt->get_result();
if ($row = $result->fetch_assoc()) {
    echo json_encode($row);
} else {
    http_response_code(404);
    echo json_encode(["status"=>"error","message"=>"food not found"]);
}
?>
