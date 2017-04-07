<?php

include 'dbConnect.php';
session_start();

//needed to also get the description for requirements
function getRequirementsComplexData() {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    $orgId = addslashes($_POST['orgId']);
    
    $requirementsQuery = $connLibrary->prepare("SELECT rt.ReqType, r.Description FROM Requirements r
                                                JOIN RequirementsTypes rt on (rt.ReqID = r.ReqID)
                                                WHERE OrgID = " . $orgId . ";");
    $requirementsQuery->execute();
    $requirementsQuery->bind_result($reqID, $reqDescription);
    
    $reqsData = array();
    
    while($requirementsQuery->fetch()){
        $reqsData[] = array($reqID);
    }
    
    echo json_encode($reqsData);
    $connLibrary->close();
    
}

echo $_POST["method"]();



?>
