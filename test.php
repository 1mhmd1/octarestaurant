<?php
require 'auth.php'; // verifies token and extracts $role

// 1. Check if user is admin
if ($role !== 'admin') {
    http_response_code(403); // Forbidden
    exit("Access denied: Admins only");
}

// 2. Admin content
echo json_encode([
    "message" => "Welcome to the admin panel",
    "user_id" => $user_id
]);
?>