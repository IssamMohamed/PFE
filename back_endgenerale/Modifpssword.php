<?php
require_once 'Database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Respond successfully with no content
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $postData = file_get_contents("php://input");

    // Decode the JSON data
    $data = json_decode($postData, true);

    // Check if the ID and password parameters are set in the decoded data
    if (isset($data['id'], $data['password'])) {
        $id = $data['id'];
        $password = $data['password'];
        try {
            $BDD = Database::getInstance()->getConnection();
        
            $errorInfo = $BDD->errorInfo();
            if ($errorInfo[0] != '00000') { // Check for database connection errors
                http_response_code(500);
                echo json_encode(array("error" => "Connection failed: " . $errorInfo[2]));
                exit();
            }
        
            // Use $BDD for database operations since it's the connection object
            $stmt = $BDD->prepare("UPDATE user SET password = :password WHERE id_user = :id_user");
            $stmt->bindParam(':id_user', $id);
            $stmt->bindParam(':password', $password);
        
            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    echo json_encode(['status' => 'The password has been changed successfully']);
                } else {
                    http_response_code(404);
                    echo json_encode(array("error" => "User not found or password not changed."));
                }
            } else {
                http_response_code(500);
                echo json_encode(array("error" => "Failed to execute query."));
            }
        } catch (PDOException $e) {
            http_response_code(500); // Internal server error
            echo json_encode(array("error" => "Database error: " . $e->getMessage()));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("error" => "ID or password parameter is missing."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("error" => "Invalid request method."));
}
?>
