<?php

include 'dbConnect.php';

echo $_POST["method"]();

function insertButtons () {
    
        if(checkIfLoggedIn() == "admin1") {
            echo "<button id=\" + orgs[i][0] + \" type=\"button\" class=\"updOrgButton btn btn-default btn-lg\" 
            data-toggle= \"modal\" data-target=\"#updateModal\" onclick=\"populateUpdateFaiths();populateUpdateStates();
            loadUpdateModalData(\" + orgs[i][0] + \");\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span></button>
            <button id=\" + orgs[i][0] + \" type=\"button\" class=\"delOrgButton btn btn-default btn-lg\" data-toggle= \"modal\" 
            data-target=\"#deleteModal\" onclick=\"loadDeleteData(\" + orgs[i][0] + \");\"><span class=\"glyphicon glyphicon-trash\" 
            aria-hidden=\"true\"></span></button>";
        }
        else {
            echo "";
        }

		
	
		 
}

function readTest() {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
   

    $testQuery = $connLibrary->prepare("SELECT * FROM NationalityTypes"); 
    $testQuery->execute();
    $testQuery->bind_result($ID, $natType);

    $data = array();
    while($testQuery->fetch()){
        $data[] = array($ID, $natType);
    }
    
    echo json_encode($data);
    $connLibrary->close();
}

function readAllOrgs() {
    session_start();
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
   
   if(checkIfLoggedIn() == "admin1" || checkIfLoggedIn() == "admin2") {

    $allOrgQuery = $connLibrary->prepare("SELECT o.OrgID, o.OrgName, o.PhoneNum, o.phoneExt, o.confNum, o.confPhoneExt, o.HotlineNum, o.WebLink,
                                            o.email, o.isShelter, o.isConf, o.isApproved, a.StreetInfo, a.City, a.ZipCode, a.IsConf, 
                                            st.StateName, GROUP_CONCAT(DISTINCT sert.SerType) AS SerType, h.is24Hours
                                            FROM Organizations o JOIN Addresses a ON (o.OrgID = a.OrgID)
                                            JOIN States st ON (st.StateID = a.StateID)
                                            JOIN Service se ON (se.OrgId = o.OrgID)
                                            JOIN ServiceTypes sert ON (sert.SerID = se.SerID)
                                            JOIN Hours h ON (h.OrgID = o.OrgID)
                                            WHERE o.isApproved = 1
                                            GROUP BY o.OrgID;"); 
    $allOrgQuery->execute();
    $allOrgQuery->bind_result($orgID, $orgName, $phoneNum, $phoneExt, $confNum, $confExt, $hotlineNum, $webLink, $email, $isShelter, $isConfOrg, $isApproved, $streetInfo, $city, $zip, $IsConfAddress, $stateName, $serType, $is24Hours);

    $allOrgData = array();
    while($allOrgQuery->fetch()){
        $allOrgData[] = array($orgID, $orgName, $phoneNum, $phoneExt, $confNum, $confExt, $hotlineNum, $webLink, $email, $isShelter, $isConfOrg, $isApproved, $streetInfo, $city, $zip, $IsConfAddress, $stateName, $serType, $is24Hours);
    }
    
    $connLibrary->close();
    
    echo json_encode($allOrgData);
    
   }
   else {
           $allOrgQuery = $connLibrary->prepare("SELECT o.OrgID, o.OrgName, o.PhoneNum, o.phoneExt, o.confNum, o.confPhoneExt, o.HotlineNum, o.WebLink,
                                            o.email, o.isShelter, o.isConf, o.isApproved, a.StreetInfo, a.City, a.ZipCode, a.IsConf, 
                                            st.StateName, GROUP_CONCAT(DISTINCT sert.SerType) AS SerType, h.is24Hours
                                            FROM Organizations o JOIN Addresses a ON (o.OrgID = a.OrgID)
                                            JOIN States st ON (st.StateID = a.StateID)
                                            JOIN Service se ON (se.OrgId = o.OrgID)
                                            JOIN ServiceTypes sert ON (sert.SerID = se.SerID)
                                            JOIN Hours h ON (h.OrgID = o.OrgID)
                                            WHERE o.isConf = 0 AND o.isApproved = 1
                                            GROUP BY o.OrgID;"); 
    $allOrgQuery->execute();
    $allOrgQuery->bind_result($orgID, $orgName, $phoneNum, $phoneExt, $confNum, $confExt, $hotlineNum, $webLink, $email, $isShelter, $isConfOrg, $isApproved, $streetInfo, $city, $zip, $IsConfAddress, $stateName, $serType, $is24Hours);

    $allOrgData = array();
    while($allOrgQuery->fetch()){
        $allOrgData[] = array($orgID, $orgName, $phoneNum, $phoneExt, $confNum, $confExt, $hotlineNum, $webLink, $email, $isShelter, $isConfOrg, $isApproved, $streetInfo, $city, $zip, $IsConfAddress, $stateName, $serType, $is24Hours);
    }
    
    $connLibrary->close();
    
    echo json_encode($allOrgData);
   }
   
   
}

function simpleSearchOrgs() {
    session_start();
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
   
     $counseling = $_POST['counseling'];
     $employment = $_POST['employment'];
     $legal = $_POST['legal'];
     $medical = $_POST['medical'];
     $shelter = $_POST['shelter'];
     $substanceAbuse = $_POST['substanceAbuse'];
     
     $counselingId = 0;
     $employmentId = 0;
     $legalId = 0;
     $medicalId = 0;
     $substanceAbuseId = 0;
     
     		/**get counselingId id **/
			
				$getCounselingId = $connLibrary->prepare("SELECT SerId from ServiceTypes where SerType = 'Counseling/Therapy';");
				$getCounselingId ->execute();
				$getCounselingId ->bind_result($id);
				
				while($getCounselingId->fetch()){
        			$counselingId = $id;
    			}
    			
    	    /**get employmentId id **/
			
				$getEmploymentId = $connLibrary->prepare("SELECT SerId from ServiceTypes where SerType = 'Employment';");
				$getEmploymentId ->execute();
			    $getEmploymentId ->bind_result($id);
				
				while($getEmploymentId->fetch()){
        			$employmentId = $id;
    			}
    			
    		/**get legalId id **/
			
				$getLegalId = $connLibrary->prepare("SELECT SerId from ServiceTypes where SerType = 'Legal';");
				$getLegalId ->execute();
			    $getLegalId ->bind_result($id);
				
				while($getLegalId->fetch()){
        			$legalId = $id;
    			}
    			
    		/**get medicalId id **/
			
				$getMedicalId = $connLibrary->prepare("SELECT SerId from ServiceTypes where SerType = 'Medical';");
		    	$getMedicalId ->execute();
			    $getMedicalId ->bind_result($id);
				
				while($getMedicalId->fetch()){
        			$medicalId = $id;
    			}
    			
    		/**get substanceAbuseId id **/
			
				$getSubstanceAbuseId = $connLibrary->prepare("SELECT SerId from ServiceTypes where SerType = 'Substance Abuse';");
		    	$getSubstanceAbuseId ->execute();
			    $getSubstanceAbuseId ->bind_result($id);
				
				while($getSubstanceAbuseId->fetch()){
        			$substanceAbuseId = $id;
    			}
    			
     
     $queryString = "SELECT Service.OrgID FROM Service WHERE Service.SerID = ";
     
     if ($employment == "true") {
         $queryString = $queryString . $employmentId;
     }
    
     if ($counseling == "true") {
         if($queryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
             $queryString = $queryString . $counselingId;
         }
         else {
             $queryString = $queryString . " AND Service.OrgID IN (SELECT Service.orgID FROM Service WHERE Service.SerID = " . $counselingId . ")";
         }
     }
      
     
    if ($medical == "true") {
         if($queryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
             $queryString = $queryString . $medicalId;
         }
         else {
             $queryString = $queryString . " AND Service.OrgID IN (SELECT Service.orgID FROM Service WHERE Service.SerID = " . $medicalId . ")";
         }
     }
     
     
    if ($legal == "true") {
         if($queryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
             $queryString = $queryString . $legalId;
         }
         else {
             $queryString = $queryString . " AND Service.OrgID IN (SELECT Service.orgID FROM Service WHERE Service.SerID = " . $legalId . ")";
         }
     }
    if ($substanceAbuse == "true") {
         if($queryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
             $queryString = $queryString . $substanceAbuseId;
         }
         else {
             $queryString = $queryString . " AND Service.OrgID IN (SELECT Service.orgID FROM Service WHERE Service.SerID = " . $substanceAbuseId . ")";
         }
     }
     elseif($queryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
         $queryString = "SELECT Service.OrgID FROM Service GROUP BY Service.OrgID";
     }
     
     $queryString = $queryString . ";";
     
  

    $serOrgQuery = $connLibrary->prepare($queryString); 
    $serOrgQuery->execute();
    $serOrgQuery->bind_result($serOrgID);

    $simpleQueryString = "";

    while ($serOrgQuery->fetch()) {
        if($simpleQueryString == "") {
            $simpleQueryString = "WHERE (o.OrgID = " . $serOrgID;
        }
        else {
            $simpleQueryString = $simpleQueryString . " OR o.OrgID = " . $serOrgID;
        }
       
    }
   

    if($shelter == "true") {
        $simpleQueryString = $simpleQueryString . ") AND o.isShelter = 1 ";
    }
    else {
        if($simpleQueryString != "") {
               $simpleQueryString = $simpleQueryString . ") ";
        }
    }
    
    
    
    if ($simpleQueryString == "" || $simpleQueryString == ") AND o.isShelter = 1 ") {
         echo "No results found";
    
    }
    else {
        if(checkIfLoggedIn() == "admin1" || checkIfLoggedIn() == "admin2") {
                   $simpleSearchLoggedInQuery = $connLibrary->prepare("SELECT o.OrgID, o.OrgName, o.PhoneNum, o.phoneExt, o.confNum, o.confPhoneExt, o.HotlineNum, o.WebLink,
                                            o.email, o.isShelter, o.isConf, o.isApproved, a.StreetInfo, a.City, a.ZipCode, a.IsConf, 
                                            st.StateName, GROUP_CONCAT(DISTINCT sert.SerType) AS SerType, h.is24Hours
                                            FROM Organizations o JOIN Addresses a ON (o.OrgID = a.OrgID)
                                            JOIN States st ON (st.StateID = a.StateID)
                                            JOIN Service se ON (se.OrgId = o.OrgId)
                                            JOIN Hours h ON (h.OrgID = o.OrgID)
                                            JOIN ServiceTypes sert ON (sert.SerID = se.SerID) " . $simpleQueryString .
                                            " GROUP BY o.OrgID;"); 
     $simpleSearchLoggedInQuery->execute();
     $simpleSearchLoggedInQuery->bind_result($orgID, $orgName, $phoneNum, $phoneExt, $confNum, $confExt, $hotlineNum, $webLink, $email, $isShelter, $isConfOrg, $isApproved, $streetInfo, $city, $zip, $IsConfAddress, $stateName, $serType, $is24Hours);

    $simpleSearchData = array();
    while( $simpleSearchLoggedInQuery->fetch()){
        if($isApproved == 1) {
         $simpleSearchData[] = array($orgID, $orgName, $phoneNum, $phoneExt, $confNum, $confExt, $hotlineNum, $webLink, $email, $isShelter, $isConfOrg, $isApproved, $streetInfo, $city, $zip, $IsConfAddress, $stateName, $serType, $is24Hours);
        }
    }
    

 

  echo json_encode($simpleSearchData);    
        }
        else {

                               $simpleSearchQuery = $connLibrary->prepare("SELECT o.OrgID, o.OrgName, o.PhoneNum, o.phoneExt, o.confNum, o.confPhoneExt, o.HotlineNum, o.WebLink,
                                            o.email, o.isShelter, o.isConf, o.isApproved, a.StreetInfo, a.City, a.ZipCode, a.IsConf, 
                                            st.StateName, GROUP_CONCAT(DISTINCT sert.SerType) AS SerType, h.is24Hours
                                            FROM Organizations o JOIN Addresses a ON (o.OrgID = a.OrgID)
                                            JOIN States st ON (st.StateID = a.StateID)
                                            JOIN Service se ON (se.OrgId = o.OrgId)
                                            JOIN Hours h ON (h.OrgID = o.OrgID)
                                            JOIN ServiceTypes sert ON (sert.SerID = se.SerID) " . $simpleQueryString .
                                            " AND o.isConf = 0
                                            GROUP BY o.OrgID;"); 
    $simpleSearchQuery->execute();
    $simpleSearchQuery->bind_result($orgID, $orgName, $phoneNum, $phoneExt, $confNum, $confExt, $hotlineNum, $webLink, $email, $isShelter, $isConfOrg, $isApproved, $streetInfo, $city, $zip, $IsConfAddress, $stateName, $serType, $is24Hours);

    $simpleSearchData = array();
    while($simpleSearchQuery->fetch()){
       if($isApproved == 1) {
         $simpleSearchData[] = array($orgID, $orgName, $phoneNum, $phoneExt, $confNum, $confExt, $hotlineNum, $webLink, $email, $isShelter, $isConfOrg, $isApproved, $streetInfo, $city, $zip, $IsConfAddress, $stateName, $serType, $is24Hours);
        }    }

  

  echo json_encode($simpleSearchData);  
        }
  
        
    }


  $connLibrary->close();
}

function advSearchOrgs() {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    $clothingRsc = $_POST['clothingRsc'];
    $foodRsc = $_POST['foodRsc'];
    $employmentRsc = $_POST['employmentRsc'];
    $mentoringRsc = $_POST['mentoringRsc'];
    $counselingRsc = $_POST['counselingRsc'];
    $pregnancyRsc = $_POST['pregnancyRsc'];
    $medicalRsc = $_POST['medicalRsc'];
    $legalRsc = $_POST['legalRsc'];
    $governmentalRsc = $_POST['governmentalRsc'];
    $investigationRsc = $_POST['investigationRsc'];
    $fosterCareRsc = $_POST['fosterCareRsc'];
    $educationRsc = $_POST['educationRsc'];
    $responseTrainingRsc = $_POST['responseTrainingRsc'];
    $substanceAbuseRsc = $_POST['substanceAbuseRsc'];
    $advocacyRsc = $_POST['advocacyRsc'];
    $cityTxt = $_POST['cityTxt'];
    $searchTxt = $_POST['searchTxt'];
    $hours247 = $_POST['hours247'];
    $feeFree = $_POST['feeFree'];
    $adultsAge = $_POST['adultsAge'];
    $youthAge = $_POST['youthAge'];
    $childrenAge = $_POST['childrenAge'];
    $infantsAge = $_POST['infantsAge'];
    $femaleGdr = $_POST['femaleGdr'];
    $transGdr = $_POST['transGdr'];
    $maleGdr = $_POST['maleGdr'];
    $undocumentedNat = $_POST['undocumentedNat'];
    $foreignNat = $_POST['foreignNat'];
    $domesticNat = $_POST['domesticNat'];
    $asstLocHsg = $_POST['asstLocHsg'];
    $transitionalHsg = $_POST['transitionalHsg'];
    $shelterHsg = $_POST['shelterHsg'];
    
    //Stops the query if there are ever no results found
    $resOrgAppend = resourceOrgIDs($clothingRsc, $foodRsc, $employmentRsc, $mentoringRsc, $counselingRsc, $pregnancyRsc, $medicalRsc, $legalRsc, $governmentalRsc, $investigationRsc, $fosterCareRsc, $educationRsc, $responseTrainingRsc, $substanceAbuseRsc, $advocacyRsc);
    if ($resOrgAppend != "") {
         $natOrgAppend = nationalityOrgIDs($undocumentedNat, $foreignNat, $domesticNat, $resOrgAppend);
   
       if($natOrgAppend != "") {
       
            $ageOrgAppend = ageOrgIDs($adultsAge, $youthAge, $childrenAge, $infantsAge, $natOrgAppend);
            
            if($ageOrgAppend != ""){
                
                $addressOrgAppend = addressOrgIDs($cityTxt, $ageOrgAppend);
                
                if($addressOrgAppend != ""){
            
                    $genderOrgAppend = genderOrgIDs($femaleGdr, $maleGdr, $transGdr, $addressOrgAppend);
                    
                    if($genderOrgAppend != ""){
                
                        $hoursOrgAppend = hoursOrgIDs($hours247, $genderOrgAppend);
                       
                        
                        if($hoursOrgAppend != ""){
                            $orgNameAppend = orgNameIDs($searchTxt, $hoursOrgAppend);
                      
                            if($orgNameAppend != "") {
                                $housingResourcesAppend = housingResourcesIDs($asstLocHsg, $transitionalHsg, $shelterHsg, $orgNameAppend);
                                if($housingResourcesAppend !="") {
                                    $freeFeeAppend = freeFeeIDs($feeFree, $housingResourcesAppend);
                                    
                                      if(checkIfLoggedIn() == "admin1" || checkIfLoggedIn() == "admin2") {  
                                    
                                     $advSearchQuery = $connLibrary->prepare("SELECT o.OrgID, o.OrgName, o.PhoneNum, o.phoneExt, o.confNum, o.confPhoneExt, o.HotlineNum, o.WebLink,
                                            o.email, o.isShelter, o.isConf, o.isApproved, a.StreetInfo, a.City, a.ZipCode, a.IsConf, 
                                            st.StateName, GROUP_CONCAT(DISTINCT sert.SerType) AS SerType, h.is24Hours
                                        FROM Organizations o JOIN Addresses a ON (o.OrgID = a.OrgID)
                                        JOIN States st ON (st.StateID = a.StateID)
                                        JOIN Service se ON (se.OrgId = o.OrgId)
                                        JOIN Hours h ON (h.OrgID = o.OrgID)
                                        JOIN ServiceTypes sert ON (sert.SerID = se.SerID) WHERE " . $freeFeeAppend .
                                        " GROUP BY o.OrgID;"); 
                                        $advSearchQuery->execute();
                                        $advSearchQuery->bind_result($orgID, $orgName, $phoneNum, $phoneExt, $confNum, $confExt, $hotlineNum, $webLink, $email, $isShelter, $isConfOrg, $isApproved, $streetInfo, $city, $zip, $IsConfAddress, $stateName, $serType, $is24Hours);
                                        $advSearchData = array();
    
                                        while($advSearchQuery->fetch()){
                                            if($isApproved == 1) {
                                            $advSearchData[] = array($orgID, $orgName, $phoneNum, $phoneExt, $confNum, $confExt, $hotlineNum, $webLink, $email, $isShelter, $isConfOrg, $isApproved, $streetInfo, $city, $zip, $IsConfAddress, $stateName, $serType, $is24Hours);
                                            }
                                        }
                                        
                                        
                                        echo json_encode($advSearchData); 
                                } 
                                
                        else {
                                    
                                     $advSearchQuery = $connLibrary->prepare("SELECT o.OrgID, o.OrgName, o.PhoneNum, o.phoneExt, o.confNum, o.confPhoneExt, o.HotlineNum, o.WebLink,
                                            o.email, o.isShelter, o.isConf, o.isApproved, a.StreetInfo, a.City, a.ZipCode, a.IsConf, 
                                            st.StateName, GROUP_CONCAT(DISTINCT sert.SerType) AS SerType, h.is24Hours
                                        FROM Organizations o JOIN Addresses a ON (o.OrgID = a.OrgID)
                                        JOIN States st ON (st.StateID = a.StateID)
                                        JOIN Service se ON (se.OrgId = o.OrgId)
                                        JOIN Hours h ON (h.OrgID = o.OrgID)
                                        JOIN ServiceTypes sert ON (sert.SerID = se.SerID) WHERE " . $freeFeeAppend .
                                        " AND o.isConf = 0 GROUP BY o.OrgID;"); 
                        $advSearchQuery->execute();
                        $advSearchQuery->bind_result($orgID, $orgName, $phoneNum, $phoneExt, $confNum, $confExt, $hotlineNum, $webLink, $email, $isShelter, $isConfOrg, $isApproved, $streetInfo, $city, $zip, $IsConfAddress, $stateName, $serType, $is24Hours);
                        $advSearchData = array();
    
                         while($advSearchQuery->fetch()){
                                            if($isApproved == 1) {
                                            $advSearchData[] = array($orgID, $orgName, $phoneNum, $phoneExt, $confNum, $confExt, $hotlineNum, $webLink, $email, $isShelter, $isConfOrg, $isApproved, $streetInfo, $city, $zip, $IsConfAddress, $stateName, $serType, $is24Hours);
                                            }
                                        }
                         echo json_encode($advSearchData); 
                         }
                                }
                        }
                                } 
                            } 
                        } 
                    } 
                } 
            } 
         
        
    
    else {
        echo "No results found.";
    }
    $connLibrary->close();
    
    }
    
//returns Org ID's to append to end of nationality query    
function resourceOrgIDs($clothingRsc, $foodRsc, $employmentRsc, $mentoringRsc, $counselingRsc, $pregnancyRsc, $medicalRsc, $legalRsc, $governmentalRsc, $investigationRsc, $fosterCareRsc, $educationRsc, $responseTrainingRsc, $substanceAbuseRsc, $advocacyRsc) {
     
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    	    $clothingId = 0;
			$foodId = 0;
			$employmentId = 0;
			$mentoringId = 0;
			$counselingId = 0;
			$pregnancyId = 0;
			$medicalId = 0;
			$legalId = 0;
			$govId = 0;
			$investigationId = 0;
			$fosterId = 0;
			$awarenessEdId = 0;
			$responseTrainingId = 0;
			$substanceAbuseId = 0;
			$advocacyId = 0;


  			
  				/**get clothing rsc id **/
  				
    		    $getClothingResourceId = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Clothing';");
    		    $getClothingResourceId->execute();
    		    $getClothingResourceId->bind_result($id);
    		
    		    while ($getClothingResourceId->fetch()) {
    		    	$clothingId = $id;
    		    }
    		
    		    /**get food rsc id **/
    		    
    		    $getFoodResourceId = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Food';");
    		    $getFoodResourceId->execute();
    		    $getFoodResourceId->bind_result($id);
    		
    		    while ($getFoodResourceId->fetch()) {
    			    $foodId = $id;
    	        }
    	
    		    /**get employment rsc id **/
    		    
    		    $getEmploymentResourceId = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Employment';");
    		    $getEmploymentResourceId->execute();
    		    $getEmploymentResourceId->bind_result($id);
    		
    		    while ($getEmploymentResourceId->fetch()) {
    			    $employmentId = $id;
    		    }
    		
    		    /**get mentoring rsc id **/
    	
    	    	$getMentoringResourceId = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Mentoring';");
    	    	$getMentoringResourceId->execute();
    	    	$getMentoringResourceId->bind_result($id);
    		
    	    	while ($getMentoringResourceId->fetch()) {
    	    		$mentoringId = $id;
    	    	}
    	    	
    	    	/**get counseling rsc id **/
    	    	
    		    $getCounselingResourceId = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Counseling/Therapy';");
    		    $getCounselingResourceId->execute();
    		    $getCounselingResourceId->bind_result($id);
    		
    		    while ($getCounselingResourceId->fetch()) {
    		    	$counselingId = $id;
    	    	}
    		
    		    /**get pregnancy rsc id **/
    		
    	    	$getPregnancyResourceId = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Pregnancy';");
    	    	$getPregnancyResourceId->execute();
    	    	$getPregnancyResourceId->bind_result($id);
    		
    	    	while ($getPregnancyResourceId->fetch()) {
    	    		$pregnancyId = $id;
    	    	}
    		
    		    /**get medical rsc id **/
    	    	$getMedicalResourceId = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Medical';");
    	    	$getMedicalResourceId->execute();
    	    	$getMedicalResourceId->bind_result($id);
    		
    	    	while ($getMedicalResourceId->fetch()) {
    	    		$medicalId = $id;
    	    	}
    		
    		    /** get legal rsc id **/
    		    
    	    	$getLegalResourceId = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Legal';");
    	    	$getLegalResourceId->execute();
    	    	$getLegalResourceId->bind_result($id);
    		
    	    	while ($getLegalResourceId->fetch()) {
    	    		$legalId = $id;
    	    	}
    		
    		    /** get gov rsc id **/
    		    
    	    	$getGovResourceId = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Governmental';");
    	    	$getGovResourceId->execute();
    	    	$getGovResourceId->bind_result($id);
    		
    	    	while ($getGovResourceId->fetch()) {
    	    		$govId = $id;
    	    	}
    		
    		    /** get investigations rsc id **/
    		    
    	    	$getInvestigationResourceId = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Investigation';");
    	    	$getInvestigationResourceId->execute();
    		    $getInvestigationResourceId->bind_result($id);
    		
    	    	while ($getInvestigationResourceId->fetch()) {
    		    	$investigationId = $id;
    		    }
    		
    		    /** get foster rsc id **/
    		    
    	    	$getFosterResourceId = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Foster Care';");
    	    	$getFosterResourceId->execute();
    	    	$getFosterResourceId->bind_result($id);
    		
    	    	while ($getFosterResourceId->fetch()) {
    	    		$fosterId = $id;
    	    	}
    		
    		    /** get awareness ed rsc id **/
    		    
    	    	$getAwarenessEdResourceId = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Awareness/Education';");
    	    	$getAwarenessEdResourceId->execute();
    	    	$getAwarenessEdResourceId->bind_result($id);
    		
    	    	while ($getAwarenessEdResourceId->fetch()) {
    		    	$awarenessEdId = $id;
    	    	}
    		
    		    /** get response training rsc id **/
    		    
    	    	$getResponseTrainingResourceId = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Response Training';");
    		    $getResponseTrainingResourceId->execute();
    		    $getResponseTrainingResourceId->bind_result($id);
    		
    	    	while ($getResponseTrainingResourceId->fetch()) {
    		    	$responseTrainingId = $id;
    		    }
    		    
    		    /** get substance abuse rsc id **/
    		
    		    $getSubstanceAbuseResourceId = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Substance Abuse';");
    		    $getSubstanceAbuseResourceId->execute();
    		    $getSubstanceAbuseResourceId->bind_result($id);
    		
        		while ($getSubstanceAbuseResourceId->fetch()) {
    	    		$substanceAbuseId = $id;
    		    }
    		
    		    /** get advocacy rsc id **/
    		    
    	    	$getAdvocacyResourceId = $connLibrary->prepare("SELECT SerID FROM ServiceTypes WHERE SerType LIKE 'Advocacy';");
    	    	$getAdvocacyResourceId->execute();
    	    	$getAdvocacyResourceId->bind_result($id);
    		
    	    	while ($getAdvocacyResourceId->fetch()) {
    	    		$advocacyId = $id;
    	    	}
    		


    
    
    
     $resourcesQueryString = "SELECT Service.OrgID FROM Service WHERE Service.SerID = ";
     $nothingSelected = true;
    
    
     if ($clothingRsc == "true") {
         $resourcesQueryString = $resourcesQueryString . $clothingId;
         $nothingSelect = false;
     }
     
    if ($foodRsc == "true") {
         if($resourcesQueryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
             $resourcesQueryString = $resourcesQueryString . $foodId;
         }
         else {
             $resourcesQueryString = $resourcesQueryString . " AND Service.OrgID IN (SELECT Service.orgID FROM Service WHERE Service.SerID = " . $foodId . ")";
         }
         $nothingSelect = false;
     }
     
    if ($employmentRsc == "true") {
         if($resourcesQueryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
             $resourcesQueryString = $resourcesQueryString . $employmentId;
         }
         else {
             $resourcesQueryString = $resourcesQueryString . " AND Service.OrgID IN (SELECT Service.orgID FROM Service WHERE Service.SerID = " . $employmentId . ")";
         }
         $nothingSelect = false;
     }
     
     
    if ($mentoringRsc == "true") {
         if($resourcesQueryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
             $resourcesQueryString = $resourcesQueryString . $mentoringId;
         }
         else {
             $resourcesQueryString = $resourcesQueryString . " AND Service.OrgID IN (SELECT Service.orgID FROM Service WHERE Service.SerID = " . $mentoringId . ")";
         }
         $nothingSelect = false;
     }
     
    if ($counselingRsc == "true") {
         if($resourcesQueryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
             $resourcesQueryString = $resourcesQueryString . $counselingId;
         }
         else {
             $resourcesQueryString = $resourcesQueryString . " AND Service.OrgID IN (SELECT Service.orgID FROM Service WHERE Service.SerID = " . $counselingId . ")";
         }
         $nothingSelect = false;
     }
     
    if ($pregnancyRsc == "true") {
         if($resourcesQueryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
             $resourcesQueryString = $resourcesQueryString . $pregnancyId;
         }
         else {
             $resourcesQueryString = $resourcesQueryString . " AND Service.OrgID IN (SELECT Service.orgID FROM Service WHERE Service.SerID = " . $pregnancyId . ")";
         }
         $nothingSelect = false;
     }
     
    if ($medicalRsc == "true") {
         if($resourcesQueryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
             $resourcesQueryString = $resourcesQueryString . $medicalId;
         }
         else {
             $resourcesQueryString = $resourcesQueryString . " AND Service.OrgID IN (SELECT Service.orgID FROM Service WHERE Service.SerID = " . $medicalId . ")";
         }
         $nothingSelect = false;
     }
     
    if ($legalRsc == "true") {
         if($resourcesQueryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
             $resourcesQueryString = $resourcesQueryString . $legalId;
         }
         else {
             $resourcesQueryString = $resourcesQueryString . " AND Service.OrgID IN (SELECT Service.orgID FROM Service WHERE Service.SerID = " . $legalId . ")";
         }
         $nothingSelect = false;
     }
     
    if ($governmentalRsc == "true") {
         if($resourcesQueryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
             $resourcesQueryString = $resourcesQueryString . $govId;
         }
         else {
             $resourcesQueryString = $resourcesQueryString . " AND Service.OrgID IN (SELECT Service.orgID FROM Service WHERE Service.SerID = " . $govId . ")";
         }
         $nothingSelect = false;
     }
     
    if ($investigationRsc == "true") {
         if($resourcesQueryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
             $resourcesQueryString = $resourcesQueryString . $investigationId;
         }
         else {
             $resourcesQueryString = $resourcesQueryString . " AND Service.OrgID IN (SELECT Service.orgID FROM Service WHERE Service.SerID = " . $investigationId . ")";
         }
         $nothingSelect = false;
     }
     
    if ($fosterCareRsc == "true") {
         if($resourcesQueryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
             $resourcesQueryString = $resourcesQueryString . $fosterId;
         }
         else {
             $resourcesQueryString = $resourcesQueryString . " AND Service.OrgID IN (SELECT Service.orgID FROM Service WHERE Service.SerID = " . $fosterId . ")";
         }
         $nothingSelect = false;
     }
     
    if ($educationRsc == "true") {
         if($resourcesQueryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
             $resourcesQueryString = $resourcesQueryString . $awarenessEdId;
         }
         else {
             $resourcesQueryString = $resourcesQueryString . " AND Service.OrgID IN (SELECT Service.orgID FROM Service WHERE Service.SerID = " . $awarenessEdId . ")";
         }
         $nothingSelect = false;
     }
     
    if ($responseTrainingRsc == "true") {
         if($resourcesQueryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
             $resourcesQueryString = $resourcesQueryString . $responseTrainingId;
         }
         else {
             $resourcesQueryString = $resourcesQueryString . " AND Service.OrgID IN (SELECT Service.orgID FROM Service WHERE Service.SerID = " . $responseTrainingId . ")";
         }
         $nothingSelect = false;
     }
     
    if ($substanceAbuseRsc == "true") {
         if($resourcesQueryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
             $resourcesQueryString = $resourcesQueryString . $substanceAbuseId;
         }
         else {
             $resourcesQueryString = $resourcesQueryString . " AND Service.OrgID IN (SELECT Service.orgID FROM Service WHERE Service.SerID = " . $substanceAbuseId . ")";
         }
         $nothingSelect = false;
     }
     
    if ($advocacyRsc == "true") {
         if($resourcesQueryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
             $resourcesQueryString = $resourcesQueryString . $advocacyId;
         }
         else {
             $resourcesQueryString = $resourcesQueryString . " AND Service.OrgID IN (SELECT Service.orgID FROM Service WHERE Service.SerID = " . $advocacyId . ")";
         }
         $nothingSelect = false;
     }
     

     
     
   
    if($resourcesQueryString == "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
       $resourcesQueryString = "SELECT Service.OrgID FROM Service GROUP BY OrgID;";
   }
     
    elseif($resourcesQueryString != "SELECT Service.OrgID FROM Service WHERE Service.SerID = ") {
         $resourcesQueryString = $resourcesQueryString . ";";
    }
    
   
    $resourcesOrgQuery = $connLibrary->prepare($resourcesQueryString); 
    $resourcesOrgQuery->execute();
    $resourcesOrgQuery->bind_result($resOrgID);
    $resOrgAppend = " (";
    while($resourcesOrgQuery->fetch()){
       
       if ($resOrgAppend == " (") {
           $resOrgAppend = $resOrgAppend . "Nationality.OrgID = " . $resOrgID;
       }
        else {
            $resOrgAppend = $resOrgAppend . " OR Nationality.OrgID = " . $resOrgID;
        }
    }
    
    
    if ($resOrgAppend == " (") {
        $resOrgAppend = "";
        }
    else {
        $resOrgAppend = $resOrgAppend . ")";
        }
    
    $connLibrary->close();
    
    return $resOrgAppend;
     
     
   
}
    
//returns Org ID's to append to end of age query      
function nationalityOrgIDs($undocumentedNat, $foreignNat, $domesticNat, $resOrgAppend){
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
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
    			
    
    
    $natQueryString = "SELECT Nationality.OrgID FROM Nationality WHERE (Nationality.NatID = " . $allNatId . " OR (";
    
   
    if ($domesticNat == "true") {
        if ($natQueryString == "SELECT Nationality.OrgID FROM Nationality WHERE (Nationality.NatID = " . $allNatId . " OR (") {
            $natQueryString = $natQueryString . "Nationality.OrgID IN (SELECT Nationality.orgID FROM Nationality WHERE Nationality.NatID = " . $domesticBornId . ")";
        }
        else {
           $natQueryString = $natQueryString . " AND Nationality.OrgID IN (SELECT Nationality.orgID FROM Nationality WHERE Nationality.NatID = " . $domesticBornId . ")";  
        } 
     }
     
    if ($foreignNat == "true") {
         if ($natQueryString == "SELECT Nationality.OrgID FROM Nationality WHERE (Nationality.NatID = " . $allNatId . " OR (") {
              $natQueryString = $natQueryString . "Nationality.OrgID IN (SELECT Nationality.orgID FROM Nationality WHERE Nationality.NatID = " . $foreignBornId . ")";   
         }
         else {
            $natQueryString = $natQueryString . " AND Nationality.OrgID IN (SELECT Nationality.orgID FROM Nationality WHERE Nationality.NatID = " . $foreignBornId . ")";   
         }
       
     }
     
    if ($undocumentedNat == "true") {
        
         if ($natQueryString == "SELECT Nationality.OrgID FROM Nationality WHERE (Nationality.NatID = " . $allNatId . " OR (") {
              $natQueryString = $natQueryString . "Nationality.OrgID IN (SELECT Nationality.orgID FROM Nationality WHERE Nationality.NatID = " . $undocumentedId . ")";
         }
         else {
              $natQueryString = $natQueryString . " AND Nationality.OrgID IN (SELECT Nationality.orgID FROM Nationality WHERE Nationality.NatID = " . $undocumentedId . ")";
         }
            
    }
    
    if($natQueryString == "SELECT Nationality.OrgID FROM Nationality WHERE (Nationality.NatID = " . $allNatId . " OR (") {
        $natQueryString = "SELECT Nationality.OrgID FROM Nationality WHERE " . $resOrgAppend . " GROUP BY Nationality.OrgID;";
    }
    else {
          $natQueryString = $natQueryString . ")) AND " . $resOrgAppend . " GROUP BY Nationality.OrgID;";
    }
    
    $natOrgQuery = $connLibrary->prepare($natQueryString); 
    $natOrgQuery->execute();
    $natOrgQuery->bind_result($natOrgID);
    $natOrgAppend = " (";
    while($natOrgQuery->fetch()){
       
       if ($natOrgAppend == " (") {
           $natOrgAppend = $natOrgAppend . "Age.OrgID = " . $natOrgID;
       }
        else {
            $natOrgAppend = $natOrgAppend . " OR Age.OrgID = " . $natOrgID;
        }
      
    }
    
    
    if ($natOrgAppend == " (") {
        $natOrgAppend = "";
    }
    else {
        $natOrgAppend = $natOrgAppend . ")";
    }
    
    $connLibrary->close();
    
    return $natOrgAppend;
    
    
}

//returns Org ID's to append to address query
function ageOrgIDs($adultsAge, $youthAge, $childrenAge, $infantsAge, $natOrgAppend){
   $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    		/**get age type id's**/

			$allAgeId = 0;
			$infantsId = 0;
			$childrensId = 0;
			$youthsId = 0;
			$adultsId = 0;
			
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
        			$childrensId = $id;
    			}
    		
			
		
				/**get youth age type id**/
	
			$getYouthAgeId = $connLibrary->prepare("SELECT AgeID from AgeTypes WHERE AgeType like 'Youth/Young Adults';");
			$getYouthAgeId->execute();
			$getYouthAgeId->bind_result($id);
			
		
    		while($getYouthAgeId->fetch()){
        			$youthsId = $id;
    			}
			
		
			
				/**get adults age type id**/
				
			$getAdultsAgeId = $connLibrary->prepare("SELECT AgeID from AgeTypes WHERE AgeType like 'Adults';");
			$getAdultsAgeId->execute();
			$getAdultsAgeId->bind_result($id);
			
		
    		while($getAdultsAgeId->fetch()){
        			$adultsId = $id;
    			}
			
   
    $ageQueryString = "SELECT Age.OrgID FROM Age WHERE (Age.AgeID = " . $allAgeId . " OR (";
     
     if ($infantsAge == "true") {
         if($ageQueryString == "SELECT Age.OrgID FROM Age WHERE (Age.AgeID = " . $allAgeId . " OR (") {
             $ageQueryString = $ageQueryString . "Age.OrgID IN (SELECT Age.orgID FROM Age WHERE Age.AgeID = " . $infantsId . ") ";
         }
         else {
              $ageQueryString = $ageQueryString . " AND Age.OrgID IN (SELECT Age.orgID FROM Age WHERE Age.AgeID = " . $infantsId . ")";
         }
        
     }
      
     if ($childrenAge == "true") {
          if($ageQueryString == "SELECT Age.OrgID FROM Age WHERE (Age.AgeID = " . $allAgeId . " OR (") {
             $ageQueryString = $ageQueryString . "Age.OrgID IN (SELECT Age.orgID FROM Age WHERE Age.AgeID = " . $childrensId . ") ";
         }
         else {
              $ageQueryString = $ageQueryString . " AND Age.OrgID IN (SELECT Age.orgID FROM Age WHERE Age.AgeID = " . $childrensId . ")";
         }
     }
      
	 if ($youthAge == "true") {
          if($ageQueryString == "SELECT Age.OrgID FROM Age WHERE (Age.AgeID = " . $allAgeId . " OR (") {
             $ageQueryString = $ageQueryString . "Age.OrgID IN (SELECT Age.orgID FROM Age WHERE Age.AgeID = " . $youthsId . ") ";
         }
         else {
              $ageQueryString = $ageQueryString . " AND Age.OrgID IN (SELECT Age.orgID FROM Age WHERE Age.AgeID = " . $youthsId . ")";
         } 
     }
      
	 if ($adultsAge == "true") {
         if($ageQueryString == "SELECT Age.OrgID FROM Age WHERE (Age.AgeID = " . $allAgeId . " OR (") {
             $ageQueryString = $ageQueryString . "Age.OrgID IN (SELECT Age.orgID FROM Age WHERE Age.AgeID = " . $adultsId . ") ";
         }
         else {
              $ageQueryString = $ageQueryString . " AND Age.OrgID IN (SELECT Age.orgID FROM Age WHERE Age.AgeID = " . $adultsId . ")";
         }
     }
     
      if($ageQueryString == "SELECT Age.OrgID FROM Age WHERE (Age.AgeID = " . $allAgeId . " OR (") {
        $ageQueryString = "SELECT Age.OrgID FROM Age WHERE " . $natOrgAppend . " GROUP BY Age.OrgID;";
    }
    else {
          $ageQueryString = $ageQueryString . ")) AND " . $natOrgAppend . " GROUP BY Age.OrgID;";
    }
     
     $ageOrgQuery = $connLibrary->prepare($ageQueryString); 
     $ageOrgQuery->execute();
     $ageOrgQuery->bind_result($ageOrgID);
     
     $ageOrgAppend = " (";
     while($ageOrgQuery->fetch()){
       
       if ($ageOrgAppend == " (") {
           $ageOrgAppend = $ageOrgAppend . "Addresses.OrgID = " . $ageOrgID;
       }
        else {
            $ageOrgAppend = $ageOrgAppend . " OR Addresses.OrgID = " . $ageOrgID;
        }
      
     }
    
    
     if ($ageOrgAppend == " (") {
        $ageOrgAppend = "";
     }
     else {
        $ageOrgAppend = $ageOrgAppend . ")";
     }
    
     return $ageOrgAppend;
     
     $connLibrary->close();
}

//returns Org ID's to append to gender query
function addressOrgIDs($cityTxt, $ageOrgAppend){
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
          
    }
  
    if($cityTxt != ""){
        $addressQueryString = "SELECT Addresses.OrgID FROM Addresses WHERE Addresses.City LIKE '%" . $cityTxt . "%' AND " . $ageOrgAppend . ";";
    }
    else{
        $addressQueryString = "SELECT Addresses.OrgID FROM Addresses WHERE " . $ageOrgAppend . ";";
    }
     $addressOrgQuery = $connLibrary->prepare($addressQueryString); 
     $addressOrgQuery->execute();
     $addressOrgQuery->bind_result($addressOrgID);
     
     $addressOrgAppend = " (";
     while($addressOrgQuery->fetch()){
       
       if ($addressOrgAppend == " (") {
           $addressOrgAppend = $addressOrgAppend . "Gender.OrgID = " . $addressOrgID;
       }
        else {
            $addressOrgAppend = $addressOrgAppend . " OR Gender.OrgID = " . $addressOrgID;
        }
      
     }
    
    
     if ($addressOrgAppend == " (") {
        $addressOrgAppend = "";
     }
     else {
        $addressOrgAppend = $addressOrgAppend . ")";
     }
     $connLibrary->close();
    
     return $addressOrgAppend;
     
}

//returns Org ID's to append to hours query
function genderOrgIDs($femaleGdr, $maleGdr, $transGdr, $addressOrgAppend){
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
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
    
    $genderQueryString = "SELECT Gender.OrgID FROM Gender WHERE (Gender.GenID = " . $allGenderId . " OR (";
    
     if ($maleGdr == "true") {
         if($genderQueryString == "SELECT Gender.OrgID FROM Gender WHERE (Gender.GenID = " . $allGenderId . " OR ("){
             $genderQueryString = $genderQueryString . " Gender.OrgID IN (SELECT Gender.orgID FROM Gender WHERE Gender.GenID = " . $maleId . ")";
         }
         else{
             $genderQueryString = $genderQueryString . " AND Gender.OrgID IN (SELECT Gender.orgID FROM Gender WHERE Gender.GenID = " . $maleId . ")";
         }
     }
      
     if ($femaleGdr == "true") {
         if($genderQueryString == "SELECT Gender.OrgID FROM Gender WHERE (Gender.GenID = " . $allGenderId . " OR ("){
             $genderQueryString = $genderQueryString . " Gender.OrgID IN (SELECT Gender.orgID FROM Gender WHERE Gender.GenderID = " . $femaleId . ")";
         }
         else{
             $genderQueryString = $genderQueryString . " AND Gender.OrgID IN (SELECT Gender.orgID FROM Gender WHERE Gender.GenID = " . $femaleId . ")";
         }
     }
      
     if ($transGdr == "true") {
         if($genderQueryString == "SELECT Gender.OrgID FROM Gender WHERE (Gender.GenID = " . $allGenderId . " OR ("){
             $genderQueryString = $genderQueryString . " Gender.OrgID IN (SELECT Gender.orgID FROM Gender WHERE Gender.GenID = " . $transgenderId . ")";
         }
         else{
             $genderQueryString = $genderQueryString . " AND Gender.OrgID IN (SELECT Gender.orgID FROM Gender WHERE Gender.GenID = " . $transgenderId . ")";
         };
     }
     
     if($genderQueryString == "SELECT Gender.OrgID FROM Gender WHERE (Gender.GenID = " . $allGenderId . " OR ("){
         $genderQueryString = "SELECT Gender.OrgID FROM Gender WHERE" . $addressOrgAppend . "GROUP BY Gender.OrgID;";
     }
	 else{
	     $genderQueryString = $genderQueryString . ")) AND " . $addressOrgAppend . "GROUP BY Gender.OrgID;";
	 }
	 
     $genderOrgQuery = $connLibrary->prepare($genderQueryString); 
     $genderOrgQuery->execute();
     $genderOrgQuery->bind_result($genderOrgID);
     
     $genderOrgAppend = " (";
     while($genderOrgQuery->fetch()){
       
       if ($genderOrgAppend == " (") {
           $genderOrgAppend = $genderOrgAppend . "OrgID = " . $genderOrgID;
       }
        else {
            $genderOrgAppend = $genderOrgAppend . " OR OrgID = " . $genderOrgID;
        }
      
     }
    
    
     if ($genderOrgAppend == " (") {
        $genderOrgAppend = "";
     }
     else {
        $genderOrgAppend = $genderOrgAppend . ")";
     }
    
    $connLibrary->close();
    
     return $genderOrgAppend;
}

//returns OrgID's to append to organization query
function hoursOrgIDs($hours247, $genderOrgAppend){
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    $hoursQueryString = "";
    
    if ($hours247 == "false") {
        $hoursQueryString = "Select OrgID from Organizations where " . $genderOrgAppend . ";";
    }
    else {
         $hoursQueryString = "SELECT OrgID from Hours where Is24Hours = 1 AND " . $genderOrgAppend . ";";
    }
    
     $hoursOrgQuery = $connLibrary->prepare($hoursQueryString); 
     $hoursOrgQuery->execute();
     $hoursOrgQuery->bind_result($hoursOrgID);
     
     $hoursOrgAppend = " (";
     while($hoursOrgQuery->fetch()){
       
       if ($hoursOrgAppend == " (") {
           $hoursOrgAppend = $hoursOrgAppend . "OrgID = " . $hoursOrgID;
       }
        else {
            $hoursOrgAppend = $hoursOrgAppend . " OR OrgID = " . $hoursOrgID;
        }
      
     }
    
    
     if ($hoursOrgAppend == " (") {
        $hoursOrgAppend = "";
     }
     else {
        $hoursOrgAppend = $hoursOrgAppend . ")";
     }
  
  $connLibrary->close();
  
     return $hoursOrgAppend;
}

function orgNameIDs($searchTxt, $hoursOrgAppend) {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
          
    }
    
    $orgNameQueryString = "";
  
    if($searchTxt != ""){
        $orgNameQueryString = "SELECT OrgID FROM Organizations WHERE OrgName LIKE '%" . $searchTxt . "%' AND " . $hoursOrgAppend . ";";
    }
    else{
        $orgNameQueryString = "SELECT OrgID FROM Organizations WHERE " . $hoursOrgAppend . ";";
    }
    
     $orgNameQuery = $connLibrary->prepare($orgNameQueryString); 
     $orgNameQuery->execute();
     $orgNameQuery->bind_result($orgNameOrgID);
     
     $orgNameAppend = " (";
     while($orgNameQuery->fetch()){
       
       if ($orgNameAppend == " (") {
           $orgNameAppend = $orgNameAppend . "OrgID = " . $orgNameOrgID;
       }
        else {
            $orgNameAppend = $orgNameAppend . " OR OrgID = " . $orgNameOrgID;
        }
      
     }
    
    
     if ($orgNameAppend == " (") {
        $orgNameAppend = "";
     }
     else {
        $orgNameAppend = $orgNameAppend . ")";
     }
     
     $connLibrary->close();
    
     return $orgNameAppend; 
     
}

function housingResourcesIDs($asstLocHsg, $transitionalHsg, $shelterHsg, $orgNameAppend) {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    
    $housingQueryString = "SELECT OrgID from Organizations WHERE ";
    
    if ($asstLocHsg == "false" && $transitionalHsg == "false" && $shelterHsg == "false") {
        $housingQueryString = "Select OrgID from Organizations where " . $orgNameAppend . ";";
    }
    
    
    else {
        $housingQueryString = "SELECT OrgID from Organizations WHERE ";
        
        if($asstLocHsg == "true") {
            $housingQueryString = $housingQueryString . "isAssistanceLocatingHousing = 1 ";
            
        }
        
        if($transitionalHsg == "true") {
            if($housingQueryString == "SELECT OrgID from Organizations WHERE ") {
                $housingQueryString = $housingQueryString . "isTransitionalHousing = 1 ";
            }
            else {
                $housingQueryString = $housingQueryString . "AND isTransitionalHousing = 1 ";
            }
            
        }
        
        if ($shelterHsg == "true") {
            if($housingQueryString == "SELECT OrgID from Organizations WHERE ") {
                $housingQueryString = $housingQueryString . "isShelter = 1 ";
            }
            else {
                $housingQueryString = $housingQueryString . "AND isShelter = 1 ";
            }
        }
        
        $housingQueryString = $housingQueryString . "AND " . $orgNameAppend . ";";
        
    }
   
    
     $housingOrgQuery = $connLibrary->prepare($housingQueryString); 
     $housingOrgQuery->execute();
     $housingOrgQuery->bind_result($housingOrgID);
     
     $housingOrgAppend = " (";
     while( $housingOrgQuery->fetch()){
       
       if ($housingOrgAppend == " (") {
           $housingOrgAppend = $housingOrgAppend . "OrgID = " . $housingOrgID;
       }
        else {
            $housingOrgAppend = $housingOrgAppend . " OR OrgID = " . $housingOrgID;
        }
      
     }
    
    
     if ($housingOrgAppend == " (") {
        $housingOrgAppend= "";
     }
     else {
       $housingOrgAppend = $housingOrgAppend . ")";
     }
     
     $connLibrary->close();
  
     return $housingOrgAppend; 
}

function freeFeeIDs($feeFree, $housingResourcesAppend) {
     $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
    
    $feeQueryString = "";
    
    if ($feeFree == "false") {
        $feeQueryString = "Select OrgID from Organizations where " . $housingResourcesAppend . ";";
    }
    else {
         $feeQueryString = "SELECT OrgID from Organizations WHERE Fees = 0 AND " .  $housingResourcesAppend  . ";";
    }
    
     $feesOrgQuery = $connLibrary->prepare($feeQueryString); 
     $feesOrgQuery->execute();
     $feesOrgQuery->bind_result($feesOrgID);
     
     $feesOrgAppend = " (";
     while($feesOrgQuery->fetch()){
       
       if ( $feesOrgAppend == " (") {
           $feesOrgAppend =  $feesOrgAppend . "o.OrgID = " . $feesOrgID;
       }
        else {
             $feesOrgAppend =  $feesOrgAppend. " OR o.OrgID = " . $feesOrgID;
        }
      
     }
    
    
     if ( $feesOrgAppend == " (") {
       $feesOrgAppend = "";
     }
     else {
         $feesOrgAppend =  $feesOrgAppend . ")";
     }
     
     $connLibrary->close();
  
     return  $feesOrgAppend;
}

function complexSingleOrg($orgId) {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }
   

    $complexQuery = $connLibrary->prepare("SELECT o.OrgID, o.OrgName, o.AgencyName, o.PhoneNum, o.phoneExt,
                                            	o.HotlineNum, o.ConfNum, o.confPhoneExt, o.WebLink, o.email, o.ProgramStatement, 
                                            	o.isShelter, o.isTransitionalHousing, o.isAssistanceLocatingHousing,
                                            	o.Fees, o.FaithID, o.Notes, o.ConfNotes, o.isConf, ft.FaithType,
                                            	a.StreetInfo, a.City, a.ZipCode, a.IsConf, States.StateName,
                                            	c.FirstName, c.LastName, c.Email, c.Position, c.PhoneNum, c.IsConf, c.phoneExt,
                                                AgeTypes.AgeType, rt.RaceType, nt.NatType, et.EthType,
                                                h.Is24Hours, h.IsAdditional, h.MondayStart, h.MondayEnd, h.TuesdayStart, h.TuesdayEnd,
                                                h.WednesdayStart, h.WednesdayEnd, h.ThursdayStart, h.ThursdayEnd, h.FridayStart,
                                                h.FridayEnd, h.SaturdayStart, h.SaturdayEnd, h.SundayStart, h.SundayEnd, h.ReasonForAdditionalHours,
                                                reqt.ReqType, req.Description,
                                                GROUP_CONCAT(sert.SerType) AS SerType
                                            FROM Organizations o 
                                            JOIN Contacts c ON (c.OrgID = o.OrgID)
                                            JOIN FaithTypes ft ON (o.FaithID = ft.FaithID)
                                            JOIN Addresses a ON (o.OrgID = a.OrgID)
                                            JOIN Service se ON (se.OrgId = o.OrgId)
                                            JOIN ServiceTypes sert ON (sert.SerID = se.SerID)
                                            JOIN Age ON (o.OrgID = Age.OrgID)
                                            JOIN AgeTypes ON (Age.AgeID = AgeTypes.AgeID)
                                            JOIN Race r ON (r.OrgID = o.OrgID)
                                            JOIN RaceTypes rt ON (r.RaceID = rt.RaceID)
                                            JOIN Nationality n ON (n.OrgID = o.OrgID)
                                            JOIN NationalityTypes nt ON (nt.NatID = n.NatID)
                                            JOIN Ethnicity e ON (e.OrgID = o.OrgID)
                                            JOIN EthnicityTypes et ON (e.EthID = et.EthID)
                                            JOIN States ON (States.StateID = a.StateID)
                                            JOIN Hours h ON (o.OrgID = h.OrgID)
                                            JOIN Requirements req ON (o.OrgID = req.OrgID)
                                            JOIN RequirementsTypes reqt ON (req.ReqID = reqt.ReqID)
                                            WHERE (o.OrgID = 1);"); 
    $complexQuery->execute();
    $complexQuery->bind_result($OrgID, $OrgName, $AgencyName, $OrgMainPhone, $OrgPhoneExt, $OrgHotline, $OrgConfNumber, $OrgConfExt,
                                $Website, $OrgEmail, $OrgProgramStatement, $isShelter, $isTransHousing, $isAssistLocHousing, $Fees, $FaithID,
                                $Notes, $ConfNotes, $OrgIsConf, $FaithType, $StreetInfo, $City, $Zip, $AddressIsConf, $State, $ContactFirstName,
                                $ContactLastName, $ContactEmail, $ContactPosition, $ContactPhone, $ContactPhoneExt, $AgeTypes, $RaceTypes, $NatType,
                                $EthType, $is24Hours, $IsAdditionalHours, $MondayStart, $MondayEnd, $TuesdayStart, $TuesdayEnd, $WednesdayStart,
                                $WednesdayEnd, $ThursdayStart, $ThursdayEnd, $FridayStart, $FridayEnd, $SaturdayStart, $SaturdayEnd, $SundayStart,
                                $SundayEnd, $ReasonForAdditionalHours, $RequirementTypes, $RequirementDescription, $ServiceTypes);

    $data = array();
    while($complexQuery->fetch()){
        $data[] = array($ID, $natType);
    }
    
    $connLibrary->close();
    
    echo json_encode($data);
    
}

function login() {
  
  $usernameInput = $_POST['username'];
  $passwordInput = $_POST['password'];

   $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
    }


    $loginQuery = $connLibrary->prepare("SELECT username from Login WHERE username = '". $usernameInput ."' AND password = '". sha1($passwordInput) . "';");
    $loginQuery->execute();
    $loginQuery->bind_result($username);
    
    if (!$loginQuery) {
    echo 'Could not run query: ' . mysql_error();
    exit;
    }

    while($loginQuery->fetch()){
        session_start();
        $_SESSION['username'] = $username;
        $_SESSION['loggedIn'] = "true";
        
    }

    if($_SESSION['loggedIn'] == "true") {
        echo $_SESSION['username'];
    }
    else {
        echo "false";
    }
    
    $connLibrary->close(); 
    
}

function logout() {
    session_start();
    $_SESSION['username'] = "";
    $_SESSION['loggedIn'] = "false";
    session_destroy();
    echo $_SESSION['loggedIn'];
}

function checkIfLoggedIn() {
    session_start();
    if (isset($_SESSION['loggedIn']))  {
            if ($_SESSION['loggedIn'] == "true")  {
                return $_SESSION['username'];
            }   else    {
                return "false";
            }
        }   else    {
            return "false";
        }
    
}

function getStates() {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
          
    }
    
    $statesQuery = $connLibrary->prepare("SELECT StateName FROM States");
    $statesQuery->execute();
    $statesQuery->bind_result($stateName);
    
    $statesData = array();
    
    while($statesQuery->fetch()){
        $statesData[] = array($stateName);
    }
        $connLibrary->close();
    echo json_encode($statesData);
}

function getFaiths() {
    $connLibrary = db_connect();
    if($connLibrary == null || $connLibrary == null) {
          die("There was an error connecting to the database");
          
    }

    $faithsQuery = $connLibrary->prepare("SELECT FaithType FROM FaithTypes");
    $faithsQuery->execute();
    $faithsQuery->bind_result($faithType);
    
    $faithsData = array();
    
    while($faithsQuery->fetch()){
        $faithsData[] = array($faithType);
    }
    $connLibrary->close();
    echo json_encode($faithsData);
}

?>