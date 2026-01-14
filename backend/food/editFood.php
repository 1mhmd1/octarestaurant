<?php
include '../connection/conn.php';
$data = json_decode(file_get_contents('php://input') , true);
$id = $data['food_id'];
$fields = ['new_title' , 'new_desc', 'new_price', 'new_img', 'available'];
foreach ($fields as $field){
    if (empty($data[$field])) {
        http_response_code(422);
        echo json_encode(["status" => "error", "message" => "$field is required"]);
        exit;
    }
}
$new_title= $data['new_title'];
$new_desc= $data['new_desc'];
$new_price = $data['new_price'];
$new_img= $data['new_img'];
$available= $data['available'];
$stmt=$conn->prepare ("UPDATE food SET title=? , description=?, price=?, img=?, available=? WHERE food_id=? ");
$stmt->bind_param("ssdsi" , $new_title , $new_desc , $new_price, $new_img, $available, $id);
$stmt->execute();
echo json_encode(["status" => "success"]);
?>