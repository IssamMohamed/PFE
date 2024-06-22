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
        $name = $data['name'];
        $password = $data['password'];
        $sex = $data['sex'];
        $role = $data['role'];
        $id_group = $data['group'];
      
        
        

        try {
            $BDD = Database::getInstance()->getConnection();
            
            $sql=('UPDATE user SET name=:name, password=:password, sex=:sex, role=:role, id_group=:id_group WHERE id_user=:id_user');
                    $stmt = $BDD->prepare($sql);
                    $stmt->bindParam(':id_user', $id);
                    $stmt->bindParam(':name', $name);
                    $stmt->bindParam('password', $password);
                    $stmt->bindParam(':sex', $sex);
                    $stmt->bindParam(':role', $role);
                    $stmt->bindParam(':id_group', $id_group);
                    $result=$stmt->execute();
            if($result){
                $responses [] =array("massage" => "user hase been added") ;
               
              
            
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

           
