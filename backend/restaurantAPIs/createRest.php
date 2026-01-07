<?php
error_reporting(0);
ini_set('display_errors', 0);

include '../connection/conn.php';
header('Content-Type: application/json');

$requiredFields = ['name', 'description', 'location', 'phone', 'opening_hours', 'categories'];

foreach ($requiredFields as $field) {
    if (!isset($_POST[$field]) || empty($_POST[$field])) {
        http_response_code(422);
        echo json_encode([
            "status" => "error",
            "message" => "$field is required"
        ]);
        exit;
    }
}

$name = $_POST['name'];
$description = $_POST['description'];
$location = $_POST['location'];
$phone = $_POST['phone'];
$opening_hours = $_POST['opening_hours'];

$categories = $_POST['categories'];

if (is_string($categories)) {
    $categories = json_decode($categories, true) ?? [$categories];
}

$categories = array_unique($categories);

$imageName = "placeholder.png";

if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {

    $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!in_array($_FILES['image']['type'], $allowedTypes)) {
        http_response_code(422);
        echo json_encode([
            "status" => "error",
            "message" => "Invalid image type"
        ]);
        exit;
    }

    $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $imageName = uniqid('rest_') . "." . $ext;

    move_uploaded_file(
        $_FILES['image']['tmp_name'],
        "../uploads/" . $imageName
    );
}

$stmt = $conn->prepare("
    INSERT INTO rest_table 
    (name, description, location, phone, opening_hours, image)
    VALUES (?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
    "ssssss",
    $name,
    $description,
    $location,
    $phone,
    $opening_hours,
    $imageName
);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Error adding restaurant"
    ]);
    exit;
}

$rest_id = $conn->insert_id;

$stmt_category = $conn->prepare("SELECT rest_cat_id FROM rest_category WHERE cat_name = ?");
$stmt_insert = $conn->prepare("
    INSERT INTO rest_rest_category (rest_id, rest_cat_id)
    VALUES (?, ?)
");

foreach ($categories as $cat_name) {

    $stmt_category->bind_param('s', $cat_name);
    $stmt_category->execute();
    $result = $stmt_category->get_result();

    if ($row = $result->fetch_assoc()) {
        $rest_cat_id = $row['rest_cat_id'];
    } else {
        $stmt_new = $conn->prepare("INSERT INTO rest_category (cat_name) VALUES (?)");
        $stmt_new->bind_param('s', $cat_name);
        $stmt_new->execute();
        $rest_cat_id = $stmt_new->insert_id;
    }

    $stmt_insert->bind_param('ii', $rest_id, $rest_cat_id);
    $stmt_insert->execute();
}

echo json_encode([
    "status" => "success",
    "message" => "Restaurant added successfully"
]);
