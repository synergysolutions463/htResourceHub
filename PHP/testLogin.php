<?php

include 'dbConnect.php';

echo $_POST["method"]();

function insertUser() {
    
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    $username = $_POST['username'];
    $password = $_POST['password'];
   

   	$insertUser = $connLibrary->prepare("INSERT INTO Login (username, password) VALUES ('" . $username . "','" . sha1($password) . "');");
															  
				
    $insertUser->execute();
    $insertUser->close();


    
    
    $connLibrary->close();
} 

function changePassword() {
    
}

?>