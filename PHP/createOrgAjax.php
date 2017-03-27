<?php

include 'dbConnect.php';

echo $_POST["method"]();

function insertOrganization () {
    
     $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }


			/** Organization Table Insert **/
			
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
            
            
            $selectOrgQuery = $connLibrary->prepare("SELECT LAST_INSERT_ID();");
            $selectOrgQuery->execute();
            $selectOrgQuery->bind_result($id);
			
			$orgId = 0;
    		while($selectOrgQuery->fetch()){
        		$orgId = $id;
    		}
    		
    		
    		
    		/**Addresses Insert**/
    		$streetInfo1 = $_POST['streetInfo1'];
			$city1 = $_POST['city1'];
			$zipcode1 = $_POST['zipcode1'];
			$county1 = $_POST['county1'];
			$state1 = $_POST['state1'];

			$streetInfo2 = $_POST['streetInfo2'];
			$city2 = $_POST['city2'];
			$zipcode2 = $_POST['zipcode2'];
			$county2 = $_POST['county2'];
			$state2 = $_POST['state2'];

			$streetInfo3 = $_POST['streetInfo3'];
			$city3 = $_POST['city3'];
			$zipcode3 = $_POST['zipcode3'];
			$county3 = $_POST['county3'];
			$state3 = $_POST['state3'];
			
			$state1Id = 0;
			$state2Id = 0;
			$state3Id = 0;
			
			if($state1 != "" || $state1 != null) {
				
				$getState1Query = $connLibrary->prepare("SELECT StateID from States WHERE StateName like '" . $state1 . "';");
				$getState1Query->execute();
				$getState1Query->bind_result($id);
			
		
    			while($getState1Query->fetch()){
        			$state1Id = $id;
    			}
			}
		
			
			if($state2 != "" || $state2 != null) {
				
				$getState2Query = $connLibrary->prepare("SELECT StateID from States WHERE StateName like '" . $state2 . "';");
				$getState2Query->execute();
				$getState2Query->bind_result($id);
			
		
    			while($getState2Query->fetch()){
        			$state2Id = $id;
    			}
			}
		
			
			if($state3 != "" || $state3 != null) {
				
				$getState3Query = $connLibrary->prepare("SELECT StateID from States WHERE StateName like '" . $state3 . "';");
				$getState3Query->execute();
				$getState3Query->bind_result($id);
			
		
    			while($getState3Query->fetch()){
        			$state3Id = $id;
    			}
				
			}
			
			if($streetInfo1 != "" || $streetInfo1 != null) {
				
					$insertAddress1Query = $connLibrary->prepare("INSERT INTO Addresses (OrgID, StreetInfo, City, ZipCode,
																County, StateID, IsConf) VALUES (" . $orgId . ", '" . $streetInfo1 . "' , '"
																. $city1 . "', '" . $zipcode1 . "' , '" . $county1 . "' , " . $state1Id . ", "
													            . "0);");
            		$insertAddress1Query->execute();
            		$insertAddress1Query->close();
				
			}
			
			
			if($streetInfo2 != "" || $streetInfo2 != null) {
				
					$insertAddress2Query = $connLibrary->prepare("INSERT INTO Addresses (OrgID, StreetInfo, City, ZipCode,
																County, StateID, IsConf) VALUES (" . $orgId . ", '" . $streetInfo2 . "' , '"
																. $city2 . "', '" . $zipcode2 . "' , '" . $county2 . "' , " . $state2Id . ", "
													            . "0);");
            		$insertAddress2Query->execute();
            		$insertAddress2Query->close();
				
			}
			
			
			if($streetInfo3 != "" || $streetInfo3 != null) {
				
					$insertAddress3Query = $connLibrary->prepare("INSERT INTO Addresses (OrgID, StreetInfo, City, ZipCode,
																County, StateID, IsConf) VALUES (" . $orgId . ", '" . $streetInfo3 . "' , '"
																. $city3 . "', '" . $zipcode3 . "' , '" . $county3 . "' , " . $state3Id . ", "
													            . "1);");
            		$insertAddress3Query->execute();
            		$insertAddress3Query->close();
				
			}
			
		
    		/**Age Insert**/
    		$infantsAge = $_POST['infantsAge'];
			$childrenAge = $_POST['childrensAge'];
			$youthAge = $_POST['youthAge'];
			$adultsAge = $_POST['adultsAge'];
			
				/**get age type id's**/
			$allAgeId = 0;
			$infantsId = 0;
			$childrensId = 0;
			$youthId = 0;
			$adultId = 0;
			
				/**get all age type id**/
			$getAllAgeId = $connLibrary->prepare("SELECT AgeID from AgeTypes WHERE AgeType like 'All';");
			$getAllAgeId->execute();
			$getAllAgeId->bind_result($id);
			
		
    		while($getAllAgeId->fetch()){
        			$allAgeId = $id;
    			}
			
			
				/**get infants age type id**/
			$getInfantsAgeId = $connLibrary->prepare("SELECT AgeID from AgeTypes WHERE AgeType like 'Infants/Toddlers';");
			$getInfantsAgeId->execute();
			$getInfantsAgeId->bind_result($id);
			
		
    		while($getInfantsAgeId->fetch()){
        			$infantsId = $id;
    			}
			
			
				/**get childrens age type id**/
			$getChildrensAgeId = $connLibrary->prepare("SELECT AgeID from AgeTypes WHERE AgeType like 'Children';");
			$getChildrensAgeId->execute();
			$getChildrensAgeId->bind_result($id);
			
		
    		while($getChildrensAgeId->fetch()){
        			$childrenId = $id;
    			}
			
			
				/**get youth age type id**/
			$getYouthAgeId = $connLibrary->prepare("SELECT AgeID from AgeTypes WHERE AgeType like 'Youth/Young Adults';");
			$getYouthAgeId->execute();
			$getYouthAgeId->bind_result($id);
			
		
    		while($getYouthAgeId->fetch()){
        			$youthId = $id;
    			}
			
			
				/**get adults age type id**/
			$getAdultsAgeId = $connLibrary->prepare("SELECT AgeID from AgeTypes WHERE AgeType like 'Adults';");
			$getAdultsAgeId->execute();
			$getAdultsAgeId->bind_result($id);
			
		
    		while($getAdultsAgeId->fetch()){
        			$adultId = $id;
    			}
			

			
			
			if($infantsAge == "true" && $childrenAge == "true" && $youthAge == "true" && $adultsAge == "true") {
				
					$insertAllAges = $connLibrary->prepare("INSERT INTO Age (OrgID, AgeID) VALUES (" . $orgId . ", " . $allAgeId . ");");
            		$insertAllAges->execute();
            		$insertAllAges->close();
			}
			else {
				if($infantsAge == "true") {
				
					$insertInfantAges = $connLibrary->prepare("INSERT INTO Age (OrgID, AgeID) VALUES (" . $orgId . ", " . $infantsId . ");");
            		$insertInfantAges->execute();
            		$insertInfantAges->close();
				
				}
				if($childrenAge == "true") {
				
					$insertChildrenAges = $connLibrary->prepare("INSERT INTO Age (OrgID, AgeID) VALUES (" . $orgId . ", " . $childrenId . ");");
            		$insertChildrenAges->execute();
            		$insertChildrenAges->close();
				
				}
				if($youthAge == "true") {
				
					$insertYouthAges = $connLibrary->prepare("INSERT INTO Age (OrgID, AgeID) VALUES (" . $orgId . ", " . $youthId . ");");
            		$insertYouthAges->execute();
            		$insertYouthAges->close();
				
				}
				if($adultsAge == "true") {
				
					$insertAdultAges = $connLibrary->prepare("INSERT INTO Age (OrgID, AgeID) VALUES (" . $orgId . ", " . $adultId . ");");
            		$insertAdultAges->execute();
            		$insertAdultAges->close();
				
				}
			}
    		
    		/**Contact Insert**/
    		$contactEmail = $_POST['contactEmail'];
			$firstName = $_POST['firstName'];
			$lastName = $_POST['lastName'];
			$position = $_POST['position'];
			$contactPhoneNum = $_POST['contactPhoneNum'];
			$contactIsConf = $_POST['contactIsConf'];
			
			if($contactIsConf == "false") {
				$contactIsConf = 0;
			}
			else {
				$contactIsConf = 1;
			}
			
			
			$insertContactQuery = $connLibrary->prepare("INSERT INTO Contacts (OrgID, Email, FirstName, LastName, Position, PhoneNum, IsConf)
														VALUES (" . $orgId . ", '" . $contactEmail . "' , '" . $firstName . "' , '" . 
														$lastName . "' , '" . $position . "' , '" . $contactPhoneNum . "' , " . $contactIsConf);
            
            $insertContactQuery->execute();
            $insertContactQuery->close();
			
			
    		
    		/**Ethnicity Insert**/
    		
    		
    		/**Gender Insert**/
    		
    		/**Hours Insert**/
    		
    		/**Nationality Insert**/
    		
    		/**Race Insert**/
    		
    		/**Requirements Insert**/
    		
    		/**Service Insert**/
			$food = "Food";
			$mentoring = "Mentoring";
			$employment = "Employment";
			$counseling = "Counseling/Therapy";
			$pregnancy = "Pregnancy";
			$medical = "Medical";
			$legal = "Legal";
			$governmental = "Governmental";
			$investigation = "Investigation";
			$fosterCare = "Foster Care";
			$awareness = "Awareness/Education";
			$responseTraining = "Response Training";
			$other = "Other";
			
			$Shelter = $_POST["cbShelterCreate"];
			$TransitionalHousing = $_POST["cbTransitionalHousingCreate"];
			$AssistanceInLocatingHousing = $_POST["cbAssistLocateHousingCreate"];
			$clothingService = $_POST["cbClothingServCreate"];
			$clothingSupply = $_POST["cbClothingSupplyCreate"];
			$clothingEmergResp = $_POST["cbClothingEmergRespCreate"];
			$clothingDesc = $_POST["txtClothingDescCreate"];
			$foodService = $_POST["cbFoodServCreate"];
			$foodSupply = $_POST["cbFoodSupplyCreate"];
			$foodEmergResp = $_POST["cbFoodEmergRespCreate"];
			$foodDesc = $_POST["txtFoodDescCreate"];
			$govService = $_POST["cbGovServCreate"];
			$govSupply = $_POST["cbGovSupplyCreate"];
			$govEmergResp = $_POST["cbGovEmergRespCreate"];
			$govDesc = $_POST["txtGovDescCreate"];
			$mentoringService = $_POST["cbMentoringServCreate"];
			$mentoringSupply = $_POST["cbMentoringSupplyCreate"];
			$mentoringEmergResp = $_POST["cbMentoringEmergRespCreate"];
			$mentoringDesc = $_POST["txtMentoringDescCreate"];
			$employmentService = $_POST["cbEmploymentServCreate"];
			$employmentSupply = $_POST["cbEmploymentSupplyCreate"];
			$employmentEmergResp = $_POST["cbEmploymentEmergRespCreate"];
			$employmentDesc = $_POST["txtEmploymentDescCreate"];
			$counselingTherapyService = $_POST["cbCounselServCreate"];
			$counselingTherapySupply = $_POST["cbCounselSupplyCreate"];
			$counselingTherapyEmergResp = $_POST["cbCounselEmergRespCreate"];
			$counselingTherapyDesc = $_POST["txtCounselingTherapyDescCreate"];
			$pregnancyService = $_POST["cbPregnancyServCreate"];
			$pregnancySupply = $_POST["cbPregnancySupplyCreate"];
			$pregnancyEmergResp = $_POST["cbPregnancyEmergRespCreate"];
			$pregnancyDesc = $_POST["txtPregnancyDescCreate"];
			$medicalService = $_POST["cbMedicalServCreate"];
			$medicalSupply = $_POST["cbMedicalSupplyCreate"];
			$medicalEmergResp = $_POST["cbMedicalEmergRespCreate"];
			$medicalDesc = $_POST["txtMedicalDescCreate"];
			$legalService = $_POST["cbLegalServCreate"];
			$legalSupply = $_POST["cbLegalSupplyCreate"];
			$legalEmergResp = $_POST["cbLegalEmergRespCreate"];
			$legalDesc = $_POST["txtLegalDescCreate"];
			$investigationService = $_POST["cbInvestigationServCreate"];
			$investigationSupply = $_POST["cbInvestigationSupplyCreate"];
			$investigationEmergResp = $_POST["cbInvestigationEmergRespCreate"];
			$investigationDesc = $_POST["txtInvestigationDescCreate"];
			$fosterCareService = $_POST["cbFosterServCreate"];
			$fosterCareSupply = $_POST["cbFosterSupplyCreate"];
			$fosterCareEmergResp = $_POST["cbFosterEmergRespCreate"];
			$fosterCareDesc = $_POST["txtFosterCareDescCreate"];
			$awarenessEdService = $_POST["cbAwarenessEdServCreate"];
			$awarenessEdSupply = $_POST["cbAwarenessEdSupplyCreate"];
			$awarenessEdEmergResp = $_POST["cbAwarenessEdSEmergRespCreate"];
			$awarenessEdDesc = $_POST["txtAwarenessEdDescCreate"];
			$responseTrainingService = $_POST["cbResponseTrainServCreate"];
			$responseTrainingSupply = $_POST["cbResponseTrainSupplyCreate"];
			$responseTrainingEmergResp = $_POST["cbResponseTrainEmergRespCreate"];
			$responseTrainingDesc = $_POST["txtResponseTrainingDescCreate"];
			$otherService = $_POST["cbOtherServCreate"];
			$otherSupply = $_POST["cbOtherSupplyCreate"];
			$otherEmergResp = $_POST["cbOtherEmergRespCreate"];
			$otherDesc = $_POST["txtOtherDescCreate"];
			
			$clothingID = 0;
			$foodID = 0;
			$govID = 0;
			$mentoringID = 0;
			$employmentID = 0;
			$counselingID = 0;
			$pregnancyID = 0;
			$medicalID = 0;
			$ID = 0;
			$clothingID = 0;
			$clothingID = 0;
			$clothingID = 0;
			$clothingID = 0;
			$clothingID = 0;
			$clothingID = 0;
			
			
			/**get all age type id**/
			$getAllAgeId = $connLibrary->prepare("SELECT AgeID from AgeTypes WHERE AgeType like 'All';");
			$getAllAgeId->execute();
			$getAllAgeId->bind_result($id);
			
		
    		while($getAllAgeId->fetch()){
        			$allAgeId = $id;
    			}
    			
    		$getClothingResourceID = $connLibrary->("SELECT SerID from ServiceTypes WHERE SerType like 'Clothing';");
    		$getClothingResourceID->execute();
    		$getClothingResourceID->bind_result($id);
    		
    		while ($getClothingResourceID->fetch()) {
    			$getClothingResourceID
    		}
			
			if($state3 != "" || $state3 != null) {
				
				$getState3Query = $connLibrary->prepare("SELECT StateID from States WHERE StateName like '" . $state3 . "';");
				$getState3Query->execute();
				$getState3Query->bind_result($id);
			
		
    			while($getState3Query->fetch()){
        			$state3Id = $id;
    			}
				
			}
			
			
			if($streetInfo1 != "" || $streetInfo1 != null) {
				$clothing = "Clothing";
			
			$insertAddress1Query = $connLibrary->prepare("INSERT INTO Addresses (OrgID, StreetInfo, City, ZipCode,
														County, StateID, IsConf) VALUES (" . $orgId . ", '" . $streetInfo1 . "' , '"
														. $city1 . "', '" . $zipcode1 . "' , '" . $county1 . "' , " . $state1Id . ", "
											            . "0);");
            $insertAddress1Query->execute();
            $insertAddress1Query->close();
				
			}
            
            
      
}

?>
