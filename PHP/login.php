<?php

include 'dbConnect.php';


  
  $usernameInput = $_POST['username'];
  $passwordInput = $_POST['password'];
  
    echo $_SESSION['loggedIn'];
  
/*
   $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }


    $loginQuery = $connLibrary->prepare("SELECT username from Login WHERE username = '". $usernameInput ."' AND  BINARY password = '". $passwordInput . "';");
    $loginQuery->execute();
    $loginQuery->bind_result($username);
    
    if (!$loginQuery) {
    echo 'Could not run query: ' . mysql_error();
    exit;
    }

    while($loginQuery->fetch()){
        $_SESSION['username'] = $username;
        $_SESSION['loggedIn'] = "true";
        
    }
  
    echo $_SESSION['username'] . " " . $_SESSION['loggedIn'];
    
    $connLibrary->close();
    */
}

