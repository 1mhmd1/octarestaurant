<?php
require "conn.php";

$sql = "SHOW TABLES";
$result = mysqli_query($conn, $sql);

$tables = [];
while ($row = mysqli_fetch_row($result)) {
    $tables[] = $row[0];
}

echo json_encode([
    "status" => "CONNECTED",
    "tables" => $tables
]);
