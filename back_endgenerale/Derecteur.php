<?php
require 'Employee.php';
class Derecteur extends Employee {
  public function __construct($id_E, $name, $id_group, $id_report) {
      parent::__construct($id_E, $name, $id_group, $id_report);
  }

  public function deletE(){}
  public function addE(){} 
}
?>