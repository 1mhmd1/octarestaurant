<?php
include '../connection/conn.php';
header('Content-Type: application/json');

if (isset($_GET['name'])) {

    $search = $_GET['name'];
    $stmt = $conn->prepare("
        SELECT 
            rest_id,
            name,
            description,
            phone,
            location,
            opening_hours,
            image
        FROM rest_table
        WHERE name LIKE ?
    ");

} elseif (isset($_GET['category'])) {

    $search = $_GET['category'];
    $stmt = $conn->prepare("
        SELECT 
            rest_table.rest_id,
            rest_table.name,
            rest_table.description,
            rest_table.phone,
            rest_table.location,
            rest_table.opening_hours,
            rest_table.image
        FROM rest_table
        JOIN rest_rest_category
            ON rest_table.rest_id = rest_rest_category.rest_id
        JOIN rest_category
            ON rest_rest_category.rest_cat_id = rest_category.rest_cat_id
        WHERE rest_category.cat_name LIKE ?
        GROUP BY rest_table.rest_id
    ");

} else {
    http_response_code(422);
    echo json_encode([
        "status" => "error",
        "message" => "Provide name or category to search"
    ]);
    exit;
}

$search = "%$search%";
$stmt->bind_param("s", $search);
$stmt->execute();

$result = $stmt->get_result();
$restaurants = [];

while ($row = $result->fetch_assoc()) {
    $restaurants[] = $row;
}

echo json_encode($restaurants);
