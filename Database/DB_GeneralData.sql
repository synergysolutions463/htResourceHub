/**  Service Types Inserts **/
INSERT INTO ServiceTypes (SerType) VALUES ("Clothing");
INSERT INTO ServiceTypes (SerType) VALUES ("Food");
INSERT INTO ServiceTypes (SerType) VALUES ("Employment");
INSERT INTO ServiceTypes (SerType) VALUES ("Mentoring");
INSERT INTO ServiceTypes (SerType) VALUES ("Counseling/Therapy");
INSERT INTO ServiceTypes (SerType) VALUES ("Pregnancy");
INSERT INTO ServiceTypes (SerType) VALUES ("Medical");
INSERT INTO ServiceTypes (SerType) VALUES ("Legal");
INSERT INTO ServiceTypes (SerType) VALUES ("Governmental");
INSERT INTO ServiceTypes (SerType) VALUES ("Investigation");
INSERT INTO ServiceTypes (SerType) VALUES ("Foster Care");
INSERT INTO ServiceTypes (SerType) VALUES ("Awareness/Education");
INSERT INTO ServiceTypes (SerType) VALUES ("Response Training");
INSERT INTO ServiceTypes (SerType) VALUES ("Substance Abuse");
INSERT INTO ServiceTypes (SerType) VALUES ("Advocacy")
INSERT INTO ServiceTypes (SerType) VALUES ("Other");
INSERT INTO ServiceTypes (SerType) VALUES ("None");

/** Faith Types Inserts **/
INSERT into FaithTypes (FaithType) VALUES ("All");
INSERT into FaithTypes (FaithType) VALUES ("Christianity");
INSERT into FaithTypes (FaithType) VALUES ("Islam");
INSERT into FaithTypes (FaithType) VALUES ("Catholicism");
INSERT into FaithTypes (FaithType) VALUES ("Hinduism");
INSERT into FaithTypes (FaithType) VALUES ("Agnosticism");

/** Requirements Types Inserts **/
INSERT INTO RequirementsTypes (ReqType) VALUES ('Some or All Services Restricted to Existing Clients');
INSERT INTO RequirementsTypes (ReqType) VALUES ('Training');
INSERT INTO RequirementsTypes (ReqType) VALUES ('Application');
INSERT INTO RequirementsTypes (ReqType) VALUES ('Possible Waiting List/Referral Required/Other Entry Restrictions');
INSERT INTO RequirementsTypes (ReqType) VALUES ('None');

/** Gender Types Inserts **/
INSERT INTO GenderTypes (GenType) VALUES ('All');
INSERT INTO GenderTypes (GenType) VALUES ('Male');
INSERT INTO GenderTypes (GenType) VALUES ('Female');
INSERT INTO GenderTypes (GenType) VALUES ('Transgender');

/** Ethnicity Types Inserts --- http://www.iowadatacenter.org/aboutdata/raceclassification I used this for the races, ethnicities are there too **/
INSERT INTO EthnicityTypes (EthType) VALUES ('All');
INSERT INTO EthnicityTypes (EthType) VALUES ('Non-Latino/Hispanic');
INSERT INTO EthnicityTypes (EthType) VALUES ('Latino/Hispanic');

/** Age Types Inserts **/  
INSERT INTO AgeTypes (AgeType, StartAge, EndAge) VALUES ('All', 0, 150);
INSERT INTO AgeTypes (AgeType, StartAge, EndAge) VALUES ('Infants/Toddlers', 0, 4);
INSERT INTO AgeTypes (AgeType, StartAge, EndAge) VALUES ('Children', 5, 12);
INSERT INTO AgeTypes (AgeType, StartAge, EndAge) VALUES ('Youth/Young Adults', 13, 17);
INSERT INTO AgeTypes (AgeType, StartAge, EndAge) VALUES ('Adults', 18, 150);


/** Nationality Types Inserts **/
INSERT INTO NationalityTypes (NatType) VALUES ('All');
INSERT INTO NationalityTypes (NatType) VALUES ('Domestic-Born');
INSERT INTO NationalityTypes (NatType) VALUES ('Foreign-Born');
INSERT INTO NationalityTypes (NatType) VALUES ('Undocumented');

/** Race Types Inserts **/
INSERT INTO RaceTypes (RaceType) VALUES ('All');
INSERT INTO RaceTypes (RaceType) VALUES ('Black or African American');
INSERT INTO RaceTypes (RaceType) VALUES ('Asian');
INSERT INTO RaceTypes (RaceType) VALUES ('White');
INSERT INTO RaceTypes (RaceType) VALUES ('Hispanic/Latino');
INSERT INTO RaceTypes (RaceType) VALUES ('American Indian or Alaska Native');
INSERT INTO RaceTypes (RaceType) VALUES ('Multi-Racial');

/** State Inserts **/
INSERT INTO States (StateName) VALUES ('Alabama');
INSERT INTO States (StateName) VALUES ('Alaska');
INSERT INTO States (StateName) VALUES ('Arizona');
INSERT INTO States (StateName) VALUES ('Arkansas');
INSERT INTO States (StateName) VALUES ('California');
INSERT INTO States (StateName) VALUES ('Colorado');
INSERT INTO States (StateName) VALUES ('Connecticut');
INSERT INTO States (StateName) VALUES ('Delaware');
INSERT INTO States (StateName) VALUES ('District of Columbia');
INSERT INTO States (StateName) VALUES ('Florida');
INSERT INTO States (StateName) VALUES ('Georgia');
INSERT INTO States (StateName) VALUES ('Hawaii');
INSERT INTO States (StateName) VALUES ('Idaho');
INSERT INTO States (StateName) VALUES ('Illinois');
INSERT INTO States (StateName) VALUES ('Indiana');
INSERT INTO States (StateName) VALUES ('Iowa');
INSERT INTO States (StateName) VALUES ('Kansas');
INSERT INTO States (StateName) VALUES ('Kentucky');
INSERT INTO States (StateName) VALUES ('Louisiana');
INSERT INTO States (StateName) VALUES ('Maine');
INSERT INTO States (StateName) VALUES ('Maryland');
INSERT INTO States (StateName) VALUES ('Massachusetts');
INSERT INTO States (StateName) VALUES ('Michigan');
INSERT INTO States (StateName) VALUES ('Minnesota');
INSERT INTO States (StateName) VALUES ('Mississippi');
INSERT INTO States (StateName) VALUES ('Missouri');
INSERT INTO States (StateName) VALUES ('Montana');
INSERT INTO States (StateName) VALUES ('Nebraska');
INSERT INTO States (StateName) VALUES ('Nevada');
INSERT INTO States (StateName) VALUES ('New Hampshire');
INSERT INTO States (StateName) VALUES ('New Jersey');
INSERT INTO States (StateName) VALUES ('New Mexico');
INSERT INTO States (StateName) VALUES ('New York');
INSERT INTO States (StateName) VALUES ('North Carolina');
INSERT INTO States (StateName) VALUES ('North Dakota');
INSERT INTO States (StateName) VALUES ('Ohio');
INSERT INTO States (StateName) VALUES ('Oklahoma');
INSERT INTO States (StateName) VALUES ('Oregon');
INSERT INTO States (StateName) VALUES ('Pennsylvania');
INSERT INTO States (StateName) VALUES ('Rhode Island');
INSERT INTO States (StateName) VALUES ('South Carolina');
INSERT INTO States (StateName) VALUES ('South Dakota');
INSERT INTO States (StateName) VALUES ('Tennessee');
INSERT INTO States (StateName) VALUES ('Texas');
INSERT INTO States (StateName) VALUES ('Utah');
INSERT INTO States (StateName) VALUES ('Vermont');
INSERT INTO States (StateName) VALUES ('Virginia');
INSERT INTO States (StateName) VALUES ('Washington');
INSERT INTO States (StateName) VALUES ('West Virginia');
INSERT INTO States (StateName) VALUES ('Wisconsin');
INSERT INTO States (StateName) VALUES ('Wyoming');