<?php
require_once 'Database.php';
require_once 'Report.php';



header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


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
            
            $sql=('UPDATE report SET status=:status WHERE id_report=:id_report');
                    $stmt = $BDD->prepare($sql);
                    $stmt->bindParam(':id_report', $id);
                    $stmt->bindValue(':status', 'Accepted');
                    
                    $result=$stmt->execute();
            if($result){
                $responses [] =array("massage" => "Report hase been Accepted") ;
               
              
            
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
        echo json_encode(array("error" => "ID parameter is missing."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("error" => "Invalid request method."));
}
?>

           
