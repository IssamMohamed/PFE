<?php
require_once 'Database.php';
require_once 'Report.php';



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
    if (isset($data['id'])) { // Corrected to check both 'id'
        $id = $data['id'];
        

        try {
            $BDD = Database::getInstance()->getConnection();
            $reports=new Report();
            $result=$reports->get_my_report($id);
            
        
            // Output the result as JSON
            
            if($result){
                $responses = [];
                $responses = [];
                foreach ($result as $notification) {
                    // For each result, extract the content and sender
                    $responses[] = array(
                        'id' => $notification['id_report'],
                        'name' => $notification['name']
                    );
                }
                echo json_encode($responses);
            }else{
                echo json_encode(array("id" => "0","content" => "No message sended","sender" => "no one"));
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