<?php
include 'connection/conn.php';
$data = json_decode(file_get_contents('php://input') , true);
if ($data === null) {
    http_response_code(400);
    echo json_encode([ "status" => "error","message" => "Invalid JSON format"]);
    exit;
}
$fields = ['first_name', 'last_name', 'username', 'email', 'password', 'phone', 'address'];
foreach ($fields as $field) {
    if (empty($data[$field])) {
        http_response_code(422);
        echo json_encode(["status" => "error", "message" => "$field is required"]);
        exit;
    }
}
$first_name = $data['first_name'];
$last_name = $data['last_name'];
$username = $data['username'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);
$phone = $data['phone'];
$address = $data['address'];
$role = $data['role'] ?? 'user';
$check_user=$conn->prepare("SELECT user_id FROM user WHERE username = ? OR email = ?");
$check_user->bind_param('ss', $username , $email);
$check_user->execute();
$check_user->store_result();
if($check_user->num_rows > 0 ){
    http_response_code(409);
    echo json_encode(["status" => "error", "message" => "Username or email already taken"]);
    exit;
}
$stmt = $conn->prepare("INSERT INTO user (first_name , last_name , username , email , password , phone , address , role) VALUES (? , ? , ? , ? , ? , ? , ? , ?)");
$stmt->bind_param('ssssssss' , $first_name , $last_name , $username , $email , $password , $phone , $address , $role);
$result = $stmt->execute();
if ($result === false) {
    http_response_code(500);
    echo json_encode(["status"=>"error","message"=>"Error inserting user: ".$stmt->error]);
    exit;
}
$user_id = $conn->insert_id;
if ($role === 'admin') {
$stmt2 = $conn->prepare("INSERT INTO admin ( user_id ,  username , password) VALUES ( ? , ? , ?)");
$stmt2->bind_param('iss', $user_id ,  $username , $password);
$result2 = $stmt2->execute();
    if ($result2 === false) {
        http_response_code(500);
        echo json_encode(["status"=>"error","message"=>"Error inserting admin: ".$stmt2->error]);
        exit;
    }
}
echo json_encode(["status"=>"success","message"=>"User registered successfully"]);

?>