<?php
include '../connection/conn.php';

if (!isset($_GET['rest_id'])) {
    http_response_code(422);
    echo json_encode(["status"=>"error","message"=>"rest_id is required"]);
    exit;
}

$rest_id = $_GET['rest_id'];

$stmt = $conn->prepare("SELECT * FROM rest_table WHERE rest_id = ?");
$stmt->bind_param("i", $rest_id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode($row);
} else {
    http_response_code(404);
    echo json_encode(["status"=>"error","message"=>"Restaurant not found"]);
}
?>
