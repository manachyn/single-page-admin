<?php
class Controllers_Pages extends RestController {

    private $db;

    public function __construct($request){
        parent::__construct($request);
        $this->db = new SQLite3("/home/www-data/www/sp_admin/sp_admin");
    }

    public function get() {
        sleep(2);

        $query = "SELECT COUNT(id) count FROM pages";
        $queryResult = $this->db->query($query);
        $total = $queryResult->fetchArray(SQLITE3_ASSOC)['count'];

        $query = "SELECT * FROM pages";
        if ($this->request['params']['sort_by']) {
            $order = $this->request['params']['sort_by'];
            $query .= " ORDER BY `$order`";
            if ($this->request['params']['order']) {
                $direction = $this->request['params']['order'];
                $query .= " $direction";
            }
        }
        if ($this->request['params']['page'] && $this->request['params']['per_page']) {
            $offset = ($this->request['params']['page'] - 1) * $this->request['params']['per_page'];
            $count  = $this->request['params']['per_page'];
            $query .= " LIMIT $offset, $count";
        }
//        echo $query;
//        exit();
        $queryResult = $this->db->query($query);

        if($queryResult->numColumns() > 0){
            $result = array();
            while($row = $queryResult->fetchArray(SQLITE3_ASSOC)){
                $result[] = $row;
            }
            $response = array(
                array('total_entries' => $total),
                $result
            );
            $this->response = $response;
            $this->responseStatus = 200;
        }
        else {
            $this->responseStatus = 204;
        }
    }
    public function post() {
        sleep(2);
        $page = $this->request['params'];
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
                $this->response = $page;
            }
            else {
                $this->responseStatus = 500;
            }
        }
        else
            $this->responseStatus = 204;
    }
    public function put() {
        if ($this->request['params']) {
            // Request params is array with numeric keys - batch update
            if ($this->request['params'] == array_values($this->request['params'])){
                $pages = $this->request['params'];
            }
            else {
                $pages = array($this->request['params']);
            }
            foreach ($pages as $page) {
                $columns = array();
                foreach ($page as $key => $value) {
                    $columns[] = "`$key`='$value'";
                }
                $query = "UPDATE pages SET " . implode(',', $columns) . " WHERE id = " . $page['id'];
                if ($this->db->exec($query)) {
                    //$this->response = $page;
                }
                else {
                    $this->responseStatus = 500;
                }
            }
            $this->response = array();
            $this->responseStatus = 200;
        }
        else {
            $this->responseStatus = 204;
        }
    }
    public function delete() {
        sleep(2);
        $this->response = array('TestResponse' => 'I am DELETE response. Variables sent are - ' . http_build_query($this->request['params']));
        $this->responseStatus = 200;
    }
}