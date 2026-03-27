<?php
include 'connection/conn.php';
require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();
$data= json_decode(file_get_contents('php://input'), true);
if ($data === null) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid JSON format"]);
    exit;
}
$fields = ['username' , 'password'];
foreach ($fields as $field) {
    if (empty($data[$field])) {
        http_response_code(422);
        echo json_encode(["status" => "error", "message" => "$field is required"]);
        exit;
    }
}
$username = $data['username'];
$password = $data['password'];
$stmt = $conn->prepare("SELECT user_id, username, password, role FROM user WHERE username = ?");
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows === 0) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Invalid username or password"]);
    exit;
}
$user = $result->fetch_assoc();
if (!password_verify($password, $user['password'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Invalid username or password"]);
    exit;
}
$payload =[
    'iat'=> time(),
    'exp'=> time()+3600,
    'user_id'=> $user['user_id'],
    'username'=> $user['username'],
    'role'=> $user['role']
];
$secretKey = $_ENV['JWT_SECRET'];
$token = JWT::encode($payload, $secretKey, 'HS256');
echo json_encode(["status" => "success", "message" => "Login successful" , "token"=> $token]);
?>