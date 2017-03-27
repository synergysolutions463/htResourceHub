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