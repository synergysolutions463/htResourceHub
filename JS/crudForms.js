var loggedIn = false;

function testAjax() {
	console.log("test ajax worked")
	$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "readTest"
		},
		success: function(data) {
			console.log(data[0, 0]);

			var parsedData = JSON.parse(data);
			var books = parsedData;
			console.log(books[0]);

		}
	});
}

function readAllOrgs() {
	console.log("read all orgs beginning worked")
	$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "readAllOrgs"
		},
		success: function(data) {
			console.log(data);

			var parsedData = JSON.parse(data);
			var orgs = parsedData;

			loadSimpleData(orgs);

		}

	});
}

function simpleSearchOrgs() {
	var counseling = document.getElementById("counseling").checked;
	var employment = document.getElementById("employment").checked;
	var legal = document.getElementById("legal").checked;
	var medical = document.getElementById("medical").checked;
	var shelter = document.getElementById("shelter").checked;
	var substanceAbuse = document.getElementById("substanceAbuse").checked;

	console.log("simple search beginning worked")
	$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "simpleSearchOrgs",
			counseling: counseling.toString(),
			employment: employment.toString(),
			legal: legal.toString(),
			medical: medical.toString(),
			shelter: shelter.toString(),
			substanceAbuse: substanceAbuse.toString()
		},
		success: function(data) {
			console.log("connection to php worked with simple search");
			console.log(data);

			var parsedData = JSON.parse(data);
			var orgs = parsedData;

			loadSimpleData(orgs);

		}
	});
}

function advSearchOrgs() {
	var clothingRsc = document.getElementById("clothingResourceCB").checked;
	var foodRsc = document.getElementById("foodResourceCB").checked;
	var employmentRsc = document.getElementById("employmentResourceCB").checked;
	var mentoringRsc = document.getElementById("mentoringResourceCB").checked;
	var counselingRsc = document.getElementById("counselingResourceCB").checked;
	var pregnancyRsc = document.getElementById("pregnancyResourceCB").checked;
	var medicalRsc = document.getElementById("medicalResourceCB").checked;
	var legalRsc = document.getElementById("legalResourceCB").checked;
	var governmentalRsc = document.getElementById("governmentalResourceCB").checked;
	var investigationRsc = document.getElementById("investigationResourceCB").checked;
	var fosterCareRsc = document.getElementById("fosterCareResourceCB").checked;
	var educationRsc = document.getElementById("educationResourceCB").checked;
	var responseTrainingRsc = document.getElementById("responseTrainingResourceCB").checked;
	var substanceAbuseRsc = document.getElementById("substanceAbuseResourceCB").checked;
	var shelterHsg = document.getElementById("shelterHousingCB").checked;
	var transitionalHsg = document.getElementById("transitionalHousingCB").checked;
	var asstLocHsg = document.getElementById("assistanceHousingCB").checked;
	var domesticNat = document.getElementById("domesticNatCB").checked;
	var foreignNat = document.getElementById("foreignNatCB").checked;
	var undocumentedNat = document.getElementById("undocumentedNatCB").checked;
	var maleGdr = document.getElementById("maleGenderCB").checked;
	var transGdr = document.getElementById("transGenderCB").checked;
	var femaleGdr = document.getElementById("femaleGenderCB").checked;
	var infantsAge = document.getElementById("infantsAgeCB").checked;
	var childrenAge = document.getElementById("childrenAgeCB").checked;
	var youthAge = document.getElementById("youthAdultsAgeCB").checked;
	var adultsAge = document.getElementById("adultsAgeCB").checked;
	var feeFree = document.getElementById("freeFeeCB").checked;
	var hours247 = document.getElementById("hoursCB").checked;
	var searchTxt = document.getElementById("advSearchTxt").value;
	var cityTxt = document.getElementById("citySearchTxt").value;


	console.log("adv search beginning worked")
	$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "advSearchOrgs",
			clothingRsc: clothingRsc.toString(),
			foodRsc: foodRsc.toString(),
			employmentRsc: employmentRsc.toString(),
			mentoringRsc: mentoringRsc.toString(),
			counselingRsc: counselingRsc.toString(),
			pregnancyRsc: pregnancyRsc.toString(),
			medicalRsc: medicalRsc.toString(),
			legalRsc: legalRsc.toString(),
			governmentalRsc: governmentalRsc.toString(),
			investigationRsc: investigationRsc.toString(),
			fosterCareRsc: fosterCareRsc.toString(),
			educationRsc: educationRsc.toString(),
			responseTrainingRsc: responseTrainingRsc.toString(),
			substanceAbuseRsc: substanceAbuseRsc.toString(),
			cityTxt: cityTxt,
			searchTxt: searchTxt,
			hours247: hours247.toString(),
			feeFree: feeFree.toString(),
			adultsAge: adultsAge.toString(),
			youthAge: youthAge.toString(),
			childrenAge: childrenAge.toString(),
			infantsAge: infantsAge.toString(),
			femaleGdr: femaleGdr.toString(),
			transGdr: transGdr.toString(),
			maleGdr: maleGdr.toString(),
			undocumentedNat: undocumentedNat.toString(),
			foreignNat: foreignNat.toString(),
			domesticNat: domesticNat.toString(),
			asstLocHsg: asstLocHsg.toString(),
			transitionalHsg: transitionalHsg.toString(),
			shelterHsg: shelterHsg.toString()
		},
		success: function(data) {
			console.log(data);

			var parsedData = JSON.parse(data);
			var orgs = parsedData;

			loadSimpleData(orgs);

		}
	});
}

function hide(target) {
	document.getElementById(target).style.display = 'none';
}

function show(target) {
	document.getElementById(target).style.display = 'block';
}

function login() {
	var username = document.getElementById("usernameTxt").value;
	var password = document.getElementById("passwordTxt").value;

	$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "login",
			username: username,
			password: password
		},
		success: function(data) {
			console.log(data);
			if (data == "logged in") {
				loggedIn = true;
			}
			else {
				loggedIn = false;
			}

			console.log(loggedIn);
		}
	});

}

function logout() {

}

function deleteOrg() {

}

function loadSimpleData(orgs) {

	oLen = orgs.length;

	text = "";

	for (i = 0; i < oLen; i++) {

		if (loggedIn == false) {
			//		if (orgs[i][7] == 0) {
			//			if (orgs[i][8] == 1) {
			text += "<div class=\"panel\" id=\"indiPanel\">" +
				"<div class=\"row\">" +
				"<div class=\"col-md-4 col-md-offset-2\">";

			text += "<div class=\"organization-info " + orgs[i][0] + "\">";

			text += "<h2><a href=\"orgInfo.html\" style=\"cursor: pointer;\ class=\"orgLink\">";
			text += orgs[i][1];
			text += "</a></h2>";


			if (orgs[i][15] == 1) {
				text += "<h3>Open 24-Hours</h3>";
			}

			text += "<p>Phone: ";

			if (orgs[i][2] == "" || orgs[i][2] == null) {
				text += "N/A</p>";
			}
			else {
				text += orgs[i][2] + "</p>";
			}

			text += "<h5>Hotline: ";

			if (orgs[i][3] == "" || orgs[i][3] == null) {
				text += "N/A</h5>";
			}
			else {
				text += orgs[i][3] + "</h5>";
			}

			text += "<p>Email: ";

			if (orgs[i][5] == "" || orgs[i][5] == null) {
				text += "N/A</p>";
			}
			else {
				text += orgs[i][5] + "</p>";
			}
			text += "</div> </div> ";

			text += " <div class=\"col-md-4\">" +
				"<div class=\"resource-info\">" +
				"<br>" +
				"<p>OFFERED RESOURCES</p>" +
				"<ul>" +
				"<li>Housing</li>" +
				"<li>Mentoring</li>" +
				"<li>Awareness/Education</li>" +
				"<li>Other</li>" +
				"</ul>" +
				"</div> </div> </div> </div>";

			document.getElementById("resultPanel").innerHTML = text;

			//			}
			//		}

		}



	}








}

function loadComplexData() {

}

function insertOrganization() {

	/**Organization Table Insert Data **/

	var orgName = document.getElementById("txtOrgNameCreate").value;
	var agencyName = document.getElementById("txtOrgProgramCreate").value;
	var missionStmt = document.getElementById("txtMissionStatementCreate").value;
	var weblink = document.getElementById("txtOrgWebsiteCreate").value;
	var email = document.getElementById("txtOrgEmailCreate").value;
	var phoneNum = document.getElementById("txtMainPhoneCreate").value;
	var phoneExt = document.getElementById("txtMainPhoneExtCreate").value;
	var hotlineNum = document.getElementById("txtHotlineCreate").value;
	var confNum = document.getElementById("txtConfPhoneCreate").value;
	var confExt = document.getElementById("txtConfPhoneExtCreate").value;
	var isShelter = document.getElementById("cbShelterCreate").checked;
	var isTransHousing = document.getElementById("cbTransitionalHousingCreate").checked;
	var isAsstLoc = document.getElementById("cbAssistLocateHousingCreate").checked;
	var fee = 0;
	/*change to faith dropdown */
	var faith = document.getElementById("txtFaithCreate").value;
	var notes = document.getElementById("txtNoteCreate").value;
	var confNotes = document.getElementById("txtConfidentialNoteCreate").value;
	var isConf = document.getElementById("cbIsConfCreate").checked;

	if (document.getElementById("cbFreeCreate").checked == true) {
		var fee = 0;
	}
	else {
		var fee = document.getElementById("txtAssociatedFeeCreate").value;
	}

	/**Addresses Table Insert Data**/
	var streetInfo1 = document.getElementById("txtAddress1StreetCreate").value;
	var city1 = document.getElementById("txtAddress1CityCreate").value;
	var zipcode1 = document.getElementById("txtAddress1ZipCreate").value;
	var county1 = document.getElementById("txtAddress1CountyCreate").value;
	var state1 = document.getElementById("txtAddress1StateCreate").value;

	var streetInfo2 = document.getElementById("txtAddress2StreetCreate").value;
	var city2 = document.getElementById("txtAddress2CityCreate").value;
	var zipcode2 = document.getElementById("txtAddress2ZipCreate").value;
	var county2 = document.getElementById("txtAddress2CountyCreate").value;
	var state2 = document.getElementById("txtAddress2StateCreate").value;

	var streetInfo3 = document.getElementById("txtConfAddressStreetCreate").value;
	var city3 = document.getElementById("txtConfAddressCityCreate").value;
	var zipcode3 = document.getElementById("txtConfAddressZipCreate").value;
	var county3 = document.getElementById("txtConfAddressCountyCreate").value;
	var state3 = document.getElementById("txtConfAddressStateCreate").value;


	/**Age Table Insert Data**/
	var infantsAge = document.getElementById("cbInfantCreate").checked;
	var childrenAge = document.getElementById("cbChildCreate").checked;
	var youthAge = document.getElementById("cbYouthCreate").checked;
	var adultsAge = document.getElementById("cbAdultCreate").checked;

	/**Contact Table Insert Data**/
	var contactEmail = document.getElementById("txtPrimaryContactEmailCreate").value;
	var firstName = document.getElementById("txtPrimaryContactFirstNameCreate").value;
	var lastName = document.getElementById("txtPrimaryContactLastNameCreate").value;
	var position = document.getElementById("txtPrimaryContactPosCreate").value;
	var contactPhoneNum = document.getElementById("txtPrimaryContactPhoneCreate").value;
	var contactPhoneExt = document.getElementById("txtPrimaryContactExtCreate").value;
	var contactIsConf = document.getElementById("cbContactIsConfCreate").checked;

	/**Ethnicity Table Insert Data**/
	var hispanic = document.getElementById("cbHispanicCreate").checked;
	var nonhispanic = document.getElementById("cbNonHispanicCreate").checked;

	/**Gender Table Insert Data**/
	var male = document.getElementById("cbMaleCreate").checked;
	var female = document.getElementById("cbFemaleCreate").checked;
	var transgender = document.getElementById("cbTransCreate").checked;

	/**Hours Table Insert Data**/
	var is24Hours = document.getElementById("cbIs247Create").checked;

	var mondayToFridayFullOpen = document.getElementById("ddlGenFullWeekStartTimeCreate").value;
	var mondayToFridayFullClose = document.getElementById("ddlGenFullWeekEndTimeCreate").value;
	var saturdayFullOpen = document.getElementById("ddlGenFullWeekSatStartTimeCreate").value;
	var saturdayFullClose = document.getElementById("ddlGenFullWeekSatEndTimeCreate").value;
	var sundayFullOpen = document.getElementById("ddlGenFullWeekSunStartTimeCreate").value;
	var sundayFullClose = document.getElementById("ddlGenFullWeekSunEndTimeCreate").value;
	var mondaySingleOpen = document.getElementById("ddlGenMondayStartTimeCreate").value;
	var mondaySingleClose = document.getElementById("ddlGenMondayEndTimeCreate").value;
	var tuesdaySingleOpen = document.getElementById("ddlGenTuesdayStartTimeCreate").value;
	var tuesdaySingleClose = document.getElementById("ddlGenTuesdayEndTimeCreate").value;
	var wednesdaySingleOpen = document.getElementById("ddlGenWednesdayStartTimeCreate").value;
	var wednesdaySingleClose = document.getElementById("ddlGenWednesdayEndTimeCreate").value;
	var thursdaySingleOpen = document.getElementById("ddlGenThursdayStartTimeCreate").value;
	var thursdaySingleClose = document.getElementById("ddlGenThursdayEndTimeCreate").value;
	var fridaySingleOpen = document.getElementById("ddlGenFridayStartTimeCreate").value;
	var fridaySingleClose = document.getElementById("ddlGenFridayEndTimeCreate").value;
	var saturdaySingleOpen = document.getElementById("ddlGenSaturdayStartTimeCreate").value;
	var saturdaySingleClose = document.getElementById("ddlGenSaturdayEndTimeCreate").value;
	var sundaySingleOpen = document.getElementById("ddlGenSundayStartTimeCreate").value;
	var sundaySingleClose = document.getElementById("ddlGenSundayEndTimeCreate").value;

	var mondayToFridayFullOpenAdd = document.getElementById("ddlAddFullWeekStartTimeCreate").value;
	var mondayToFridayFullCloseAdd = document.getElementById("ddlAddFullWeekEndTimeCreate").value;
	var saturdayFullOpenAdd = document.getElementById("ddlAddFullWeekSatStartTimeCreate").value;
	var saturdayFullCloseAdd = document.getElementById("ddlAddFullWeekSatEndTimeCreate").value;
	var sundayFullOpenAdd = document.getElementById("ddlAddFullWeekSunStartTimeCreate").value;
	var sundayFullCloseAdd = document.getElementById("ddlAddFullWeekSunEndTimeCreate").value;
	var mondaySingleOpenAdd = document.getElementById("ddlAddMondayStartTimeCreate").value;
	var mondaySingleCloseAdd = document.getElementById("ddlAddMondayEndTimeCreate").value;
	var tuesdaySingleOpenAdd = document.getElementById("ddlAddTuesdayStartTimeCreate").value;
	var tuesdaySingleCloseAdd = document.getElementById("ddlAddTuesdayEndTimeCreate").value;
	var wednesdaySingleOpenAdd = document.getElementById("ddlAddWednesdayStartTimeCreate").value;
	var wednesdaySingleCloseAdd = document.getElementById("ddlAddWednesdayEndTimeCreate").value;
	var thursdaySingleOpenAdd = document.getElementById("ddlAddThursdayStartTimeCreate").value;
	var thursdaySingleCloseAdd = document.getElementById("ddlAddThursdayEndTimeCreate").value;
	var fridaySingleOpenAdd = document.getElementById("ddlAddFridayStartTimeCreate").value;
	var fridaySingleCloseAdd = document.getElementById("ddlAddFridayEndTimeCreate").value;
	var saturdaySingleOpenAdd = document.getElementById("ddlAddSaturdayStartTimeCreate").value;
	var saturdaySingleCloseAdd = document.getElementById("ddlAddSaturdayEndTimeCreate").value;
	var sundaySingleOpenAdd = document.getElementById("ddlAddSundayStartTimeCreate").value;
	var sundaySingleCloseAdd = document.getElementById("ddlAddSundayEndTimeCreate").value;
	var addHoursDesc = document.getElementById("txtAddHoursDescCreate").value;


	/**Nationality Table Insert Data **/
	var domesticBorn = document.getElementById("cbDomesticCreate").checked;
	var foreignBorn = document.getElementById("cbForeignCreate").checked;
	var undocumented = document.getElementById("cbUndocumentedCreate").checked;

	/**Race Table Insert Data **/
	var white = document.getElementById("cbWhiteCreate").checked;
	var black = document.getElementById("cbBlackCreate").checked;
	var asian = document.getElementById("cbAsianCreate").checked;
	var hawaiian = document.getElementById("cbIslandCreate").checked;
	var native = document.getElementById("cbNativeCreate").checked;

	/**Requirements Table Insert Data **/
	var membership = document.getElementById("cbMembershipCreate").checked;
	var membershipDesc = document.getElementById("txtMembershipCreate").value;
	var training = document.getElementById("cbTrainingCreate").checked;
	var trainingDesc = document.getElementById("txtTrainingCreate").value;
	var application = document.getElementById("cbApplicationCreate").checked;
	var applicationDesc = document.getElementById("txtApplicationCreate").value;
	var waiting = document.getElementById("cbRestrictionCreate").checked;
	var waitingDesc = document.getElementById("txtRestrictionCreate").value;

	/**Service Table Insert Data **/

	var providesClothingService = document.getElementById("cbClothingServCreate").checked;
	var providesClothingSupply = document.getElementById("cbClothingSupplyCreate").checked;
	var providesClothingEmergResp = document.getElementById("cbClothingEmergRespCreate").checked;
	var providesClothingDesc = document.getElementById("txtClothingDescCreate").value;

	var providesFoodService = document.getElementById("cbFoodServCreate").checked;
	var providesFoodSupply = document.getElementById("cbFoodSupplyCreate").checked;
	var providesFoodEmergResp = document.getElementById("cbFoodEmergRespCreate").checked;
	var providesFoodDesc = document.getElementById("txtFoodDescCreate").value;

	var providesEmploymentService = document.getElementById("cbEmploymentServCreate").checked;
	var providesEmploymentSupply = document.getElementById("cbEmploymentSupplyCreate").checked;
	var providesEmploymentEmergResp = document.getElementById("cbEmploymentEmergRespCreate").checked;
	var providesEmploymentDesc = document.getElementById("txtEmploymentDescCreate").value;

	var providesMentoringService = document.getElementById("cbMentoringServCreate").checked;
	var providesMentoringSupply = document.getElementById("cbMentoringSupplyCreate").checked;
	var providesMentoringEmergResp = document.getElementById("cbMentoringEmergRespCreate").checked;
	var providesMentoringDesc = document.getElementById("txtMentoringDescCreate").value;

	var providesCounsTherapyService = document.getElementById("cbCounselServCreate").checked;
	var providesCounsTherapySupply = document.getElementById("cbCounselServCreate").checked;
	var providesCounsTherapyEmergResp = document.getElementById("cbCounselServCreate").checked;
	var providesCounsTherapyDesc = document.getElementById("txtCounselDescCreate").value;

	var providesPregnancyService = document.getElementById("cbPregnancyServCreate").checked;
	var providesPregnancySupply = document.getElementById("cbPregnancySupplyCreate").checked;
	var providesPregnancyEmergResp = document.getElementById("cbPregnancyEmergRespCreate").checked;
	var providesPregnancyDesc = document.getElementById("txtPregnancyDescCreate").value;

	var providesMedicalService = document.getElementById("cbMedicalServCreate").checked;
	var providesMedicalSupply = document.getElementById("cbMedicalSupplyCreate").checked;
	var providesMedicalEmergResp = document.getElementById("cbMedicalEmergRespCreate").checked;
	var providesMedicalDesc = document.getElementById("txtMedicalDescCreate").value;

	var providesLegalService = document.getElementById("cbLegalServCreate").checked;
	var providesLegalSupply = document.getElementById("cbLegalSupplyCreate").checked;
	var providesLegalEmergResp = document.getElementById("cbLegalEmergRespCreate").checked;
	var providesLegalDesc = document.getElementById("txtLegalDescCreate").value;

	var providesGovService = document.getElementById("cbGovServCreate").checked;
	var providesGovSupply = document.getElementById("cbGovSupplyCreate").checked;
	var providesGovEmergResp = document.getElementById("cbGovEmergRespCreate").checked;
	var providesGovDesc = document.getElementById("txtGovDescCreate").value;

	var providesInvestigationService = document.getElementById("cbInvestigationServCreate").checked;
	var providesInvestigationSupply = document.getElementById("cbInvestigationSupplyCreate").checked;
	var providesInvestigationEmergResp = document.getElementById("cbInvestigationEmergRespCreate").checked;
	var providesInvestigationDesc = document.getElementById("txtInvestigationDescCreate").value;

	var providesFosterService = document.getElementById("cbFosterServCreate").checked;
	var providesFosterSupply = document.getElementById("cbFosterSupplyCreate").checked;
	var providesFosterEmergResp = document.getElementById("cbFosterEmergRespCreate").checked;
	var providesFosterDesc = document.getElementById("txtFosterDescCreate").value;

	var providesAwarenessService = document.getElementById("cbAwarenessEdServCreate").checked;
	var providesAwarenessSupply = document.getElementById("cbAwarenessEdSupplyCreate").checked;
	var providesAwarenessEmergResp = document.getElementById("cbAwarenessEdEmergRespCreate").checked;
	var providesAwarenessDesc = document.getElementById("txtAwarenessEdDescCreate").value;

	var providesResponseTrainingService = document.getElementById("cbResponseTrainServCreate").checked;
	var providesResponseTrainingSupply = document.getElementById("cbResponseTrainSupplyCreate").checked;
	var providesResponseTrainingEmergResp = document.getElementById("cbResponseTrainEmergRespCreate").checked;
	var providesResponseTrainingDesc = document.getElementById("txtResponseTrainDescCreate").value;

	var substanceAbuseService = document.getElementById("cbSubstanceAbuseServCreate").checked;
	var substanceAbuseSupply = document.getElementById("cbSubstanceAbuseSupplyCreate").checked;
	var substanceAbuseEmergResp = document.getElementById("cbSubstanceAbuseEmergRespCreate").checked;
	var substanceAbuseDesc = document.getElementById("txtSubstanceAbuseDescCreate").value;
	
	var advocacyService = document.getElementById("cbAdvocacyServCreate").checked;
	var advocacySupply = document.getElementById("cbAdvocacySupplyCreate").checked;
	var advocacyEmergResp = document.getElementById("cbAdvocacyEmergRespCreate").checked;
	var advocacyDesc = document.getElementById("txtAdvocacyDescCreate").value;

	var otherService = document.getElementById("cbOtherServCreate").checked;
	var otherSupply = document.getElementById("cbOtherSupplyCreate").checked;
	var otherEmergResp = document.getElementById("cbOtherEmergRespCreate").checked;
	var otherDesc = document.getElementById("txtOtherDescCreate").value;





	console.log("simple search beginning worked")
	$.ajax({
		url: '/PHP/createOrgAjax.php',
		type: 'POST',
		data: {
			method: "insertOrganization",

			/**Organization Table Data**/

			orgName: orgName,
			agencyName: agencyName,
			missionStmt: missionStmt,
			weblink: weblink,
			email: email,
			phoneNum: phoneNum,
			phoneExt: phoneExt,
			hotlineNum: hotlineNum,
			confNum: confNum,
			confExt: confExt,
			isShelter: isShelter.toString(),
			isTransHousing: isTransHousing.toString(),
			isAsstLoc: isAsstLoc.toString(),
			fee: fee,
			faith: faith,
			notes: notes,
			confNotes: confNotes,
			isConf: isConf.toString(),

			/**Addresses Table Insert Data**/
			streetInfo1: streetInfo1,
			city1: city1,
			zipcode1: zipcode1,
			county1: county1,
			state1: state1,

			streetInfo2: streetInfo2,
			city2: city2,
			zipcode2: zipcode2,
			county2: county2,
			state2: state2,

			streetInfo3: streetInfo3,
			city3: city3,
			zipcode3: zipcode3,
			county3: county3,
			state3: state3,


			/**Age Table Insert Data**/
			infantsAge: infantsAge.toString(),
			childrenAge: childrenAge.toString(),
			youthAge: youthAge.toString(),
			adultsAge: adultsAge.toString(),

			/**Contact Table Insert Data**/
			contactEmail: contactEmail,
			firstName: firstName,
			lastName: lastName,
			position: position,
			contactPhoneNum: contactPhoneNum,
			contactPhoneExt: contactPhoneExt,
			contactIsConf: contactIsConf.toString(),

			/**Ethnicity Table Insert Data**/
			hispanic: hispanic.toString(),
			nonhispanic: nonhispanic.toString(),

			/**Gender Table Insert Data**/
			male: male.toString(),
			female: female.toString(),
			transgender: transgender.toString(),

			/**Hours Table Insert Data**/
			is24Hours: is24Hours.toString(),

			mondayToFridayFullOpen: mondayToFridayFullOpen,
			mondayToFridayFullClose: mondayToFridayFullClose,
			saturdayFullOpen: saturdayFullOpen,
			saturdayFullClose: saturdayFullClose,
			sundayFullOpen: sundayFullOpen,
			sundayFullClose: sundayFullClose,
			mondaySingleOpen: mondaySingleOpen,
			mondaySingleClose: mondaySingleClose,
			tuesdaySingleOpen: tuesdaySingleOpen,
			tuesdaySingleClose: tuesdaySingleClose,
			wednesdaySingleOpen: wednesdaySingleOpen,
			wednesdaySingleClose: wednesdaySingleClose,
			thursdaySingleOpen: thursdaySingleOpen,
			thursdaySingleClose: thursdaySingleClose,
			fridaySingleOpen: fridaySingleOpen,
			fridaySingleClose: fridaySingleClose,
			saturdaySingleOpen: saturdaySingleOpen,
			saturdaySingleClose: saturdaySingleClose,
			sundaySingleOpen: sundaySingleOpen,
			sundaySingleClose: sundaySingleClose,

			mondayToFridayFullOpenAdd: mondayToFridayFullOpenAdd,
			mondayToFridayFullCloseAdd: mondayToFridayFullCloseAdd,
			saturdayFullOpenAdd: saturdayFullOpenAdd,
			saturdayFullCloseAdd: saturdayFullCloseAdd,
			sundayFullOpenAdd: sundayFullOpenAdd,
			sundayFullCloseAdd: sundayFullOpenAdd,
			mondaySingleOpenAdd: mondaySingleOpenAdd,
			mondaySingleCloseAdd: mondaySingleCloseAdd,
			tuesdaySingleOpenAdd: tuesdaySingleOpenAdd,
			tuesdaySingleCloseAdd: tuesdaySingleCloseAdd,
			wednesdaySingleOpenAdd: wednesdaySingleOpenAdd,
			wednesdaySingleCloseAdd: wednesdaySingleCloseAdd,
			thursdaySingleOpenAdd: thursdaySingleOpenAdd,
			thursdaySingleCloseAdd: thursdaySingleCloseAdd,
			fridaySingleOpenAdd: fridaySingleOpenAdd,
			fridaySingleCloseAdd: fridaySingleCloseAdd,
			saturdaySingleOpenAdd: saturdaySingleOpenAdd,
			saturdaySingleCloseAdd: saturdaySingleCloseAdd,
			sundaySingleOpenAdd: sundaySingleOpenAdd,
			sundaySingleCloseAdd: sundaySingleCloseAdd,
			addHoursDesc: addHoursDesc,
		


			/**Nationality Table Insert Data **/
			domesticBorn: domesticBorn.toString(),
			foreignBorn: foreignBorn.toString(),
			undocumented: undocumented.toString(),

			/**Race Table Insert Data **/
			white: white.toString(),
			black: black.toString(),
			asian: asian.toString(),
			hawaiian: hawaiian.toString(),
			native: native.toString(),

			/**Requirements Table Insert Data **/
			membership: membership.toString(),
			membershipDesc: membershipDesc,
			training: training.toString(),
			trainingDesc: trainingDesc,
			application: application.toString(),
			applicationDesc: applicationDesc,
			waiting: waiting.toString(),
			waitingDesc: waitingDesc,

			/**Service Table Insert Data **/

			providesClothingService: providesClothingService.toString(),
			providesClothingSupply: providesClothingSupply.toString(),
			providesClothingEmergResp: providesClothingEmergResp.toString(),
			providesClothingDesc: providesClothingDesc,

			providesFoodService: providesFoodService.toString(),
			providesFoodSupply: providesFoodSupply.toString(),
			providesFoodEmergResp: providesFoodEmergResp.toString(),
			providesFoodDesc: providesFoodDesc,

			providesEmploymentService: providesEmploymentService.toString(),
			providesEmploymentSupply: providesEmploymentSupply.toString(),
			providesEmploymentEmergResp: providesEmploymentEmergResp.toString(),
			providesEmploymentDesc: providesEmploymentDesc,

			providesMentoringService: providesMentoringService.toString(),
			providesMentoringSupply: providesMentoringSupply.toString(),
			providesMentoringEmergResp: providesMentoringEmergResp.toString(),
			providesMentoringDesc: providesMentoringDesc,

			providesCounsTherapyService: providesCounsTherapyService.toString(),
			providesCounsTherapySupply: providesCounsTherapySupply.toString(),
			providesCounsTherapyEmergResp: providesCounsTherapyEmergResp.toString(),
			providesCounsTherapyDesc: providesCounsTherapyDesc,

			providesPregnancyService: providesPregnancyService.toString(),
			providesPregnancySupply: providesPregnancySupply.toString(),
			providesPregnancyEmergResp: providesPregnancyEmergResp.toString(),
			providesPregnancyDesc: providesPregnancyDesc,

			providesMedicalService: providesMedicalService.toString(),
			providesMedicalSupply: providesMedicalSupply.toString(),
			providesMedicalEmergResp: providesMedicalEmergResp.toString(),
			providesMedicalDesc: providesMedicalDesc,

			providesLegalService: providesLegalService.toString(),
			providesLegalSupply: providesLegalSupply.toString(),
			providesLegalEmergResp: providesLegalEmergResp.toString(),
			providesLegalDesc: providesLegalDesc,

			providesGovService: providesGovService.toString(),
			providesGovSupply: providesGovSupply.toString(),
			providesGovEmergResp: providesGovEmergResp.toString(),
			providesGovDesc: providesGovDesc,

			providesInvestigationService: providesInvestigationService.toString(),
			providesInvestigationSupply: providesInvestigationSupply.toString(),
			providesInvestigationEmergResp: providesInvestigationEmergResp.toString(),
			providesInvestigationDesc: providesInvestigationDesc,

			providesFosterService: providesFosterService.toString(),
			providesFosterSupply: providesFosterSupply.toString(),
			providesFosterEmergResp: providesFosterEmergResp.toString(),
			providesFosterDesc: providesFosterDesc,

			providesAwarenessService: providesAwarenessService.toString(),
			providesAwarenessSupply: providesAwarenessSupply.toString(),
			providesAwarenessEmergResp: providesAwarenessEmergResp.toString(),
			providesAwarenessDesc: providesAwarenessDesc,

			providesResponseTrainingService: providesResponseTrainingService.toString(),
			providesResponseTrainingSupply: providesResponseTrainingSupply.toString(),
			providesResponseTrainingEmergResp: providesResponseTrainingEmergResp.toString(),
			providesResponseTrainingDesc: providesResponseTrainingDesc,

			substanceAbuseService: substanceAbuseService.toString(),
			substanceAbuseSupply: substanceAbuseSupply.toString(),
			substanceAbuseEmergResp: substanceAbuseEmergResp.toString(),
			substanceAbuseDesc: substanceAbuseDesc,
			
			advocacyService: advocacyService.toString(),
			advocacySupply: advocacySupply.toString(),
			advocacyEmergResp: advocacyEmergResp.toString(),
			advocacyDesc: advocacyDesc,

			otherService: otherService.toString(),
			otherSupply: otherSupply.toString(),
			otherEmergResp: otherEmergResp.toString(),
			otherDesc: otherDesc
		},
		success: function(data) {
			console.log("connection to php for insert working");
			console.log(data);

		}
	});







}
