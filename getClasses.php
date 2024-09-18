<?php
$conn = new mysqli('localhost', 'root', '', 'school_management');

$result = $conn->query("SELECT * FROM classes");

$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

echo json_encode($rows);
?>
