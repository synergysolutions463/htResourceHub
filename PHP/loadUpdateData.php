<?php

include 'dbConnect.php';

$orgId = $_POST['orgId'];

echo $_POST["method"]($orgId);


function getAddressUpdateData() {
     $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    
   

    $getAddressUpdateQuery = $connLibrary->prepare(""); 
    $getAddressUpdateQuery->execute();
    $allOrgQuery->bind_result($orgID, $orgName, $phoneNum, $phoneExt, $confNum, $confExt, $hotlineNum, $webLink, $email, $isShelter, $isConfOrg, $isApproved, $streetInfo, $city, $zip, $IsConfAddress, $stateName, $serType, $is24Hours);

    $allOrgData = array();
    while($allOrgQuery->fetch()){
        $allOrgData[] = array($orgID, $orgName, $phoneNum, $phoneExt, $confNum, $confExt, $hotlineNum, $webLink, $email, $isShelter, $isConfOrg, $isApproved, $streetInfo, $city, $zip, $IsConfAddress, $stateName, $serType, $is24Hours);
    }
    
    
    
    echo json_encode($allOrgData);
    
}

function getAgeUpdateData() { 

}

function getContactsUpdateData() {
    
}

function getEthnicityUpdateData() {
    
}

function getGenderUpdateData() {
    
}

function getHoursUpdateData() {
    
}

function getNationalityUpdateData($orgID) {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }

    $nationalityQuery = $connLibrary->prepare("SELECT NatID FROM Nationality WHERE OrgID = " . $orgID);
    $nationalityQuery->execute();
    $nationalityQuery->bind_result($natID);
    
    $natsData = array();
    
    while($nationalityQuery->fetch()){
        $natsData[] = array($natID);
    }
    
    echo json_encode($natsData);
    
}

function getOrganizationUpdateData($orgID) {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    $organizationQuery = $connLibrary->prepare("SELECT * FROM Organizations WHERE OrgID = " . $orgID);
    $organizationQuery->execute();
    $organizationQuery->bind_result($ID, $orgName, $agencyID, $programStatement, $webLink, $email, $phoneNum, $hotline, $isConf, $isApproved, $agencyName, $phoneNum, $phoneExt, $confPhoneExt);
    
    $orgsData = array();
    
    while($organizationQuery->fetch()){
        $orgsData[] = array($ID, $orgName, $agencyID, $programStatement, $webLink, $email, $phoneNum, $hotline, $isConf, $isApproved, $agencyName, $phoneNum, $phoneExt, $confPhoneExt);
    }
    
    echo json_encode($orgsData);
}

function getRaceUpdateData() {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    $raceQuery = $connLibrary->prepare("SELECT RaceID FROM Race WHERE OrgID = " . $orgID);
    $raceQuery->execute();
    $raceQuery->bind_result($raceID);
    
    $racesData = array();
    
    while($raceQuery->fetch()){
        $racesData[] = array($raceID);
    }
    
    echo json_encode($racesData);
}

function getRequirementsUpdateData() {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    $requirementsQuery = $connLibrary->prepare("SELECT ReqID FROM Requirements WHERE OrgID = " . $orgID);
    $requirementsQuery->execute();
    $requirementsQuery->bind_result($reqID);
    
    $reqsData = array();
    
    while($requirementsQuery->fetch()){
        $reqsData[] = array($reqID);
    }
    
    echo json_encode($reqsData);
    
}

function getServiceUpdateData() {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    $serviceQuery = $connLibrary->prepare("SELECT * FROM Service WHERE OrgID = " . $orgID);
    $serviceQuery->execute();
    $serviceQuery->bind_result($ID, $serID, $service, $supply, $emergency, $serDesc);
    
    $
}


?>
