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
    if (isset($data['id_group'])) { // Corrected to check both 'id'
        $id = $data['id_group'];

try {
    $BDD = Database::getInstance()->getConnection();

    // Prepare the statement
    $stmt = $BDD->prepare("SELECT * FROM user WHERE id_group = :id ");
    $stmt->bindParam(':id', $id);

    if ($stmt->execute()) {
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetch all matching rows as associative arrays

        if ($results) {
            $responses = [];
            foreach ($results as $result) {
                // For each result, extract the content and sender
                $responses[] = array(
                    'id_E' => $result['id_user'],
                    'name' => $result['name'],
                    'id_group' => $result['id_group']
                );
            }

            

            // Output the entire result set as JSON
            echo json_encode($responses);
        } else {
            http_response_code(404); // Not found
            echo json_encode(array("error" => "No notifications found for the user."));
        }
    } else {
        http_response_code(500); // Internal server error
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
