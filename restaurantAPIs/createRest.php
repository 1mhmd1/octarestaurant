<?php
// require 'auth.php';
include '../connection/conn.php';

$data = json_decode(file_get_contents('php://input') , true);
if($data === null){
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid JSON format"]);
    exit;
}
$fields = ['name' , 'description', 'location', 'phone', 'opening_hours', 'categories'];
foreach ($fields as $field){
    if (empty($data[$field])) {
        http_response_code(422);
        echo json_encode(["status" => "error", "message" => "$field is required"]);
        exit;
    }
}
$name = $data['name'];
$description = $data['description'];
$location = $data['location'];
$phone = $data['phone'];
$opening_hours = $data['opening_hours'];
$categories = $data['categories'];
$stmt = $conn->prepare("INSERT INTO rest_table (name  , description , location , phone , opening_hours) VALUES (? , ? , ? , ? , ?)");
$stmt->bind_param('sssss' , $name, $description, $location, $phone, $opening_hours);
$result = $stmt->execute();
if ($result === false ) {
    http_response_code(500);
    echo json_encode(["status"=>"error","message"=>"Error adding restaurant: ".$stmt->error]);
    exit;
}
$rest_id = $conn->insert_id;
$stmt_category= $conn->prepare("SELECT rest_cat_id FROM rest_category WHERE cat_name = ?");
$stmt_insert = $conn->prepare("INSERT INTO rest_rest_category (rest_id , rest_cat_id )  VALUES (?, ?)");
foreach($categories as $cat_name){
    $stmt_category->bind_param('s', $cat_name);
    $stmt_category->execute();
    $result = $stmt_category->get_result();
    if($row = $result->fetch_assoc()){
    $rest_cat_id = $row['rest_cat_id'];
    $stmt_insert->bind_param('ii', $rest_id, $rest_cat_id);
    $stmt_insert->execute();
    }
    else{
    $stmt_new = $conn->prepare("INSERT INTO rest_category (cat_name) VALUES (?)");
    $stmt_new->bind_param('s', $cat_name);
    $stmt_new->execute();
    $rest_cat_id = $stmt_new->insert_id;
    $stmt_insert->bind_param('ii', $rest_id, $rest_cat_id);
    $stmt_insert->execute();
    }
}

echo json_encode(["status"=>"success","message"=>"Restaurant added successfully"]);

?>