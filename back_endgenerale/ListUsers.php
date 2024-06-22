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
   
    

    // Check if the ID parameter is set in the decoded data
     // Corrected to check both 'id'
        
        try {
            $BDD = Database::getInstance()->getConnection();
            $sql=('SELECT * FROM USER ');
                    $stmt = $BDD->prepare($sql);
                    
                    $stmt->execute();
                    $result= $stmt->fetchAll(PDO::FETCH_ASSOC);
            
        
            // Output the result as JSON
            
            if($result){
                foreach ($result as $notification) {
                    // For each result, extract the content and sender
                    $responses[] = array(
                        'id' => $notification['id_user'],
                        'name' => $notification['name'],
                        'password' => $notification['password'],
                        'id_group' => $notification['id_group'],
                        'sex' => $notification['sex'],
                        'role' => $notification['role']
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
    http_response_code(405);
    echo json_encode(array("error" => "Invalid request method."));
}
?>

           
