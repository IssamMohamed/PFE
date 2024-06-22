<?php
require_once 'Database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight request



        try {
            $BDD = Database::getInstance()->getConnection();
        
            $errorInfo = $BDD->errorInfo();
            if ($errorInfo[0] != '00000') { // Check for database connection errors
                http_response_code(500);
                echo json_encode(array("error" => "Connection failed: " . $errorInfo[2]));
                exit();
            }
        
            // Use $BDD for database operations since it's the connection object
            $stmt = $BDD->prepare("SELECT * FROM groupe");
        
            if ($stmt->execute()) {
                $results = $stmt->fetchAll(PDO::FETCH_ASSOC); 
                $responses = [];
            foreach ($results as $result) {
                // For each result, extract the content and sender
                $responses[] = array(
                    'id' => $result['id_group'],
                    'name' => $result['name']
                );
            }
            echo json_encode($responses);
            } else {
                http_response_code(500);
                echo json_encode(array("error" => "Failed to execute query."));
            }
        } catch (PDOException $e) {
            http_response_code(500); // Internal server error
            echo json_encode(array("error" => "Database error: " . $e->getMessage()));
        }
   
?>
