<?php>

function db_connect() {
    $server = getenv("IP");
    $username = getenv('C9_USER');
    $pass = "";
    $dbname = "htResourceHub";
    $dbport = 3306;
    
    $connLibrary = new mysqli($server, $username, $pass, $dbname, $dbport);
    if ($connLibrary->connect_error) {
        return NULL;
    } 
    
    return $connLibrary;
}


/********************************************* 
 * Organization Info
*********************************************/

$isConfidential = $_POST["cbIsConfCreate"];
$name = $_POST["txtOrgNameCreate"];
$program = $_POST["txtOrgProgramCreate"];
$missionStatement = $_POST["txtOrgMissionStatementCreate"];
$programGoals = $_POST["txtOrgGoalsOfProgramCreate"];
$mainPhone = $_POST["txtOrgMainPhoneCreate"];
$hotlineNumber = $_POST["txtHotlineCreate"];
$website = $_POST["txtOrgWebsiteCreate"];
$email = $_POST["txtOrgEmailCreate"];
$confidentialPhoneNumber = $_POST["txtConfPhoneCreate"];
$primaryContactName = $_POST["txtPrimaryContactNameCreate"];
$primaryContactPosition = $_POST["txtPrimaryContactPositionCreate"];
$primaryContactPhone = $_POST["txtPrimaryContactPhoneCreate"];
$primaryContactEmail = $_POST["txtPrimaryContactEmailCreate"];
$address1Street = $_POST["txtAddress1StreetCreate"];
$address1City = $_POST["txtAddress1CityCreate"];
$address1County = $_POST["txtAddress1CountyCreate"];
$address1State = $_POST["txtAddress1StateCreate"];
$address1Zip = $_POST["txtAddress1ZipCreate"];
$address2Street = $_POST["txtAddress2StreetCreate"];
$confAddressCity = $_POST["txtConfAddressCityCreate"];
$confAddressCounty = $_POST["txtConfAddressCountyCreate"];
$confAddressState = $_POST["txtConfAddressStateCreate"];
$confAddressZip = $_POST["txtConfAddressZipCreate"];
$confAddressCity = $_POST["txtConfAddressCityCreate"];
$confAddressCounty = $_POST["txtConfAddressCountyCreate"];
$confAddressState = $_POST["txtConfAddresssStateCreate"];
$confAddressZip = $_POST["txtConfAddressZipCreate"];
$confAddressStreet = $_POST["txtConfAddressStreetCreate"];
$confAddressCity = $_POST["txtConfAddressCityCreate"];
$confAddressCounty = $_POST["txtConfAddressCountyCreate"];
$confAddressState = $_POST["txtConfAddressStateCreate"];
$confAddressZip = $_POST["txtConfAddressZipCreate"];
$confAddressStreet = $_POST["txtConfAddressStreetCreate"];
$confAddressCity = $_POST["txtConfAddressCityCreate"];
$confAddressCounty = $_POST["txtConfAddressCountyCreate"];
$confAddressState = $_POST["txtConfAddressStateCreate"];
$confAddressZip = $_POST["txtConfAddressZipCreate"];
$confAddressCity = $_POST["txtConfAddressCityCreate"];
$confAddressCounty = $_POST["txtConfAddressCountyCreate"];
$confAddressState = $_POST["txtConfAddressStateCreate"];
$confAddressZip = $_POST["txtConfAddressZipCreate"];
$confAddressStreet = $_POST["txtConfAddressStreetCreate"];
$confAddressCity = $_POST["txtConfAddressCityCreate"];
$confAddressCounty = $_POST["txtConfAddressCountyCreate"];
$confAddressState = $_POST["txtConfAddressStateCreate"];
$confAddressZip = $_POST["txtConfAddressZipCreate"];
$is247 = $_POST["cbIs247Create"];
$generalHours = $_POST["txtGeneralHoursCreate"];
$additionalHours = $_POST["txtAdditionalHoursCreate"];
$reasonforAdditional = $_POST["txtReasonForAdditionalCreate"];

/********************************************* 
 * Resources Offered
*********************************************/

$Shelter = $_POST["txtShelterCreate"];
$TraditionalHousing = $_POST["txtTraditionalHousingCreate"];
$AssistanceInLocatingHousing = $_POST["txtAssistanceInLocatingHousingCreate"];

$clothingService = $_POST["txtClothingServiceCreate"];
$clothingSupply = $_POST["txtClotingSupplyCreate"];
$clothingEmergResp = $_POST["txtClothingEmergRespCreate"];
$clothingDesc = $_POST["txtClothingDescCreate"];

$foodService = $_POST["txtFoodServiceCreate"];
$foodSupply = $_POST["txtFoodSupplyCreate"];
$foodEmergResp = $_POST["txtFoodEmergRespCreate"];
$foodDesc = $_POST["txtFoodDescCreate"];

$govService = $_POST["txtGovServiceCreate"];
$govSupply = $_POST["txtGovSupplyCreate"];
$govEmergResp = $_POST["txtGovEmergRespCreate"];
$govDesc = $_POST["txtGovDescCreate"];

$mentoringService = $_POST["txtMentoringServiceCreate"];
$mentoringSupply = $_POST["txtMentoringSupplyCreate"];
$mentoringEmergResp = $_POST["txtMentoringEmergRespCreate"];
$mentoringDesc = $_POST["txtMentoringDescCreate"];

$employmentService = $_POST["txtEmploymentServiceCreate"];
$employmentSupply = $_POST["txtEmploymentSuuplyCreate"];
$employmentEmergResp = $_POST["txtEmploymentEmergRespCreate"];
$employmentDesc = $_POST["txtEmploymentDescCreate"];

$counselingTherapyService = $_POST["txtCounselingTherapyServiceCreate"];
$counselingTherapySupply = $_POST["txtCounselingTherapySupplyCreate"];
$counselingTherapyEmergResp = $_POST["txtCounselingTherapyEmergRespCreate"];
$counselingTherapyDesc = $_POST["txtCounselingTherapyDescCreate"];

$pregnancyService = $_POST["txtPregnancyServiceCreate"];
$pregnancySupply = $_POST["txtPregnancySupplyCreate"];
$pregnancyEmergResp = $_POST["txtPregnancyEmergRespCreate"];
$pregnancyDesc = $_POST["txtPregnancyDescCreate"];

$medicalService = $_POST["txtMedicalServiceCreate"];
$medicalSupply = $_POST["txtMedicalSupplyCreate"];
$medicalEmergResp = $_POST["txtMedicalEmergRespCreate"];
$medicalDesc = $_POST["txtMedicalDescCreate"];

$legalService = $_POST["txtLegalServiceCreate"];
$legalSupply = $_POST["txtLegalSupplyCreate"];
$legalEmergResp = $_POST["txtLegalEmergRespCreate"];
$legalDesc = $_POST["txtLegalDescCreate"];


$invenstigationService = $_POST["txtInvestigationServiceCreate"];
$invenstigationSupply = $_POST["txtInvestigationSupplyCreate"];
$invenstigationEmergResp = $_POST["txtInvestigationEmergRespCreate"];
$invenstigationDesc = $_POST["txtInvestigationDescCreate"];

$fosterCareService = $_POST["txtFosterCareServiceCreate"];
$fosterCareSupply = $_POST["txtFosterCareSupplyCreate"];
$fosterCareEmergResp = $_POST["txtFosterCareEmergRespCreate"];
$fosterCareDesc = $_POST["txtFosterCareDescCreate"];

$awarenessEdService = $_POST["txtAwarenessEdServiceCreate"];
$awarenessEdSupply = $_POST["txtAwarenessEdSupplyCreate"];
$awarenessEdEmergResp = $_POST["txtAwarenessEdSEmergRespCreate"];
$awarenessEdDesc = $_POST["txtAwarenessEdDescCreate"];

$responseTrainingService = $_POST["txtResponseTrainingServiceCreate"];
$responseTrainingSupply = $_POST["txtResponseTrainingSupplyCreate"];
$responseTrainingEmergResp = $_POST["txtResponseTrainingEmergRespCreate"];
$responseTrainingDesc = $_POST["txtResponseTrainingDescCreate"];

$otherService = $_POST["txtOtherServiceCreate"];
$otherSupply = $_POST["txtOtherSupplyCreate"];
$otherEmergResp = $_POST["txtOtherEmergRespCreate"];
$otherDesc = $_POST["txtOtherDescCreate"];

/********************************************* 
 * Additional Considerations
*********************************************/

$isFree = $_POST["txtIsFreeCreate"];
$associatedFee = $_POST["txtAssociatedFeeCreate"];
$faithBased = $_POST["txtFaithBasedCreate"];
$membership = $_POST["txtMemgershipCreate"];
$membershipDesc = $_POST["txtMembershipDescCreate"];
$training = $_POST["txtTrainingCreate"];
$trainingDesc = $_POST["txtTrainingDescCreate"];
$application = $_POST["txtApplicationCreate"];
$applicationDesc = $_POST["txtApplicationDescCreate"];
$restrictions = $_POST["txtRestrictionsCreate"];
$restrictionsDesc = $_POST["txtRestrictionsDescCreate"];


/********************************************* 
 * Demographics Served
*********************************************/

$male = $_POST["txtMaleCreate"];
$female = $_POST["txtFemaleCreate"];
$transgender = $_POST["txtTransgenderCreate"];
$infantToddler = $_POST["txtInfantToddlerCreate"];
$children = $_POST["txtChildremCreate"];
$youthYoungAdults = $_POST["txtYouthYoungAdultsCreate"];
$adults = $_POST["txtAdultsCreate"];
$domesticBorn = $_POST["txtDomesticBornCreate"];
$foreignBorn = $_POST["txtForeignBornCreate"];
$undocumented = $_POST["txtUndocumentedCreate"];
$race = $_POST["txtRaceCreate"];

/********************************************* 
 * Notes
*********************************************/

$notes = $_POST["txtNotesCreate"];
$confidentialNotes = $_POST["txtConfidentialNotesCreate"];

?>