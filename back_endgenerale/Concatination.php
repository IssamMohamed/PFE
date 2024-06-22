<?php
require_once 'Database.php';
require_once 'Report.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = file_get_contents("php://input");
    $data = json_decode($postData, true);

    if (isset($data['id']) && isset($data['name'])) {
        $id = $data['id'];
        $name = $data['name'];

        try {
            $BDD = Database::getInstance()->getConnection();

            // Select paths from the report table where id matches
            $sql = "SELECT path FROM report WHERE id_to = :id_to AND status = 'Accepted'";
            $stmt = $BDD->prepare($sql);
            $stmt->bindParam(':id_to', $id);

            if ($stmt->execute()) {
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $content = "";

                foreach ($result as $row) {
                    if (file_exists($row["path"])) {
                        $content .= file_get_contents($row["path"]);
                    }
                }

                $report = new Report();
                $report->cree_report($id, $name);

                // Get the latest report ID
                $sql = 'SELECT id_report FROM report ORDER BY id_report DESC LIMIT 1';
                $stmt = $BDD->query($sql);
                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($result) {
                    $reportPath = 'reports/' . $name . '_' . $result['id_report'] . '.txt';

                    if (!file_exists('reports')) {
                        mkdir('reports', 0777, true);
                    }

                    if (file_put_contents($reportPath, $content) !== false) {
                        $sql = "UPDATE report SET path = :path, name = :name  WHERE id_report = :id_report";
                        $stmt = $BDD->prepare($sql);
                        $stmt->bindParam(':path', $reportPath);
                        $stmt->bindParam(':name', $name);
                        $stmt->bindParam(':id_report', $result['id_report']);
                        
                        if ($stmt->execute()) {
                            $responses = array("concatenation" => "true");
                            $sql = "UPDATE report SET status = 'Not accepted'  WHERE id_to = :id_to";
                        $stmt = $BDD->prepare($sql);
                        $stmt->bindParam(':id_to', $id);
                        $stmt->execute();
                            echo json_encode($responses);
                        } else {
                            echo json_encode(array("error" => "Concatenation didn't succeed"));
                        }
                    } else {
                        echo json_encode(array("error" => "File could not be written"));
                    }
                } else {
                    echo json_encode(array("error" => "No report found"));
                }
            } else {
                echo json_encode(array("error" => "Failed to execute query"));
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(array("error" => "Database error: " . $e->getMessage()));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("error" => "ID or name parameter is missing."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("error" => "Invalid request method."));
}
?>
