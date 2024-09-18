<?php
$conn = new mysqli('localhost', 'root', '', 'school_management');

$data = json_decode(file_get_contents("php://input"));
$className = $data->className;
$boys = $data->boys;
$girls = $data->girls;
$total = $boys + $girls;

$stmt = $conn->prepare("INSERT INTO classes (class_name, boys_count, girls_count, total_count) VALUES (?, ?, ?, ?)");
$stmt->bind_param("siii", $className, $boys, $girls, $total);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
