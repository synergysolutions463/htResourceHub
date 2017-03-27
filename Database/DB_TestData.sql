/*Tyler's test org*/

INSERT INTO Organizations (OrgName, ProgramStatement, WebLink, Email, isConf, PhoneNum, isShelter, Fees, FaithID, Notes)
            VALUES
            ('The Confidential Organization','We"re a confidential organization','www.secret.org','secretorg@donttell.org',1,'1235551235',1,20,4,'Will not show up to public');
            
INSERT INTO Addresses (OrgID, StreetInfo, City, StateID, ZipCode, County, isConf)
            VALUES
            (1,'123 Where Rd.','Nonya',27,'97621','Bizness',1);
            
INSERT INTO Contacts (OrgID, Email, FirstName, LastName, Position, isConf, PhoneNum)
            VALUES
            (1,'ghostman@illuminati.org','Ghost','Man','CEO',1,'7346661266');
            
INSERT INTO OfficeUse (OrgID, DateChanged, PersonEmail)
            VALUES
            (1,'2017-02-15 14:36:21','tyCischke@gmail.com');
            
INSERT INTO Service (OrgID, Supply, SerID)
            VALUES
            (1,1,3);
            
            INSERT INTO Service (OrgID, Supply, SerID)
            VALUES
            (1,1,1);
            
            INSERT INTO Service (OrgID, Supply, SerID)
            VALUES
            (1,1,2);
            
            INSERT INTO Service (OrgID, Supply, SerID)
            VALUES
            (1,1,4);
        
INSERT INTO Requirements (OrgID, ReqID, Description)
            VALUES
            (1,3,'I don"t even know what this reqID correlates to');
            
INSERT INTO Gender (OrgID, GenID)
            VALUES
            (1,2);
            
INSERT INTO Ethnicity (OrgID, EthID)
            VALUES
            (1,1);
            
INSERT INTO Nationality (OrgID, NatID)
            VALUES
            (1,1);
            
INSERT INTO Race (OrgID, RaceID)
            VALUES
            (1,2);
            
INSERT INTO Hours (OrgID, DayID, AddService, StartTime, EndTime)
            VALUES
            (1,4,'Helpfulness','10:00:00','14:00:00');
            
            INSERT INTO Age(AgeID, OrgID)
            VALUES (2,1);

/*Logan's test org*/

INSERT INTO Organizations (OrgName, ProgramStatement, WebLink, Email, isConf, PhoneNum, isShelter, Fees, FaithID, Notes)
            VALUES ('Grand Valley State University','Laker for a Lifetime','www.gvsu.edu','GVmuhfuckinSU@gvsu.edu',0,'6163315000',0,11363,1,'Liberal af');
            
INSERT INTO Addresses (OrgID, StreetInfo, City, StateID, ZipCode, County, isConf)
            VALUES (2,'1 Campus Dr.','Allendale',23,'49401','Ottawa County',0);
            
INSERT INTO Contacts (OrgID, Email, FirstName, LastName, Position, isConf, PhoneNum)
            VALUES (2,'OverlordTHaas@gvsu.edu','Thomas','Haas','Overlord',0,'3141592654');
            
INSERT INTO OfficeUse (OrgID, DateChanged, PersonEmail)
            VALUES (2,'2017-02-15 14-36-21','rohloffl@mail.gvsu.edu');
            
INSERT INTO Service (OrgID, Service, SerID)
            VALUES (2,3,2);
            
            INSERT INTO Service (OrgID, Service, SerID)
            VALUES (2,3,5);
            
            INSERT INTO Service (OrgID, Service, SerID)
            VALUES (2,3,6);
            
            INSERT INTO Service (OrgID, Service, SerID)
            VALUES (2,3,7);
            
            INSERT INTO Service (OrgID, Service, SerID)
            VALUES (2,3,8);
            
INSERT INTO Requirements (OrgID, ReqID, Description)
            VALUES (2,2,'Gotta pay2play');
            
INSERT INTO Gender (GenID, OrgID)
            VALUES (1,2);
            
INSERT INTO Ethnicity(EthID, OrgID)
            VALUES (1,2);
            
INSERT INTO Age(AgeID, OrgID)
            VALUES (1,2);
            
INSERT INTO Nationality (NatID, OrgID)
            VALUES (1,2);
            
INSERT INTO Race (RaceID, OrgID)
            VALUES (1,2);
            
INSERT INTO Hours(DayID, OrgID, AddService, StartTime, EndTime)
            VALUES (1,2,'Print4Free','00:00:00','23:59:59');
            
-- Matt's Test Data

INSERT INTO Organizations (OrgName, ProgramStatement, WebLink, Email, isConf, PhoneNum, isShelter, Fees, FaithID, Notes)
            VALUES ('A Big Company', 'We"re kind of a big deal.', 'www.bigdeal.org', 'bigcomp@bigdeal.org', 0, '123456890', 1, 25, 3, 'Guys, this is a big company.');
            
INSERT INTO Addresses (OrgID, StreetInfo, City, StateID, ZipCode, County, isConf)
            VALUES (3, '234 Where Yaat St.', 'Denver', 6, '19348','Tom Green', 0);
            
INSERT INTO Contacts (OrgID, Email, FirstName, LastName, Position, isConf, PhoneNum)
            VALUES (3,'jimbob@bigdeal.org','Jimothy','Robert', 'Door Man', 0,'4300495043');
            
INSERT INTO OfficeUse (OrgID, DateChanged, PersonEmail)
            VALUES (3,'2017-02-14 15-37-22','tyCischke@gmail.com');
            
INSERT INTO Service (OrgID, Supply, SerID)
            VALUES (3,2,4);
            
            INSERT INTO Service (OrgID, Supply, SerID)
            VALUES (3,2,9);
            
            INSERT INTO Service (OrgID, Supply, SerID)
            VALUES (3,2,10);
            
            INSERT INTO Service (OrgID, Supply, SerID)
            VALUES (3,2,11);
            
            INSERT INTO Service (OrgID, Supply, SerID)
            VALUES (3,2,12);
            
INSERT INTO Requirements (OrgID, ReqID, Description) VALUES (3, 1, 'Amanda is waiting');
            VALUES (3, 1, 'These are our requirements.');

INSERT INTO Gender (GenID, OrgID) VALUES (1, 3);

INSERT INTO Age (AgeID, OrgID) VALUES (1, 3);

INSERT INTO Hours(DayID, OrgID, StartTime, EndTime) 
            VALUES (1, 3, '00:00:00', '23:59:00');
            
INSERT INTO Nationality (NatID, OrgID)
            VALUES (1, 3);
            
INSERT INTO Race (RaceID, OrgID)
            VALUES (1, 3);
            
INSERT INTO Hours(DayID, OrgID, AddService, StartTime, EndTime)
            VALUES (1, 3,'Free Stuff','00:00:00','23:59:59');


/** Amanda's Test Data **/            

INSERT INTO Organizations (OrgName, ProgramStatement, WebLink, Email, isConf, PhoneNum, isShelter, Fees, FaithID, Notes)
            VALUES
            ('The Amanda Show Organization','We love Amanda!','www.amanda.org','iloveamanda@amanda.org',0,'1235551235',0,0,6,'Only Amandas allowed');
            
INSERT INTO Addresses (OrgID, StreetInfo, City, StateID, ZipCode, County, isConf)
            VALUES
            (4,'1104 Amanda St','Amanda',27,'49301','Mandy',0);
            
INSERT INTO Contacts (OrgID, Email, FirstName, LastName, Position, isConf, PhoneNum)
            VALUES
            (4,'amandarox@amanda.org','Amanda','Adnama','Boss Bitch',0,'19392929292');
            
INSERT INTO OfficeUse (OrgID, DateChanged, PersonEmail)
            VALUES
            (4,'2017-02-15 14:36:21','vietzkea@gmail.com');
            
INSERT INTO Service (OrgID, Supply, SerID)
            VALUES
            (4,1,3);
            
            INSERT INTO Service (OrgID, Supply, SerID)
            VALUES
            (4,1,3);
            INSERT INTO Service (OrgID, Supply, SerID)
            VALUES
            (4,1,13);
            INSERT INTO Service (OrgID, Supply, SerID)
            VALUES
            (4,1,14);
            INSERT INTO Service (OrgID, Supply, SerID)
            VALUES
            (4,1,2);
            
INSERT INTO Requirements (OrgID, ReqID, Description) VALUES (4,1,'Amanda is waiting');

INSERT INTO Gender (GenID, OrgID) VALUES (1, 4);

INSERT INTO Age (AgeID, OrgID) VALUES (1, 4);

INSERT INTO Hours(DayID, OrgID, StartTime, EndTime) VALUES (1, 4, '00:00:00', '23:59:00');

INSERT INTO Nationality (NatID, OrgID)
            VALUES (2, 4);
            
            INSERT INTO Nationality (NatID, OrgID)
            VALUES (3, 4);
            
            INSERT INTO Nationality (NatID, OrgID)
            VALUES (4, 4);