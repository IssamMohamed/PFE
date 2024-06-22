<?php
require_once 'Database.php';
require_once 'Notification.php';



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
    if (isset($data)) { // Corrected to check both 'id'
        $id_from = $data['id_from'];
        $id_to = $data['id_to'];
        $content = $data['content'];
        $object=$data['object'];
        $status = 'unread';
        
         //__construct($content = null, $id_to = null, $id_from = null, $status = null)
        try {
            $BDD = Database::getInstance()->getConnection();
            $notification = new Notification($content,$id_to,$id_from,$object,$status);
            $result = $notification->send_note();
            
        
            // Output the result as JSON
            
            $responses = [];
               $responses=$result;
                echo json_encode($responses);
            
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
