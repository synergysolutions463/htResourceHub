/**CREATE DATABASE htResourceHub; **/

USE htResourceHub
CREATE TABLE FaithTypes (
    FaithID SMALLINT NOT NULL AUTO_INCREMENT,
    FaithType VARCHAR(50),
    PRIMARY KEY(FaithID)
);

USE htResourceHub 
CREATE TABLE States (
    StateID SMALLINT NOT NULL AUTO_INCREMENT,
    StateName VARCHAR(20) NOT NULL,
    PRIMARY KEY(StateID)
);

USE htResourceHub
CREATE TABLE Organizations (
    OrgID INT NOT NULL AUTO_INCREMENT,
    OrgName VARCHAR(200) NOT NULL,
    AgencyID INT, 
    ProgramStatement VARCHAR(2000),
    WebLink VARCHAR(50),
    Email VARCHAR(50),
    PhoneNum VARCHAR(11),
    HotlineNum VARCHAR(11),
    ConfNum VARCHAR(11),
    isShelter TINYINT,
    isTransitionalHousing TINYINT,
    isAssistanceLocatingHousing TINYINT,
    Fees DECIMAL(7,2),
    FaithID SMALLINT,
    Notes VARCHAR(2000),
    ConfNotes VARCHAR(2000),
    isConf TINYINT,
    isApproved TINYINT,
    PRIMARY KEY(OrgID),
    FOREIGN KEY (AgencyID)
    REFERENCES Organizations(OrgID)
    ON DELETE CASCADE,
    FOREIGN KEY (FaithID)
    REFERENCES FaithTypes(FaithID)
    ON DELETE CASCADE
);

USE htResourceHub
CREATE TABLE Addresses (
    OrgID INT NOT NULL,
    StreetInfo VARCHAR(50) NOT NULL,
    City VARCHAR(50) NOT NULL,
    ZipCode VARCHAR(5) NOT NULL,.
    County VARCHAR(25), 
    StateID SMALLINT NOT NULL,
    IsConf TINYINT, 
    PRIMARY KEY(OrgID, StreetInfo),
    FOREIGN KEY (StateID)
    REFERENCES States(StateID)
    ON DELETE CASCADE,
    FOREIGN KEY (OrgID)
    REFERENCES Organizations(OrgID)
    ON DELETE CASCADE
);

USE htResourceHub
CREATE TABLE Contacts (
    OrgID INT NOT NULL, 
    Email VARCHAR(50) NOT NULL,
    FirstName VARCHAR(25),
    LastName VARCHAR(25),
    Position VARCHAR(25),
    PhoneNum VARCHAR(11),
    IsConf TINYINT, 
    PRIMARY KEY(OrgID, Email),
    FOREIGN KEY (OrgID)
    REFERENCES Organizations(OrgID)
    ON DELETE CASCADE
);


USE htResourceHub
CREATE TABLE RequirementsTypes (
    ReqID SMALLINT NOT NULL AUTO_INCREMENT,
    ReqType VARCHAR(100),
    PRIMARY KEY(ReqID)
);

USE htResourceHub
CREATE TABLE Requirements(
    OrgID INT NOT NULL,
    ReqID SMALLINT NOT NULL,
    Description VARCHAR(200),
    PRIMARY KEY(OrgID, ReqID),
    FOREIGN KEY(OrgID)
    REFERENCES Organizations(OrgID)
    ON DELETE CASCADE,
    FOREIGN KEY(ReqID)
    REFERENCES RequirementsTypes(ReqID)
    ON DELETE CASCADE
);

CREATE TABLE GenderTypes(
    GenID SMALLINT NOT NULL AUTO_INCREMENT,
    GenType VARCHAR(20),
    PRIMARY KEY(GenID)
);

CREATE TABLE Gender(
    GenID SMALLINT NOT NULL,
    OrgID INT NOT NULL,
    PRIMARY KEY(GenID, OrgID),
    FOREIGN KEY(GenID)
    REFERENCES GenderTypes(GenID)
    ON DELETE CASCADE,
    FOREIGN KEY(OrgID)
    REFERENCES Organizations(OrgID)
    ON DELETE CASCADE
);

CREATE TABLE EthnicityTypes(
    EthID SMALLINT NOT NULL AUTO_INCREMENT,
    EthType VARCHAR(50),
    PRIMARY KEY (EthID)
);

CREATE TABLE Ethnicity(
    EthID SMALLINT NOT NULL,
    OrgID INT NOT NULL,
    PRIMARY KEY(EthID, OrgID),
    FOREIGN KEY(EthID)
    REFERENCES EthnicityTypes(EthID)
    ON DELETE CASCADE,
    FOREIGN KEY(OrgID)
    REFERENCES Organizations(OrgID)
    ON DELETE CASCADE
);

USE htResourceHub
CREATE TABLE AgeTypes (
    AgeID SMALLINT NOT NULL AUTO_INCREMENT,
    AgeType VARCHAR(20) NOT NULL,
    StartAge SMALLINT, 
    EndAge SMALLINT, 
    PRIMARY KEY(AgeID)
);

USE htResourceHub
CREATE TABLE Age (
    AgeID SMALLINT NOT NULL,
    OrgID INT NOT NULL,
    PRIMARY KEY(AgeID, OrgID),
    FOREIGN KEY (AgeID)
    REFERENCES AgeTypes(AgeID)
    ON DELETE CASCADE,
    FOREIGN KEY (OrgID)
    REFERENCES Organizations(OrgID)
    ON DELETE CASCADE
);

USE htResourceHub
CREATE TABLE NationalityTypes (
    NatID SMALLINT NOT NULL AUTO_INCREMENT,
    NatType VARCHAR(20) NOT NULL,
    PRIMARY KEY(NatID)
);

USE htResourceHub
CREATE TABLE Nationality (
    NatID SMALLINT NOT NULL,
    OrgID INT NOT NULL, 
    PRIMARY KEY(NatID, OrgID),
    FOREIGN KEY (NatID)
    REFERENCES NationalityTypes(NatID)
    ON DELETE CASCADE,
    FOREIGN KEY (OrgID)
    REFERENCES Organizations(OrgID)
    ON DELETE CASCADE
);

USE htResourceHub
CREATE TABLE RaceTypes (
    RaceID SMALLINT NOT NULL AUTO_INCREMENT,
    RaceType VARCHAR(50) NOT NULL,
    PRIMARY KEY(RaceID)
);

USE htResourceHub
CREATE TABLE Race (
    RaceID SMALLINT NOT NULL,
    OrgID INT NOT NULL,
    PRIMARY KEY(RaceID, OrgID),
    FOREIGN KEY (RaceID)
    REFERENCES RaceTypes(RaceID)
    ON DELETE CASCADE,
    FOREIGN KEY (OrgID)
    REFERENCES Organizations(OrgID)
    ON DELETE CASCADE
);

USE htResourceHub
CREATE TABLE ServiceTypes (
    SerID SMALLINT NOT NULL AUTO_INCREMENT,
    SerType VARCHAR(20),
    PRIMARY KEY (SerID)
);


USE htResourceHub
CREATE TABLE Service (
    OrgID INT NOT NULL,
    SerID SMALLINT NOT NULL,
    Service TINYINT,
    Supply TINYINT,
    Emergency TINYINT,
    SerDesc VARCHAR(200),
    PRIMARY KEY(OrgID, SerID),
    FOREIGN KEY(SerID)
    REFERENCES ServiceTypes(SerID)
    ON DELETE CASCADE,
    FOREIGN KEY(OrgID)
    REFERENCES Organizations(OrgID)
    ON DELETE CASCADE
); 

USE htResourceHub
CREATE TABLE OfficeUse (
    OrgID INT NOT NULL,
    DateChanged DATETIME, 
    PersonEmail VARCHAR(50),
    Notes VARCHAR(200),
    PRIMARY KEY(OrgID, DateChanged),
    FOREIGN KEY(OrgID)
    REFERENCES Organizations(OrgID)
    ON DELETE CASCADE
);


CREATE TABLE Hours (
    OrgID INT NOT NULL,
    Is24Hours SMALLINT,
    IsAdditional SMALLINT, 
    MondayStart VARCHAR(10),
    MondayEnd VARCHAR(10),
    TuesdayStart VARCHAR(10),
    TuesdayEnd VARCHAR(10),
    WednesdayStart VARCHAR(10),
    WednesdayEnd VARCHAR(10),
    ThursdayStart VARCHAR(10),
    ThursdayEnd VARCHAR(10),
    FridayStart VARCHAR(10),
    FridayEnd VARCHAR(10),
    SaturdayStart VARCHAR(10),
    SaturdayEnd VARCHAR(10),
    SundayStart VARCHAR(10),
    SundayEnd VARCHAR(10),
    ReasonForAdditionalHours VARCHAR(100)
);

USE htResourceHub
CREATE TABLE Login ( 
    username VARCHAR(15) NOT NULL,
    password VARCHAR(20) NOT NULL, 
    PRIMARY KEY(username)
);