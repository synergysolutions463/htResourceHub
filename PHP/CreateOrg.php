<?php

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
$primaryContactIsConf = $_POST["cbContactIsConfCreate"];
$primaryContactFirstName = $_POST["txtPrimaryContactFirstNameCreate"];
$primaryContactLastName = $_POST["txtPrimaryContactLastNameCreate"];
$primaryContactPosition = $_POST["txtPrimaryContactPositionCreate"];
$primaryContactPhone = $_POST["txtPrimaryContactPhoneCreate"];
$primaryContactEmail = $_POST["txtPrimaryContactEmailCreate"];
$address1Street = $_POST["txtAddress1StreetCreate"];
$address1City = $_POST["txtAddress1CityCreate"];
$address1County = $_POST["txtAddress1CountyCreate"];
$address1State = $_POST["txtAddress1StateCreate"];
$address1Zip = $_POST["txtAddress1ZipCreate"];
$address2Street = $_POST["txtAddress2StreetCreate"];
$address2City = $_POST["txtAddress2CityCreate"];
$address2County = $_POST["txtAddress2CountyCreate"];
$address2State = $_POST["txtAddress2StateCreate"];
$address2Zip = $_POST["txtAddress2ZipCreate"];
$confAddressCity = $_POST["txtConfAddressCityCreate"];
$confAddressCounty = $_POST["txtConfAddressCountyCreate"];
$confAddressState = $_POST["txtConfAddressStateCreate"];
$confAddressZip = $_POST["txtConfAddressZipCreate"];
$is247 = $_POST["cbIs247Create"];
$genHrsFWMonFriStart = $_POST["ddlGenFullWeekStartTimeCreate"];
$genHrsFWMonFriEnd = $_POST["ddlGenFullWeekEndTimeCreate"];
$genHrsFWSatStart = $_POST["ddlGenFullWeekSatStartTimeCreate"];
$genHrsFWSatEnd = $_POST["ddlGenFullWeekSatEndTimeCreate"];
$genHrsFWSunStart = $_POST["ddlGenFullWeekSunStartTimeCreate"];
$genHrsFWSunEnd = $_POST["ddlGenFullWeekSunEndTimeCreate"];
$genHrsMonStart = $_POST["ddlGenMondayStartTimeCreate"];
$genHrsMonEnd = $_POST["ddlGenMondayEndTimeCreate"];
$genHrsTuesStart = $_POST["ddlGenTuesdayStartTimeCreate"];
$genHrsTuesEnd = $_POST["ddlGenTuesdayEndTimeCreate"];
$genHrsWedStart = $_POST["ddlGenWednesdayStartTimeCreate"];
$genHrsWedEnd = $_POST["ddlGenWednesdayEndTimeCreate"];
$genHrsThurStart = $_POST["ddlGenThursdayStartTimeCreate"];
$genHrsThurEnd = $_POST["ddlGenThursdayEndTimeCreate"];
$genHrsFriStart = $_POST["ddlGenFridayStartTimeCreate"];
$genHrsFriEnd = $_POST["ddlGenFridayEndTimeCreate"];
$genHrsSatStart = $_POST["ddlGenSaturdayStartTimeCreate"];
$genHrsSatEnd = $_POST["ddlGenSaturdayStartTimeCreate"];
$genHrsSunStart = $_POST["ddlGenSundayStartTimeCreate"];
$genHrsSunEnd = $_POST["ddlGenSundayEndTimeCreate"];
$addHrsFWMonFriStart = $_POST["ddlAddFullWeekStartTimeCreate"];
$addHrsFWMonFriEnd = $_POST["ddlAddFullWeekEndTimeCreate"];
$addHrsFWSatStart = $_POST["ddlAddFullWeekSatStartTimeCreate"];
$addHrsFWSatEnd = $_POST["ddlAddFullWeekSatEndTimeCreate"];
$addHrsFWSunStart = $_POST["ddlAddFullWeekSunStartTimeCreate"];
$addHrsFWSunEnd = $_POST["ddlAddFullWeekSunEndTimeCreate"];
$addHrsMonStart = $_POST["ddlAddMondayStartTimeCreate"];
$addHrsMonEnd = $_POST["ddlAddMondayEndTimeCreate"];
$addHrsTuesStart = $_POST["ddlAddTuesdayStartTimeCreate"];
$addHrsTuesEnd = $_POST["ddlAddTuesdayEndTimeCreate"];
$addHrsWedStart = $_POST["ddlAddWednesdayStartTimeCreate"];
$addHrsWedEnd = $_POST["ddlAddWednesdayEndTimeCreate"];
$addHrsThurStart = $_POST["ddlAddThursdayStartTimeCreate"];
$addHrsThurEnd = $_POST["ddlAddThursdayEndTimeCreate"];
$addHrsFriStart = $_POST["ddlAddFridayStartTimeCreate"];
$addHrsFriEnd = $_POST["ddlAddFridayEndTimeCreate"];
$addHrsSatStart = $_POST["ddlAddSaturdayStartTimeCreate"];
$addHrsSatEnd = $_POST["ddlAddSaturdayEndTimeCreate"];
$addHrsSunStart = $_POST["ddlAddSundayStartTimeCreate"];
$addHrsSunEnd = $_POST["ddlAddSundayEndTimeCreate"];
$reasonforAdditional = $_POST["txtReasonForAdditionalCreate"];

/********************************************* 
 * Resources Offered
*********************************************/

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

/********************************************* 
 * Additional Considerations
*********************************************/

$isFree = $_POST["cbFreeCreate"];
$associatedFee = $_POST["txtAssociatedFeeCreate"];
$associatedFaith = $_POST["txtFaithCreate"];
$membership = $_POST["cbMembershipCreate"];
$membershipDesc = $_POST["txtMembershipCreate"];
$training = $_POST["cbTrainingCreate"];
$trainingDesc = $_POST["txtTrainingCreate"];
$application = $_POST["cbApplicationCreate"];
$applicationDesc = $_POST["txtApplicationCreate"];
$restrictions = $_POST["cbRestrictionCreate"];
$restrictionsDesc = $_POST["txtRestrictionCreate"];

/********************************************* 
 * Demographics Served
*********************************************/

$male = $_POST["cbMaleCreate"];
$female = $_POST["cbFemaleCreate"];
$transgender = $_POST["cbTransgenderCreate"];
$infantToddler = $_POST["cbInfantToddlerCreate"];
$children = $_POST["cbChildremCreate"];
$youthYoungAdults = $_POST["cbYouthYoungAdultsCreate"];
$adults = $_POST["cbAdultsCreate"];
$domesticBorn = $_POST["cbDomesticBornCreate"];
$foreignBorn = $_POST["cbForeignBornCreate"];
$undocumented = $_POST["cbUndocumentedCreate"];
$white = $_POST["cbWhiteCreate"];
$black = $_POST["cbBlackCreate"];
$asian = $_POST["cbAsianCreate"];
$islander = $_POST["cbIslandCreate"];
$hispanic = $_POST["cbHispanicCreate"];
$nonHispanic = $_POST["cbNonHispanicCreate"];

/********************************************* 
 * Notes
*********************************************/

$notes = $_POST["txtNotesCreate"];
$confidentialNotes = $_POST["txtConfidentialNotesCreate"];

$dbConn = db_connect();
$true = 1;
$false = 0;

/********************************************* 
 * Insert Into Organizations
*********************************************/

// find the umbrella agency for this organization
if ($queryForAgencyID = $dbConn->prepare("SELECT OrgID FROM Organizations WHERE OrgName = ?"))
{
    $queryForAgencyID->bind_param("s", $program);
    if ($queryForAgencyID->execute())
    {
        echo "OrgID query success";
        $queryForAgencyID->store_result();
        $queryForAgencyID->bind_result($agencyID);
        $queryForAgencyID->close();
    }
}

// find the faithID(s) assoociated with this organization
if ($queryForFaithID = $dbConn->prepare("SELECT FaithID FROM FaithTypes WHERE FaithType = ?"))
{
    $queryForFaithID->bind_param("s", $associatedFaith);
    if ($queryForFaithID->execute())
    {
        echo "FaithID query success";
        $queryForFaithID->store_result();
        $queryForFaithID->bind_result($faithID);
        $queryForFaithID->close();
    }
}

if ($insertOrganizations = $dbConn->prepare("INSERT INTO htResourceHub.Organizations 
                                  (OrgName, AgencyID, ProgramStatement, WebLink, Email, PhoneNum, HotlineNum, ConfNum, isShelter, isTransitionalHousing, isAssistanceLocatingHousing, Fees, FaithID, Notes, ConfNotes, isConf) 
                                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"))
{
    if ($insertOrganizations->bind_param("sissssssiiidissi", $name, $agancyID, $missionStatement, $website, $email, $mainPhone, $hotlineNumber, $confidentialPhoneNumber, $Shelter, $TransitionalHousing, $AssistanceInLocatingHousing, $associatedFee, $faithID, $notes, $confidentialNotes, $isConfidential))
    {
        echo "insertOrgs bind_param: success";
        if ($insertOrganizations->execute())
        {
            
            echo "Insert into Orgs success";
            $insertOrganizations->close();
        }
        else
        {
            echo "Insert into Orgs failure";
        }
    }
    else
    {
        echo "insertOrgs bind_param: failure";
    }
                                 
}
                                  
/********************************************* 
 * Insert Into Addresses
*********************************************/

if ($queryForOrgID = $dbConn->prepare("SELECT OrgID FROM htResourceHub.Organizations WHERE OrgName = ?"))
{
    $queryForOrgID->bind_param("s", $name);
    $queryForOrgID->execute();
    $queryForOrgID->store_result();
    $queryForOrgID->bind_result($orgID);
}

if ($insertAddresses1 = $dbConn->prepare("INSERT INTO htResourceHub.Addresses
                                    (OrgID, StreetInfo, City, ZipCode, County, StateID, IsConf)
                                    VALUES (?, ?, ?, ?, ?, ?, ?)"))
{
    $insertAddresses1->bind_param("issssii", $orgID, $address1Street, $address1Cty, $address1Zip, $address1County, $address1State, $false);
    $insertAddresses1->execute();
    $insertAddresses1->close();
}

if ($insertAddresses2 = $dbConn->prepare("INSERT INTO htResourceHub.Addresses
                                    (OrgID, StreetInfo, City, ZipCode, County, StateID, IsConf)
                                    VALUES (?, ?, ?, ?, ?, ?, ?)"))
{
    $insertAddresses2->bind_param("issssii", $orgID, $address2Street, $address2City, $address2Zip, $address2County, $address2State, $false);
    $insertAddresses2->execute();
    $insertAddresses2->close();
}

if ($insertAddresses3 = $dbConn->prepare("INSERT INTO htResourceHub.Addresses
                                    (OrgID, StreetInfo, City, ZipCode, County, StateID, IsConf)
                                    VALUES (?, ?, ?, ?, ?, ?, ?)"))
{
    $insertAddresses3->bind_param("issssii", $orgID, $confAddressStreet, $confAddressCity, $confAddressZip, $confAddressCounty, $confAddressState, $true);
    $insertAddresses3->execute();
    $insertAddresses3->close();
}
                          
echo "Insert INTO Addresses table: Success";
                                    
/********************************************* 
 * Insert Into Contacts
*********************************************/
if ($insertContacts = $dbConn->prepare("INSERT INTO htResourceHub.Contacts
                                    (OrgID, Email, FirstName, LastName, Position, PhoneNum, IsConf)
                                    VALUES (?, ?, ?, ?, ?, ?, ?)"))
{
    $insertContacts->bind_param("isssssi", $orgID, $primaryEmail, $primaryContactFirstName, $primaryContactLastName, $primaryContactPosition, $primaryContactPhone, $primaryContactIsConf);
    $insertContacts->execute();
    $insertContacts->close();
}

echo "Insert INTO Contacts table: Success";

/********************************************* 
 * Insert Into Requirements
*********************************************/

// find the requirement(s) associated with this organization
if ($query1ForRequirementID = $dbConn->prepare("SELECT ReqID FROM RequirementTypes WHERE ReqType = ?"))
{
    $query1ForRequirementID->bind_param("s", $membership);
    $query1ForRequirementID->execute();
    $query1ForRequirementID->store_result();
    $query1ForRequirementID->bind_result($requirementID1);
}

if ($insertRequirements1 = $dbConn->prepare("INSERT INTO htResourceHub.Requirements
                                        (OrgID, ReqID, Description)
                                        VALUES (?, ?, ?"))
{
    $insertRequirements1->bind_param("iis", $orgID, $requirementID1, $restrictionsDesc);
    $insertRequirements1->execute();
    $insertRequirements1->close();
}

if ($query2ForRequirementID = $dbConn->prepare("SELECT ReqID FROM RequirementTypes WHERE ReqType = ?"))
{
    $query2ForRequirementID->bind_param("s", $training);
    $query2ForRequirementID->execute();
    $query2ForRequirementID->store_result();
    $query2ForRequirementID->bind_result($requirementID2);
}

if ($insertRequirements2 = $dbConn->prepare("INSERT INTO htResourceHub.Requirements
                                        (OrgID, ReqID, Description)
                                        VALUES (?, ?, ?"))
{
    $insertRequirements2->bind_param("iis", $orgID, $requirementID2, $restrictionsDesc);
    $insertRequirements2->execute();
    $insertRequirements2->close();
}

if ($query3ForRequirementID = $dbConn->prepare("SELECT ReqID FROM RequirementTypes WHERE ReqType = ?"))
{
    $query3ForRequirementID->bind_param("s", $application);
    $query3ForRequirementID->execute();
    $query3ForRequirementID->store_result();
    $query3ForRequirementID->bind_result($requirementID3);
}

if ($insertRequirements3 = $dbConn->prepare("INSERT INTO htResourceHub.Requirements
                                        (OrgID, ReqID, Description)
                                        VALUES (?, ?, ?"))
{
    $insertRequirements3->bind_param("iis", $orgID, $requirementID3, $restrictionsDesc);
    $insertRequirements3->execute();
    $insertRequirements3->close();
}

if ($query4ForRequirementID = $dbConn->prepare("SELECT ReqID FROM RequirementTypes WHERE ReqType = ?"))
{
    $query4ForRequirementID->bind_param("s", $restrictions);
    $query4ForRequirementID->execute();
    $query4ForRequirementID->store_result();
    $query4ForRequirementID->bind_result($requirementID4);
    
}

if ($insertRequirements4 = $dbConn->prepare("INSERT INTO htResourceHub.Requirements
                                        (OrgID, ReqID, Description)
                                        VALUES (?, ?, ?"))
{
    $insertRequirements4->bind_param("iis", $orgID, $requirementID4, $restrictionsDesc);
    $insertRequirements4->execute();
    $insertRequirements4->close();
}

echo "Insert INTO Requirements table: Success";

/********************************************* 
 * Insert Into Gender
*********************************************/

if ($queryForGenID1 = $dbConn->prepare("SELECT GenID FROM GenderTypes WHERE GenType = ?"))
{
    $queryForGenID1->bind_param("s", $male);
    $queryForGenID1->execute();
    $queryForGenID1->store_result();
    $queryForGenID1->bind_result($genID1);
}

if ($insertGender1 = $dbConn->prepare("INSERT INTO htResourceHub.Gender
                                  (GenID, OrgID)
                                  VALUES (?, ?"))
{
    $insertGender1->bind_param("ii", $genID1, $orgID);
    $insertGender1->execute();
    $insertGender1->close();
}


if ($queryForGenID2 = $dbConn->prepare("SELECT GenID FROM GenderTypes WHERE GenType = ?"))
{
    $queryForGenID2->bind_param("s", $female);
    $queryForGenID2->execute();
    $queryForGenID2->store_result();
    $queryForGenID2->bind_result($genID2);
}

if ($insertGender2 = $dbConn->prepare("INSERT INTO htResourceHub.Gender
                                  (GenID, OrgID)
                                  VALUES (?, ?"))
{
    $insertGender2->bind_param("ii", $genID2, $orgID);
    $insertGender2->execute();
    $insertGender2->close();
}

if ($queryForGenID3 = $dbConn->prepare("SELECT GenID FROM GenderTypes WHERE GenType = ?"))
{
    $queryForGenID3->bind_param("s", $transgender);
    $queryForGenID3->execute();
    $queryForGenID3->store_result();
    $queryForGenID3->bind_result($genID3);
}

if ($insertGender3 = $dbConn->prepare("INSERT INTO htResourceHub.Gender
                                  (GenID, OrgID)
                                  VALUES (?, ?"))
{
    $insertGender3->bind_param("ii", $genID3, $orgID);
    $insertGender3->execute();
    $insertGender3->close();  
}


echo "Insert INTO Gender table: Success";

/********************************************* 
 * Insert Into Ethnicity
*********************************************/
if ($queryForEthnicityID1 = $dbConn->prepare("SELECT EthID FROM EthnicityTypes WHERE EthType = ?"))
{
    $queryForEthnicityID1->bind_param("s", $hispanic);
    $queryForEthnicityID1->execute();
    $queryForEthnicityID1->store_result();
    $queryForEthnicityID1->bind_result($ethID1);
}

if ($insertEthnicity1 = $dbConn->prepare("INSERT INTO htResourceHub.Ethnicity
                                    (EthID, OrgID)
                                    VALUES (?, ?, ?"))
{
    $insertEthnicity1->bind_param("ii", $ethID1, $orgID);
    $insertEthnicity1->execute();
    $insertEthnicity1->close();
}

if ($queryForEthnicityID2 = $dbConn->prepare("SELECT EthID FROM EthnicityTypes WHERE EthType = ?"))
{
    $queryForEthnicityID2->bind_param("s", $nonHispanic);
    $queryForEthnicityID2->execute();
    $queryForEthnicityID2->store_result();
    $queryForEthnicityID2->bind_result($ethID2);
}

if ($insertEthnicity2 = $dbConn->prepare("INSERT INTO htResourceHub.Ethnicity
                                    (EthID, OrgID)
                                    VALUES (?, ?, ?"))
{
    $insertEthnicity2->bind_param("ii", $ethID2, $orgID);
    $insertEthnicity2->execute();
    $insertEthnicity2->close();
}
                          
echo "Insert INTO Ethnicity table: Success";

/********************************************* 
 * Insert Into Age
*********************************************/

if ($queryForAgeID1 = $dbConn->prepare("SELECT AgeID FROM AgeTypes WHERE AgeType = ?"))
{
    $queryForAgeID1->bind_param("s", $infantToddler);
    $queryForAgeID1->execute();
    $queryForAgeID1->store_result();
    $queryForAgeID1->bind_result($ageID1);
}

if ($insertAge1 = $dbConn->prepare("INSERT INTO htResourceHub.Age
                               (AgeID, OrgID)
                               VALUES (?, ?"))
{
    $insertAge1->bind_param("ii", $ageID1, $orgID);
    $insertAge1->execute();
    $insertAge1->close();
}

if ($queryForAgeID2 = $dbConn->prepare("SELECT AgeID FROM AgeTypes WHERE AgeType = ?"))
{
    $queryForAgeID2->bind_param("s", $children);
    $queryForAgeID2->execute();
    $queryForAgeID2->store_result();
    $queryForAgeID2->bind_result($ageID2);
}

if ($insertAge2 = $dbConn->prepare("INSERT INTO htResourceHub.Age
                               (AgeID, OrgID)
                               VALUES (?, ?"))
{
    $insertAge2->bind_param("ii", $ageID2, $orgID);
    $insertAge2->execute();
    $insertAge2->close();
}
                              
if ($queryForAgeID3 = $dbConn->prepare("SELECT AgeID FROM AgeTypes WHERE AgeType = ?"))
{
    $queryForAgeID3->bind_param("s", $youthYoungAdults);
    $queryForAgeID3->execute();
    $queryForAgeID3->store_result();
    $queryForAgeID3->bind_result($ageID3);
}

if ($insertAge3 = $dbConn->prepare("INSERT INTO htResourceHub.Age
                               (AgeID, OrgID)
                               VALUES (?, ?"))
{
    $insertAge3->bind_param("ii", $ageID3, $orgID);
    $insertAge3->execute();
    $insertAge3->close();
}

if ($queryForAgeID4 = $dbConn->prepare("SELECT AgeID FROM AgeTypes WHERE AgeType = ?"))
{
    $queryForAgeID4->bind_param("s", $adults);
    $queryForAgeID4->execute();
    $queryForAgeID4->store_result();
    $queryForAgeID4->bind_result($ageID4);
}

if ($insertAge4 = $dbConn->prepare("INSERT INTO htResourceHub.Age
                               (AgeID, OrgID)
                               VALUES (?, ?"))
{
    $insertAge4->bind_param("ii", $ageID4, $orgID);
    $insertAge4->execute();
    $insertAge4->close();
}

echo "Insert INTO Age table: Success";

/********************************************* 
 * Insert Into Nationality
*********************************************/

if ($queryForNatID1 = $dbConn->prepare("SELECT NatID FROM NationalityTypes WHERE NatType = ?"))
{
    $queryForNatID1->bind_param("s", $domesticBorn);
    $queryForNatID1->execute();
    $queryForNatID1->store_result();
    $queryForNatID1->bind_result($natID1);
}

if ($insertNationality1 = $dbConn->prepare("INSERT INTO htResourceHub.Nationality
                                       (NatID, OrgID)
                                       VALUES (?, ?"))
{
    $insertNationality1->bind_param("ii", $natID1, $orgID);
    $insertNationality1->execute();
    $insertNationality1->close();
}

if ($queryForNatID2 = $dbConn->prepare("SELECT NatID FROM NationalityTypes WHERE NatType = ?"))
{
    $queryForNatID2->bind_param("s", $foreignBorn);
    $queryForNatID2->execute();
    $queryForNatID2->store_result();
    $queryForNatID2->bind_result($natID2);
}

if ($insertNationality2 = $dbConn->prepare("INSERT INTO htResourceHub.Nationality
                                       (NatID, OrgID)
                                       VALUES (?, ?"))
{
    $insertNationality2->bind_param("ii", $natID2, $orgID);
    $insertNationality2->execute();
    $insertNationality2->close();
}

if ($queryForNatID3 = $dbConn->prepare("SELECT NatID FROM NationalityTypes WHERE NatType = ?"))
{
    $queryForNatID3->bind_param("s", $undocumented);
    $queryForNatID3->execute();
    $queryForNatID3->store_result();
    $queryForNatID3->bind_result($natID3);
}

if ($insertNationality3 = $dbConn->prepare("INSERT INTO htResourceHub.Nationality
                                       (NatID, OrgID)
                                       VALUES (?, ?"))
{
    $insertNationality3->bind_param("ii", $natID3, $orgID);
    $insertNationality3->execute();
    $insertNationality3->close();
}

echo "Insert INTO Nationality table: Success";

/********************************************* 
 * Insert Into Race
*********************************************/

if ($queryForRaceID1 = $dbConn->prepare("SELECT RaceID FROM RaceTypes WHERE RaceType = ?"))
{
    $queryForRaceID1->bind_param("s", $white);
    $queryForRaceID1->execute();
    $queryForRaceID1->store_result();
    $queryForRaceID1->bind_result($raceID1);
}
                                        
if ($insertRace1 = $dbConn->prepare("INSERT INTO htResourceHub.Race
                                (RaceID, OrgID)
                                VALUES (?, ?, ?"))
{
    $insertRace1->bind_param("ii", $raceID1, $orgID);
    $insertRace1->execute();
    $insertRace1->close();
}

if ($queryForRaceID2 = $dbConn->prepare("SELECT RaceID FROM RaceTypes WHERE RaceType = ?"))
{
    $queryForRaceID2->bind_param("s", $black);
    $queryForRaceID2->execute();
    $queryForRaceID2->store_result();
    $queryForRaceID2->bind_result($raceID2);
}
                                        
if ($insertRace2 = $dbConn->prepare("INSERT INTO htResourceHub.Race
                                (RaceID, OrgID)
                                VALUES (?, ?, ?"))
{
    $insertRace2->bind_param("ii", $raceID2, $orgID);
    $insertRace2->execute();
    $insertRace2->close();
}

if ($queryForRaceID3 = $dbConn->prepare("SELECT RaceID FROM RaceTypes WHERE RaceType = ?"))
{
    $queryForRaceID3->bind_param("s", $asian);
    $queryForRaceID3->execute();
    $queryForRaceID3->store_result();
    $queryForRaceID3->bind_result($raceID3);
}
                                        
if ($insertRace3 = $dbConn->prepare("INSERT INTO htResourceHub.Race
                                (RaceID, OrgID)
                                VALUES (?, ?, ?"))
{
    $insertRace3->bind_param("ii", $raceID3, $orgID);
    $insertRace3->execute();
    $insertRace3->close();
}

if ($queryForRaceID4 = $dbConn->prepare("SELECT RaceID FROM RaceTypes WHERE RaceType = ?"))
{
    $queryForRaceID4->bind_param("s", $islander);
    $queryForRaceID4->execute();
    $queryForRaceID4->store_result();
    $queryForRaceID4->bind_result($raceID4);
}
                                        
if ($insertRace4 = $dbConn->prepare("INSERT INTO htResourceHub.Race
                                (RaceID, OrgID)
                                VALUES (?, ?, ?"))
{
    $insertRace4->bind_param("ii", $raceID4, $orgID);
    $insertRace4->execute();
    $insertRace4->close();
}
                                
echo "Insert INTO Race table: Success";

/********************************************* 
 * Insert Into Service
*********************************************/

$clothing = "Clothing";
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

if ($queryForSerID1 = $dbConn->prepare("SELECT SerID FROM ServiceTypes WHERE SerType = ?"))
{
    $queryForSerID1->bind_param("s", $clothing);
    $queryForSerID1->execute();
    $queryForSerID1->store_result();
    $queryForSerID1->bind_result($serID1);
}

if ($insertService1 = $dbConn->prepare("INSERT INTO htResourceHub.Service
                                   (OrgID, SerID, Service, Supply, Emergency, SerDesc)
                                   VALUES (?, ?, ?, ?, ?, ?"))
{
    $insertService1->bind_param("iiiiis", $orgID, $serID1, $clothingService, $clothingSupply, $clothingEmergResp, $clothingDesc);
    $insertService1->execute();
    $insertService1->close();
}

if ($queryForSerID2 = $dbConn->prepare("SELECT SerID FROM ServiceTypes WHERE SerType = ?"))
{
    $queryForSerID2->bind_param("s", $food);
    $queryForSerID2->execute();
    $queryForSerID2->store_result();
    $queryForSerID2->bind_result($serID2);
}

if ($insertService2 = $dbConn->prepare("INSERT INTO htResourceHub.Service
                                   (OrgID, SerID, Service, Supply, Emergency, SerDesc)
                                   VALUES (?, ?, ?, ?, ?, ?"))
{
    $insertService2->bind_param("iiiiis", $orgID, $serID2, $foodService, $foodSupply, $foodEmergResp, $foodDesc);
    $insertService2->execute();
    $insertService2->close();
}

if ($queryForSerID3 = $dbConn->prepare("SELECT SerID FROM ServiceTypes WHERE SerType = ?"))
{
    $queryForSerID3->bind_param("s", $employment);
    $queryForSerID3->execute();
    $queryForSerID3->store_result();
    $queryForSerID3->bind_result($serID3);
}

if ($insertService3 = $dbConn->prepare("INSERT INTO htResourceHub.Service
                                   (OrgID, SerID, Service, Supply, Emergency, SerDesc)
                                   VALUES (?, ?, ?, ?, ?, ?"))
{
    $insertService3->bind_param("iiiiis", $orgID, $serID3, $employmentService, $employmentSupply, $employmentEmergResp, $employmentDesc);
    $insertService3->execute();
    $insertService3->close();
}

if ($queryForSerID4 = $dbConn->prepare("SELECT SerID FROM ServiceTypes WHERE SerType = ?"))
{
    $queryForSerID4->bind_param("s", $mentoring);
    $queryForSerID4->execute();
    $queryForSerID4->store_result();
    $queryForSerID4->bind_result($serID4);
}

if ($insertService4 = $dbConn->prepare("INSERT INTO htResourceHub.Service
                                   (OrgID, SerID, Service, Supply, Emergency, SerDesc)
                                   VALUES (?, ?, ?, ?, ?, ?"))
{
    $insertService4->bind_param("iiiiis", $orgID, $serID4, $mentoringService, $mentoringSupply, $mentoringEmergResp, $mentoringDesc);
    $insertService4->execute();
    $insertService4->close();
    
}
                                   
if ($queryForSerID5 = $dbConn->prepare("SELECT SerID FROM ServiceTypes WHERE SerType = ?"))
{
    $queryForSerID5->bind_param("s", $counseling);
    $queryForSerID5->execute();
    $queryForSerID5->store_result();
    $queryForSerID5->bind_result($serID5);
}

if ($insertService5 = $dbConn->prepare("INSERT INTO htResourceHub.Service
                                   (OrgID, SerID, Service, Supply, Emergency, SerDesc)
                                   VALUES (?, ?, ?, ?, ?, ?"))
{
    $insertService5->bind_param("iiiiis", $orgID, $serID5, $counselingTherapyService, $counselingTherapySupply, $counselingTherapyEmergResp, $counselingTherapyDesc);
    $insertService5->execute();
    $insertService5->close();
}

if ($queryForSerID6 = $dbConn->prepare("SELECT SerID FROM ServiceTypes WHERE SerType = ?"))
{
    $queryForSerID6->bind_param("s", $pregnancy);
    $queryForSerID6->execute();
    $queryForSerID6->store_result();
    $queryForSerID6->bind_result($serID6);
}

if ($insertService6 = $dbConn->prepare("INSERT INTO htResourceHub.Service
                                   (OrgID, SerID, Service, Supply, Emergency, SerDesc)
                                   VALUES (?, ?, ?, ?, ?, ?"))
{
    $insertService6->bind_param("iiiiis", $orgID, $serID6, $pregnancyService, $pregnancySupply, $pregnancyEmergResp, $pregnancyDesc);
    $insertService6->execute();
    $insertService6->close();
}

if ($queryForSerID7 = $dbConn->prepare("SELECT SerID FROM ServiceTypes WHERE SerType = ?"))
{
    $queryForSerID7->bind_param("s", $medical);
    $queryForSerID7->execute();
    $queryForSerID7->store_result();
    $queryForSerID7->bind_result($serID7);
}

if ($insertService7 = $dbConn->prepare("INSERT INTO htResourceHub.Service
                                   (OrgID, SerID, Service, Supply, Emergency, SerDesc)
                                   VALUES (?, ?, ?, ?, ?, ?"))
{
    $insertService7->bind_param("iiiiis", $serID7, $medicalService, $medicalSupply, $medicalEmergResp, $medicalDesc);
    $insertService7->execute();
    $insertService7->close();
}

if ($queryForSerID8 = $dbConn->prepare("SELECT SerID FROM ServiceTypes WHERE SerType = ?"))
{
    $queryForSerID8->bind_param("s", $legal);
    $queryForSerID8->execute();
    $queryForSerID8->store_result();
    $queryForSerID8->bind_result($serID8);
}

if ($insertService8 = $dbConn->prepare("INSERT INTO htResourceHub.Service
                                   (OrgID, SerID, Service, Supply, Emergency, SerDesc)
                                   VALUES (?, ?, ?, ?, ?, ?"))
{
    $insertService8->bind_param("iiiiis", $orgID, $serID8, $legalService, $legalSupply, $legalEmergResp, $legalDesc);
    $insertService8->execute();
    $insertService8->close();
}

if ($queryForSerID9 = $dbConn->prepare("SELECT SerID FROM ServiceTypes WHERE SerType = ?"))
{
    $queryForSerID9->bind_param("s", $governmental);
    $queryForSerID9->execute();
    $queryForSerID9->store_result();
    $queryForSerID9->bind_result($serID9);
    
}

if ($insertService9 = $dbConn->prepare("INSERT INTO htResourceHub.Service
                                   (OrgID, SerID, Service, Supply, Emergency, SerDesc)
                                   VALUES (?, ?, ?, ?, ?, ?"))
{
    $insertService9->bind_param("iiiiis", $orgID, $serID9, $govService, $govSupply, $govEmergResp, $govDesc);
    $insertService9->execute();
    $insertService9->close();
}
                                   

if ($queryForSerID10 = $dbConn->prepare("SELECT SerID FROM ServiceTypes WHERE SerType = ?"))
{
    $queryForSerID10->bind_param("s", $investigation);
    $queryForSerID10->execute();
    $queryForSerID10->store_result();
    $queryForSerID10->bind_result($serID10);
}

if ($insertService10 = $dbConn->prepare("INSERT INTO htResourceHub.Service
                                   (OrgID, SerID, Service, Supply, Emergency, SerDesc)
                                   VALUES (?, ?, ?, ?, ?, ?"))
{
    $insertService10->bind_param("iiiiis", $orgID, $serID10, $investigationService, $investigationSupply, $investigationEmergResp, $investigationDesc);
    $insertService10->execute();
    $insertService10->close();
}

if ($queryForSerID11 = $dbConn->prepare("SELECT SerID FROM ServiceTypes WHERE SerType = ?"))
{
    $queryForSerID11->bind_param("s", $fosterCare);
    $queryForSerID11->execute();
    $queryForSerID11->store_result();
    $queryForSerID11->bind_result($serID11);
}

if ($insertService11 = $dbConn->prepare("INSERT INTO htResourceHub.Service
                                   (OrgID, SerID, Service, Supply, Emergency, SerDesc)
                                   VALUES (?, ?, ?, ?, ?, ?"))
{
    $insertService11->bind_param("iiiiis", $orgID, $serID11, $fosterCareService, $fosterCareSupply, $fosterCareEmergResp, $fosterCareDesc);
    $insertService11->execute();
    $insertService11->close();
}

if ($queryForSerID12 = $dbConn->prepare("SELECT SerID FROM ServiceTypes WHERE SerType = ?"))
{
    $queryForSerID12->bind_param("s", $awareness);
    $queryForSerID12->execute(); 
    $queryForSerID12->store_result();
    $queryForSerID12->bind_result($serID12);
}

if ($insertService12 = $dbConn->prepare("INSERT INTO htResourceHub.Service
                                   (OrgID, SerID, Service, Supply, Emergency, SerDesc)
                                   VALUES (?, ?, ?, ?, ?, ?"))
{
    $insertService12->bind_param("iiiiis", $orgID, $serID12, $awarenessEdService, $awarenessEdSupply, $awarenessEdEmergResp, $awarenessEdDesc);
    $insertService12->execute();
    $insertService12->close();
}
                                   

if ($queryForSerID13 = $dbConn->prepare("SELECT SerID FROM ServiceTypes WHERE SerType = ?"))
{
    $queryForSerID13->bind_param("s", $responseTraining);
    $queryForSerID13->execute();
    $queryForSerID13->store_result();
    $queryForSerID13->bind_result($serID13);
}

if ($insertService13 = $dbConn->prepare("INSERT INTO htResourceHub.Service
                                   (OrgID, SerID, Service, Supply, Emergency, SerDesc)
                                   VALUES (?, ?, ?, ?, ?, ?"))
{
    $insertService13->bind_param("iiiiis", $orgID, $serID13, $responseTrainingService, $responseTrainingSupply, $responseTrainingEmergResp, $responseTrainingDesc);
    $insertService13->execute();
    $insertService13->close();
}

if ($queryForSerID14 = $dbConn->prepare("SELECT SerID FROM ServiceTypes WHERE SerType = ?"))
{
    $queryForSerID14->bind_param("s", $other);
    $queryForSerID14->execute();
    $queryForSerID14->store_result();
    $queryForSerID14->bind_result($serID14);
}

if ($insertService14 = $dbConn->prepare("INSERT INTO htResourceHub.Service
                                   (OrgID, SerID, Service, Supply, Emergency, SerDesc)
                                   VALUES (?, ?, ?, ?, ?, ?"))
{
    $insertService14->bind_param("iiiiis", $orgID, $serID14, $otherService, $otherSupply, $otherEmergResp, $otherDesc);
    $insertService14->execute();
    $insertService14->close();
}

echo "Insert INTO Service table: Success";

/********************************************* 
 * Insert Into OfficeUse
*********************************************/

//TODO: figure out DateChanged field
/* 

$insertOfficeUse = $dbConn->prepare("INSERT INTO htResourceHub.OfficeUse
                                     (OrgID, DateChanged, PersonEmail, Notes)
                                     VALUES (?, ?, ?, ?");
                                     
$insertOfficeuse->bind_param("isss", $orgID, "we need a function for today's date...or something", $primaryContactEmail, $notes);
$insertOfficeUse->execute();
$insertOfficeUse->close();

echo "Insert INTO OfficeUse table: Success";

*/

/********************************************* 
 * Insert Into Hours
*********************************************/

// TODO: update hours fields on Org Info tab                                     
if ($insertHours1 = $dbConn->prepare("INSERT INTO htResourceHub.Hours
                                 (OrgID, Is24Hours, IsAdditional, MondayStart, MondayEnd, TuesdayStart, TuesdayEnd, WednesdayStart, WednesdayEnd, ThursdayStart, ThursdayEnd, FridayStart, FridayEnd, SaturdayStart, SaturdayEnd, SundayStart, SundayEnd, ReasonForAdditionalHours)
                                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?"))
{
    $insertHours1->bind_param("iiisssssssssssssss", $orgID, $is247, $false, $genHrsMonStart, $genHrsMonEnd, $genHrsTuesStart, $genHrsTuesEnd, $genHrsWedStart, $genHrsWedEnd, $genHrsThurStart, $genHrsThurEnd, $genHrsFriStart, $genHrsFriEnd, $genHrsSatStart, $genHrsSatEnd, $genHrsSunStart, $genHrsSunEnd);
    $insertHours1->execute();
    $insertHours1->close();
}

if ($insertHours2 = $dbConn->prepare("INSERT INTO htResourceHub.Hours
                                 (OrgID, Is24Hours, IsAdditional, MondayStart, MondayEnd, TuesdayStart, TuesdayEnd, WednesdayStart, WednesdayEnd, ThursdayStart, ThursdayEnd, FridayStart, FridayEnd, SaturdayStart, SaturdayEnd, SundayStart, SundayEnd, ReasonForAdditionalHours)
                                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?"))
{
    $insertHours2->bind_param("iiisssssssssssssss", $orgID, $is247, $true, $addHrsMonStart, $addHrsMonEnd, $AddHrsTuesStart, $addHrsTuesEnd, $addHrsWedStart, $addHrsWedEnd, $addHrsThurStart, $addHrsThurEnd, $addHrsFriStart, $addHrsFriEnd, $addHrsSatStart, $addHrsSatEnd, $addHrsSunStart, $addHrsSunEnd, $reasonforAdditional);
    $insertHours2->execute();
    $insertHours2->close();
}
                                 
echo "Insert INTO Hours table: Success";

?>