<?php
$conn = new mysqli('localhost', 'root', '', 'school_management');

$data = json_decode(file_get_contents("php://input"));
$username = $data->username;
$password = $data->password;

$result = $conn->query("SELECT * FROM users WHERE username='$username' AND password='$password'");

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode(['success' => true, 'role' => $user['role']]);
} else {
    echo json_encode(['success' => false]);
}
?>
