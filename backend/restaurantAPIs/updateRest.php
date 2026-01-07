<?php
error_reporting(0);
ini_set('display_errors', 0);

include '../connection/conn.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if ($data === null) {
    $data = $_POST;
}

$id = $data['rest_id'] ?? null;

if (!$id) {
    http_response_code(422);
    echo json_encode(["status" => "error", "message" => "rest_id is required"]);
    exit;
}

$fields = ['new_name', 'new_desc', 'new_loc', 'new_phone', 'new_opening_hours'];
foreach ($fields as $field) {
    if (empty($data[$field])) {
        http_response_code(422);
        echo json_encode(["status" => "error", "message" => "$field is required"]);
        exit;
    }
}

$new_name = $data['new_name'];
$new_desc = $data['new_desc'];
$new_loc = $data['new_loc'];
$new_phone = $data['new_phone'];
$new_opening_hours = $data['new_opening_hours'];
$imageSql = "";
$params = [$new_name, $new_desc, $new_loc, $new_phone, $new_opening_hours];
$types = "sssss";

if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {

    $allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!in_array($_FILES['image']['type'], $allowed)) {
        http_response_code(422);
        echo json_encode(["status" => "error", "message" => "Invalid image type"]);
        exit;
    }

    $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $imageName = uniqid('rest_') . "." . $ext;

    move_uploaded_file(
        $_FILES['image']['tmp_name'],
        "../uploads/" . $imageName
    );

    $imageSql = ", image=?";
    $params[] = $imageName;
    $types .= "s";
}

$params[] = $id;
$types .= "i";

$stmt = $conn->prepare("
    UPDATE rest_table 
    SET name=?, description=?, location=?, phone=?, opening_hours=?
    $imageSql
    WHERE rest_id=?
");

$stmt->bind_param($types, ...$params);
$stmt->execute();

echo json_encode(["status" => "success"]);
