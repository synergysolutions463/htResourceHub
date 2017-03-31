/* Selects all of the information from the org */
SELECT o.OrgID, o.PhoneNum, o.HotlineNum, o.WebLink,
    o.email, o.isShelter, a.StreetInfo, a.City, a.ZipCode, a.IsConf, 
    st.StateName, GROUP_CONCAT(sert.SerType) AS SerType
    FROM Organizations o JOIN Addresses a ON (o.OrgID = a.OrgID)
    JOIN States st ON (st.StateID = a.StateID)
    JOIN Service se ON (se.OrgId = o.OrgId)
    JOIN ServiceTypes sert ON (sert.SerID = se.SerID)
    WHERE (o.OrgID = 1)
    GROUP BY o.OrgID;
    
    
/* Searches for specific services */
SELECT Service.OrgID
FROM Service
WHERE Service.SerID=7
AND Service.OrgID IN
   (SELECT Service.orgID
    FROM Service
    WHERE Service.SerID=3)
AND Service.OrgID IN
	(SELECT Service.orgID
	FROM Service
	WHERE Service.SerID=5);

/* Searches for Shelter housing */
SELECT Organizations.OrgID
FROM Organizations
WHERE Organizations.isShelter=1;

/* Searh for Assistance in Housing */
SELECT Organizations.OrgID
FROM Organizations
WHERE Organizations.isTransitionalHousing=1;;

/* Search for Transitional Housing */
SELECT Organizations.OrgID
FROM Organizations
WHERE Organizations.isTransitionalHousing=1;


/* Searches for specific gender */
SELECT Gender.OrgID
FROM Gender
WHERE Gender.GenID=1
AND Gender.OrgID IN
   (SELECT Gender.orgID
    FROM Gender
    WHERE Gender.GenID=2)
AND Gender.OrgID IN
	(SELECT Gender.orgID
	FROM Gender
	WHERE Gender.GenID=3);
AND Gender.OrgID IN
	(SELECT Gender.orgID
	FROM Gender
	WHERE Gender.GenID=4);
	
$queryString = "SELECT Gender.OrgID FROM Gender WHERE Gender.GenID = 1";
     
     if ($male == "true") {
         $queryString = $queryString . " AND Gender.OrgID IN (SELECT Gender.orgID FROM Gender WHERE Gender.GenID=2)";
     }
      
     if ($female == "true") {
         $queryString = $queryString . " AND Gender.OrgID IN (SELECT Gender.orgID FROM Gender WHERE Gender.GenID=3)";
     }
      
	 if ($transMale == "true") {
         $queryString = $queryString . " AND Gender.OrgID IN (SELECT Gender.orgID FROM Gender WHERE Gender.GenID=4)";
     }
      
	 if ($transFemale == "true") {
         $queryString = $queryString . " AND Gender.OrgID IN (SELECT Gender.orgID FROM Gender WHERE Gender.GenID=5)";
     }
     
	 $queryString = $queryString . ";";
	
	
/* Searches for specific nationality */
SELECT Nationality.OrgID
FROM Nationality
WHERE Nationality.NatID=1
AND Nationality.OrgID IN
   (SELECT Nationality.orgID
    FROM Nationality
    WHERE Nationality.NatID=2)
AND Nationality.OrgID IN
	(SELECT Nationality.orgID
	FROM Nationality
	WHERE Nationality.NatID=3);
	
$queryString = "SELECT Nationality.OrgID FROM Nationality WHERE Nationality.NatID = 1";

if ($domesticBorn == "true") {
    $queryString = $queryString . " AND Nationality.OrgID IN (SELECT Nationality.orgID FROM Nationality WHERE Nationality.NatID=2)";
}
 
if ($foreignBorn == "true") {
    $queryString = $queryString . " AND Nationality.OrgID IN (SELECT Nationality.orgID FROM Nationality WHERE Nationality.NatID=3)";
}
 
if ($undocumented == "true") {
    $queryString = $queryString . " AND Nationality.OrgID IN (SELECT Nationality.orgID FROM Nationality WHERE Nationality.NatID=4)";
}

$queryString = $queryString . ";";


/* Searches for specific ages */
SELECT Age.OrgID
FROM Age
WHERE Age.AgeID=1
AND Age.OrgID IN
   (SELECT Age.orgID
    FROM Age
    WHERE Age.AgeID=2)
AND Age.OrgID IN
	(SELECT Age.orgID
	FROM Age
	WHERE Age.AgeID=3);
	
	
$queryString = "SELECT Age.OrgID FROM Age WHERE Age.AgeID = 1";
     
     if ($Infant == "true") {
         $queryString = $queryString . " AND Age.OrgID IN (SELECT Age.orgID FROM Age WHERE Age.AgeID=2)";
     }
      
     if ($Children == "true") {
         $queryString = $queryString . " AND Age.OrgID IN (SELECT Age.orgID FROM Age WHERE Age.AgeID=3)";
     }
      
	 if ($Youth == "true") {
         $queryString = $queryString . " AND Age.OrgID IN (SELECT Age.orgID FROM Age WHERE Age.AgeID=4)";
     }
      
	 if ($Adult == "true") {
         $queryString = $queryString . " AND Age.OrgID IN (SELECT Age.orgID FROM Age WHERE Age.AgeID=5)";
     }
     
	 $queryString = $queryString . ";";


Queries with ORG ID
 SELECT Nationality.OrgID 
 FROM Nationality 
 WHERE Nationality.NatID = 1 
	 AND Nationality.OrgID IN (SELECT Nationality.orgID FROM Nationality WHERE Nationality.NatID=2)
	 	 AND Nationality.OrgID = 1
	 	 AND Nationality.OrgID = 2;
	

	
SELECT Nationality.OrgID
FROM Nationality
WHERE Nationality.NatID=1
AND (Nationality.OrgID = 1 OR Nationality.OrgID = 2)
AND Nationality.OrgID IN
   (SELECT Nationality.OrgID
    FROM Nationality
    WHERE Nationality.NatID=1)
AND Nationality.OrgID IN
	(SELECT Nationality.OrgID
	FROM Nationality
	WHERE Nationality.NatID=2);


/* Selects all of the info needed for the full org info page */
SELECT o.OrgID, o.OrgName, o.AgencyName, o.PhoneNum, o.phoneExt,
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
WHERE (o.OrgID = 1);

SELECT o.OrgID, o.OrgName, o.AgencyName, o.PhoneNum, o.phoneExt,
	o.HotlineNum, o.ConfNum, o.confPhoneExt, o.WebLink, o.email, o.ProgramStatement, 
	o.isShelter, o.isTransitionalHousing, o.isAssistanceLocatingHousing,
	o.Fees, o.FaithID, o.Notes, o.ConfNotes, o.isConf, ft.FaithType,
	GROUP_CONCAT(a.StreetInfo), GROUP_CONCAT(a.City), GROUP_CONCAT(a.ZipCode), a.IsConf, GROUP_CONCAT(States.StateName),
	c.FirstName, c.LastName, c.Email, c.Position, c.PhoneNum, c.IsConf, c.phoneExt,
	GROUP_CONCAT(AgeTypes.AgeType), GROUP_CONCAT(rt.RaceType), GROUP_CONCAT(nt.NatType), GROUP_CONCAT(et.EthType),
	GROUP_CONCAT(h.Is24Hours), GROUP_CONCAT(h.IsAdditional), GROUP_CONCAT(h.MondayStart), GROUP_CONCAT(h.MondayEnd), GROUP_CONCAT(h.TuesdayStart), GROUP_CONCAT(h.TuesdayEnd),
	GROUP_CONCAT(h.WednesdayStart), GROUP_CONCAT(h.WednesdayEnd), GROUP_CONCAT(h.ThursdayStart), GROUP_CONCAT(h.ThursdayEnd), GROUP_CONCAT(h.FridayStart),
	GROUP_CONCAT(h.FridayEnd), GROUP_CONCAT(h.SaturdayStart), GROUP_CONCAT(h.SaturdayEnd), GROUP_CONCAT(h.SundayStart), GROUP_CONCAT(h.SundayEnd), GROUP_CONCAT(h.ReasonForAdditionalHours),
	GROUP_CONCAT(reqt.ReqType), GROUP_CONCAT(req.Description),
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
WHERE (o.OrgID = 170);

SELECT StateName
FROM Organizations o
JOIN Addresses ON (o.OrgID = Addresses.OrgID)
JOIN States ON (Addresses.StateID = States.StateID)
WHERE o.OrgID = 1;