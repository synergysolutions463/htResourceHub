<?php
function db_connect() {
    $server = getenv("IP");
    $username = getenv('C9_USER');
    $pass = "";
    $dbname = "htResourceHub";
    $dbport = 3306;
    
    $connLibrary = new mysqli($server, $username, $pass, $dbname, $dbport);
    if ($connLibrary->connect_error) {
        return NULL;
    } 
    
    return $connLibrary;
}

?>