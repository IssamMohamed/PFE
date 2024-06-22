<?php
require 'Database.php';
require 'Report.php';
class Employee {
    private $id_E;
    private $name;
    private $id_group;
    private $pdo;

    public function __construct($id_E) {
        // Get the PDO connection from the Database class
        $this->pdo = Database::getInstance()->getConnection();

        $sql=('SELECT * FROM Employee WHERE id_E = :id_E');
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id_E', $id_E);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC); 


   
        $this->name = $result['name'];
        $this->id_group = $result['id_group'];

        
    }

    public function creat_report($id_E,$content,$name_report){
             $report=new Report(null,$content,$id_E,$name_report);
             $result=$report->cree_report($content,$id_E,$name);
    }
    public function valide_report($id_report){
            $report=new Report($id_report);
            $result=$report->valide_report($id_to);
    }
    public function delete_report($id_report){
            $report=new Report($id_report);
            $result=$report->delete_report($id_report);
    }
    public function open_report($id_report){
        $report=new Report($id_report);
        $result=$report->open_report($id_report);
    }
    public function copy_report($id_report){
        $report=new Report($id_report);
        $result=$report->copy_report($id_report);
    }
    public function save_report($id_E){
        $report=new Report($id_report,$content,null,null);
        $result=$report->save_report();
    }
    public function my_report($id_E){
           $rport=new Report();
           $result=$rport->get_my_report($id_E);
    }
    public function other_report($id_E){
        $rport=new Report();
        $result=$rport->get_other_report($id_E);
    }
    public function send_note($id_E,$id_to,$contentNote){
         $note=new Note($contentNote,$id_to,$id_E);
         $result=$note->send_note();
    }
    public function voir_note(){
        $note=new Note();
        $result=$note->voir_note($id_E);
   }

}
?>
