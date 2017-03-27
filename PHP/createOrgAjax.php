<?php

include 'dbConnect.php';

echo $_POST["method"]();

function insertOrganization () {
    
     $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }

            $orgName = $_POST['orgName'];
			$agencyName = $_POST['agencyName'];
			$missionStmt = $_POST['missionStmt'];
			$weblink = $_POST['weblink'];
			$email = $_POST['email'];
			$phoneNum = $_POST['phoneNum'];
			$hotlineNum = $_POST['hotlineNum'];
			$confNum = $_POST['confNum'];
			$isShelter = $_POST['isShelter'];
			$isTransHousing = $_POST['isTransHousing'];
			$isAsstLoc = $_POST['isAsstLoc'];
			$fee = $_POST['fee'];
			$faith = $_POST['faith'];
			$notes = $_POST['notes'];
			$confNotes = $_POST['confNotes'];
			$isConf = $_POST['isConf'];
			
			if ($isShelter == "true") {
			    $isShelter = 1;
			}
			elseif ($isShelter == "false") {
			    $isShelter = 0;
			}
			
				if ($isTransHousing == "true") {
			    $isTransHousing = 1;
			}
			elseif ($isTransHousing == "false") {
			    $isTransHousing = 0;
			}
			
				if ($isAsstLoc == "true") {
			    $isAsstLoc = 1;
			}
			elseif ($isAsstLoc == "false") {
			    $isAsstLoc = 0;
			}
			
				if ($iisConf == "true") {
			    $isConf = 1;
			}
			elseif ($isConf == "false") {
			    $isConf = 0;
			}
			
			$getFaithIdQuery = $connLibrary->prepare("SELECT FaithID from FaithTypes where FaithType like '" . $faith . "';");
			$getFaithIdQuery->execute();
			$getFaithIdQuery->bind_result($id);
			
			$faithId = 1;
    		while($getFaithIdQuery->fetch()){
        		$faithId = $id;
    		}
			
	
			
			$insertOrgQuery = $connLibrary->prepare("INSERT INTO Organizations (OrgName, AgencyName, ProgramStatement, WebLink, Email, PhoneNum, 
			                                           HotlineNum, ConfNum, isShelter, isTransitionalHousing, isAssistanceLocatingHousing, Fees,
			                                           FaithID, Notes, ConfNotes, isConf) VALUES ('" . $orgName . "','" . $agencyName . "','"
			                                            . $missionStmt . "','" . $weblink . "','" . $email . "','" . $phoneNum . "','"
			                                             . $hotlineNum . "','" . $confNum . "'," . $isShelter . "," . $isTransHousing . ","
			                                              . $isAsstLoc . ",'" . $fee . "'," . $faithId . ",'" . $notes . "','" . $confNotes . "'," . $isConf . ");");
            $insertOrgQuery->execute();
            $insertOrgQuery->close();
      
}

?>
