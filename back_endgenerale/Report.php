<?php
      class Report{
        public $id_report;
        public $content;
        public $id_from;
        public $id_to;
        public $name;
        public function __construct($id_report= null,$content= null,$id_from= null,$name= null){
                $this->db = Database::getInstance()->getConnection();
                $numArgs = func_num_args();
                if($numArgs == 1){
                    $this->id_report=$id_report;
                }if ($numArgs==2) {
                    $this->content=$content;
                    $this->id_report=$id_report;
                }else{
                    $this->content=$content;
                    $this->id_from=$id_from;
                    $this->name=$name;
                }
        }
        public function open_report($id_report){
            $sql=('SELECT * FROM report WHERE id_report = :id_report');
                    $stmt = $this->db->prepare($sql);
                    $stmt->bindParam(':id_report', $id_report);
                    $stmt->execute();
                    $reportData = $stmt->fetch(PDO::FETCH_ASSOC);
                    if ($reportData) {
                        $path=$reportData['path'];
                        if (file_exists($path)) {
                            $content = file_get_contents($path);
                            return array(
                                "id" => $id_report,
                                "name" => $reportData['name'],
                                "content" => $content,
                                "id_from" => $reportData['id_from'],
                                'status' => $reportData['status'],
                                "id_to" => $reportData['id_to']
                            );
                         // Returning an associative array
                    } else {
                        return []; // Returning an empty array for consistency
                    }
                }
        }
        public function save_report() {
                $sql = "SELECT path FROM report WHERE id_report = :id_report";
                $stmt = $this->db->prepare($sql);
                $stmt->bindParam(':id_report', $this->id_report, PDO::PARAM_INT);
    
            
            //$stmt->bindParam(':content', $this->content);
            if($stmt->execute()){
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                $path=$result['path'];
                if (!file_exists('reports')) {
                    mkdir('reports', 0777, true);
                }
                if (file_put_contents($path, $this->content) !== false) {
                return array("succes" => "Report saved successfully");
                }
            }
        }
        
        public function cree_report($id_from,$name){
            try {
                // First query: Insert into the report table
                $sql = "INSERT INTO report (name, id_from, status) VALUES (:name, :id_from, :status)";
                $stmt = $this->db->prepare($sql);
                $stmt->bindParam(':name', $name);
                $stmt->bindParam(':id_from', $id_from);
                $stmt->bindValue(':status', 'Not accepted');
            
                
                // Execute the insert statement
                if ($stmt->execute()) {
                    // Second query: Retrieve the last inserted id_report
                    $sql = 'SELECT id_report FROM report ORDER BY id_report DESC LIMIT 1';
                    $stmt = $this->db->query($sql); // No need to prepare again as there are no parameters
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
                    $reportPath = 'reports/' . $name . '_' . $result['id_report'] . '.txt';
                    // Check if a result was found and return it
                    if ($result) {
                        if (!file_exists('reports')) {
                            mkdir('reports', 0777, true);
                        }
                        $content='';
                        if (file_put_contents($reportPath,$content) !== false) {
                            $sql = "UPDATE report SET path = :path WHERE id_report = :id_report";
                            $stmt = $this->db->prepare($sql);
                            $stmt->bindParam(':path', $reportPath);
                            $stmt->bindParam(':id_report', $result['id_report']);
                            $stmt->execute();
                        }
                        return $result;
                        
                    }
                }
            } catch (PDOException $e) {
                // Log the exception message
                error_log('Database Error: ' . $e->getMessage());
            }
        
        } 
        public function valid_report($id_report, $id_E) {
    $sql = "SELECT * FROM user WHERE id_user = :id_user";
    $stmt = $this->db->prepare($sql);
    $stmt->bindParam(':id_user', $id_E);
    if ($stmt->execute()) {
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $id_group = $result['id_group'];
        $role = $result['role'];
        if ($role == 'Employee') {
            $sql = "SELECT id_user FROM user WHERE id_group = :id_group AND role = 'Chef'";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(':id_group', $id_group);
            if ($stmt->execute()) {
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                $idto = $result['id_user'];
                $sql = "UPDATE report SET id_to = :id_to WHERE id_report = :id_report";
                $stmt = $this->db->prepare($sql);
                $stmt->bindParam(':id_to', $idto);
                $stmt->bindParam(':id_report', $id_report);
                if ($stmt->execute()) {
                    return array("success" => "Report validated successfully");
                }
            }
        } elseif('Director') {
            $sql = "SELECT id_user FROM user WHERE role = 'Director'";
            $stmt = $this->db->prepare($sql);
            
            if ($stmt->execute()) {
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                $idto = $result['id_user'];
                $sql = "UPDATE report SET id_to = :id_to WHERE id_report = :id_report";
                $stmt = $this->db->prepare($sql);
                $stmt->bindParam(':id_to', $idto);
                $stmt->bindParam(':id_report', $id_report);
                if ($stmt->execute()) {
                    return array("success" => "Report validated successfully");
                }
            }
        }
    }
}

       
        
        public function delete_report($id_report){
            $sqlSelect = "SELECT path FROM report WHERE id_report = :id_report";
            $stmt = $this->db->prepare($sqlSelect);
            $stmt->bindParam(':id_report', $id_report);
            if($stmt->execute()){
                $result=$stmt->fetch(PDO::FETCH_ASSOC);
                $filePath=$result['path'];
                if (file_exists($filePath)) {
                    if (unlink($filePath)) {
                        $sql ="DELETE FROM report WHERE id_report = :id_report";
                        $stmt = $this->db->prepare($sql);
                        $stmt->bindParam(':id_report', $id_report);
                        if($stmt->execute()){
                            return array("error" => "Report deleted successfully");
                        }
                    }
                }
            }
        }
        public function get_my_report($id_E){
            $sql = "SELECT * FROM report WHERE id_from = :id_E ORDER BY id_report DESC";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(':id_E', $id_E);
            $stmt->execute();
            $result=$stmt->fetchAll(PDO::FETCH_ASSOC);
            if($result){
                return $result;
            }
        }
        public function get_other_report($id_E){
            $sql = "SELECT * FROM report WHERE id_to = :id_E ORDER BY id_report DESC";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(':id_E', $id_E);
            $stmt->execute();
            $result=$stmt->fetchAll(PDO::FETCH_ASSOC);
            if($result){
                return $result;
            }else{
                return array("error" => "No report found for the user.");
            }
        }
    }
?>