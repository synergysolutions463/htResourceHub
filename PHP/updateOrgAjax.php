<?php

include 'dbConnect.php';

echo $_POST["method"]();

function updateOrganization () {
    
     $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    		$rgId = 176;
    		
    		$deleteOrgQuery = $connLibrary->prepare("DELETE FROM Organizations WHERE OrgID = " . $oldOrgId . ";");
            $deleteOrgQuery->execute();
            $deleteOrgQuery->close();
    		


			/** Organization Table Insert **/
			
            $orgName = $_POST['orgName'];
			$agencyName = $_POST['agencyName'];
			$missionStmt = $_POST['missionStmt'];
			$weblink = $_POST['weblink'];
			$email = $_POST['email'];
			$phoneNum = $_POST['phoneNum'];
			$phoneExt = $_POST['phoneExt'];
			$hotlineNum = $_POST['hotlineNum'];
			$confNum = $_POST['confNum'];
			$confExt = $_POST['confExt'];
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
			
				if ($isConf == "true") {
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

	
			$insertOrgQuery = $connLibrary->prepare("INSERT INTO Organizations (OrgId, OrgName, AgencyName, ProgramStatement, WebLink, Email, PhoneNum, phoneExt,
			                                           HotlineNum, ConfNum, confPhoneExt, isShelter, isTransitionalHousing, isAssistanceLocatingHousing, Fees,
			                                           FaithID, Notes, ConfNotes, isConf) VALUES (" . $orgId . ",'" . $orgName . "','" . $agencyName . "','"
			                                            . $missionStmt . "','" . $weblink . "','" . $email . "','" . $phoneNum . "','" . $phoneExt . "','"
			                                             . $hotlineNum . "','" . $confNum . "','" . $confExt . "'," . $isShelter . "," . $isTransHousing . ","
			                                              . $isAsstLoc . ",'" . $fee . "'," . $faithId . ",'" . $notes . "','" . $confNotes . "'," . $isConf . ");");
            $insertOrgQuery->execute();
            $insertOrgQuery->close();
            
            
            $selectOrgQuery = $connLibrary->prepare("SELECT LAST_INSERT_ID();");
            $selectOrgQuery->execute();
            $selectOrgQuery->bind_result($id);
			
    		
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
			$childrenAge = $_POST['childrenAge'];
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
			$contactPhoneExt = $_POST['contactPhoneExt'];
			$contactIsConf = $_POST['contactIsConf'];
			
			if($contactIsConf == "false") {
				$contactIsConf = 0;
			}
			else {
				$contactIsConf = 1;
			}
			
			
			$insertContactQuery = $connLibrary->prepare("INSERT INTO Contacts (OrgID, Email, FirstName, LastName, Position, PhoneNum, phoneExt,IsConf)
														VALUES (" . $orgId . ", '" . $contactEmail . "' , '" . $firstName . "' , '" . 
														$lastName . "' , '" . $position . "' , '" . $contactPhoneNum . "' , '" . $contactPhoneExt . "' , ". $contactIsConf . ");");
            
            $insertContactQuery->execute();
            $insertContactQuery->close();

			
    		
    		/**Ethnicity Insert**/

    		$hispanic = $_POST['hispanic'];
			$nonhispanic = $_POST['nonhispanic'];
			
		
				/**set ethnicity type ids**/
		
				$allEthnicityId = 0;
				$nonhispanicId = 0;
				$hispanicId = 0;
			
				/**get all ethnicity type id **/
			
				$getAllEthnicityId = $connLibrary->prepare("SELECT EthID from EthnicityTypes WHERE EthType like 'All';");
				$getAllEthnicityId->execute();
				$getAllEthnicityId->bind_result($id);
				
				while($getAllEthnicityId->fetch()){
        			$allEthnicityId = $id;
    			}
			
				
				/**get nonhispanic id **/
				
				$getNonhispanicEthnicityId = $connLibrary->prepare("SELECT EthID from EthnicityTypes WHERE EthType like 'Non-Latino/Hispanic';");
				$getNonhispanicEthnicityId->execute();
				$getNonhispanicEthnicityId->bind_result($id);
				
				while($getNonhispanicEthnicityId->fetch()){
        			$nonhispanicId = $id;
    			}
			
				
				/**get hispanic id **/
						
				$getHispanicEthnicityId = $connLibrary->prepare("SELECT EthID from EthnicityTypes WHERE EthType like 'Latino/Hispanic';");
				$getHispanicEthnicityId->execute();
				$getHispanicEthnicityId->bind_result($id);
				
				while($getHispanicEthnicityId->fetch()){
        			$hispanicId = $id;
    			}
    			
    	
    			
    		
    		if($hispanic == "true" && $nonhispanic == "true") {
    			
    				$insertAllEthnicity = $connLibrary->prepare("INSERT INTO Ethnicity (OrgID, EthID) VALUES (" . $orgId . ", " . $allEthnicityId . ");");
            		$insertAllEthnicity->execute();
            		$insertAllEthnicity->close();
    		}
    		else {
    			
    			if($hispanic == "true") {
    				$insertHispanicEthnicity = $connLibrary->prepare("INSERT INTO Ethnicity (OrgID, EthID) VALUES (" . $orgId . ", " . $hispanicId . ");");
            		$insertHispanicEthnicity->execute();
            		$insertHispanicEthnicity->close();
    			}
    			
    			if($nonhispanic == "true") {
    				$insertNonhispanicEthnicity = $connLibrary->prepare("INSERT INTO Ethnicity (OrgID, EthID) VALUES (" . $orgId . ", " . $nonhispanicId . ");");
            		$insertNonhispanicEthnicity->execute();
            		$insertNonhispanicEthnicity->close();
    			}
    		}

    		
    		/**Gender Insert**/

    		$male = $_POST['male'];
			$female = $_POST['female'];
			$transgender = $_POST['transgender'];
	
				/**set gender type ids**/
		
				$allGenderId = 0;
				$maleId = 0;
				$femaleId = 0;
				$transgenderId = 0;
			
				/**get all gender type id **/
			
				$getAllGenderId = $connLibrary->prepare("SELECT GenID from GenderTypes WHERE GenType like 'All';");
				$getAllGenderId ->execute();
				$getAllGenderId ->bind_result($id);
				
				while($getAllGenderId->fetch()){
        			$allGenderId = $id;
    			}
				
				/**get male type id **/
				
				$getMaleGenderId = $connLibrary->prepare("SELECT GenID from GenderTypes WHERE GenType like 'Male';");
				$getMaleGenderId ->execute();
				$getMaleGenderId->bind_result($id);
				
				while($getMaleGenderId->fetch()){
        			$maleId = $id;
    			}
				
				/**get female type id **/
				
				$getFemaleGenderId = $connLibrary->prepare("SELECT GenID from GenderTypes WHERE GenType like 'Female';");
				$getFemaleGenderId ->execute();
				$getFemaleGenderId->bind_result($id);
				
				while($getFemaleGenderId->fetch()){
        			$femaleId = $id;
    			}
				
				/**get transgender type id **/
				
				$getTransGenderId = $connLibrary->prepare("SELECT GenID from GenderTypes WHERE GenType like 'Transgender';");
				$getTransGenderId ->execute();
				$getTransGenderId->bind_result($id);
				
				while($getTransGenderId->fetch()){
        			$transgenderId = $id;
    			}
    			
    		if($male == "true" && $female == "true" && $transgender == "true") {
    			
    				$insertAllGender = $connLibrary->prepare("INSERT INTO Gender (OrgID, GenID) VALUES (" . $orgId . ", " . $allGenderId . ");");
            		$insertAllGender->execute();
            		$insertAllGender->close();
    		}
    		else {
    			if($male == "true") {
    					
    				$insertMaleGender = $connLibrary->prepare("INSERT INTO Gender (OrgID, GenID) VALUES (" . $orgId . ", " . $maleId . ");");
            		$insertMaleGender->execute();
            		$insertMaleGender->close();
    				
    			}
    			if($female == "true") {
    				
    				$insertFemaleGender = $connLibrary->prepare("INSERT INTO Gender (OrgID, GenID) VALUES (" . $orgId . ", " . $femaleId . ");");
            		$insertFemaleGender->execute();
            		$insertFemaleGender->close();
    				
    			}
    			if($transgender == "true") {
    				
    				$insertAllGender = $connLibrary->prepare("INSERT INTO Gender (OrgID, GenID) VALUES (" . $orgId . ", " . $transgenderId . ");");
            		$insertAllGender->execute();
            		$insertAllGender->close();
    			}
 
    		}
    		
    		/**Hours Insert**/
    	
    		$is24Hours = $_POST['is24Hours'];

			$mondayToFridayFullOpen = $_POST['mondayToFridayFullOpen'];
			$mondayToFridayFullClose = $_POST['mondayToFridayFullClose'];
			$saturdayFullOpen = $_POST['saturdayFullOpen'];
			$saturdayFullClose = $_POST['saturdayFullClose'];
			$sundayFullOpen = $_POST['sundayFullOpen'];
			$sundayFullClose = $_POST['sundayFullClose'];
		
			$mondaySingleOpen = $_POST['mondaySingleOpen'];
			$mondaySingleClose = $_POST['mondaySingleClose'];
			$tuesdaySingleOpen = $_POST['tuesdaySingleOpen'];
			$tuesdaySingleClose = $_POST['tuesdaySingleClose'];
			$wednesdaySingleOpen = $_POST['wednesdaySingleOpen'];
			$wednesdaySingleClose = $_POST['wednesdaySingleClose'];
			$thursdaySingleOpen = $_POST['thursdaySingleOpen'];
			$thursdaySingleClose = $_POST['thursdaySingleClose'];
			$fridaySingleOpen = $_POST['fridaySingleOpen'];
			$fridaySingleClose = $_POST['fridaySingleClose'];
			$saturdaySingleOpen = $_POST['saturdaySingleOpen'];
			$saturdaySingleClose = $_POST['saturdaySingleClose'];
			$sundaySingleOpen = $_POST['sundaySingleOpen'];
			$sundaySingleClose = $_POST['sundaySingleClose'];

			$mondayToFridayFullOpenAdd = $_POST['mondayToFridayFullOpenAdd'];
			$mondayToFridayFullCloseAdd = $_POST['mondayToFridayFullCloseAdd'];
			$saturdayFullOpenAdd = $_POST['saturdayFullOpenAdd'];
			$saturdayFullCloseAdd = $_POST['saturdayFullCloseAdd'];
			$sundayFullOpenAdd = $_POST['sundayFullOpenAdd'];
			$sundayFullCloseAdd = $_POST['sundayFullCloseAdd'];
		
			$mondaySingleOpenAdd = $_POST['mondaySingleOpenAdd'];
			$mondaySingleCloseAdd = $_POST['mondaySingleCloseAdd'];
			$tuesdaySingleOpenAdd = $_POST['tuesdaySingleOpenAdd'];
			$tuesdaySingleCloseAdd = $_POST['tuesdaySingleCloseAdd'];
			$wednesdaySingleOpenAdd = $_POST['wednesdaySingleOpenAdd'];
			$wednesdaySingleCloseAdd = $_POST['wednesdaySingleCloseAdd'];
			$thursdaySingleOpenAdd = $_POST['thursdaySingleOpenAdd'];
			$thursdaySingleCloseAdd = $_POST['thursdaySingleCloseAdd'];
			$fridaySingleOpenAdd = $_POST['fridaySingleOpenAdd'];
			$fridaySingleCloseAdd = $_POST['fridaySingleCloseAdd'];
			$saturdaySingleOpenAdd = $_POST['saturdaySingleOpenAdd'];
			$saturdaySingleCloseAdd = $_POST['saturdaySingleCloseAdd'];
			$sundaySingleOpenAdd = $_POST['sundaySingleOpenAdd'];
			$sundaySingleCloseAdd = $_POST['sundaySingleCloseAdd'];
			
		

			
			if($is24Hours == "true") {
				
					$insert24Hours = $connLibrary->prepare("INSERT INTO Hours (OrgID, Is24Hours) VALUES (" . $orgId . ", 1);");
            		$insert24Hours->execute();
            		$insert24Hours->close();
				
			}
		
			else {
				
					if($mondayToFridayFullOpen == "-----" && $mondayToFridayFullClose == "-----" && $saturdayFullOpen == "-----" 
					&& $saturdayFullClose == "-----" && $sundayFullOpen == "-----" && $sundayFullClose == "-----") {
							
							$insertGenHours = $connLibrary->prepare("INSERT INTO Hours (OrgID, MondayStart, MondayEnd, TuesdayStart, TuesdayEnd,
															WednesdayStart, WednesdayEnd, ThursdayStart, ThursdayEnd, FridayStart, 
															FridayEnd, SaturdayStart, SaturdayEnd, SundayStart, SundayEnd, Is24Hours, IsAdditional) VALUES
															(" . $orgId . ", '" . $mondaySingleOpen . "' , '" . $mondaySingleClose . "' , '"
															. $tuesdaySingleOpen . "' , '" . $tuesdaySingleClose . "' , '" 
															. $wednesdaySingleOpen . "' , '" . $wednesdaySingleClose . "' , '"
															. $thursdaySingleOpen . "' , '" . $thursdaySingleClose . "' , '"
															. $fridaySingleOpen . "' , '" . $fridaySingleClose . "' , '"
															. $saturdaySingleOpen . "' , '" . $saturdaySingleClose . "' , '"
															. $sundaySingleOpen . "' , '" . $sundaySingleClose . "', 0, 0);");
											
            				$insertGenHours->execute();
            				$insertGenHours->close();
						
					}
					
				
					else {
		
            				$insertFullGenHours = $connLibrary->prepare("INSERT INTO Hours (OrgID, MondayStart, MondayEnd, TuesdayStart, TuesdayEnd,
															WednesdayStart, WednesdayEnd, ThursdayStart, ThursdayEnd, FridayStart, 
															FridayEnd, SaturdayStart, SaturdayEnd, SundayStart, SundayEnd, Is24Hours, IsAdditional) VALUES
															(" . $orgId . ", '" . $mondayToFridayFullOpen . "' , '" . $mondayToFridayFullClose . "' , '"
															. $mondayToFridayFullOpen . "' , '" . $mondayToFridayFullClose . "' , '" 
															. $mondayToFridayFullOpen . "' , '" . $mondayToFridayFullClose . "' , '"
															. $mondayToFridayFullOpen . "' , '" . $mondayToFridayFullClose . "' , '"
															. $mondayToFridayFullOpen . "' , '" . $mondayToFridayFullClose . "' , '"
															. $saturdayFullOpen . "' , '" . $saturdayFullClose . "' , '"
															. $sundayFullOpen . "' , '" . $sundayFullClose . "', 0, 0);");
											
            				$insertFullGenHours->execute();
            				$insertFullGenHours->close();
				}
		
				if($mondayToFridayFullOpenAdd == "-----" && $mondayToFridayFullCloseAdd == "-----" && $saturdayFullOpenAdd == "-----" 
					&& $saturdayFullCloseAdd == "-----" && $sundayFullOpenAdd == "-----" && $sundayFullCloseAdd == "-----") {
											
							$insertAddGenHours = $connLibrary->prepare("INSERT INTO Hours (OrgID, MondayStart, MondayEnd, TuesdayStart, TuesdayEnd,
															WednesdayStart, WednesdayEnd, ThursdayStart, ThursdayEnd, FridayStart, 
															FridayEnd, SaturdayStart, SaturdayEnd, SundayStart, SundayEnd, Is24Hours, IsAdditional) VALUES
															(" . $orgId . ", '" . $mondaySingleOpenAdd . "' , '" . $mondaySingleCloseAdd . "' , '"
															. $tuesdaySingleOpenAdd . "' , '" . $tuesdaySingleCloseAdd . "' , '" 
															. $wednesdaySingleOpenAdd . "' , '" . $wednesdaySingleCloseAdd . "' , '"
															. $thursdaySingleOpenAdd . "' , '" . $thursdaySingleCloseAdd . "' , '"
															. $fridaySingleOpenAdd . "' , '" . $fridaySingleCloseAdd . "' , '"
															. $saturdaySingleOpenAdd . "' , '" . $saturdaySingleCloseAdd . "' , '"
															. $sundaySingleOpenAdd . "' , '" . $sundaySingleCloseAdd . "', 0, 1);");
											
            				$insertAddGenHours->execute();
            				$insertAddGenHours->close();
						
					}
				
					else {
		
            				$insertAddFullGenHours = $connLibrary->prepare("INSERT INTO Hours (OrgID, MondayStart, MondayEnd, TuesdayStart, TuesdayEnd,
															WednesdayStart, WednesdayEnd, ThursdayStart, ThursdayEnd, FridayStart, 
															FridayEnd, SaturdayStart, SaturdayEnd, SundayStart, SundayEnd, Is24Hours, IsAdditional) VALUES
															(" . $orgId . ", '" . $mondayToFridayFullOpenAdd . "' , '" . $mondayToFridayFullCloseAdd . "' , '"
															. $mondayToFridayFullOpenAdd . "' , '" . $mondayToFridayFullCloseAdd . "' , '" 
															. $mondayToFridayFullOpenAdd . "' , '" . $mondayToFridayFullCloseAdd . "' , '"
															. $mondayToFridayFullOpenAdd . "' , '" . $mondayToFridayFullCloseAdd . "' , '"
															. $mondayToFridayFullOpenAdd . "' , '" . $mondayToFridayFullCloseAdd . "' , '"
															. $saturdayFullOpenAdd . "' , '" . $saturdayFullCloseAdd . "' , '"
															. $sundayFullOpenAdd . "' , '" . $sundayFullCloseAdd . "', 0, 1);");
											
            				$insertAddFullGenHours->execute();
            				$insertAddFullGenHours->close();
				}
				
				
				
			}
  		
    		/**Nationality Insert**/
    	
    		$domesticBorn = $_POST['domesticBorn'];
			$foreignBorn = $_POST['foreignBorn'];
			$undocumented = $_POST['undocumented'];
			
			
				/**set nationality type ids**/
		
				$allNatId = 0;
				$domesticBornId = 0;
				$foreignBornId = 0;
				$undocumentedId = 0;
				
				/**get all nationality id**/
		
				$getAllNationalityId = $connLibrary->prepare("SELECT NatID from NationalityTypes WHERE NatType like 'All';");
				$getAllNationalityId ->execute();
				$getAllNationalityId->bind_result($id);
				
				while($getAllNationalityId->fetch()){
        			$allNatId = $id;
    			}
				
				
				/**get domestic born nationality id**/
		
				$getDomesticNationalityId = $connLibrary->prepare("SELECT NatID from NationalityTypes WHERE NatType like 'Domestic-Born';");
				$getDomesticNationalityId  ->execute();
				$getDomesticNationalityId ->bind_result($id);
				
				while($getDomesticNationalityId ->fetch()){
        			$domesticBornId = $id;
    			}
				
				/**get foreign nationality id**/
		
				$getForeignNationalityId = $connLibrary->prepare("SELECT NatID from NationalityTypes WHERE NatType like 'Foreign-Born';");
				$getForeignNationalityId ->execute();
				$getForeignNationalityId->bind_result($id);
				
				while($getForeignNationalityId->fetch()){
        			$foreignBornId = $id;
    			}
				
				/**get undocumented nationality id**/
		
				$getUndocumentedNationalityId = $connLibrary->prepare("SELECT NatID from NationalityTypes WHERE NatType like 'Undocumented';");
				$getUndocumentedNationalityId  ->execute();
				$getUndocumentedNationalityId ->bind_result($id);
				
				while($getUndocumentedNationalityId ->fetch()){
        			$undocumentedId = $id;
    			}
    			
		
    		if($domesticBorn == "true" && $foreignBorn == "true" && $undocumented == "true") {
    				$insertAllNationality = $connLibrary->prepare("INSERT INTO Nationality (OrgID, NatID) VALUES (" . $orgId . ", " . $allNatId . ");");
            		$insertAllNationality ->execute();
            		$insertAllNationality ->close();
    		}
    		else {
    			if($domesticBorn == "true") {
    				$insertDomesticNationality = $connLibrary->prepare("INSERT INTO Nationality (OrgID, NatID) VALUES (" . $orgId . ", " . $domesticBornId . ");");
            		$insertDomesticNationality ->execute();
            		$insertDomesticNationality ->close();
    				
    			}
    			if($foreignBorn == "true") {
    				$insertForeignNationality = $connLibrary->prepare("INSERT INTO Nationality (OrgID, NatID) VALUES (" . $orgId . ", " . $foreignBornId . ");");
            		$insertForeignNationality ->execute();
            		$insertForeignNationality ->close();
    				
    			}
    			if($undocumented == "true") {
    				$insertUndocumentedNationality = $connLibrary->prepare("INSERT INTO Nationality (OrgID, NatID) VALUES (" . $orgId . ", " . $undocumentedId . ");");
            		$insertUndocumentedNationality ->execute();
            		$insertUndocumentedNationality ->close();
    				
    			}
    		}
    		
    		
    		/**Race Insert**/
    	
    		$white = $_POST['white'];
			$black = $_POST['black'];
			$asian = $_POST['asian'];
			$hawaiian = $_POST['hawaiian'];
			$native = $_POST['native'];
			
				/**set race type ids**/
		
				$allRaceId = 0;
				$whiteId = 0;
				$blackId = 0;
				$asianId = 0;
				$hawaiianId = 0;
				$nativeId = 0;
				
				/**get all race id**/
		
				$getAllRaceId = $connLibrary->prepare("SELECT RaceID from RaceTypes WHERE RaceType like 'All';");
				$getAllRaceId ->execute();
				$getAllRaceId->bind_result($id);
				
				while($getAllRaceId->fetch()){
        			$allRaceId = $id;
    			}

				/**get white race id**/
		
				$getWhiteRaceId = $connLibrary->prepare("SELECT RaceID from RaceTypes WHERE RaceType like 'White';");
				$getWhiteRaceId ->execute();
				$getWhiteRaceId->bind_result($id);
				
				while($getWhiteRaceId->fetch()){
        			$whiteId = $id;
				}
			
				/**get black race id**/
		
				$getBlackRaceId = $connLibrary->prepare("SELECT RaceID from RaceTypes WHERE RaceType like 'Black or African American';");
				$getBlackRaceId ->execute();
				$getBlackRaceId->bind_result($id);
				
				while($getBlackRaceId->fetch()){
        			$blackId = $id;
				}
				
				/**get asian race id**/
		
				$getAsianRaceId = $connLibrary->prepare("SELECT RaceID from RaceTypes WHERE RaceType like 'Asian';");
				$getAsianRaceId ->execute();
				$getAsianRaceId->bind_result($id);
				
				while($getAsianRaceId->fetch()){
        			$asianId = $id;
				}
				
				/**get hawaiian race id**/
		
				$getHawaiianRaceId = $connLibrary->prepare("SELECT RaceID from RaceTypes WHERE RaceType like 'Native Hawaiian or Other Pacific Islander';");
				$getHawaiianRaceId->execute();
				$getHawaiianRaceId->bind_result($id);
				
				while($getHawaiianRaceId->fetch()){
        			$hawaiianId = $id;
				}
				
				/**get native race id**/
		
				$getNativeRaceId = $connLibrary->prepare("SELECT RaceID from RaceTypes WHERE RaceType like 'American Indian or Alaska Native';");
				$getNativeRaceId ->execute();
				$getNativeRaceId->bind_result($id);
				
				while($getNativeRaceId->fetch()){
        			$nativeId = $id;
				}
				
		
			if($white == "true" && $black == "true" && $asian == "true" && $hawaiian == "true" && $native == "true") {
					$insertAllRace = $connLibrary->prepare("INSERT INTO Race (OrgID, RaceID) VALUES (" . $orgId . ", " . $allRaceId . ");");
            		$insertAllRace ->execute();
            		$insertAllRace ->close();
				
			}
			else {
				if($white == "true") {
					$insertWhiteRace = $connLibrary->prepare("INSERT INTO Race (OrgID, RaceID) VALUES (" . $orgId . ", " . $whiteId . ");");
            		$insertWhiteRace ->execute();
            		$insertWhiteRace ->close();
				}
				if($black == "true") {
					$insertBlackRace = $connLibrary->prepare("INSERT INTO Race (OrgID, RaceID) VALUES (" . $orgId . ", " . $blackId . ");");
            		$insertBlackRace ->execute();
            		$insertBlackRace ->close();
				}
				if($asian == "true") {
					$insertAsianRace = $connLibrary->prepare("INSERT INTO Race (OrgID, RaceID) VALUES (" . $orgId . ", " . $asianId . ");");
            		$insertAsianRace ->execute();
            		$insertAsianRace ->close();
				}
				if($hawaiian == "true") {
					$insertHawaiianRace = $connLibrary->prepare("INSERT INTO Race (OrgID, RaceID) VALUES (" . $orgId . ", " . $hawaiianId . ");");
            		$insertHawaiianRace ->execute();
            		$insertHawaiianRace ->close();
				}
				if($native == "true") {
					$insertNativeRace = $connLibrary->prepare("INSERT INTO Race (OrgID, RaceID) VALUES (" . $orgId . ", " . $nativeId . ");");
            		$insertNativeRace ->execute();
            		$insertNativeRace ->close();
				}
			}
				
    		
    		/**Requirements Insert**/
    	
    		$membership = $_POST['membership'];
			$membershipDesc = $_POST['membershipDesc'];
			$training = $_POST['training'];
			$trainingDesc = $_POST['trainingDesc'];
			$application = $_POST['application'];
			$applicationDesc = $_POST['applicationDesc'];
			$waiting = $_POST['waiting'];
			$waitingDesc = $_POST['waitingDesc'];
			
				/**set requirements ids**/
		
				$membershipId = 0;
				$trainingId = 0;
				$applicationId = 0;
				$waitingId = 0;
				
				/**get membership id**/
		
				$getMembershipId = $connLibrary->prepare("SELECT ReqID from RequirementsTypes WHERE ReqType like 'Membership';");
				$getMembershipId ->execute();
				$getMembershipId->bind_result($id);
				
				while($getMembershipId->fetch()){
        			$membershipId = $id;
				}
				
				/**get training id**/
		
				$getTrainingId = $connLibrary->prepare("SELECT ReqID from RequirementsTypes WHERE ReqType like 'Training';");
				$getTrainingId ->execute();
				$getTrainingId->bind_result($id);
				
				while($getTrainingId->fetch()){
        			$trainingId = $id;
				}
				
				/**get application id**/
		
				$getApplicationId = $connLibrary->prepare("SELECT ReqID from RequirementsTypes WHERE ReqType like 'Application';");
				$getApplicationId ->execute();
				$getApplicationId->bind_result($id);
				
				while($getApplicationId->fetch()){
        			$applicationId = $id;
				}
				
				/**get waiting id**/
		
				$getWaitingId = $connLibrary->prepare("SELECT ReqID from RequirementsTypes WHERE ReqType like 'Possible Waiting List/Referral Required/Other Entry Restrictions';");
				$getWaitingId ->execute();
				$getWaitingId->bind_result($id);
				
				while($getWaitingId->fetch()){
        			$waitingId = $id;
				}
			
			if($membership == "true") {
					$insertMembershipRequirements = $connLibrary->prepare("INSERT INTO Requirements (OrgID, ReqID, Description) VALUES (" . $orgId . ", " . $membershipId . ", '" . $membershipDesc . "');");
            		$insertMembershipRequirements ->execute();
            		$insertMembershipRequirements ->close();
				
			}
			
			if($training == "true") {
					$insertTrainingRequirements = $connLibrary->prepare("INSERT INTO Requirements (OrgID, ReqID, Description) VALUES (" . $orgId . ", " . $trainingId . ", '" . $trainingDesc . "');");
            		$insertTrainingRequirements ->execute();
            		$insertTrainingRequirements ->close();
				
				
			}
			
			if($application == "true") {
					$insertApplicationRequirements = $connLibrary->prepare("INSERT INTO Requirements (OrgID, ReqID, Description) VALUES (" . $orgId . ", " . $applicationId . ", '" . $applicationDesc . "');");
            		$insertApplicationRequirements  ->execute();
            		$insertApplicationRequirements  ->close();
				
				
			}
			
			if($waiting == "true") {
					$insertWaitingRequirements = $connLibrary->prepare("INSERT INTO Requirements (OrgID, ReqID, Description) VALUES (" . $orgId . ", " . $waitingId . ", '" . $waitingDesc . "');");
            		$insertWaitingRequirements ->execute();
            		$insertWaitingRequirements ->close();
			}
			
    		
    		
    		/**Service Insert**/
    	
			$clothingService = $_POST["providesClothingService"];
			$clothingSupply = $_POST["providesClothingSupply"];
			$clothingEmergResp = $_POST["providesClothingEmergResp"];
			$clothingDesc = $_POST["providesClothingDesc"];
			$foodService = $_POST["providesFoodService"];
			$foodSupply = $_POST["providesFoodSupply"];
			$foodEmergResp = $_POST["providesFoodEmergResp"];
			$foodDesc = $_POST["providesFoodDesc"];
			$govService = $_POST["providesGovService"];
			$govSupply = $_POST["providesGovSupply"];
			$govEmergResp = $_POST["providesGovEmergResp"];
			$govDesc = $_POST["providesGovDesc"];
			$mentoringService = $_POST["providesMentoringService"];
			$mentoringSupply = $_POST["providesMentoringSupply"];
			$mentoringEmergResp = $_POST["providesMentoringEmergResp"];
			$mentoringDesc = $_POST["providesMentoringDesc"];
			$employmentService = $_POST["providesEmploymentService"];
			$employmentSupply = $_POST["providesEmploymentSupply"];
			$employmentEmergResp = $_POST["providesEmploymentEmergResp"];
			$employmentDesc = $_POST["providesEmploymentDesc"];
			$counselingTherapyService = $_POST["providesCounsTherapyService"];
			$counselingTherapySupply = $_POST["providesCounsTherapySupply"];
			$counselingTherapyEmergResp = $_POST["providesCounsTherapyEmergResp"];
			$counselingTherapyDesc = $_POST["providesCounsTherapyDesc"];
			$pregnancyService = $_POST["providesPregnancyService"];
			$pregnancySupply = $_POST["providesPregnancySupply"];
			$pregnancyEmergResp = $_POST["providesPregnancyEmergResp"];
			$pregnancyDesc = $_POST["providesPregnancyDesc"];
			$medicalService = $_POST["providesMedicalService"];
			$medicalSupply = $_POST["providesMedicalSupply"];
			$medicalEmergResp = $_POST["providesMedicalEmergResp"];
			$medicalDesc = $_POST["providesMedicalDesc"];
			$legalService = $_POST["providesLegalService"];
			$legalSupply = $_POST["providesLegalSupply"];
			$legalEmergResp = $_POST["providesLegalEmergResp"];
			$legalDesc = $_POST["providesLegalDesc"];
			$investigationService = $_POST["providesInvestigationService"];
			$investigationSupply = $_POST["providesInvestigationSupply"];
			$investigationEmergResp = $_POST["providesInvestigationEmergResp"];
			$investigationDesc = $_POST["providesInvestigationDesc"];
			$fosterCareService = $_POST["providesFosterService"];
			$fosterCareSupply = $_POST["providesFosterSupply"];
			$fosterCareEmergResp = $_POST["providesFosterEmergResp"];
			$fosterCareDesc = $_POST["providesFosterDesc"];
			$awarenessEdService = $_POST["providesAwarenessService"];
			$awarenessEdSupply = $_POST["providesAwarenessSupply"];
			$awarenessEdEmergResp = $_POST["providesAwarenessEmergResp"];
			$awarenessEdDesc = $_POST["providesAwarenessDesc"];
			$responseTrainingService = $_POST["providesResponseTrainingService"];
			$responseTrainingSupply = $_POST["providesResponseTrainingSupply"];
			$responseTrainingEmergResp = $_POST["providesResponseTrainingEmergResp"];
			$responseTrainingDesc = $_POST["providesResponseTrainingDesc"];
			$advocacyService = $_POST['advocacyService'];
			$advocacySupply = $_POST['advocacySupply'];
			$advocacyEmergResp = $_POST['advocacyEmergResp'];
			$advocacyDesc = $_POST['advocacyDesc'];
			$substanceAbuseService = $_POST["substanceAbuseService"];
			$substanceAbuseSupply = $_POST["substanceAbuseSupply"];
			$substanceAbuseEmergResp = $_POST["substanceAbuseEmergResp"];
			$substanceAbuseDesc = $_POST["substanceAbuseDesc"];
			$otherService = $_POST["otherService"];
			$otherSupply = $_POST["otherSupply"];
			$otherEmergResp = $_POST["otherEmergResp"];
			$otherDesc = $_POST["otherDesc"];
			
			$clothingID = 0;
			$foodID = 0;
			$govID = 0;
			$mentoringID = 0;
			$employmentID = 0;
			$counselingID = 0;
			$pregnancyID = 0;
			$medicalID = 0;
			$legalID = 0;
			$investigationID = 0;
			$fosterID = 0;
			$awarenessEdID = 0;
			$responseTrainingID = 0;
			$substanceAbuseID = 0;
			$otherID = 0;
			$advocacyID = 0;
			$noneID = 0;

  			
    		$getClothingResourceID = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Clothing';");
    		$getClothingResourceID->execute();
    		$getClothingResourceID->bind_result($id);
    		
    		while ($getClothingResourceID->fetch()) {
    			$clothingID = $id;
    		}
    		
    		$getFoodResourceID = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Food';");
    		$getFoodResourceID->execute();
    		$getFoodResourceID->bind_result($id);
    		
    		while ($getFoodResourceID->fetch()) {
    			$foodID = $id;
    		}
    	
    		
    		$getEmploymentResourceID = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Employment';");
    		$getEmploymentResourceID->execute();
    		$getEmploymentResourceID->bind_result($id);
    		
    		while ($getEmploymentResourceID->fetch()) {
    			$employmentID = $id;
    		}
    		
    		$getMentoringResourceID = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Mentoring';");
    		$getMentoringResourceID->execute();
    		$getMentoringResourceID->bind_result($id);
    		
    		while ($getMentoringResourceID->fetch()) {
    			$mentoringID = $id;
    		}
    		
    		$getCounselingResourceID = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Counseling/Therapy';");
    		$getCounselingResourceID->execute();
    		$getCounselingResourceID->bind_result($id);
    		
    		while ($getCounselingResourceID->fetch()) {
    			$counselingID = $id;
    		}
    		
    		$getPregnancyResourceID = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Pregnancy';");
    		$getPregnancyResourceID->execute();
    		$getPregnancyResourceID->bind_result($id);
    		
    		while ($getPregnancyResourceID->fetch()) {
    			$pregnancyID = $id;
    		}
    		
    		$getMedicalResourceID = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Medical';");
    		$getMedicalResourceID->execute();
    		$getMedicalResourceID->bind_result($id);
    		
    		while ($getMedicalResourceID->fetch()) {
    			$medicalID = $id;
    		}
    		
    		$getLegalResourceID = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Legal';");
    		$getLegalResourceID->execute();
    		$getLegalResourceID->bind_result($id);
    		
    		while ($getLegalResourceID->fetch()) {
    			$legalID = $id;
    		}
    		
    		$getGovResourceID = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Governmental';");
    		$getGovResourceID->execute();
    		$getGovResourceID->bind_result($id);
    		
    		while ($getGovResourceID->fetch()) {
    			$govID = $id;
    		}
    		
    		$getInvestigationResourceID = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Investigation';");
    		$getInvestigationResourceID->execute();
    		$getInvestigationResourceID->bind_result($id);
    		
    		while ($getInvestigationResourceID->fetch()) {
    			$investigationID = $id;
    		}
    		
    		$getFosterResourceID = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Foster Care';");
    		$getFosterResourceID->execute();
    		$getFosterResourceID->bind_result($id);
    		
    		while ($getFosterResourceID->fetch()) {
    			$fosterID = $id;
    		}
    		
    		$getAwarenessEdResourceID = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Awareness/Education';");
    		$getAwarenessEdResourceID->execute();
    		$getAwarenessEdResourceID->bind_result($id);
    		
    		while ($getAwarenessEdResourceID->fetch()) {
    			$awarenessEdID = $id;
    		}
    		
    		$getResponseTrainingResourceID = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Response Training';");
    		$getResponseTrainingResourceID->execute();
    		$getResponseTrainingResourceID->bind_result($id);
    		
    		while ($getResponseTrainingResourceID->fetch()) {
    			$responseTrainingID = $id;
    		}
    		
    		$getSubstanceAbuseResourceID = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Substance Abuse';");
    		$getSubstanceAbuseResourceID->execute();
    		$getSubstanceAbuseResourceID->bind_result($id);
    		
    		while ($getSubstanceAbuseResourceID->fetch()) {
    			$substanceAbuseID = $id;
    		}
    		
    		$getOtherResourceID = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Other';");
    		$getOtherResourceID->execute();
    		$getOtherResourceID->bind_result($id);
    		
    		while ($getOtherResourceID->fetch()) {
    			$otherID = $id;
    		}
    		
    		$getAdvocacyResourceID = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Advocacy';");
    		$getAdvocacyResourceID->execute();
    		$getAdvocacyResourceID->bind_result($id);
    		
    		while ($getAdvocacyResourceID->fetch()) {
    			$advocacyID = $id;
    		}
    		
    		$getNoneResourceID = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Advocacy';");
    		$getNoneResourceID->execute();
    		$getNoneResourceID->bind_result($id);
    		
    		while ($getNoneResourceID->fetch()) {
    			$noneID = $id;
    		}

			
	
	
		
			if (($clothingService == "true") || ($clothingSupply == "true") || ($clothingEmergResp == "true")) {
				if ($clothingService == "true") {
	    			$clothingService = 1;
	    		}
	    		else {
	    			$clothingService = 0;
	    		}
	    		if ($clothingSupply == "true") {
	    			$clothingSupply = 1;
	    		}
	    		else {
	    			$clothingSupply = 0;
	    		}
	    		if ($clothingEmergResp == "true") {
	    			$clothingEmergResp = 1;
	    		}
	    		else {
	    			$clothingEmergResp = 0;
	    		}
	    		

	   
				$insertClothingResource = $connLibrary->prepare("INSERT INTO Service (OrgID, SerID, Service, Supply, Emergency, SerDesc)
																VALUES (" . $orgId . ", " . $clothingID . " , " . $clothingService . " , 
														" . $clothingSupply . " , " . $clothingEmergResp . " , '" . $clothingDesc . "');");
				
				$insertClothingResource ->execute();
				$insertClothingResource ->close();
			}

			
			if (($foodService == "true") || ($foodSupply == "true") || ($foodEmergResp == "true")) {
				if ($foodService == "true") {
	    			$foodService = 1;
	    		}
	    		else {
	    			$foodService = 0;
	    		}
	    		if ($foodSupply == "true") {
	    			$foodSupply = 1;
	    		}
	    		else {
	    			$foodSupply = 0;
	    		}
	    		if ($foodEmergResp == "true") {
	    			$foodEmergResp = 1;
	    		}
	    		else {
	    			$foodEmergResp = 0;
	    		}
	    		

				$insertFoodResource = $connLibrary->prepare("INSERT INTO Service (OrgID, SerID, Service, Supply, Emergency, SerDesc)
															   VALUES (" . $orgId . ", " . $foodID . " , " . $foodService . " , 
															   " . $foodSupply . " , " . $foodEmergResp . " , '" . $foodDesc . "');");
				
				$insertFoodResource->execute();
				$insertFoodResource->close(); 
			}
		
			if (($employmentService == "true") || ($employmentSupply == "true") || ($employmentEmergResp == "true")) {
				if ($employmentService == "true") {
	    			$employmentService = 1;
	    		}
	    		else {
	    			$employmentService = 0;
	    		}
	    		if ($employmentSupply == "true") {
	    			$employmentSupply = 1;
	    		}
	    		else {
	    			$employmentSupply = 0;
	    		}
	    		if ($employmentEmergResp == "true") {
	    			$employmentEmergResp = 1;
	    		}
	    		else {
	    			$employmentEmergResp = 0;
	    		}
				
				$insertEmploymentResource = $connLibrary->prepare("INSERT INTO Service (OrgID, SerID, Service, Supply, Emergency, SerDesc)
															   VALUES (" . $orgId . ", " . $employmentID . " , " . $employmentService . " , 
															   " . $employmentSupply . " , " . $employmentEmergResp . " , '" . $employmentDesc . "');");
				
				$insertEmploymentResource->execute();
				$insertEmploymentResource->close();
			}
			
			if (($mentoringService == "true") || ($mentoringSupply == "true") || ($mentoringEmergResp == "true")) {
				if ($mentoringService == "true") {
	    			$mentoringService = 1;
	    		}
	    		else {
	    			$mentoringService = 0;
	    		}
	    		if ($mentoringSupply == "true") {
	    			$mentoringSupply = 1;
	    		}
	    		else {
	    			$mentoringSupply = 0;
	    		}
	    		if ($mentoringEmergResp == "true") {
	    			$mentoringEmergResp = 1;
	    		}
	    		else {
	    			$mentoringEmergResp = 0;
	    		}
				
				$insertMentoringResource = $connLibrary->prepare("INSERT INTO Service (OrgID, SerID, Service, Supply, Emergency, SerDesc)
															   VALUES (" . $orgId . ", " . $mentoringID . " , " . $mentoringService . " , 
															   " . $mentoringSupply . " , " . $mentoringEmergResp . " , '" . $mentoringDesc . "');");
				
				$insertMentoringResource->execute();
				$insertMentoringResource->close();
			}
			
		
			if (($counselingTherapyService == "true") || ($counselingTherapySupply == "true") || ($counselingTherapyEmergResp == "true")) {
				if ($counselingTherapyService == "true") {
	    			$counselingTherapyService = 1;
	    		}
	    		else {
	    			$counselingTherapyService = 0;
	    		}
	    		if ($counselingTherapySupply == "true") {
	    			$counselingTherapySupply = 1;
	    		}
	    		else {
	    			$counselingTherapySupply = 0;
	    		}
	    		if ($counselingTherapyEmergResp == "true") {
	    			$counselingTherapyEmergResp = 1;
	    		}
	    		else {
	    			$counselingTherapyEmergResp = 0;
	    		}
				
		
				$insertCounselingResource = $connLibrary->prepare("INSERT INTO Service (OrgID, SerID, Service, Supply, Emergency, SerDesc)
															   VALUES (" . $orgId . ", " . $counselingID . " , " . $counselingTherapyService . " , 
															   " . $counselingTherapySupply . " , " . $counselingTherapyEmergResp . " , '" . $counselingTherapyDesc . "');");
				
				$insertCounselingResource->execute();
				$insertCounselingResource->close();
			}
			
			if (($pregnancyService == "true") || ($pregnancySupply == "true") || ($pregnancyEmergResp == "true")) {
				if ($pregnancyService == "true") {
	    			$pregnancyService = 1;
	    		}
	    		else {
	    			$pregnancyService = 0;
	    		}
	    		if ($pregnancySupply == "true") {
	    			$foodSupply = 1;
	    		}
	    		else {
	    			$pregnancySupply = 0;
	    		}
	    		if ($pregnancyEmergResp == "true") {
	    			$pregnancyEmergResp = 1;
	    		}
	    		else {
	    			$pregnancyEmergResp = 0;
	    		}
				
				$insertPregnancyResource = $connLibrary->prepare("INSERT INTO Service (OrgID, SerID, Service, Supply, Emergency, SerDesc)
															   VALUES (" . $orgId . ", " . $pregnancyID . " , " . $pregnancyService . " , 
															   " . $pregnancySupply . " , " . $pregnancyEmergResp . " , '" . $pregnancyDesc . "');");
				
				$insertPregnancyResource->execute();
				$insertPregnancyResource->close();
			}
			
			if (($medicalService == "true") || ($medicalSupply == "true") || ($medicalEmergResp == "true")) {
				if ($medicalService == "true") {
	    			$medicalService = 1;
	    		}
	    		else {
	    			$medicalService = 0;
	    		}
	    		if ($medicalSupply == "true") {
	    			$medicalSupply = 1;
	    		}
	    		else {
	    			$medicalSupply = 0;
	    		}
	    		if ($medicalEmergResp == "true") {
	    			$medicalEmergResp = 1;
	    		}
	    		else {
	    			$medicalEmergResp = 0;
	    		}
				
				$insertMedicalResource = $connLibrary->prepare("INSERT INTO Service (OrgID, SerID, Service, Supply, Emergency, SerDesc)
															   VALUES (" . $orgId . ", " . $medicalID . " , " . $medicalService . " , 
															   " . $medicalSupply . " , " . $medicalEmergResp . " , '" . $medicalDesc . "');");
				
				$insertMedicalResource->execute();
				$insertMedicalResource->close();
			}
			
			if (($legalService == "true") || ($legalSupply == "true") || ($legalEmergResp == "true")) {
				if ($legalService == "true") {
	    			$legalService = 1;
	    		}
	    		else {
	    			$legalService = 0;
	    		}
	    		if ($legalSupply == "true") {
	    			$legalSupply = 1;
	    		}
	    		else {
	    			$legalSupply = 0;
	    		}
	    		if ($legalEmergResp == "true") {
	    			$legalEmergResp = 1;
	    		}
	    		else {
	    			$legalEmergResp = 0;
	    		}
				
				$insertLegalResource = $connLibrary->prepare("INSERT INTO Service (OrgID, SerID, Service, Supply, Emergency, SerDesc)
															   VALUES (" . $orgId . ", " . $legalID . " , " . $legalService . " , 
															   " . $legalSupply . " , " . $legalEmergResp . " , '" . $legalDesc . "');");
				
				$insertLegalResource->execute();
				$insertLegalResource->close();
			}
			
			if (($govService == "true") || ($govSupply == "true") || ($govEmergResp == "true")) {
				if ($govService == "true") {
	    			$govService = 1;
	    		}
	    		else {
	    			$govService = 0;
	    		}
	    		if ($govSupply == "true") {
	    			$govSupply = 1;
	    		}
	    		else {
	    			$govSupply = 0;
	    		}
	    		if ($govEmergResp == "true") {
	    			$govEmergResp = 1;
	    		}
	    		else {
	    			$govEmergResp = 0;
	    		}
				
				$insertGovResource = $connLibrary->prepare("INSERT INTO Service (OrgID, SerID, Service, Supply, Emergency, SerDesc)
															   VALUES (" . $orgId . ", " . $govID . " , " . $govService . " , 
															   " . $govSupply . " , " . $govEmergResp . " , '" . $govDesc . "');");
				
				$insertGovResource->execute();
				
				$insertGovResource->close();
			}
			
			if (($investigationService == "true") || ($investigationSupply == "true") || ($investigationEmergResp == "true")) {
				if ($investigationService == "true") {
	    			$investigationService = 1;
	    		}
	    		else {
	    			$investigationService = 0;
	    		}
	    		if ($investigationSupply == "true") {
	    			$investigationSupply = 1;
	    		}
	    		else {
	    			$investigationSupply = 0;
	    		}
	    		if ($investigationEmergResp == "true") {
	    			$investigationEmergResp = 1;
	    		}
	    		else {
	    			$investigationEmergResp = 0;
	    		}
				
				$insertInvestigationResource = $connLibrary->prepare("INSERT INTO Service (OrgID, SerID, Service, Supply, Emergency, SerDesc)
															   VALUES (" . $orgId . ", " . $investigationID . " , " . $investigationService . " , 
															   " . $investigationSupply . " , " . $investigationEmergResp . " , '" . $investigationDesc . "');");
				
				$insertInvestigationResource->execute();
				$insertInvestigationResource->close();
			}
		
			if (($fosterCareService == "true") || ($fosterCareSupply == "true") || ($fosterCareEmergResp == "true")) {
				if ($fosterCareService == "true") {
	    			$fosterCareService = 1;
	    		}
	    		else {
	    			$fosterCareService = 0;
	    		}
	    		if ($fosterCareSupply == "true") {
	    			$fosterCareSupply = 1;
	    		}
	    		else {
	    			$fosterCareSupply = 0;
	    		}
	    		if ($fosterCareEmergResp == "true") {
	    			$fosterCareEmergResp = 1;
	    		}
	    		else {
	    			$fosterCareEmergResp = 0;
	    		}
				
				$insertFosterResource = $connLibrary->prepare("INSERT INTO Service (OrgID, SerID, Service, Supply, Emergency, SerDesc)
															   VALUES (" . $orgId . ", " . $fosterID . " , " . $fosterCareService . " , 
															   " . $fosterCareSupply . " , " . $fosterCareEmergResp . " , '" . $fosterCareDesc . "');");
				
				$insertFosterResource->execute();
				$insertFosterResource->close();
			}
			
			if (($awarenessEdService == "true") || ($awarenessEdSupply == "true") || ($awarenessEdEmergResp == "true")) {
				if ($awarenessEdService == "true") {
	    			$awarenessEdService = 1;
	    		}
	    		else {
	    			$awarenessEdService = 0;
	    		}
	    		if ($awarenessEdSupply == "true") {
	    			$awarenessEdSupply = 1;
	    		}
	    		else {
	    			$awarenessEdSupply = 0;
	    		}
	    		if ($awarenessEdEmergResp == "true") {
	    			$awarenessEdEmergResp = 1;
	    		}
	    		else {
	    			$awarenessEdEmergResp = 0;
	    		}
				
				$insertAwarenessEdResource = $connLibrary->prepare("INSERT INTO Service (OrgID, SerID, Service, Supply, Emergency, SerDesc)
															   VALUES (" . $orgId . ", " . $awarenessEdID . " , " . $awarenessEdService . " , 
															   " . $awarenessEdSupply . " , " . $awarenessEdEmergResp . " , '" . $awarenessEdDesc . "');");
				
				$insertAwarenessEdResource->execute();
				$insertAwarenessEdResource->close();
			}
		
			if (($responseTrainingService == "true") || ($responseTrainingSupply == "true") || ($responseTrainingEmergResp == "true")) {
				if ($responseTrainingService == "true") {
	    			$responseTrainingService = 1;
	    		}
	    		else {
	    			$responseTrainingService = 0;
	    		}
	    		if ($responseTrainingSupply == "true") {
	    			$responseTrainingSupply = 1;
	    		}
	    		else {
	    			$responseTrainingSupply = 0;
	    		}
	    		if ($responseTrainingEmergResp == "true") {
	    			$responseTrainingEmergResp = 1;
	    		}
	    		else {
	    			$responseTrainingEmergResp = 0;
	    		}
				
				$insertResponseResource = $connLibrary->prepare("INSERT INTO Service (OrgID, SerID, Service, Supply, Emergency, SerDesc)
															   VALUES (" . $orgId . ", " . $responseTrainingID . " , " . $responseTrainingService . " , 
															   " . $responseTrainingSupply . " , " . $responseTrainingEmergResp . " , '" . $responseTrainingDesc . "');");
				
				$insertResponseResource->execute();
				$insertResponseResource->close();
			}

			if (($substanceAbuseService == "true") || ($substanceAbuseSupply == "true") || ($substanceAbuseEmergResp == "true")) {
				if ($substanceAbuseService == "true") {
	    			$substanceAbuseService = 1;
	    		}
	    		else {
	    			$substanceAbuseService = 0;
	    		}
	    		if ($substanceAbuseSupply == "true") {
	    			$substanceAbuseSupply = 1;
	    		}
	    		else {
	    			$substanceAbuseSupply = 0;
	    		}
	    		if ($substanceAbuseEmergResp == "true") {
	    			$substanceAbuseEmergResp = 1;
	    		}
	    		else {
	    			$substanceAbuseEmergResp = 0;
	    		}
				
				$insertSubstanceAbuseResource = $connLibrary->prepare("INSERT INTO Service (OrgID, SerID, Service, Supply, Emergency, SerDesc)
															   VALUES (" . $orgId . ", " . $substanceAbuseID . " , " . $substanceAbuseService . " , 
															   " . $substanceAbuseSupply . " , " . $substanceAbuseEmergResp . " , '" . $substanceAbuseDesc . "');");
				
				$insertSubstanceAbuseResource->execute();
				$insertSubstanceAbuseResource->close();
			}
			
			if (($otherService == "true") || ($otherSupply == "true") || ($otherEmergResp == "true")) {
				if ($otherService == "true") {
	    			$otherService = 1;
	    		}
	    		else {
	    			$otherService = 0;
	    		}
	    		if ($otherSupply == "true") {
	    			$otherSupply = 1;
	    		}
	    		else {
	    			$otherSupply = 0;
	    		}
	    		if ($otherEmergResp == "true") {
	    			$otherEmergResp = 1;
	    		}
	    		else {
	    			$otherEmergResp = 0;
	    		}
				
				$insertOtherResource = $connLibrary->prepare("INSERT INTO Service (OrgID, SerID, Service, Supply, Emergency, SerDesc)
															   VALUES (" . $orgId . ", " . $otherID . " , " . $otherService . " , 
															   " . $otherSupply . " , " . $otherEmergResp . " , '" . $otherDesc . "');");
				
				$insertOtherResource->execute();
				$insertOtherResource->close();
			} 
			
			if (($advocacyService == "true") || ($advocacySupply == "true") || ($advocacyEmergResp == "true")) {
				if ($advocacyService == "true") {
	    			$advocacyService = 1;
	    		}
	    		else {
	    			$advocacyService = 0;
	    		}
	    		if ($advocacySupply == "true") {
	    			$advocacySupply = 1;
	    		}
	    		else {
	    			$advocacySupply = 0;
	    		}
	    		if ($advocacyEmergResp == "true") {
	    			$advocacyEmergResp = 1;
	    		}
	    		else {
	    			$advocacyEmergResp = 0;
	    		}
				
				$insertAdvocacyResource = $connLibrary->prepare("INSERT INTO Service (OrgID, SerID, Service, Supply, Emergency, SerDesc)
															   VALUES (" . $orgId . ", " . $advocacyID . " , " . $advocacyService . " , 
															   " . $advocacySupply . " , " . $advocacyEmergResp . " , '" . $advocacyDesc . "');");
				
				$insertAdvocacyResource->execute();
				$insertAdvocacyResource->close();
			}
			
			
		 	$getResourceNull = $connLibrary->prepare("SELECT OrgID FROM Service WHERE OrgID = " . $orgId .  " GROUP BY OrgID;");
    		$getResourceNull->execute();
    		$getResourceNull->bind_result($id);
    		
    		$hasService = -1;
    		while ($getResourceNull->fetch()) {
    			$hasService = $id;
    		}
    		
    		if ($hasService == "" || $hasService == null || $hasService == -1) {
    	
    			$insertNoneResource = $connLibrary->prepare("INSERT INTO Service (OrgID, SerID, Service, Supply, Emergency, SerDesc)
															   VALUES (" . $orgId . ", " . $noneID . ", 0,0,0,'No resources');");
				
				$insertNoneResource->execute();
				$insertNoneResource->close();
    			
    		}
			
}

?>
