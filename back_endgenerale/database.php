<?php
class Database {
    private $host = 'localhost';
    private $db = 'PFEgeneral';
    private $username = 'root';
    private $password = '0541143230';
    private $pdo;
    private static $instance = null;

    private function __construct() {
        $dsn = "mysql:host=$this->host;dbname=$this->db;charset=utf8mb4";
        $this->pdo = new PDO($dsn, $this->username, $this->password);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->pdo;
    }
}
?>
