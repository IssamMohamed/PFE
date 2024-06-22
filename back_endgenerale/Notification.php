<?php
require_once 'Database.php';
require_once "Notification.php";

class Notification {
    public $status;
    public $db;
    public $id_note;
    public $content;
    public $id_to;
    public $id_from;

    public function __construct($content = null, $id_to = null, $id_from = null,$object=null, $status = null) {
        $this->db = Database::getInstance()->getConnection();
        $numArgs = func_num_args();
        
        if ($numArgs == 1) {
            $this->id_to = $id_to;
        } else {
            $this->content = $content;
            $this->id_to = $id_to;
            $this->id_from = $id_from;
            $this->object=$object;
            $this->status = 'unread';
        }
    }

    public function voir_notification($id_to) {
        try {
            $stmt = $this->db->prepare("SELECT n.*, u.name AS sender_name
        FROM notification n
        JOIN user u ON n.id_from = u.id_user
        WHERE n.id_to = :id AND n.status = 'unread'");
            $stmt->bindParam(':id', $id_to);
    
            if ($stmt->execute()) {
                $results = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetch all matching rows as associative arrays
    
                if ($results) {
                    return $results;
                } else {
                    http_response_code(404); // Not found
                    return array("error" => "No notifications found for the user.");
                }
            } else {
                http_response_code(500); // Internal server error
                return array("error" => "Failed to execute query.");
            }
        } catch (PDOException $e) {
            http_response_code(500); // Internal server error
            return array("error" => "Database error: " . $e->getMessage());
        }
    }
    public function vu($id_note){
      try{
        $sql = 'UPDATE notification SET status = "read" WHERE id_note = :id_note';
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id_note', $id_note);
        if ($stmt->execute()) {
            return array("success" => "Notification has been reading.");
        } else {
            return array("error" => "Failed to execute query.");
        }
      }catch (PDOException $e) {
            http_response_code(500); // Internal server error
            return array("error" => "Database error: " . $e->getMessage());
        }
    }

    public function send_note() {
        try{
            $sql = 'INSERT INTO notification (content, id_to, id_from,object, status) VALUES (:content, :id_to, :id_from,:object, :status)';
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':content', $this->content);
        $stmt->bindParam(':id_to', $this->id_to);
        $stmt->bindParam(':id_from', $this->id_from);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':object', $this->object);
        
        if ($stmt->execute()) {
            $this->id_note = $this->db->lastInsertId();
            return array("success" => "Notification sent successfully.");
        } else {
            return array("error" => "Failed to execute query.");
        }
        }catch (PDOException $e) {
            http_response_code(500); // Internal server error
            return array("error" => "Database error: " . $e->getMessage());
        }
    }

}
?>