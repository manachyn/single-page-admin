<?php

class SQLiteDB extends SQLite3 {
    function __construct() {
        $this->open('/home/www-data/www/sp_admin/sp_admin', SQLITE3_OPEN_READWRITE);
    }
}