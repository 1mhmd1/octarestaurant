<?php
include '../connection/conn.php';
$id=$_GET['menu_id'];
$stmt=$conn->prepare('SELECT food_category.food_cat_id , food_category.food_cat_name
FROM food_category JOIN food
ON food.food_cat_id = food_category.food_cat_id
WHERE food.menu_id=?');
$stmt->bind_param('i', $id);
$stmt->execute();
$result = $stmt->get_result();
$categories = [];
while ($row = $result->fetch_assoc()) {
    $categories[] = $row;
}
echo json_encode(['message'=>'success', 'cat'=>$categories]);
?>