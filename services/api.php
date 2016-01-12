<?php
require_once("Rest.inc.php");
require_once("SQLiteDB.php");

//http://angularcode.com/demo-of-a-simple-crud-restful-php-service-used-with-angularjs-and-mysql/

class API extends REST {

    public $data = "";

    private $db;

    public function __construct(){
        parent::__construct();
        $this->dbConnect();
    }

    private function dbConnect(){
        //$this->db = new SQLiteDB();
        $this->db = new SQLite3("/home/www-data/www/sp_admin/sp_admin");
    }

    /*
     * Dynmically call the method based on the query string
     */
    public function processApi(){
        sleep(2);
        $func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
        echo $_REQUEST['x'];
        EXIT();
        if((int)method_exists($this,$func) > 0)
            $this->$func();
        else
            $this->response('',404); // If the method not exist with in this class "Page not found".
    }



    private function pages() {
        if($this->get_request_method() == 'GET') {
            $query = "SELECT * FROM pages";
            $queryResult = $this->db->query($query);

            if($queryResult->numColumns() > 0){
                $result = array();
                while($row = $queryResult->fetchArray(SQLITE3_ASSOC)){
                    $result[] = $row;
                }
                $this->response($this->json($result), 200);
            }
            $this->response('', 204);
        }
        elseif($this->get_request_method() == 'POST') {
            $page = json_decode(file_get_contents("php://input"), true);
            if ($page) {
                if (!$page['order']) {
                    $query = "SELECT MAX(`order`) max_order FROM pages";
                    $queryResult = $this->db->query($query);
                    $page['order'] = $queryResult->fetchArray(SQLITE3_ASSOC)['max_order'] + 1;
                }
                $query = "INSERT INTO pages (`" . implode('`,`', array_keys($page)) . "`) VALUES('" . implode("','", array_values($page)) . "')";
                if ($this->db->exec($query)) {
                    $query = "SELECT last_insert_rowid() id";
                    $queryResult = $this->db->query($query);
                    $page['id'] = $queryResult->fetchArray(SQLITE3_ASSOC)['id'];
                    //$response = array('status' => 'Success', 'message' => 'Page created successfully', 'data' => $page);
                    $this->response($this->json($page), 200);
                }
                else {
                    $this->response('', 500);
                }
            }
            else
                $this->response('', 204);
        }
        elseif($this->get_request_method() == 'PUT') {
            $page = json_decode(file_get_contents("php://input"), true);
            if ($page) {
                $columns = array();
                foreach ($page as $key => $value) {
                    $columns[] = "`$key`='$value'";
                }
                $query = "UPDATE pages SET " . implode(',', $columns) . " WHERE id = " . $page['id'];
                echo $query;
                exit();
                $queryResult = $this->db->exec($query);
            }
            else
                $this->response('', 204);
        }
        else {
            $this->response('', 406);
        }



    }

    private function json($data) {
        if (is_array($data)) {
            return json_encode($data);
        }
    }
}

// Initiiate Library

$api = new API;
$api->processApi();
?>