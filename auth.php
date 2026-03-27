<?php
require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$headers = getallheaders();

if (!isset($headers['Authorization'])) {
    http_response_code(401);
    exit("No token provided");
}

$token = str_replace("Bearer ", "", $headers['Authorization']);
$secretKey = getenv('JWT_SECRET');
try {
    $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
    $user_id = $decoded->user_id;
    $role = $decoded->role;
} catch (Exception $e) {
    http_response_code(401);
    exit("Invalid or expired token");
}
?>