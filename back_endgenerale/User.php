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

    // Check if the ID parameter is set in the decoded data
    if (isset($data['id'], $data['password'])) { // Corrected to check both 'id' and 'password'
        $id = $data['id'];
        $password = $data['password'];
        try {
            $id = $data['id'];
            $password = $data['password'];	
        
            $BDD = Database::getInstance()->getConnection();
        
            $errorInfo = $BDD->errorInfo();
            if ($errorInfo[0] != '00000') { // Check for database connection errors
                http_response_code(500);
                echo json_encode(array("error" => "Connection failed: " . $errorInfo[2]));
                exit();
            }
        
            // Use $BDD for database operations since it's the connection object
            $stmt = $BDD->prepare("SELECT * FROM user WHERE id_user=:id_user AND password=:password");
            $stmt->bindParam(':id_user', $id); // Corrected variable name
            $stmt->bindParam(':password', $password); // Corrected variable name
        
            if ($stmt->execute()) {
                $result = $stmt->fetch(PDO::FETCH_ASSOC); // Fetch as associative array
        
                if ($result) { // Check if result is not false
                    $response = array(
                        "id" => $result['id_user'], // Check if 'id' key exists
                        "password" => $result['password'], // Check if 'password' key exists
                        "role" =>$result['role'], // Check if 'role' key exists
                    );
        
                    echo json_encode($response);
                } else {
                    http_response_code(404); // Changed to 404 for not found
                    echo json_encode(array("error" => "User not found."));
                }
            } else {
                http_response_code(500);
                echo json_encode(array("error" => "Failed to execute query."));
            }
        } catch (PDOException $e) {
            http_response_code(500); // Internal server error
            echo json_encode(array("error" => "Database error: " . $e->getMessage()));
        }
        
         // Ensure this method exists and works as expected
    } else {
        http_response_code(400);
        echo json_encode(array("error" => "ID or password parameter is missing."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("error" => "Invalid request method."));
}
?>
