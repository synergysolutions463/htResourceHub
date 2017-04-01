<?php

include 'dbConnect.php';



echo $_POST["method"]();


function getAddressUpdateData() {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    
   $orgId = $_POST['orgId'];

    $getAddressUpdateQuery = $connLibrary->prepare("SELECT a.StreetInfo, a.City, a.ZipCode, a.County, 
                                                    s.StateName, a.isConf FROM Addresses a
                                                    JOIN States s ON (s.StateID = a.StateID)
                                                    WHERE OrgID = " . $orgId . ";");
    $getAddressUpdateQuery->execute();
     $getAddressUpdateQuery->bind_result($streetInfo, $city, $zipcode, $county, $stateName, $isConf);

     $addressData = array();
    while( $getAddressUpdateQuery->fetch()){
        $addressData[] = array($streetInfo, $city, $zipcode, $county, $stateName, $isConf);
    }
    
    
    
    echo json_encode($addressData);
    
}

function getAgeUpdateData() { 
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    
   $orgId = $_POST['orgId'];

    $getAgeUpdateQuery = $connLibrary->prepare("SELECT at.AgeType FROM Age a JOIN AgeTypes at 
                                                ON (at.AgeID = a.AgeID) WHERE OrgID = " . $orgId . ";");
    $getAgeUpdateQuery->execute();
    $getAgeUpdateQuery->bind_result($ageType);

    $ageData = array();
    while( $getAgeUpdateQuery->fetch()){
        $ageData[] = array($ageType);
    }
    
    echo json_encode($ageData);

}

function getContactsUpdateData() {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
   $orgId = $_POST['orgId'];

    $getContactsUpdateQuery = $connLibrary->prepare("SELECT * from Contacts WHERE OrgID = " . $orgId . ";");
    $getContactsUpdateQuery->execute();
    $getContactsUpdateQuery->bind_result($orgId, $email, $firstName, $lastName, $position, $phoneNum, $isConf, $phoneExt);

    $contactData = array();
    while( $getContactsUpdateQuery->fetch()){
        $contactData[] = array($orgId, $email, $firstName, $lastName, $position, $phoneNum, $isConf, $phoneExt);
    }
    
    echo json_encode($contactData);
    
}

function getEthnicityUpdateData() {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
   $orgId = $_POST['orgId'];

    $getEthnicityUpdateQuery = $connLibrary->prepare("SELECT et.EthType FROM Ethnicity e JOIN EthnicityTypes et 
                                                ON (et.EthID = e.EthID) WHERE OrgID = " . $orgId . ";");
    $getEthnicityUpdateQuery->execute();
    $getEthnicityUpdateQuery->bind_result($ethType);

    $ethnicityData = array();
    while( $getEthnicityUpdateQuery->fetch()){
        $ethnicityData[] = array($ethType);
    }
    
    echo json_encode($ethnicityData);
    
}

function getGenderUpdateData() {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
   $orgId = $_POST['orgId'];

    $getGenderUpdateQuery = $connLibrary->prepare("SELECT gt.GenType FROM Gender g JOIN GenderTypes gt 
                                                ON (gt.GenID = g.GenID) WHERE OrgID = " . $orgId . ";");
    $getGenderUpdateQuery->execute();
    $getGenderUpdateQuery->bind_result($genType);

    $genderData = array();
    while( $getGenderUpdateQuery->fetch()){
        $genderData[] = array($genType);
    }
    
    echo json_encode($genderData);
    
}

function getHoursUpdateData() {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    
   $orgId = $_POST['orgId'];

    $getHoursUpdateQuery = $connLibrary->prepare("SELECT * from Hours WHERE OrgID = " . $orgId . ";");
    $getHoursUpdateQuery->execute();
    $getHoursUpdateQuery->bind_result($id, $is24Hours, $isAdditional, $mondayStart, $mondayEnd, 
                                        $tuesdayStart, $tuesdayEnd, $wednesdayStart, $wednesdayEnd, 
                                        $thursdayStart, $thursdayEnd, $fridayStart, $fridayEnd,
                                        $saturdayStart, $saturdayEnd, $sundayStart, $sundayEnd,
                                        $reasonForAddHours);

     $hoursData = array();
    while( $getHoursUpdateQuery->fetch()){
        $hoursData[] = array($id, $is24Hours, $isAdditional, $mondayStart, $mondayEnd, 
                                        $tuesdayStart, $tuesdayEnd, $wednesdayStart, $wednesdayEnd, 
                                        $thursdayStart, $thursdayEnd, $fridayStart, $fridayEnd,
                                        $saturdayStart, $saturdayEnd, $sundayStart, $sundayEnd,
                                        $reasonForAddHours);
    }
    
    
    
    echo json_encode($hoursData);
    
}

function getNationalityUpdateData() {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    $orgId = $_POST['orgId'];

    $nationalityQuery = $connLibrary->prepare("SELECT nt.NatType FROM Nationality n 
                                               join NationalityTypes nt on (nt.NatID = n.NatID) 
                                               WHERE OrgID = " . $orgId . ";");
    $nationalityQuery->execute();
    $nationalityQuery->bind_result($natID);
    
    $natsData = array();
    
    while($nationalityQuery->fetch()){
        $natsData[] = array($natID);
    }
    
    echo json_encode($natsData);
    
}

function getOrganizationUpdateData() {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    $orgId = $_POST['orgId'];
    
    $organizationQuery = $connLibrary->prepare("SELECT OrgID, OrgName, ProgramStatement, WebLink, Email, PhoneNum, HotlineNum, ConfNum, isShelter, isTransitionalHousing, isAssistanceLocatingHousing, Fees, ft.FaithType, Notes, ConfNotes, isConf, isApproved, AgencyName, phoneExt, confPhoneExt FROM Organizations o
                                                JOIN FaithTypes ft on (ft.FaithID = o.FaithID)
                                                WHERE OrgID = " . $orgId . ";");
    $organizationQuery->execute();
    $organizationQuery->bind_result($ID, $orgName, $programStatement, $webLink, $email, $phoneNum, $hotline, $confNum, $isShelter, $isTransitionalHousing, $isAsstLoc, $fees, $faithID, $notes, $confNotes, $isConf, $isApproved, $agencyName, $phoneExt, $confPhoneExt); 
    $orgsData = array();
    
    while($organizationQuery->fetch()){
        $orgsData[] = array($ID, $orgName, $programStatement, $webLink, $email, $phoneNum, $hotline, $confNum, $isShelter, $isTransitionalHousing, $isAsstLoc, $fees, $faithID, $notes, $confNotes, $isConf, $isApproved, $agencyName, $phoneExt, $confPhoneExt);
    }
    
    echo json_encode($orgsData);
}

function getRaceUpdateData() {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    $orgId = $_POST['orgId'];
    
    $raceQuery = $connLibrary->prepare("SELECT rt.RaceType FROM Race r
                                        JOIN RaceTypes rt on (rt.RaceID = r.RaceID)
                                        WHERE OrgID = " . $orgId . ";");
    $raceQuery->execute();
    $raceQuery->bind_result($raceType);
    
    $racesData = array();
    
    while($raceQuery->fetch()){
        $racesData[] = array($raceType);
    }
    
    echo json_encode($racesData);
}

function getRequirementsUpdateData() {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    $orgId = $_POST['orgId'];
    
    $requirementsQuery = $connLibrary->prepare("SELECT rt.ReqType FROM Requirements r
                                                JOIN RequirementsTypes rt on (rt.ReqID = r.ReqID)
                                                WHERE OrgID = " . $orgId . ";");
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
    
    $orgId = $_POST['orgId'];
    
    $serviceQuery = $connLibrary->prepare("SELECT s.OrgID, st.SerType, s.Service, s.Supply, s.Emergency, s.SerDesc FROM Service s 
                                           JOIN ServiceTypes st on (st.SerID = s.SerID)
                                           WHERE OrgID = " . $orgId);
    $serviceQuery->execute();
    $serviceQuery->bind_result($ID, $serID, $service, $supply, $emergency, $serDesc);
    
    $servicesData = array();
    
    while($serviceQuery->fetch()){
        $servicesData[] = array($ID, $serID, $service, $supply, $emergency, $serDesc);
    }
    
    echo json_encode($servicesData);
}


?>
