<?php
include '../connection/conn.php';
$menu_id=$_GET['menu_id'];
$food_cat_id=$_GET['food_cat_id'];
$stmt=$conn->prepare("SELECT * FROM food WHERE menu_id= ? AND food_cat_id= ?");
$stmt->bind_param('ii', $menu_id, $food_cat_id);
$stmt->execute();
$result = $stmt->get_result();
$foods = [];
while ($row = $result->fetch_assoc()) {
    $foods[] = $row;
}
echo json_encode(['status'=>'success', 'data'=>$foods]);
?>