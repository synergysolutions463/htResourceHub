<?php

include 'dbConnect.php';

echo $_POST["method"]();

function readDeleteOrgId() {
    
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    $orgId = $_POST['orgId'];
    
    
    $queryDeleteId = $connLibrary->prepare("SELECT OrgId, OrgName from Organizations WHERE OrgId = " . $orgId . ";");
    $queryDeleteId->execute();
    $queryDeleteId->bind_result($orgID, $orgName);

    $deleteOrgData= array();
    while($queryDeleteId->fetch()){
        $deleteOrgData[] = array($orgID, $orgName);
    }
    
     
    echo json_encode($deleteOrgData); 
 
}


function deleteOrganization() {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    $orgId = $_POST['orgId'];
    
    $queryDeleteOrg = $connLibrary->prepare("DELETE FROM Organizations where OrgId = " . $orgId . ";");
    $queryDeleteOrg->execute();
 
    $queryCheckDelete = $connLibrary->query("SELECT * FROM Organizations where OrgId = " . $orgId . ";"); 
    if($queryCheckDelete->num_rows > 0) {
        echo "Not Deleted";
    }
    elseif($queryCheckDelete->num_rows < 1) {
        echo "Deleted";
    }

    $connLibrary->close();
    
}