<?php
include "../connection/conn.php";
$data=json_decode(file_get_contents("php://input"), true);
if($data === null){
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid JSON format"]);
    exit;
}
$fields = ['title' , 'description', 'price', 'image_url', 'menu_id', 'food_cat_id'];
foreach ($fields as $field){
    if (empty($data[$field])) {
        http_response_code(422);
        echo json_encode(["status" => "error", "message" => "$field is required"]);
        exit;
    }
}
$title = $data['title'];
$description = $data['description'];
$price = $data['price'];
$image_url = $data['image_url'];
$menu_id = $data['menu_id'];
$food_cat_id = $data['food_cat_id'];
$is_available = $data['is_available'] ?? 1 ; 
$stmt = $conn->prepare(
    "INSERT INTO food (title, description, price, menu_id, food_cat_id, image_url, is_available) 
     VALUES (?, ?, ?, ?, ?, ?, ?)"
);
$stmt->bind_param('ssdiisi', $title, $description, $price, $menu_id, $food_cat_id, $image_url, $is_available);
$result = $stmt->execute();
if ($result === false) {
    http_response_code(500);
    echo json_encode(["status"=>"error","message"=>"Error adding new food: ".$stmt->error]);
    exit;
}
echo json_encode(["status"=>"success","message"=>"Food added successfully"]);
?>